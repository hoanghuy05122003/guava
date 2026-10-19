"""QC decision support: image-level escape / overkill, curves, thresholds, bootstrap CI, box-level A/B."""
import time

import pytest
from starlette.testclient import TestClient

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import Sample
from guava.eval import evaluate_models
from guava.eval.qc import (
    bootstrap_ci,
    box_compare_counts,
    class_curve,
    collect,
    default_critical,
    gt_box_status,
    image_qc,
    qc_report,
    recommend_threshold,
    sample_box_compare,
)
from guava.models import Detection, Model, Prediction, apply_model

TL, BR = (0.1, 0.1), (0.5, 0.5)  # box positions, all boxes are 0.2 x 0.2
GT = {"img0": [("Defect", TL)], "img1": [("Defect", TL)], "img2": [("Bolt", BR)], "img3": [("Bolt", BR)],
      "img4": [("Scratch", TL)]}


class ScriptModel(Model):
    """Returns scripted detections per image stem: {stem: [(label, conf, (x, y))]}."""
    backend = "test"

    def __init__(self, name, script):
        self.name = name
        self.script = script

    @property
    def class_names(self):
        return ["Defect", "Bolt", "Scratch"]

    def predict(self, image_paths, cfg):
        out = []
        for p in image_paths:
            stem = p.replace("\\", "/").rsplit("/", 1)[-1].split(".")[0]
            dets = [Detection(lb, c, x, y, 0.2, 0.2) for lb, c, (x, y) in self.script.get(stem, [])]
            out.append(Prediction(detections=dets, image_size=(64, 48), infer_ms=1.0))
        return out


A = ScriptModel("v12", {
    "img0": [("Defect", 0.9, TL)],
    "img1": [("Defect", 0.3, TL)],                          # found, low confidence
    "img2": [("Bolt", 0.8, BR)],
    "img3": [("Bolt", 0.8, BR), ("Defect", 0.5, (0.7, 0.1))],  # false defect -> overkill
    # img4: scratch missed -> escape
})
B = ScriptModel("v23", {
    "img0": [("Defect", 0.95, TL)],
    # img1: defect missed -> escape
    "img2": [("Defect", 0.6, BR)],                          # bolt called a defect -> overkill + class diff
    "img3": [("Bolt", 0.7, BR)],
    "img4": [("Scratch", 0.8, TL)],
})


def _ds(tmp_path):
    from PIL import Image
    ds = gv.Dataset(name="qc")
    for sid, gts in GT.items():
        p = tmp_path / f"{sid}.jpg"
        Image.new("RGB", (64, 48)).save(p)
        anns = [BboxAnnotation(label=lb, x=x, y=y, w=0.2, h=0.2, is_normalized=True) for lb, (x, y) in gts]
        ds.add_sample(Sample(id=sid, filepath=str(p), annotations=anns))
    return ds


def _two(tmp_path):
    ds = _ds(tmp_path)
    apply_model(ds, A)
    apply_model(ds, B)
    return ds


def test_default_critical_names():
    labels = ["Line", "Defect", "Tube", "Bolt", "housing", "NG_part", "scratch", "Crack-big"]
    assert default_critical(labels) == ["Defect", "NG_part", "scratch", "Crack-big"]


def test_image_escape_and_overkill(tmp_path):
    ds = _two(tmp_path)
    crit = ["Defect", "Scratch"]
    ra = image_qc(collect(ds, "v12"), crit)
    assert (ra["ng"], ra["ok"], ra["escaped"], ra["overkill"]) == (3, 2, 1, 1)
    assert ra["escape_rate"] == pytest.approx(1 / 3, abs=1e-4) and ra["overkill_rate"] == 0.5
    assert ra["escaped_ids"] == ["img4"] and ra["overkill_ids"] == ["img3"]
    rb = image_qc(collect(ds, "v23"), crit)
    assert rb["escaped_ids"] == ["img1"] and rb["overkill_ids"] == ["img2"]

    # raising the Defect threshold trades overkill for escape
    hi = image_qc(collect(ds, "v12"), crit, thresholds={"Defect": 0.6})
    assert hi["escaped_ids"] == ["img1", "img4"] and hi["overkill"] == 0
    by_cls = {c["label"]: c for c in hi["classes"]}
    assert by_cls["Defect"] == {"label": "Defect", "images": 2, "escaped": 1, "objects": 2, "missed": 1, "escape_rate": 0.5}

    # severity: escaping a Defect (w=5) costs more than a Scratch (w=1)
    w = {"Defect": 5, "Scratch": 1}
    assert image_qc(collect(ds, "v12"), crit, weights=w)["weighted_escape_rate"] == pytest.approx(1 / 11, abs=1e-4)
    assert image_qc(collect(ds, "v23"), crit, weights=w)["weighted_escape_rate"] == pytest.approx(5 / 11, abs=1e-4)


def test_curve_and_recommended_threshold(tmp_path):
    ds = _two(tmp_path)
    recs = collect(ds, "v12")
    cv = class_curve(recs, "Defect")
    assert cv["conf"] == [0.9, 0.5, 0.3]
    assert cv["recall"] == [0.5, 0.5, 1.0]
    assert cv["precision"] == [1.0, 0.5, 0.6667]
    assert cv["best_f1"]["conf"] == 0.3 and cv["n_gt"] == 2 and cv["n_pred"] == 3

    r = recommend_threshold(recs, "Defect", 0.99)
    assert r == {"conf": 0.3, "reachable": True, "recall": 1.0, "precision": 0.6667}
    assert recommend_threshold(recs, "Defect", 0.5)["conf"] == 0.9
    # scratch was never predicted by v12: no threshold reaches any recall
    assert recommend_threshold(recs, "Scratch", 0.9)["reachable"] is False


def test_qc_report_sample_sizes_and_recommendation(tmp_path):
    ds = _two(tmp_path)
    rep = qc_report(ds, "v12", target_recall=0.5, n_boot=50)
    assert rep["image"]["critical"] == ["Defect", "Scratch"]
    cls = {c["label"]: c for c in rep["classes"]}
    assert (cls["Defect"]["n_images"], cls["Defect"]["n_gt"]) == (2, 2)
    assert cls["Bolt"]["critical"] is False
    assert rep["recommended"] == {"Defect": 0.9}
    # at 0.9 the false defect on img3 is gone but img1 escapes
    assert cls["Defect"]["recommended"]["overkill_rate"] == 0.0
    assert rep["at_recommended"]["escaped_ids"] == ["img1", "img4"]
    assert rep["ci"]["images"] == 5


def test_bootstrap_ci(tmp_path):
    ds = _two(tmp_path)
    recs = collect(ds, "v12")
    ci = bootstrap_ci(recs, n_boot=200, seed=1)
    assert ci == bootstrap_ci(recs, n_boot=200, seed=1)  # deterministic
    rep = evaluate_models(ds)["v12"]["overall"]
    assert ci["recall"]["lo"] <= rep["recall"] <= ci["recall"]["hi"]
    assert ci["mAP50"]["lo"] <= rep["mAP50"] <= ci["mAP50"]["hi"]
    assert ci["mAP50"]["lo"] < ci["mAP50"]["hi"]

    # a perfect model has no uncertainty
    perfect = ScriptModel("p", {s: [(lb, 0.9, xy) for lb, xy in g] for s, g in GT.items()})
    ds2 = _ds(tmp_path)
    apply_model(ds2, perfect)
    ci2 = bootstrap_ci(collect(ds2, "p"), n_boot=100)
    assert ci2["mAP50"] == {"lo": 1.0, "hi": 1.0} and ci2["recall"] == {"lo": 1.0, "hi": 1.0}
    assert bootstrap_ci([], n_boot=10)["mAP50"] is None


def test_box_level_compare(tmp_path):
    ds = _two(tmp_path)
    assert gt_box_status(ds.get("img2"), "v23") == [("wrong_class", "Defect")]
    assert gt_box_status(ds.get("img1"), "v23") == [("missed", None)]
    crit = ["Defect", "Scratch"]
    assert sample_box_compare(ds.get("img1"), "v12", "v23", crit) == {"only_a_found", "b_missed_critical"}
    assert sample_box_compare(ds.get("img2"), "v12", "v23", crit) == {"only_a_found", "class_diff"}
    assert sample_box_compare(ds.get("img4"), "v12", "v23", crit) == {"only_b_found", "a_missed_critical"}
    assert sample_box_compare(ds.get("img0"), "v12", "v23", crit) == set()
    counts = box_compare_counts(ds.samples, "v12", "v23", crit)
    assert counts == {"only_a_found": 2, "only_b_found": 1, "class_diff": 1, "a_missed_critical": 1, "b_missed_critical": 1}
    # a min conf hides the low-confidence defect of v12 on img1
    assert sample_box_compare(ds.get("img1"), "v12", "v23", crit, conf_a=0.5) == set()


def _wait(c, job_id):
    for _ in range(200):
        job = c.get(f"/api/jobs/{job_id}").json()
        if job["status"] not in ("queued", "running"):
            return job
        time.sleep(0.05)
    return job


def test_qc_api_and_box_filters(tmp_path, monkeypatch):
    import guava.models
    from guava.server import model_routes
    from guava.server.app import app, dataset_manager

    monkeypatch.setitem(model_routes.qc_state, "critical", None)
    monkeypatch.setitem(model_routes.qc_state, "thresholds", {})
    monkeypatch.setitem(model_routes.qc_state, "weights", {})
    monkeypatch.setitem(model_routes.qc_state, "target_recall", 0.99)
    dataset_manager.set_dataset(_ds(tmp_path))
    c = TestClient(app)
    for m in (A, B):
        monkeypatch.setattr(guava.models, "load_model", lambda *a, _m=m, **k: _m)
        job = _wait(c, c.post("/api/models/run", json={"path": f"{m.name}.pt"}).json()["job_id"])
        assert job["status"] == "done", job

    r = c.get("/api/eval/qc?a=v12&b=v23").json()
    assert r["config"]["critical"] == ["Defect", "Scratch"] and r["config"]["auto_critical"] is True
    assert set(r["models"]) == {"v12", "v23"}
    assert r["models"]["v23"]["image"]["escaped_ids"] == ["img1"]
    assert r["box_counts"]["a_missed_critical"] == 1

    r = c.post("/api/eval/qc", json={"critical": ["Defect"], "weights": {"Defect": 3},
                                     "thresholds": {"v12": {"Defect": 0.6}}, "target_recall": 0.5, "n_boot": 20}).json()
    a = r["models"]["v12"]
    assert a["image"]["critical"] == ["Defect"] and a["image"]["escaped_ids"] == ["img1"]
    assert a["image"]["thresholds"] == {"Defect": 0.6}
    assert a["target_recall"] == 0.5

    # box-level filters go through the normal sample query; critical = Defect only now
    page = c.get("/api/samples?cmp=b_missed_critical&cmp_a=v12&cmp_b=v23").json()
    assert [s["id"] for s in page["samples"]] == ["img1"]
    assert c.get("/api/samples?cmp=a_missed_critical&cmp_a=v12&cmp_b=v23").json()["total"] == 0
    assert c.get("/api/samples?cmp=only_b_found&cmp_a=v12&cmp_b=v23").json()["total"] == 1
    assert c.get("/api/samples?cmp=class_diff&cmp_a=v12&cmp_b=v23").json()["total"] == 1
    # image-level QC filters use the model's thresholds (v12: Defect >= 0.6 -> low-conf defect on img1 escapes)
    assert [s["id"] for s in c.get("/api/samples?filter_issue=qc_escape&model=v12").json()["samples"]] == ["img1"]
    assert [s["id"] for s in c.get("/api/samples?filter_issue=qc_overkill&model=v23").json()["samples"]] == ["img2"]
    assert c.get("/api/samples?filter_issue=qc_overkill&model=v12").json()["total"] == 0
    # back to auto critical classes
    assert c.post("/api/eval/qc", json={"critical": None, "n_boot": 0}).json()["config"]["critical"] == ["Defect", "Scratch"]