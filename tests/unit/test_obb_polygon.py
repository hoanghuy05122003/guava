"""
YOLO OBB / segmentation polygon labels: loading, writing back, shape IoU in the evaluation.
"""
import os

import pytest
from PIL import Image
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.eval import evaluate_detections
from guava.eval.detection import shape_iou_matrix
from guava.io.yolo import format_label_line, parse_label_line
from guava.server.app import app, dataset_manager

OBB = "1 0.5 0.1 0.9 0.5 0.5 0.9 0.1 0.5"          # a diamond: 45° rotated square
POLY = "0 0.1 0.1 0.4 0.1 0.4 0.3 0.25 0.45 0.1 0.3"  # 5-point polygon


def test_parse_obb_polygon_and_box():
    o = parse_label_line(OBB, ["a", "b"], "o")
    assert o.label == "b" and o.attributes["shape"] == "obb" and len(o.attributes["points"]) == 4
    assert (o.x, o.y, o.w, o.h) == pytest.approx((0.1, 0.1, 0.8, 0.8))  # enclosing box
    p = parse_label_line(POLY, ["a", "b"], "p")
    assert p.attributes["shape"] == "polygon" and len(p.attributes["points"]) == 5
    b = parse_label_line("0 0.5 0.5 0.2 0.4", ["a"], "b")
    assert "points" not in b.attributes and (b.x, b.y) == pytest.approx((0.4, 0.3))
    assert parse_label_line("0 0.5 0.5", ["a"], "x") is None


def test_format_round_trip():
    for line in (OBB, POLY):
        ann = parse_label_line(line, ["a", "b"], "x")
        out = format_label_line(ann, int(line.split()[0]), 100, 100)
        assert [float(v) for v in out.split()] == pytest.approx([float(v) for v in line.split()])
    box = parse_label_line("0 0.5 0.5 0.2 0.4", ["a"], "b")
    assert format_label_line(box, 0, 1, 1, as_obb=True).split()[1:] == ["0.400000", "0.300000", "0.600000", "0.300000",
                                                                         "0.600000", "0.700000", "0.400000", "0.700000"]


def test_rotated_iou_is_not_the_envelope_iou():
    s = gv.Sample(id="s", filepath="")
    diamond = parse_label_line(OBB, ["a", "b"], "o")
    square = BboxAnnotation(label="b", x=0.1, y=0.1, w=0.8, h=0.8, is_normalized=True)  # the diamond's envelope
    iou = shape_iou_matrix([diamond], [square], s)[0, 0]
    assert iou == pytest.approx(0.5, abs=1e-6)  # diamond area 0.32 / square area 0.64
    same = shape_iou_matrix([diamond], [parse_label_line(OBB, ["a", "b"], "o2")], s)[0, 0]
    assert same == pytest.approx(1.0)


def test_eval_uses_shape_iou():
    ds = gv.Dataset(name="t")
    s = gv.Sample(id="s", filepath="")
    s.add_annotation(parse_label_line(OBB, ["a", "b"], "gt"))
    pred = BboxAnnotation(label="b", x=0.1, y=0.1, w=0.8, h=0.8, is_normalized=True, confidence=0.9,
                          attributes={"kind": "prediction", "model": "m"})
    s.add_annotation(pred)
    s.fields["infer_ms"] = 1.0
    ds.add_sample(s)
    # envelope IoU would be 1.0 (TP); the real overlap is 0.5 -> FP at IoU 0.7
    assert evaluate_detections(ds, iou=0.7, model="m")["overall"]["fp"] == 1
    assert evaluate_detections(ds, iou=0.45, model="m")["overall"]["tp"] == 1


@pytest.fixture
def obb_dir(tmp_path, monkeypatch):
    monkeypatch.setenv("USERPROFILE", str(tmp_path / "home"))
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    (tmp_path / "images" / "train").mkdir(parents=True)
    (tmp_path / "labels" / "train").mkdir(parents=True)
    Image.new("RGB", (100, 100)).save(tmp_path / "images" / "train" / "a.jpg")
    (tmp_path / "labels" / "train" / "a.txt").write_text(OBB + "\n", encoding="utf-8")
    (tmp_path / "data.yaml").write_text("names:\n  0: dent\n  1: scratch\n", encoding="utf-8")
    return tmp_path


def test_loader_finds_data_yaml_in_a_parent_folder(obb_dir):
    ds = gv.load("yolo", str(obb_dir / "images"))
    assert ds.schema.class_names == ["dent", "scratch"]


def test_edit_and_save_keeps_obb(obb_dir):
    ds = gv.load("yolo", str(obb_dir))
    dataset_manager.set_dataset(ds, path=str(obb_dir))
    client = TestClient(app)
    info = client.get("/api/info").json()
    assert info["label_shape"] == "obb"
    s = client.get("/api/samples").json()["samples"][0]
    g = s["ground_truth"][0]
    assert g["shape"] == "obb" and len(g["points"]) == 4
    moved = [[x + 0.05, y] for x, y in g["points"]]  # move the rotated box right
    boxes = [{"id": g["id"], "label": "scratch", "bbox": [0, 0, 0, 0], "points": moved, "shape": "obb"},
             {"label": "dent", "bbox": [0.0, 0.0, 0.1, 0.1]}]  # a new plain box in an OBB dataset
    r = client.post("/api/annotations/set", json={"sample_id": s["id"], "boxes": boxes}).json()
    assert r["sample"]["ground_truth"][0]["bounding_box"][0] == pytest.approx(0.15)
    assert client.post("/api/labels/save", json={}).json()["written"] == 1
    lines = (obb_dir / "labels" / "train" / "a.txt").read_text(encoding="utf-8").splitlines()
    assert [len(l.split()) for l in lines] == [9, 9]  # both written as OBB
    assert float(lines[0].split()[1]) == pytest.approx(0.55)
