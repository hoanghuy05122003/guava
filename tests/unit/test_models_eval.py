"""Evaluation + offline model layer tests (no real weights needed)."""
import time

import pytest
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import Sample
from guava.eval import BACKGROUND, evaluate_detections
from guava.models import Detection, InferenceConfig, Model, Prediction, apply_model


def _box(label, x, y, w, h, conf=None, pred=False):
    attrs = {"kind": "prediction"} if pred else {}
    return BboxAnnotation(label=label, x=x, y=y, w=w, h=h, confidence=conf, attributes=attrs)


def _dataset():
    ds = gv.Dataset(name="syn")
    ds.add_sample(Sample(id="a", metadata={"width": 100, "height": 100}, annotations=[
        _box("cat", 0, 0, 10, 10),
        _box("cat", 50, 50, 10, 10),
        _box("cat", 0, 0, 10, 10, conf=0.9, pred=True),    # TP
        _box("cat", 52, 52, 10, 10, conf=0.8, pred=True),   # IoU 0.47 -> FP, GT -> FN
        _box("dog", 80, 80, 10, 10, conf=0.95, pred=True),  # FP (background)
    ]))
    ds[0].fields["infer_ms"] = 1.0
    return ds


def test_evaluate_detections_counts_and_ap():
    ds = _dataset()
    r = evaluate_detections(ds, iou=0.5)
    cat = next(c for c in r["classes"] if c["label"] == "cat")
    assert (cat["tp"], cat["fp"], cat["fn"]) == (1, 1, 1)
    assert cat["ap50"] == pytest.approx(0.5, abs=0.01)
    assert r["overall"]["fp"] == 2
    assert ds[0].fields["eval_fp"] == 2 and ds[0].fields["eval_fn"] == 1


def test_lower_iou_turns_shifted_box_into_tp():
    r = evaluate_detections(_dataset(), iou=0.4)
    cat = next(c for c in r["classes"] if c["label"] == "cat")
    assert (cat["tp"], cat["fp"], cat["fn"]) == (2, 0, 0)


def test_confusion_matrix_background():
    r = evaluate_detections(_dataset(), iou=0.5)
    labels = r["confusion"]["labels"]
    m = r["confusion"]["matrix"]
    assert m[labels.index(BACKGROUND)][labels.index("dog")] == 1
    assert m[labels.index("cat")][labels.index(BACKGROUND)] == 1


class FakeModel(Model):
    name = "fake"
    backend = "test"

    @property
    def class_names(self):
        return ["cat"]

    def predict(self, image_paths, cfg):
        return [Prediction(detections=[Detection("cat", 0.9, 0.1, 0.1, 0.2, 0.2)], image_size=(64, 48), infer_ms=1.5)
                for _ in image_paths]


def _image_dataset(tmp_path, n=3):
    from PIL import Image
    ds = gv.Dataset(name="imgs")
    for i in range(n):
        p = tmp_path / f"img{i}.jpg"
        Image.new("RGB", (64, 48)).save(p)
        ds.add_sample(Sample(id=f"s{i}", filepath=str(p), annotations=[_box("cat", 0.1, 0.1, 0.2, 0.2)]))
        ds[i].annotations[0].is_normalized = True
    return ds


def test_apply_model_writes_prediction_layer(tmp_path):
    ds = _image_dataset(tmp_path)
    summary = apply_model(ds, FakeModel(), InferenceConfig(batch=2))
    assert summary["processed"] == 3 and summary["detections"] == 3
    s = ds[0]
    assert len(s.predictions) == 1 and s.metadata.width == 64
    # re-running replaces instead of duplicating
    apply_model(ds, FakeModel())
    assert len(ds[0].predictions) == 1
    assert evaluate_detections(ds)["overall"]["mAP50"] == pytest.approx(1.0)


def test_manifest_roundtrip_keeps_predictions(tmp_path):
    ds = _image_dataset(tmp_path, n=1)
    apply_model(ds, FakeModel())
    path = tmp_path / "ws.guava.json"
    ds.save(str(path))
    back = gv.load("guava", str(path))
    assert len(back[0].predictions) == 1
    assert gv.detect_format(str(path)) == "guava"


def test_model_run_api(tmp_path, monkeypatch):
    import guava.models
    from guava.server.app import app, dataset_manager

    monkeypatch.setattr(guava.models, "load_model", lambda *a, **k: FakeModel())
    dataset_manager.set_dataset(_image_dataset(tmp_path))
    c = TestClient(app)
    r = c.post("/api/models/run", json={"path": "fake.pt", "conf": 0.3}).json()
    assert r["status"] == "ok"
    for _ in range(100):
        job = c.get(f"/api/jobs/{r['job_id']}").json()
        if job["status"] not in ("queued", "running"):
            break
        time.sleep(0.05)
    assert job["status"] == "done", job
    assert job["result"]["eval"]["tp"] == 3
    info = c.get("/api/info").json()
    assert info["inferred_count"] == 3 and info["has_eval"]
    page = c.get("/api/samples?filter_issue=eval_ok").json()
    assert page["total"] == 3
    assert c.get(page["samples"][0]["thumb_url"]).status_code == 200
    assert c.post("/api/predictions/clear", json={}).json()["removed"] == 3