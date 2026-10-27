"""
Label editing API: replace a sample's ground truth, refresh its eval, write YOLO labels back.
"""
import os

import pytest
from PIL import Image
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.server.app import app, dataset_manager


@pytest.fixture
def yolo_dir(tmp_path, monkeypatch):
    monkeypatch.setenv("USERPROFILE", str(tmp_path / "home"))
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    img_dir, lbl_dir = tmp_path / "images" / "val", tmp_path / "labels" / "val"
    img_dir.mkdir(parents=True)
    lbl_dir.mkdir(parents=True)
    Image.new("RGB", (100, 50)).save(img_dir / "a.jpg")
    (lbl_dir / "a.txt").write_text("0 0.5 0.5 0.2 0.2\n", encoding="utf-8")
    (tmp_path / "classes.txt").write_text("cat\ndog\n", encoding="utf-8")
    return tmp_path


@pytest.fixture
def client(yolo_dir):
    ds = gv.load("yolo", str(yolo_dir))
    dataset_manager.set_dataset(ds, path=str(yolo_dir))
    return TestClient(app)


def _pred(label, x, y, w, h, model="m1"):
    return BboxAnnotation(label=label, x=x, y=y, w=w, h=h, is_normalized=True, confidence=0.9,
                          attributes={"kind": "prediction", "model": model})


def test_set_ground_truth_reevaluates_and_saves(client, yolo_dir):
    s = dataset_manager.dataset.get("a")
    assert s.fields["label_path"].endswith(os.path.join("labels", "val", "a.txt"))
    s.add_annotation(_pred("dog", 0.1, 0.1, 0.2, 0.2))
    s.fields["infer_ms"] = 1.0
    r = client.post("/api/eval/run", json={})
    assert r.json()["report"]["overall"]["fp"] == 1

    gt_id = s.ground_truth[0].id
    boxes = [
        {"id": gt_id, "label": "cat", "bbox": [0.4, 0.4, 0.2, 0.2]},
        {"id": "new_x", "label": "dog", "bbox": [0.1, 0.1, 0.2, 0.2]},   # accept the prediction
    ]
    r = client.post("/api/annotations/set", json={"sample_id": "a", "boxes": boxes, "model": "m1"})
    data = r.json()
    assert data["status"] == "ok" and data["dirty_count"] == 1 and data["eval_stale"] is True
    preds = data["sample"]["predictions"]
    assert preds[0]["eval"] == "tp"  # the image's eval was refreshed right away
    assert {g["label"] for g in data["sample"]["ground_truth"]} == {"cat", "dog"}
    assert any(g["eval_by"].get("m1") == "fn" for g in data["sample"]["ground_truth"])  # cat is missed

    r = client.post("/api/labels/save", json={})
    assert r.json()["written"] == 1
    lines = (yolo_dir / "labels" / "val" / "a.txt").read_text(encoding="utf-8").splitlines()
    assert sorted(lines) == ["0 0.500000 0.500000 0.200000 0.200000", "1 0.200000 0.200000 0.200000 0.200000"]
    backup = r.json()["backup"]
    assert any(f == "a.txt" for _, _, files in os.walk(backup) for f in files)
    assert client.get("/api/info").json()["dirty_count"] == 0


def test_new_class_is_appended_to_classes_txt(client, yolo_dir):
    r = client.post("/api/annotations/set", json={"sample_id": "a", "boxes": [{"label": "bird", "bbox": [0, 0, 0.5, 0.5]}]})
    assert r.json()["status"] == "ok"
    r = client.post("/api/labels/save", json={})
    assert r.json()["status"] == "ok"
    assert (yolo_dir / "classes.txt").read_text(encoding="utf-8").split() == ["cat", "dog", "bird"]
    assert (yolo_dir / "labels" / "val" / "a.txt").read_text(encoding="utf-8").startswith("2 0.250000 0.250000")


def test_invalid_boxes_are_dropped_and_clamped(client):
    boxes = [{"label": "cat", "bbox": [0.9, 0.9, 0.5, 0.5]}, {"label": "cat", "bbox": [0.2, 0.2, 0, 0.1]}, {"label": "", "bbox": [0, 0, 1, 1]}]
    data = client.post("/api/annotations/set", json={"sample_id": "a", "boxes": boxes}).json()
    gts = data["sample"]["ground_truth"]
    assert len(gts) == 1
    x, y, w, h = gts[0]["bounding_box"]
    assert x + w <= 1.0 + 1e-9 and y + h <= 1.0 + 1e-9
