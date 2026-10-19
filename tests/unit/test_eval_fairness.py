"""Fair multi-model comparison: unique run names, eval-mode mAP vs operating conf, class mismatch."""
import time

import pytest
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import Sample
from guava.eval import evaluate_detections, parse_class_map
from guava.models import (
    Detection, InferenceConfig, Model, Prediction, apply_model, default_model_name, prediction_models, run_meta,
)


class FileModel(Model):
    """Fake model backed by a real weights file; returns fixed detections per image."""
    backend = "test"

    def __init__(self, path, dets, classes=("cat",)):
        self.path = str(path)
        self.name = default_model_name(self.path)
        self.dets = dets
        self._classes = list(classes)

    @property
    def class_names(self):
        return self._classes

    def predict(self, image_paths, cfg):
        return [Prediction(detections=[d for d in self.dets if d.confidence >= cfg.conf],
                           image_size=(64, 48), infer_ms=1.0) for _ in image_paths]


def _weights(tmp_path, rel, content):
    p = tmp_path / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(content)
    return p


def _ds(tmp_path, n=2):
    from PIL import Image
    ds = gv.Dataset(name="fair")
    for i in range(n):
        p = tmp_path / f"img{i}.jpg"
        Image.new("RGB", (64, 48)).save(p)
        gt = BboxAnnotation(label="cat", x=0.1, y=0.1, w=0.2, h=0.2, is_normalized=True)
        ds.add_sample(Sample(id=f"img{i}", filepath=str(p), annotations=[gt]))
    return ds


HIT = Detection("cat", 0.9, 0.1, 0.1, 0.2, 0.2)


def test_default_model_name():
    assert default_model_name(r"D:\runs\detect\train194\weights\best.pt") == "train194/best"
    assert default_model_name("runs/train199/weights/last.pt") == "train199/last"
    assert default_model_name("models/yolo12n_train15_housing_v12.pt") == "yolo12n_train15_housing_v12"
    assert default_model_name("runs/train9/weights/best_openvino_model/") == "train9/best"


def test_best_pt_from_two_runs_do_not_overwrite(tmp_path):
    ds = _ds(tmp_path)
    a = FileModel(_weights(tmp_path, "runs/train194/weights/best.pt", b"A"), [HIT])
    b = FileModel(_weights(tmp_path, "runs/train199/weights/best.pt", b"B"), [HIT])
    assert apply_model(ds, a)["model_name"] == "train194/best"
    assert apply_model(ds, b)["model_name"] == "train199/best"
    assert [m["name"] for m in prediction_models(ds.samples)] == ["train194/best", "train199/best"]
    assert len(ds[0].predictions) == 2


def test_same_stem_different_path_gets_sha_suffix(tmp_path):
    ds = _ds(tmp_path)
    a = FileModel(_weights(tmp_path, "a/housing.pt", b"A"), [HIT])
    b = FileModel(_weights(tmp_path, "b/housing.pt", b"B"), [HIT])
    assert apply_model(ds, a)["model_name"] == "housing"
    name_b = apply_model(ds, b)["model_name"]
    assert name_b.startswith("housing@") and len(name_b) == len("housing@") + 6
    # re-running the same weights replaces its own run instead of adding a third
    assert apply_model(ds, a)["model_name"] == "housing"
    assert len(prediction_models(ds.samples)) == 2
    assert len(ds[0].predictions) == 2


def test_alias_and_run_metadata(tmp_path):
    ds = _ds(tmp_path)
    m = FileModel(_weights(tmp_path, "w/best.pt", b"weights"), [HIT])
    summary = apply_model(ds, m, alias="v12 baseline")
    assert summary["model_name"] == "v12 baseline"
    meta = run_meta(ds.samples, "v12 baseline")
    assert meta["path"] == m.path and len(meta["sha1"]) == 8 and meta["classes"] == ["cat"]
    assert meta["eval_mode"] is False and meta["conf"] == 0.25
    assert ds[0].predictions[0].attributes["weights_sha1"] == meta["sha1"]
    assert summary["weights_sha1"] == meta["sha1"]


def test_eval_mode_keeps_low_conf_and_map_ignores_operating_conf(tmp_path):
    ds = _ds(tmp_path)
    # the only box on the GT is low-confidence; a confident FP sits elsewhere
    dets = [Detection("cat", 0.05, 0.1, 0.1, 0.2, 0.2), Detection("cat", 0.8, 0.6, 0.6, 0.2, 0.2)]
    m = FileModel(_weights(tmp_path, "m.pt", b"m"), dets)
    deploy = apply_model(ds, m, InferenceConfig(conf=0.25), alias="deploy")
    assert deploy["detections"] == 2  # low-conf TP dropped
    full = apply_model(ds, m, InferenceConfig.for_eval(), alias="full")
    assert full["eval_mode"] is True and full["detections"] == 4

    r_deploy = evaluate_detections(ds, model="deploy", conf=0.25)
    r_low = evaluate_detections(ds, model="full", conf=0.0)
    r_op = evaluate_detections(ds, model="full", conf=0.25)
    assert r_deploy["overall"]["mAP50"] == 0.0
    assert r_low["overall"]["mAP50"] > 0
    # operating conf changes P/R/TP/FP/FN only, not mAP
    assert r_op["overall"]["mAP50"] == r_low["overall"]["mAP50"]
    assert (r_op["overall"]["tp"], r_op["overall"]["fp"], r_op["overall"]["fn"]) == (0, 2, 2)
    assert (r_low["overall"]["tp"], r_low["overall"]["fp"], r_low["overall"]["fn"]) == (2, 2, 0)
    # boxes under the operating conf carry no TP/FP flag
    low = [p for p in ds[0].predictions if p.attributes["model"] == "full" and p.confidence < 0.25]
    assert low and all("eval" not in p.attributes for p in low)
    # display-mode runs are flagged as underestimating mAP
    assert any("underestimated" in w for w in r_deploy["warnings"])
    assert not any("underestimated" in w for w in r_op["warnings"])


def _scratch_model(tmp_path):
    dets = [HIT, Detection("scratch", 0.7, 0.6, 0.6, 0.2, 0.2)]
    return FileModel(_weights(tmp_path, "v23.pt", b"v23"), dets, classes=("cat", "scratch", "dent"))


def test_class_without_gt_warns_and_can_be_ignored(tmp_path):
    ds = _ds(tmp_path)
    apply_model(ds, _scratch_model(tmp_path), InferenceConfig.for_eval())
    r = evaluate_detections(ds, conf=0.25)
    assert r["overall"]["fp"] == 2
    check = r["class_check"]
    assert check["dataset_classes"] == ["cat"]
    assert check["model_classes"] == ["cat", "scratch", "dent"]
    assert {c["label"]: c["predictions"] for c in check["no_gt"]} == {"scratch": 2, "dent": 0}
    assert any("scratch (2)" in w for w in r["warnings"])
    assert next(c for c in r["classes"] if c["label"] == "scratch")["no_gt"] is True

    r = evaluate_detections(ds, conf=0.25, ignore_missing=True)
    assert (r["overall"]["tp"], r["overall"]["fp"], r["overall"]["fn"]) == (2, 0, 0)
    assert r["overall"]["precision"] == 1.0
    assert r["class_check"]["ignored"] == [{"label": "scratch", "predictions": 2}]
    assert [c["label"] for c in r["classes"]] == ["cat"]
    scratch = [p for p in ds[0].predictions if p.label == "scratch"][0]
    assert scratch.attributes["eval"] == "ignored"


def test_class_map_renames_or_drops(tmp_path):
    ds = _ds(tmp_path)
    dets = [Detection("kitty", 0.9, 0.1, 0.1, 0.2, 0.2), Detection("scratch", 0.7, 0.6, 0.6, 0.2, 0.2)]
    apply_model(ds, FileModel(_weights(tmp_path, "m.pt", b"m"), dets, classes=("kitty", "scratch")))
    r = evaluate_detections(ds, class_map="kitty=cat, scratch=")
    assert (r["overall"]["tp"], r["overall"]["fp"], r["overall"]["fn"]) == (2, 0, 0)
    assert r["class_map"] == {"kitty": "cat", "scratch": ""}
    assert not [w for w in r["warnings"] if "underestimated" not in w]
    kitty = [p for p in ds[0].predictions if p.label == "kitty"][0]
    assert kitty.attributes["eval"] == "tp" and kitty.attributes["eval_label"] == "cat"
    # without the map the renamed class is reported as unknown to the model
    r = evaluate_detections(ds)
    assert r["class_check"]["not_in_model"] == ["cat"]
    assert "eval_label" not in kitty.attributes


def test_parse_class_map():
    assert parse_class_map("a=b; c -> d\ne=") == {"a": "b", "c": "d", "e": ""}
    assert parse_class_map({"x": None}) == {"x": ""}
    assert parse_class_map("") == {}


def _wait(c, job_id):
    for _ in range(200):
        job = c.get(f"/api/jobs/{job_id}").json()
        if job["status"] not in ("queued", "running"):
            return job
        time.sleep(0.05)
    return job


@pytest.fixture
def eval_state():
    from guava.server import model_routes
    saved = dict(model_routes.eval_state)
    yield model_routes.eval_state
    model_routes.eval_state.clear()
    model_routes.eval_state.update(saved)


def test_api_run_modes_and_eval_options(tmp_path, monkeypatch, eval_state):
    import guava.models
    from guava.server.app import app, dataset_manager

    dataset_manager.set_dataset(_ds(tmp_path))
    c = TestClient(app)
    seen = []

    class Spy(FileModel):
        def predict(self, image_paths, cfg):
            seen.append(cfg)
            return super().predict(image_paths, cfg)

    v12 = Spy(_weights(tmp_path, "runs/train194/weights/best.pt", b"12"), [HIT])
    v23 = Spy(_weights(tmp_path, "runs/train199/weights/best.pt", b"23"), _scratch_model(tmp_path).dets,
              classes=("cat", "scratch"))
    for m, body in ((v12, {}), (v23, {"alias": "v23", "conf": 0.3})):
        monkeypatch.setattr(guava.models, "load_model", lambda *a, _m=m, **k: _m)
        job = _wait(c, c.post("/api/models/run", json={"path": m.path, **body}).json()["job_id"])
        assert job["status"] == "done", job
        assert job["result"]["mode"] == "eval"
    assert seen[0].conf == 0.001 and seen[0].iou == 0.7  # eval mode is the default
    assert eval_state["conf"] == 0.3  # operating conf from the run panel
    assert [m["name"] for m in c.get("/api/info").json()["pred_models"]] == ["train194/best", "v23"]
    assert any("scratch" in w for w in job["result"]["warnings"])

    cmp = c.get("/api/eval/compare").json()
    rows = {r["name"]: r for r in cmp["models"]}
    assert rows["v23"]["run"]["eval_mode"] is True and rows["v23"]["warnings"]
    assert rows["train194/best"]["eval"]["fp"] == 0 and rows["v23"]["eval"]["fp"] == 2

    r = c.post("/api/eval/run", json={"ignore_missing": True, "class_map": "dent=cat"}).json()
    assert r["settings"]["ignore_missing"] is True and r["settings"]["class_map"] == {"dent": "cat"}
    rows = {m["name"]: m for m in r["models"]}
    assert rows["v23"]["eval"]["fp"] == 0 and rows["v23"]["eval"]["precision"] == 1.0
    assert c.get("/api/eval/report?model=v23").json()["settings"]["ignore_missing"] is True

    monkeypatch.setattr(guava.models, "load_model", lambda *a, **k: v12)
    job = _wait(c, c.post("/api/models/run", json={"path": v12.path, "mode": "display", "conf": 0.5}).json()["job_id"])
    assert seen[-1].conf == 0.5 and job["result"]["mode"] == "display"
    assert job["result"]["model_name"] == "train194/best"  # same weights -> same run, replaced
