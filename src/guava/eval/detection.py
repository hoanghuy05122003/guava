"""
Detection evaluation (FiftyOne evaluate_detections style, COCO-like metrics).

For every sample, predictions are greedily matched to ground truth by IoU
(highest confidence first, same class). Results are written back so the app can
filter on them:
  - annotation.attributes["eval"]  = "tp" / "fp" / "fn"
  - annotation.attributes["eval_iou"]
  - sample.fields["eval_tp"], ["eval_fp"], ["eval_fn"]

mAP uses every stored prediction; P/R/TP/FP/FN use those with conf >= `conf`
(the operating point). Predicted classes can be renamed (`class_map`) or, when
they have no ground truth at all, ignored (`ignore_missing`); the report lists
such mismatches in "class_check" / "warnings".

With several models on one dataset, pass `model=` to evaluate only that model's
predictions. Results are then also kept per model so they don't overwrite each
other:
  - gt annotation.attributes["eval_models"][model] = "tp" / "fn"
  - sample.fields["eval"][model] = {"tp", "fp", "fn"}
"""
from __future__ import annotations

from collections import defaultdict
from typing import Any

import numpy as np

from guava.core.annotation import BboxAnnotation, LabelAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import Sample
from guava.models.apply import ann_model, prediction_models, sample_ran

BACKGROUND = "(background)"
IOU_THRESHOLDS = np.linspace(0.5, 0.95, 10)


def _norm_boxes(anns: list[BboxAnnotation], sample: Sample) -> np.ndarray:
    w = sample.metadata.width or 1
    h = sample.metadata.height or 1
    out = np.zeros((len(anns), 4), dtype=np.float64)
    for i, a in enumerate(anns):
        b = a if a.is_normalized else a.to_normalized(w, h)
        out[i] = (b.x, b.y, b.x + b.w, b.y + b.h)
    return out


def _shape_points(a: BboxAnnotation, sample: Sample) -> list[list[float]]:
    """Normalized outline of an annotation: its OBB / polygon points, or the box corners."""
    pts = a.attributes.get("points")
    if pts and len(pts) >= 3:
        return pts
    w, h = sample.metadata.width or 1, sample.metadata.height or 1
    b = a if a.is_normalized else a.to_normalized(w, h)
    return [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.h], [b.x, b.y + b.h]]


def shape_iou_matrix(a_anns: list[BboxAnnotation], b_anns: list[BboxAnnotation], sample: Sample) -> np.ndarray:
    """IoU between annotations. Plain boxes: box IoU. As soon as an oriented box (OBB) or a
    polygon is involved, the IoU of the real shapes (shapely), so a rotated box is not judged
    by its axis-aligned envelope. Normalized coordinates are fine: IoU does not change when
    the x and y axes are scaled."""
    box = iou_matrix(_norm_boxes(a_anns, sample), _norm_boxes(b_anns, sample))
    if not any(x.attributes.get("points") for x in [*a_anns, *b_anns]):
        return box
    try:
        from shapely.geometry import Polygon
    except ImportError:
        return box
    def poly(x):
        p = Polygon(_shape_points(x, sample))
        return p if p.is_valid else p.buffer(0)
    pa, pb = [poly(x) for x in a_anns], [poly(x) for x in b_anns]
    out = np.zeros_like(box)
    for i, j in zip(*np.nonzero(box > 0)):  # shapes can only overlap where their envelopes do
        inter = pa[i].intersection(pb[j]).area
        uni = pa[i].area + pb[j].area - inter
        out[i, j] = inter / uni if uni > 0 else 0.0
    return out


def iou_matrix(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    if len(a) == 0 or len(b) == 0:
        return np.zeros((len(a), len(b)))
    tl = np.maximum(a[:, None, :2], b[None, :, :2])
    br = np.minimum(a[:, None, 2:], b[None, :, 2:])
    inter = np.prod(np.clip(br - tl, 0, None), axis=2)
    area_a = np.prod(np.clip(a[:, 2:] - a[:, :2], 0, None), axis=1)
    area_b = np.prod(np.clip(b[:, 2:] - b[:, :2], 0, None), axis=1)
    return inter / np.maximum(area_a[:, None] + area_b[None, :] - inter, 1e-12)


def _greedy_match(ious: np.ndarray, pred_order: np.ndarray, same_cls: np.ndarray, thr: float) -> np.ndarray:
    """Return the matched gt index for each prediction (-1 = unmatched)."""
    n_pred, n_gt = ious.shape
    matched = np.full(n_pred, -1, dtype=int)
    gt_used = np.zeros(n_gt, dtype=bool)
    for p in pred_order:
        cand = np.where(same_cls[p] & ~gt_used & (ious[p] >= thr))[0]
        if len(cand):
            g = cand[np.argmax(ious[p, cand])]
            matched[p] = g
            gt_used[g] = True
    return matched


def _ap(confs: np.ndarray, tps: np.ndarray, n_gt: int) -> float:
    """COCO 101-point interpolated AP."""
    if n_gt == 0:
        return float("nan")
    if len(confs) == 0:
        return 0.0
    order = np.argsort(-confs, kind="stable")
    tp = np.cumsum(tps[order])
    fp = np.cumsum(~tps[order])
    recall = tp / n_gt
    precision = tp / np.maximum(tp + fp, 1e-12)
    precision = np.maximum.accumulate(precision[::-1])[::-1]
    idx = np.searchsorted(recall, np.linspace(0, 1, 101), side="left")
    return float(np.mean([precision[i] if i < len(precision) else 0.0 for i in idx]))


def split_annotations(sample: Sample, model: str | None = None) -> tuple[list[BboxAnnotation], list[BboxAnnotation]]:
    gts, preds = [], []
    for a in sample.annotations:
        if not isinstance(a, BboxAnnotation):
            continue
        if a.attributes.get("kind") != "prediction":
            gts.append(a)
        elif model is None or ann_model(a) == model:
            preds.append(a)
    return gts, preds


def model_names(dataset: Dataset, samples: list[Sample] | None = None) -> list[str]:
    return [str(m["name"]) for m in prediction_models(samples if samples is not None else dataset.samples)]


def _resolve_model(dataset: Dataset, model: str | None, samples: list[Sample] | None) -> str | None:
    """None is only allowed when at most one model has predictions."""
    if model is not None:
        return model
    names = model_names(dataset, samples)
    if len(names) > 1:
        raise ValueError("Several models have predictions (" + ", ".join(names) + "); pass model=")
    return names[0] if names else None


def gt_eval(a, model: str | None = None) -> str | None:
    """TP/FN status of a GT annotation for `model` (flat status when None)."""
    em = a.attributes.get("eval_models")
    if model is not None and isinstance(em, dict):
        return em.get(model)
    return a.attributes.get("eval")  # flat status (also: workspaces saved before per-model eval)


def sample_eval(s: Sample, model: str | None = None) -> dict[str, Any] | None:
    """Per-sample eval counts for `model`: {"tp","fp","fn"} or {"correct"}; None if not evaluated."""
    ev = s.fields.get("eval")
    if model is not None and isinstance(ev, dict):
        return ev.get(model)
    # flat fields: single-model eval (also workspaces saved before per-model eval)
    if "eval_correct" in s.fields:
        return {"correct": bool(s.fields["eval_correct"])}
    if "eval_tp" in s.fields or "eval_fp" in s.fields or "eval_fn" in s.fields:
        return {k: s.fields.get("eval_" + k, 0) for k in ("tp", "fp", "fn")}
    return None


def sample_wrong(s: Sample, model: str | None = None) -> bool | None:
    """True = model made a mistake on this image, False = all correct, None = not evaluated."""
    ev = sample_eval(s, model)
    if ev is None:
        return None
    if "correct" in ev:
        return not ev["correct"]
    return bool(ev.get("fp", 0) or ev.get("fn", 0))


def parse_class_map(value: Any) -> dict[str, str]:
    """{"pred": "gt"} from a dict or a "pred=gt, other=gt2" string. An empty target drops the class."""
    if not value:
        return {}
    if isinstance(value, dict):
        return {str(k).strip(): str(v or "").strip() for k, v in value.items() if str(k).strip()}
    out: dict[str, str] = {}
    for part in str(value).replace(";", ",").replace("\n", ",").split(","):
        if "->" in part:
            k, v = part.split("->", 1)
        elif "=" in part:
            k, v = part.split("=", 1)
        else:
            continue
        if k.strip():
            out[k.strip()] = v.strip()
    return out


def _class_check(
    model_classes: list[str] | None, gt_classes: set[str], pred_counts: dict[str, int],
    class_map: dict[str, str], ignore_missing: bool, meta: dict[str, Any] | None,
) -> tuple[dict[str, Any], list[str]]:
    """Compare what the model can predict with what the dataset labels."""
    mapped_model = None
    if model_classes:
        mapped_model = {class_map.get(c, c) for c in model_classes} - {""}
    extra = {lb for lb in pred_counts if lb not in gt_classes}
    if mapped_model is not None:
        extra |= {c for c in mapped_model if c not in gt_classes}
    unknown = sorted(gt_classes - mapped_model) if mapped_model is not None else []
    check: dict[str, Any] = {
        "model_classes": list(model_classes or []),
        "dataset_classes": sorted(gt_classes),
        "no_gt": [{"label": lb, "predictions": pred_counts.get(lb, 0)} for lb in sorted(extra)],
        "not_in_model": unknown,
        "class_map": class_map,
        "ignore_missing": ignore_missing,
    }
    warnings = []
    fp_extra = [(lb, pred_counts[lb]) for lb in sorted(extra) if pred_counts.get(lb)]
    if fp_extra:
        boxes = ", ".join(f"{lb} ({n})" for lb, n in fp_extra)
        if ignore_missing:
            warnings.append(f"Ignored predictions of classes with no ground truth in this dataset: {boxes}.")
        else:
            warnings.append(
                f"Model predicts classes with no ground truth in this dataset: {boxes}. "
                "Every one of these boxes counts as a false positive; tick 'Ignore classes without GT' "
                "or map them to a dataset class to compare fairly.")
    if unknown:
        warnings.append(
            "Dataset classes the model cannot predict: " + ", ".join(unknown)
            + ". All their ground truth counts as missed (FN); map a model class to them if it was only renamed.")
    if meta and float(meta.get("conf") or 0) > 0.01:
        warnings.append(
            f"Predictions were stored at conf >= {float(meta['conf']):g}, so low-confidence boxes are missing and "
            "mAP is underestimated (ultralytics val uses conf 0.001). Re-run the model in Evaluation mode "
            "for a comparable mAP.")
    return check, warnings


def evaluate_detections(
    dataset: Dataset,
    iou: float = 0.5,
    conf: float = 0.0,
    samples: list[Sample] | None = None,
    classwise: bool = True,
    model: str | None = None,
    ignore_missing: bool = False,
    class_map: dict[str, str] | str | None = None,
) -> dict[str, Any]:
    """Evaluate one model's boxes against ground truth.

    mAP is computed from every stored prediction (like `ultralytics val`, so run
    the model with a very low conf, see InferenceConfig.for_eval). `conf` is the
    operating point: precision/recall, TP/FP/FN, per-box flags and the confusion
    matrix only use predictions with confidence >= conf.

    `class_map` renames predicted classes before matching ({"pred": "gt"}; an
    empty target drops the class). `ignore_missing` drops predictions of classes
    that have no ground truth anywhere in the dataset instead of counting them as FP.
    """
    from guava.models.apply import run_meta

    pool = samples if samples is not None else dataset.samples
    model = _resolve_model(dataset, model, samples)
    cmap = parse_class_map(class_map)
    gt_classes = {a.label for s in dataset.samples for a in split_annotations(s)[0]}
    meta = run_meta(pool, model) if model is not None else None
    ap_conf: dict[str, list[float]] = defaultdict(list)
    ap_tp: dict[str, list[np.ndarray]] = defaultdict(list)  # per prediction: TP flag at each IoU threshold
    n_gt: dict[str, int] = defaultdict(int)
    stats: dict[str, dict[str, int]] = defaultdict(lambda: {"tp": 0, "fp": 0, "fn": 0})
    confusion: dict[tuple[str, str], int] = defaultdict(int)
    pred_counts: dict[str, int] = defaultdict(int)  # mapped label -> boxes at the operating conf
    ignored: dict[str, int] = defaultdict(int)
    evaluated = 0

    for s in pool:
        # Only samples the model actually ran on count (an empty prediction is still a result)
        if not sample_ran(s, model):
            continue
        gts, raw = split_annotations(s, model)
        evaluated += 1
        preds, labels = [], []
        for p in raw:
            for k in ("eval", "eval_iou", "eval_label"):
                p.attributes.pop(k, None)
            lb = cmap.get(p.label, p.label)
            above = (p.confidence or 0.0) >= conf
            if above and lb:
                pred_counts[lb] += 1
            if not lb or (ignore_missing and lb not in gt_classes):
                if above:
                    p.attributes["eval"] = "ignored"
                    ignored[lb or p.label] += 1
                continue
            if lb != p.label:
                p.attributes["eval_label"] = lb
            preds.append(p)
            labels.append(lb)

        for g in gts:
            n_gt[g.label] += 1

        # mAP: every stored prediction
        ious_all = shape_iou_matrix(preds, gts, s)
        conf_all = np.array([p.confidence or 0.0 for p in preds])
        order_all = np.argsort(-conf_all, kind="stable")
        if classwise:
            same_all = np.array([[lb == g.label for g in gts] for lb in labels], dtype=bool)
        else:
            same_all = np.ones((len(preds), len(gts)), dtype=bool)
        same_all = same_all.reshape(len(preds), len(gts))
        tp_grid = np.zeros((len(preds), len(IOU_THRESHOLDS)), dtype=bool)
        for t, thr in enumerate(IOU_THRESHOLDS):
            tp_grid[:, t] = _greedy_match(ious_all, order_all, same_all, thr) >= 0
        for i, lb in enumerate(labels):
            ap_conf[lb].append(float(conf_all[i]))
            ap_tp[lb].append(tp_grid[i])

        # Operating point: per-object TP/FP/FN at the chosen IoU and conf, written back for filtering
        keep = np.where(conf_all >= conf)[0]
        op = [preds[i] for i in keep]
        op_labels = [labels[i] for i in keep]
        ious = ious_all[keep]
        same = same_all[keep]
        order = np.argsort(-conf_all[keep], kind="stable")
        m = _greedy_match(ious, order, same, iou)
        matched_gt = {int(g) for g in m if g >= 0}
        for i, p in enumerate(op):
            if m[i] >= 0:
                p.attributes["eval"] = "tp"
                p.attributes["eval_iou"] = round(float(ious[i, m[i]]), 3)
                stats[op_labels[i]]["tp"] += 1
            else:
                p.attributes["eval"] = "fp"
                p.attributes["eval_iou"] = round(float(ious[i].max()), 3) if len(gts) else 0.0
                stats[op_labels[i]]["fp"] += 1
        for j, g in enumerate(gts):
            status = "tp" if j in matched_gt else "fn"
            g.attributes["eval"] = status
            if model is not None:
                em = g.attributes.get("eval_models")
                if not isinstance(em, dict):
                    em = g.attributes["eval_models"] = {}
                em[model] = status
            if j not in matched_gt:
                stats[g.label]["fn"] += 1
        counts = {"tp": int((m >= 0).sum()), "fp": int((m < 0).sum()), "fn": len(gts) - len(matched_gt)}
        s.fields["eval_tp"], s.fields["eval_fp"], s.fields["eval_fn"] = counts["tp"], counts["fp"], counts["fn"]
        if model is not None:
            ev = s.fields.get("eval")
            if not isinstance(ev, dict):
                ev = s.fields["eval"] = {}
            ev[model] = counts

        # Confusion matrix uses class-agnostic matching so label swaps show up off-diagonal
        mc = _greedy_match(ious, order, np.ones_like(same, dtype=bool), iou)
        used = set()
        for i, lb in enumerate(op_labels):
            if mc[i] >= 0:
                confusion[(gts[mc[i]].label, lb)] += 1
                used.add(int(mc[i]))
            else:
                confusion[(BACKGROUND, lb)] += 1
        for j, g in enumerate(gts):
            if j not in used:
                confusion[(g.label, BACKGROUND)] += 1

    labels = sorted(set(n_gt) | set(ap_conf) | set(stats))
    classes = []
    ap50s, ap5095s = [], []
    for lb in labels:
        st = stats[lb]
        prec = st["tp"] / (st["tp"] + st["fp"]) if st["tp"] + st["fp"] else 0.0
        rec = st["tp"] / (st["tp"] + st["fn"]) if st["tp"] + st["fn"] else 0.0
        f1 = 2 * prec * rec / (prec + rec) if prec + rec else 0.0
        confs = np.array(ap_conf[lb])
        grid = np.array(ap_tp[lb], dtype=bool).reshape(-1, len(IOU_THRESHOLDS))
        aps = [_ap(confs, grid[:, t], n_gt[lb]) for t in range(len(IOU_THRESHOLDS))]
        has_gt = n_gt[lb] > 0
        if has_gt:
            ap50s.append(aps[0])
            ap5095s.append(float(np.mean(aps)))
        classes.append({
            "label": lb, "support": n_gt[lb], **st,
            "precision": round(prec, 4), "recall": round(rec, 4), "f1": round(f1, 4),
            "ap50": round(aps[0], 4) if has_gt else None,
            "ap50_95": round(float(np.mean(aps)), 4) if has_gt else None,
            "no_gt": lb not in gt_classes,
        })

    tp = sum(c["tp"] for c in classes)
    fp = sum(c["fp"] for c in classes)
    fn = sum(c["fn"] for c in classes)
    prec = tp / (tp + fp) if tp + fp else 0.0
    rec = tp / (tp + fn) if tp + fn else 0.0
    cm_labels = labels + [BACKGROUND]
    check, warnings = _class_check((meta or {}).get("classes"), gt_classes, pred_counts, cmap, ignore_missing, meta)
    check["ignored"] = [{"label": lb, "predictions": n} for lb, n in sorted(ignored.items())]
    return {
        "type": "detection",
        "model": model,
        "iou": iou,
        "conf": conf,
        "ignore_missing": ignore_missing,
        "class_map": cmap,
        "run": {k: v for k, v in meta.items() if k != "classes"} if meta else None,
        "evaluated_samples": evaluated,
        "overall": {
            "tp": tp, "fp": fp, "fn": fn,
            "precision": round(prec, 4), "recall": round(rec, 4),
            "f1": round(2 * prec * rec / (prec + rec), 4) if prec + rec else 0.0,
            "mAP50": round(float(np.mean(ap50s)), 4) if ap50s else None,
            "mAP50_95": round(float(np.mean(ap5095s)), 4) if ap5095s else None,
        },
        "classes": classes,
        "class_check": check,
        "warnings": warnings,
        "confusion": {
            "labels": cm_labels,
            "matrix": [[confusion.get((g, p), 0) for p in cm_labels] for g in cm_labels],
        },
    }


def _gt_class_label(sample: Sample) -> str | None:
    for a in sample.annotations:
        if isinstance(a, LabelAnnotation) and a.attributes.get("kind") != "prediction":
            return a.label
    return None


def _pred_class_label(s: Sample, model: str | None) -> str | None:
    if model is None:
        return s.fields.get("pred_label")
    pc = s.fields.get("pred_cls")
    if isinstance(pc, dict) and model in pc:
        return pc[model][0]
    for a in s.annotations:
        if isinstance(a, LabelAnnotation) and a.attributes.get("kind") == "prediction" and ann_model(a) == model:
            return a.label
    return None


def evaluate_classifications(dataset: Dataset, samples: list[Sample] | None = None, model: str | None = None) -> dict[str, Any]:
    """Image-level classification: GT LabelAnnotation vs predicted label."""
    pool = samples if samples is not None else dataset.samples
    confusion: dict[tuple[str, str], int] = defaultdict(int)
    correct = total = 0
    for s in pool:
        pred = _pred_class_label(s, model)
        gt = _gt_class_label(s)
        if pred is None or gt is None:
            continue
        total += 1
        ok = pred == gt
        correct += ok
        s.fields["eval_correct"] = bool(ok)
        if model is not None:
            ev = s.fields.get("eval")
            if not isinstance(ev, dict):
                ev = s.fields["eval"] = {}
            ev[model] = {"correct": bool(ok)}
        confusion[(gt, pred)] += 1
    labels = sorted({g for g, _ in confusion} | {p for _, p in confusion})
    return {
        "type": "classification",
        "model": model,
        "evaluated_samples": total,
        "overall": {"accuracy": round(correct / total, 4) if total else None, "correct": correct, "total": total},
        "classes": [],
        "confusion": {"labels": labels, "matrix": [[confusion.get((g, p), 0) for p in labels] for g in labels]},
    }


def evaluate(dataset: Dataset, **kwargs: Any) -> dict[str, Any]:
    """Pick detection or classification evaluation based on which predictions exist."""
    if any("pred_label" in s.fields for s in dataset.samples):
        return evaluate_classifications(dataset, samples=kwargs.get("samples"), model=kwargs.get("model"))
    return evaluate_detections(dataset, **kwargs)


def evaluate_models(
    dataset: Dataset,
    models: list[str] | None = None,
    samples: list[Sample] | None = None,
    **kwargs: Any,
) -> dict[str, dict[str, Any]]:
    """Evaluate each model separately: {model name: report}. Default = every model present."""
    names = models if models is not None else model_names(dataset, samples)
    return {m: evaluate(dataset, model=m, samples=samples, **kwargs) for m in names}


def sample_in_confusion_cell(
    sample: Sample, gt_label: str, pred_label: str, iou: float = 0.5, model: str | None = None,
) -> bool:
    """True if the sample contributes to confusion cell (gt_label -> pred_label)."""
    if "pred_label" in sample.fields:
        return _pred_class_label(sample, model) == pred_label and _gt_class_label(sample) == gt_label
    gts, preds = split_annotations(sample, model)
    def plabel(p) -> str:
        return p.attributes.get("eval_label", p.label)

    if gt_label == BACKGROUND:
        return any(plabel(p) == pred_label and p.attributes.get("eval") == "fp" for p in preds)
    if pred_label == BACKGROUND:
        return any(g.label == gt_label and gt_eval(g, model) == "fn" for g in gts)
    preds = [p for p in preds if p.attributes.get("eval") in ("tp", "fp")]  # boxes at the operating conf
    ious = shape_iou_matrix(preds, gts, sample)
    for i, p in enumerate(preds):
        if plabel(p) != pred_label:
            continue
        for j, g in enumerate(gts):
            if g.label == gt_label and ious[i, j] >= iou:
                return True
    return False