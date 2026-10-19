"""Multi-model comparison: per-model prediction layers, eval and disagreement filters."""
import time

import pytest
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import Sample
from guava.eval import evaluate_detections, evaluate_models, sample_wrong
from guava.models import Detection, Model, Prediction, apply_model, clear_predictions, prediction_models


class BoxModel(Model):
    """Predicts a fixed box; `hit` = set of image stems where the box is on the GT."""
    backend = "test"

    def __init__(self, name, hit):
        self.name = name
        self.hit = hit

    @property
    def class_names(self):
        return ["cat"]

    def predict(self, image_paths, cfg):
        out = []
        for p in image_paths:
            stem = p.replace("\\", "/").rsplit("/", 1)[-1].split(".")[0]
            x = 0.1 if stem in self.hit else 0.6
            out.append(Prediction(detections=[Detection("cat", 0.9, x, 0.1, 0.2, 0.2)], image_size=(64, 48), infer_ms=1.0))
        return out


def _ds(tmp_path, n=4):
    from PIL import Image
    ds = gv.Dataset(name="cmp")
    for i in range(n):
        p = tmp_path / f"img{i}.jpg"
        Image.new("RGB", (64, 48)).save(p)
        gt = BboxAnnotation(label="cat", x=0.1, y=0.1, w=0.2, h=0.2, is_normalized=True)
        ds.add_sample(Sample(id=f"img{i}", filepath=str(p), annotations=[gt]))
    return ds


A = BoxModel("v12", hit={"img0", "img1"})          # right on 0,1 wrong on 2,3
B = BoxModel("v23", hit={"img0", "img2", "img3"})  # right on 0,2,3 wrong on 1


def _two_models(tmp_path):
    ds = _ds(tmp_path)
    apply_model(ds, A)
    apply_model(ds, B)
    return ds


def test_runs_are_kept_per_model(tmp_path):
    ds = _two_models(tmp_path)
    assert [m["name"] for m in prediction_models(ds.samples)] == ["v12", "v23"]
    assert len(ds[0].predictions) == 2
    # re-running one model replaces only its own boxes
    apply_model(ds, A)
    s = ds[0]
    assert sorted(a.attributes["model"] for a in s.predictions) == ["v12", "v23"]
    assert set(s.fields["infer"]) == {"v12", "v23"}
    assert len({a.id for a in s.annotations}) == len(s.annotations)


def test_evaluate_per_model(tmp_path):
    ds = _two_models(tmp_path)
    with pytest.raises(ValueError):
        evaluate_detections(ds)  # ambiguous with two models
    ra = evaluate_detections(ds, model="v12")
    rb = evaluate_detections(ds, model="v23")
    assert ra["model"] == "v12"
    assert (ra["overall"]["tp"], ra["overall"]["fp"], ra["overall"]["fn"]) == (2, 2, 2)
    assert (rb["overall"]["tp"], rb["overall"]["fp"], rb["overall"]["fn"]) == (3, 1, 1)
    s2 = ds[2]
    assert s2.fields["eval"]["v12"] == {"tp": 0, "fp": 1, "fn": 1}
    assert s2.fields["eval"]["v23"] == {"tp": 1, "fp": 0, "fn": 0}
    assert s2.ground_truth[0].attributes["eval_models"] == {"v12": "fn", "v23": "tp"}
    # each prediction keeps the status from its own model's eval
    by_model = {a.attributes["model"]: a.attributes["eval"] for a in s2.predictions}
    assert by_model == {"v12": "fp", "v23": "tp"}
    assert sample_wrong(s2, "v12") is True and sample_wrong(s2, "v23") is False


def test_evaluate_models_and_clear_one(tmp_path):
    ds = _two_models(tmp_path)
    reports = evaluate_models(ds, iou=0.5)
    assert set(reports) == {"v12", "v23"}
    assert reports["v23"]["overall"]["recall"] == pytest.approx(0.75)
    removed = clear_predictions(ds.samples, "v12")
    assert removed == 4
    assert [m["name"] for m in prediction_models(ds.samples)] == ["v23"]
    assert "v12" not in ds[2].fields["eval"] and "v23" in ds[2].fields["eval"]
    assert ds[2].ground_truth[0].attributes["eval_models"] == {"v23": "tp"}
    # with one model left, model=None works again
    assert evaluate_detections(ds)["model"] == "v23"


def test_single_model_legacy_predictions_still_evaluate():
    ds = gv.Dataset(name="legacy")
    s = Sample(id="a", metadata={"width": 10, "height": 10}, annotations=[
        BboxAnnotation(label="cat", x=0, y=0, w=5, h=5),
        BboxAnnotation(label="cat", x=0, y=0, w=5, h=5, confidence=0.9, attributes={"kind": "prediction"}),
    ])
    s.fields["infer_ms"] = 1.0
    ds.add_sample(s)
    assert evaluate_detections(ds)["overall"]["tp"] == 1


def test_manifest_roundtrip_keeps_both_models(tmp_path):
    ds = _two_models(tmp_path)
    evaluate_models(ds)
    path = tmp_path / "ws.guava.json"
    ds.save(str(path))
    back = gv.load("guava", str(path))
    assert [m["name"] for m in prediction_models(back.samples)] == ["v12", "v23"]
    assert back.get("img1").fields["eval"]["v23"]["fp"] == 1


def _wait(c, job_id):
    for _ in range(200):
        job = c.get(f"/api/jobs/{job_id}").json()
        if job["status"] not in ("queued", "running"):
            return job
        time.sleep(0.05)
    return job


def test_compare_api(tmp_path, monkeypatch):
    import guava.models
    from guava.server.app import app, dataset_manager

    dataset_manager.set_dataset(_ds(tmp_path))
    c = TestClient(app)
    for m in (A, B):
        monkeypatch.setattr(guava.models, "load_model", lambda *a, _m=m, **k: _m)
        r = c.post("/api/models/run", json={"path": f"{m.name}.pt"}).json()
        job = _wait(c, r["job_id"])
        assert job["status"] == "done", job
        assert job["result"]["model_name"] == m.name

    info = c.get("/api/info").json()
    names = [m["name"] for m in info["pred_models"]]
    assert names == ["v12", "v23"]
    assert info["pred_models"][1]["eval"]["tp"] == 3

    cmp = c.get("/api/eval/compare?a=v12&b=v23").json()
    assert cmp["counts"] == {"a_wrong_b_right": 2, "b_wrong_a_right": 1, "both_wrong": 0, "both_right": 1}
    assert {r["name"]: r["eval"]["recall"] for r in cmp["models"]} == {"v12": 0.5, "v23": 0.75}

    page = c.get("/api/samples?cmp=a_wrong_b_right&cmp_a=v12&cmp_b=v23").json()
    assert sorted(s["id"] for s in page["samples"]) == ["img2", "img3"]
    page = c.get("/api/samples?cmp=b_wrong_a_right&cmp_a=v12&cmp_b=v23").json()
    assert [s["id"] for s in page["samples"]] == ["img1"]
    assert c.get("/api/samples?cmp=disagree&cmp_a=v12&cmp_b=v23").json()["total"] == 3

    # layer selection + per-model GT status
    s = c.get("/api/samples?search=img2&layers=v23&model=v12").json()["samples"][0]
    assert [p["model"] for p in s["predictions"]] == ["v23"]
    assert s["ground_truth"][0]["eval"] == "fn"
    assert s["eval_models"]["v23"] == {"tp": 1, "fp": 0, "fn": 0}
    assert c.get("/api/samples?search=img2&layers=").json()["samples"][0]["predictions"] == []

    # per-model issue filter
    assert c.get("/api/samples?filter_issue=eval_error&model=v12").json()["total"] == 2
    assert c.get("/api/samples?filter_issue=eval_error&model=v23").json()["total"] == 1

    # eval re-run for all models, report switch, clear one model
    r = c.post("/api/eval/run", json={"iou": 0.5}).json()
    assert {m["name"] for m in r["models"]} == {"v12", "v23"}
    assert c.get("/api/eval/report?model=v12").json()["report"]["model"] == "v12"
    assert c.post("/api/predictions/clear", json={"model": "v12"}).json()["removed"] == 4
    assert [m["name"] for m in c.get("/api/info").json()["pred_models"]] == ["v23"]