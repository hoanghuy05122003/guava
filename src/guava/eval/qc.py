"""
QC decision support on top of per-model detection eval.

Plant engineers decide per image: reject (NG) or pass (OK). This module turns
box predictions into that decision and reports what it costs:
  - escape rate   = NG images (GT has a critical class) that the model passed
  - overkill rate = OK images (no critical GT) that the model rejected
An image is rejected when the model predicts any critical class with
confidence >= that class's threshold.

Also: per-class PR / F1-vs-confidence curves, a recommended per-class threshold
for a target recall, bootstrap 95% CIs for mAP50 / recall, and box-level A/B
comparison (which GT objects one model found and the other did not).

Read-only: nothing is written back to samples, so it can run next to
evaluate_detections without interfering with its results.
"""
from __future__ import annotations

import re
import warnings
from collections import defaultdict
from dataclasses import dataclass
from typing import Any

import numpy as np

from guava.core.dataset import Dataset
from guava.core.sample import Sample
from guava.eval.detection import _greedy_match, shape_iou_matrix, split_annotations
from guava.models.apply import sample_ran

# classes treated as critical by default: "defect", "scratch", "crack", ... anywhere, "NG" as its own token
CRITICAL_PATTERN = re.compile(r"defect|scratch|crack|dent|burr|damage|(?<![a-z])ng(?![a-z])", re.IGNORECASE)

BOX_COMPARE_MODES = ("only_a_found", "only_b_found", "class_diff", "a_missed_critical", "b_missed_critical")


def default_critical(labels: list[str]) -> list[str]:
    return [lb for lb in labels if CRITICAL_PATTERN.search(lb)]


@dataclass
class ImageRecord:
    """Everything QC needs from one image for one model (matched once, without a conf cut)."""
    sample_id: str
    gt_labels: list[str]
    pred_labels: list[str]
    pred_conf: np.ndarray
    pred_tp: np.ndarray        # TP at the chosen IoU (class-wise greedy, highest conf first)
    pred_tp50: np.ndarray      # TP at IoU 0.5 (for mAP50)
    gt_found_conf: np.ndarray  # conf of the pred matching each GT at the chosen IoU (-1 = missed)


def _match_inputs(sample: Sample, model: str | None, conf: float = 0.0):
    gts, preds = split_annotations(sample, model)
    preds = [p for p in preds if (p.confidence or 0.0) >= conf]
    pconf = np.array([p.confidence or 0.0 for p in preds], dtype=np.float64)
    order = np.argsort(-pconf, kind="stable")
    ious = shape_iou_matrix(preds, gts, sample)
    same = np.array([[p.label == g.label for g in gts] for p in preds], dtype=bool).reshape(len(preds), len(gts))
    return gts, preds, pconf, order, ious, same


def _match(sample: Sample, model: str | None, iou: float) -> ImageRecord:
    gts, preds, conf, order, ious, same = _match_inputs(sample, model)
    m = _greedy_match(ious, order, same, iou)
    m50 = m if iou == 0.5 else _greedy_match(ious, order, same, 0.5)
    found = np.full(len(gts), -1.0)
    for i, g in enumerate(m):
        if g >= 0:
            found[g] = conf[i]
    return ImageRecord(
        sample_id=sample.id,
        gt_labels=[g.label for g in gts],
        pred_labels=[p.label for p in preds],
        pred_conf=conf,
        pred_tp=m >= 0,
        pred_tp50=m50 >= 0,
        gt_found_conf=found,
    )


def collect(dataset: Dataset, model: str | None, iou: float = 0.5, samples: list[Sample] | None = None) -> list[ImageRecord]:
    """Match every image the model ran on (images without a run are skipped)."""
    pool = samples if samples is not None else dataset.samples
    return [_match(s, model, iou) for s in pool if sample_ran(s, model)]


def _labels(records: list[ImageRecord]) -> list[str]:
    out: set[str] = set()
    for r in records:
        out.update(r.gt_labels)
        out.update(r.pred_labels)
    return sorted(out)


def _rate(a: float, b: float) -> float | None:
    return round(a / b, 4) if b else None


# ── image-level OK / NG ─────────────────────────────────────


def _flagged(r: ImageRecord, critical: set[str], thresholds: dict[str, float], default_thr: float) -> bool:
    return any(lb in critical and c >= thresholds.get(lb, default_thr) for lb, c in zip(r.pred_labels, r.pred_conf))


def image_qc(
    records: list[ImageRecord],
    critical: list[str],
    thresholds: dict[str, float] | None = None,
    weights: dict[str, float] | None = None,
    default_thr: float = 0.0,
) -> dict[str, Any]:
    """Escape / overkill at the image level for the given critical classes and thresholds.

    Weighted escape: each NG image weighs as much as its most severe critical GT
    class (default weight 1), so escaping a heavy defect costs more.
    """
    crit = set(critical)
    thresholds = thresholds or {}
    weights = weights or {}
    ng = ok = escaped = overkill = 0
    w_ng = w_escaped = 0.0
    per_class = {c: {"images": 0, "escaped": 0, "objects": 0, "missed": 0} for c in critical}
    escaped_ids, overkill_ids = [], []
    for r in records:
        gt_crit = [lb for lb in r.gt_labels if lb in crit]
        flagged = _flagged(r, crit, thresholds, default_thr)
        if not gt_crit:
            ok += 1
            if flagged:
                overkill += 1
                overkill_ids.append(r.sample_id)
            continue
        ng += 1
        w = max(float(weights.get(lb, 1.0)) for lb in gt_crit)
        w_ng += w
        if not flagged:
            escaped += 1
            w_escaped += w
            escaped_ids.append(r.sample_id)
        for lb in set(gt_crit):
            per_class[lb]["images"] += 1
            per_class[lb]["escaped"] += 0 if flagged else 1
        for j, lb in enumerate(r.gt_labels):
            if lb in crit:
                per_class[lb]["objects"] += 1
                fc = r.gt_found_conf[j]
                if fc < 0 or fc < thresholds.get(lb, default_thr):
                    per_class[lb]["missed"] += 1
    return {
        "critical": list(critical),
        "thresholds": {c: float(thresholds.get(c, default_thr)) for c in critical},
        "images": len(records), "ng": ng, "ok": ok,
        "escaped": escaped, "overkill": overkill,
        "escape_rate": _rate(escaped, ng), "overkill_rate": _rate(overkill, ok),
        "weighted_escape_rate": round(w_escaped / w_ng, 4) if w_ng else None,
        "classes": [{"label": c, **v, "escape_rate": _rate(v["escaped"], v["images"])} for c, v in per_class.items()],
        "escaped_ids": escaped_ids, "overkill_ids": overkill_ids,
    }


# ── per-class PR / F1 curves and thresholds ─────────────────


def _curve_arrays(records: list[ImageRecord], label: str):
    """(thresholds descending, precision, recall, n_gt, n_pred), one point per distinct confidence.

    Greedy matching goes highest confidence first, so raising the threshold only
    drops the lowest predictions and the TP flags of the rest do not change:
    one match without a conf cut gives the whole curve.
    """
    confs, tps = [], []
    n_gt = 0
    for r in records:
        n_gt += r.gt_labels.count(label)
        for i, lb in enumerate(r.pred_labels):
            if lb == label:
                confs.append(r.pred_conf[i])
                tps.append(r.pred_tp[i])
    confs_a = np.array(confs, dtype=np.float64)
    tps_a = np.array(tps, dtype=bool)
    order = np.argsort(-confs_a, kind="stable")
    c = confs_a[order]
    tp = np.cumsum(tps_a[order])
    fp = np.cumsum(~tps_a[order])
    if len(c):
        # last index of each run of equal confidences: threshold = that conf keeps all of them
        last = np.r_[np.nonzero(np.diff(c))[0], len(c) - 1]
        c, tp, fp = c[last], tp[last], fp[last]
    recall = tp / n_gt if n_gt else np.zeros(len(tp))
    precision = tp / np.maximum(tp + fp, 1)
    return c, precision, recall, n_gt, len(confs)


def _downsample(n: int, max_points: int) -> np.ndarray:
    if n <= max_points:
        return np.arange(n)
    return np.unique(np.linspace(0, n - 1, max_points).round().astype(int))


def class_curve(records: list[ImageRecord], label: str, max_points: int = 200) -> dict[str, Any]:
    """PR curve and P / R / F1 as a function of the confidence threshold (conf descending)."""
    c, precision, recall, n_gt, n_pred = _curve_arrays(records, label)
    f1 = np.where(precision + recall > 0, 2 * precision * recall / np.maximum(precision + recall, 1e-12), 0.0)
    keep = _downsample(len(c), max_points)
    best = int(np.argmax(f1)) if len(f1) else None

    def r4(a: np.ndarray) -> list[float]:
        return [round(float(x), 4) for x in a]

    return {
        "label": label, "n_gt": n_gt, "n_pred": n_pred,
        "conf": r4(c[keep]), "precision": r4(precision[keep]), "recall": r4(recall[keep]), "f1": r4(f1[keep]),
        "best_f1": None if best is None else {
            "conf": round(float(c[best]), 4), "f1": round(float(f1[best]), 4),
            "precision": round(float(precision[best]), 4), "recall": round(float(recall[best]), 4)},
        "max_recall": round(float(recall[-1]), 4) if len(recall) else 0.0,
    }


def recommend_threshold(records: list[ImageRecord], label: str, target_recall: float) -> dict[str, Any]:
    """Highest confidence threshold whose box recall for `label` still reaches `target_recall`.

    If the target is out of reach the lowest threshold (= most recall) is returned
    with reachable=False.
    """
    c, precision, recall, n_gt, _ = _curve_arrays(records, label)
    if n_gt == 0 or len(c) == 0:
        return {"conf": None, "reachable": False, "recall": 0.0 if n_gt else None, "precision": None}
    hits = np.nonzero(recall >= target_recall - 1e-9)[0]
    i = int(hits[0]) if len(hits) else len(c) - 1  # descending conf: first hit = highest threshold
    return {"conf": round(float(c[i]), 4), "reachable": bool(len(hits)),
            "recall": round(float(recall[i]), 4), "precision": round(float(precision[i]), 4)}


# ── bootstrap CIs ───────────────────────────────────────────


def _weighted_ap(w: np.ndarray, tp_flags: np.ndarray, n_gt: float, grid: np.ndarray) -> float:
    """COCO 101-point AP where each prediction counts `w` times (w = its image's bootstrap weight)."""
    keep = w > 0
    if not keep.any():
        return 0.0
    w, t = w[keep], tp_flags[keep]
    tp = np.cumsum(w * t)
    fp = np.cumsum(w * ~t)
    rec = tp / n_gt
    prec = np.maximum.accumulate((tp / np.maximum(tp + fp, 1e-12))[::-1])[::-1]
    idx = np.searchsorted(rec, grid, side="left")
    return float(np.where(idx < len(prec), prec[np.minimum(idx, len(prec) - 1)], 0.0).mean())


def bootstrap_ci(records: list[ImageRecord], n_boot: int = 500, seed: int = 0, conf: float = 0.0,
                 alpha: float = 0.05) -> dict[str, Any]:
    """Image-level bootstrap (resample images with replacement) for mAP50 and recall.

    Each replicate is a vector of integer image weights, so predictions are sorted
    once per class and AP is a weighted cumulative sum.
    """
    n = len(records)
    out: dict[str, Any] = {"n_boot": n_boot, "images": n, "mAP50": None, "recall": None}
    labels = sorted({lb for r in records for lb in r.gt_labels})
    if n == 0 or n_boot <= 0 or not labels:
        return out
    rng = np.random.default_rng(seed)
    W = rng.multinomial(n, np.full(n, 1.0 / n), size=n_boot).astype(np.float64)  # [B, n]
    li = {lb: k for k, lb in enumerate(labels)}
    gt_counts = np.zeros((n, len(labels)))
    p_img, p_cls, p_conf, p_tp50, p_tp = [], [], [], [], []
    for i, r in enumerate(records):
        for lb in r.gt_labels:
            gt_counts[i, li[lb]] += 1
        for k, lb in enumerate(r.pred_labels):
            if lb in li:  # predictions of classes without GT don't enter mAP (same as eval)
                p_img.append(i)
                p_cls.append(li[lb])
                p_conf.append(r.pred_conf[k])
                p_tp50.append(r.pred_tp50[k])
                p_tp.append(r.pred_tp[k])
    p_img_a = np.array(p_img, dtype=int)
    p_cls_a = np.array(p_cls, dtype=int)
    p_conf_a = np.array(p_conf, dtype=np.float64)
    p_tp50_a = np.array(p_tp50, dtype=bool)
    p_tp_a = np.array(p_tp, dtype=bool)
    ngt = W @ gt_counts  # [B, C]

    grid = np.linspace(0, 1, 101)
    aps = np.full((n_boot, len(labels)), np.nan)
    for k in range(len(labels)):
        sel = np.nonzero(p_cls_a == k)[0]
        sel = sel[np.argsort(-p_conf_a[sel], kind="stable")]
        for b in range(n_boot):
            if ngt[b, k] > 0:
                aps[b, k] = _weighted_ap(W[b, p_img_a[sel]], p_tp50_a[sel], ngt[b, k], grid) if len(sel) else 0.0
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", RuntimeWarning)  # replicate without any GT -> nan
        maps = np.nanmean(aps, axis=1)
    hit = (p_conf_a >= conf) & p_tp_a
    tp_img = np.bincount(p_img_a[hit], minlength=n).astype(np.float64)
    recalls = (W @ tp_img) / np.maximum(ngt.sum(axis=1), 1e-12)

    def ci(v: np.ndarray) -> dict[str, float] | None:
        v = v[np.isfinite(v)]
        if not len(v):
            return None
        lo, hi = np.quantile(v, [alpha / 2, 1 - alpha / 2])
        return {"lo": round(float(lo), 4), "hi": round(float(hi), 4)}

    out["mAP50"] = ci(maps)
    out["recall"] = ci(recalls)
    return out


# ── full per-model QC report ────────────────────────────────


def qc_report(
    dataset: Dataset,
    model: str | None,
    critical: list[str] | None = None,
    weights: dict[str, float] | None = None,
    thresholds: dict[str, float] | None = None,
    target_recall: float = 0.99,
    iou: float = 0.5,
    conf: float = 0.0,
    n_boot: int = 500,
    samples: list[Sample] | None = None,
    seed: int = 0,
) -> dict[str, Any]:
    """Image-level OK/NG, per-class curves + recommended thresholds, sample sizes, bootstrap CIs.

    `conf` is the threshold for classes not in `thresholds` (= the eval's min conf).
    """
    records = collect(dataset, model, iou, samples)
    labels = _labels(records)
    crit = list(critical) if critical is not None else default_critical(labels)
    thresholds = dict(thresholds or {})

    img_count: dict[str, int] = defaultdict(int)
    for r in records:
        for lb in set(r.gt_labels):
            img_count[lb] += 1
    classes = []
    recommended: dict[str, float] = {}
    for lb in labels:
        rec = recommend_threshold(records, lb, target_recall)
        if lb in crit and rec["conf"] is not None:
            recommended[lb] = rec["conf"]
            # image-level effect of moving only this class to its recommended threshold
            solo = image_qc(records, crit, {**thresholds, lb: rec["conf"]}, weights, default_thr=conf)
            rec["overkill_rate"], rec["escape_rate"] = solo["overkill_rate"], solo["escape_rate"]
        classes.append({**class_curve(records, lb), "critical": lb in crit, "n_images": img_count[lb], "recommended": rec})
    return {
        "model": model, "iou": iou, "conf": conf, "target_recall": target_recall,
        "image": image_qc(records, crit, thresholds, weights, default_thr=conf),
        "at_recommended": image_qc(records, crit, {**thresholds, **recommended}, weights, default_thr=conf),
        "recommended": recommended,
        "classes": classes,
        "ci": bootstrap_ci(records, n_boot=n_boot, seed=seed, conf=conf),
    }


# ── box-level A/B comparison ────────────────────────────────


def gt_box_status(sample: Sample, model: str | None, iou: float = 0.5, conf: float = 0.0) -> list[tuple[str, str | None]]:
    """Per GT box: ("found" | "wrong_class" | "missed", predicted label or None).

    found       = a same-class prediction matched it (class-wise greedy, like eval)
    wrong_class = no same-class match, but a leftover prediction of another class overlaps it
    """
    gts, preds, _, order, ious, same = _match_inputs(sample, model, conf)
    m = _greedy_match(ious, order, same, iou)
    out: list[tuple[str, str | None]] = [("missed", None)] * len(gts)
    for i, g in enumerate(m):
        if g >= 0:
            out[g] = ("found", preds[i].label)
    left = m < 0
    if left.any() and len(gts):
        open_gt = np.array([st == "missed" for st, _ in out], dtype=bool)
        mask = left[:, None] & open_gt[None, :]
        for i, g in enumerate(_greedy_match(ious, order, mask, iou)):
            if g >= 0:
                out[g] = ("wrong_class", preds[i].label)
    return out


def sample_box_compare(
    sample: Sample, a: str, b: str, critical: list[str] | set[str],
    iou: float = 0.5, conf_a: float = 0.0, conf_b: float = 0.0,
) -> set[str]:
    """Which BOX_COMPARE_MODES this image belongs to (empty if either model did not run).

    only_a_found      = some GT that A found and B did not (missed or wrong class)
    class_diff        = some GT both models hit, but with different classes
    a_missed_critical = some critical-class GT that B found and A did not
    """
    if not (sample_ran(sample, a) and sample_ran(sample, b)):
        return set()
    sa = gt_box_status(sample, a, iou, conf_a)
    sb = gt_box_status(sample, b, iou, conf_b)
    gts = split_annotations(sample, None)[0]
    crit = set(critical)
    modes: set[str] = set()
    for g, (st_a, pa), (st_b, pb) in zip(gts, sa, sb):
        if st_a == "found" and st_b != "found":
            modes.add("only_a_found")
            if g.label in crit:
                modes.add("b_missed_critical")
        if st_b == "found" and st_a != "found":
            modes.add("only_b_found")
            if g.label in crit:
                modes.add("a_missed_critical")
        if st_a != "missed" and st_b != "missed" and pa != pb:
            modes.add("class_diff")
    return modes


def box_compare_counts(
    samples: list[Sample], a: str, b: str, critical: list[str] | set[str],
    iou: float = 0.5, conf_a: float = 0.0, conf_b: float = 0.0,
) -> dict[str, int]:
    out = dict.fromkeys(BOX_COMPARE_MODES, 0)
    for s in samples:
        for k in sample_box_compare(s, a, b, critical, iou, conf_a, conf_b):
            out[k] += 1
    return out