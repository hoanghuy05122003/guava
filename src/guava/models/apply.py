"""
Apply a local model to a Guava dataset (FiftyOne `apply_model` style).

Predictions are stored on each sample as annotations with
attributes {"kind": "prediction", "model": <model name>} so they render as a
separate layer and can be evaluated against ground truth.

Several models can live side by side: each run only replaces predictions of the
same model name. Per-model bookkeeping lives in dict fields:
  - sample.fields["infer"][model] = inference ms (model ran on this sample)
  - sample.fields["infer_meta"][model] = {"path", "sha1", "conf", "eval_mode", "classes"...}
  - sample.fields["eval"][model]  = {"tp", "fp", "fn"}  (written by guava.eval)
Run names are unique per weights file: two `best.pt` from different training
runs become "train194/best" and "train199/best" (see resolve_run_name).
The flat fields (infer_ms, eval_tp, ...) mirror the most recent run/eval.
"""
from __future__ import annotations

import os
import threading
from typing import Callable, Iterable

from guava.core.annotation import BboxAnnotation, LabelAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import ImageMetadata, Sample
from guava.models.base import EVAL_CONF, InferenceConfig, Model, Prediction, default_model_name, weights_sha1

ProgressFn = Callable[[int, int], None]
PRED_FIELDS = ("pred_label", "pred_conf", "infer_ms", "eval_tp", "eval_fp", "eval_fn", "eval_correct")
MODEL_FIELDS = ("infer", "infer_meta", "eval", "pred_cls")
UNNAMED = "predictions"


def ann_model(a) -> str:
    """Model name of a prediction annotation (legacy predictions have none)."""
    return a.attributes.get("model") or UNNAMED


def run_meta(samples: Iterable[Sample], model_name: str) -> dict | None:
    """Metadata of the run that produced `model_name` (weights path, sha1, conf...)."""
    for s in samples:
        meta = s.fields.get("infer_meta")
        if isinstance(meta, dict) and isinstance(meta.get(model_name), dict):
            return meta[model_name]
    return None


def resolve_run_name(samples: Iterable[Sample], model: Model, alias: str | None = None) -> str:
    """Name to store `model`'s predictions under.

    Defaults to the alias or a path-derived name ("train194/best"). If that name
    is already used in the dataset by *different* weights (another path), a short
    sha1 (or a counter) is appended so one run never silently overwrites another.
    Re-running the same weights path keeps the name, so it replaces its own run.
    """
    samples = list(samples)
    base = (alias or "").strip() or (default_model_name(model.path) if model.path else model.name) or UNNAMED
    path = os.path.abspath(model.path) if model.path else ""
    used = {str(m["name"]) for m in prediction_models(samples)}

    def free(name: str) -> bool:
        if name not in used:
            return True
        meta = run_meta(samples, name)
        if meta is None or not path:
            return True  # legacy run / in-memory model: same name means same model
        return os.path.abspath(str(meta.get("path") or "")) == path

    if free(base):
        return base
    sha = weights_sha1(model.path, 6) if model.path else ""
    cand = f"{base}@{sha}" if sha else f"{base} (2)"
    i = 2
    while not free(cand):
        i += 1
        cand = f"{base}@{sha}-{i}" if sha else f"{base} ({i})"
    return cand


def sample_ran(s: Sample, model_name: str | None = None) -> bool:
    """True if `model_name` (or any model when None) was run on the sample."""
    runs = s.fields.get("infer")
    if model_name is None:
        return "infer_ms" in s.fields or bool(runs) or any(a.attributes.get("kind") == "prediction" for a in s.annotations)
    if isinstance(runs, dict) and model_name in runs:
        return True
    return any(a.attributes.get("kind") == "prediction" and ann_model(a) == model_name for a in s.annotations)


def prediction_models(samples: Iterable[Sample]) -> list[dict[str, int | str]]:
    """Models that have results in `samples`, in first-seen order."""
    out: dict[str, dict[str, int | str]] = {}

    def row(name: str) -> dict[str, int | str]:
        return out.setdefault(name, {"name": name, "inferred": 0, "predictions": 0})

    for s in samples:
        seen: set[str] = set()
        runs = s.fields.get("infer")
        if isinstance(runs, dict):
            seen.update(runs)
        for a in s.annotations:
            if a.attributes.get("kind") == "prediction":
                name = ann_model(a)
                row(name)["predictions"] += 1  # type: ignore[operator]
                seen.add(name)
        for name in seen:
            row(name)["inferred"] += 1  # type: ignore[operator]
    return list(out.values())


def clear_predictions(samples: Iterable[Sample], model_name: str | None = None) -> int:
    """Remove predictions of `model_name` (all models when None)."""
    removed = 0
    for s in samples:
        before = len(s.annotations)
        s.annotations = [
            a for a in s.annotations
            if not (a.attributes.get("kind") == "prediction"
                    and (model_name is None or ann_model(a) == model_name))
        ]
        removed += before - len(s.annotations)
        if model_name is None:
            for k in PRED_FIELDS + MODEL_FIELDS:
                s.fields.pop(k, None)
            for a in s.annotations:
                a.attributes.pop("eval", None)
                a.attributes.pop("eval_models", None)
            continue
        for k in MODEL_FIELDS:
            d = s.fields.get(k)
            if isinstance(d, dict):
                d.pop(model_name, None)
                if not d:
                    s.fields.pop(k, None)
        if not s.fields.get("infer"):
            for k in PRED_FIELDS:
                s.fields.pop(k, None)
        for a in s.annotations:
            em = a.attributes.get("eval_models")
            if isinstance(em, dict):
                em.pop(model_name, None)
    return removed


def write_prediction(sample: Sample, pred: Prediction, model_name: str, meta: dict | None = None) -> None:
    if pred.image_size:
        w, h = pred.image_size
        size = sample.metadata.size_bytes
        if not size and os.path.exists(sample.filepath):
            size = os.path.getsize(sample.filepath)
        sample.metadata = ImageMetadata(width=w, height=h, channels=sample.metadata.channels, size_bytes=size)
    ms = round(pred.infer_ms, 2)
    sample.fields["infer_ms"] = ms
    sample.fields.setdefault("infer", {})[model_name] = ms
    base = {"kind": "prediction", "model": model_name}
    if meta:
        sample.fields.setdefault("infer_meta", {})[model_name] = meta
        if meta.get("sha1"):
            base["weights_sha1"] = meta["sha1"]

    if pred.classification is not None:
        label, prob = pred.classification
        sample.fields["pred_label"] = label
        sample.fields["pred_conf"] = round(prob, 4)
        sample.fields.setdefault("pred_cls", {})[model_name] = [label, round(prob, 4)]
        sample.add_annotation(LabelAnnotation(label=label, confidence=prob, attributes=dict(base)))
        return

    for i, d in enumerate(pred.detections):
        attrs = dict(base)
        if d.points:
            attrs["points"] = d.points
        sample.add_annotation(BboxAnnotation(
            label=d.label, id=f"pred_{model_name}_{i}",
            x=d.x, y=d.y, w=d.w, h=d.h, is_normalized=True,
            confidence=d.confidence, attributes=attrs,
        ))


def apply_model(
    dataset: Dataset,
    model: Model,
    cfg: InferenceConfig | None = None,
    samples: list[Sample] | None = None,
    replace: bool = True,
    progress: ProgressFn | None = None,
    cancel: threading.Event | None = None,
    name: str | None = None,
    alias: str | None = None,
) -> dict[str, int | float | str]:
    """Run `model` on samples (default: whole dataset). Returns a summary.

    Predictions are stored under `name` if given, else resolve_run_name(alias)
    (unique per weights file); summary["model_name"] tells which. With `replace`,
    earlier predictions of the *same* run name are dropped first; other models'
    predictions are kept so runs can be compared.
    """
    cfg = cfg or InferenceConfig()
    pool = samples if samples is not None else dataset.samples
    targets = [s for s in pool if s.filepath and os.path.exists(s.filepath)]
    run_name = name or resolve_run_name(dataset.samples, model, alias)
    meta = {
        "path": model.path, "sha1": weights_sha1(model.path) if model.path else "",
        "backend": model.backend, "task": model.task, "classes": list(model.class_names),
        "conf": cfg.conf, "iou": cfg.iou, "max_det": cfg.max_det, "imgsz": cfg.imgsz,
        "eval_mode": cfg.conf <= EVAL_CONF,
    }
    if replace:
        clear_predictions(targets, run_name)

    total = len(targets)
    done = n_det = failed = 0
    total_ms = 0.0
    bs = max(1, cfg.batch)
    for i in range(0, total, bs):
        if cancel is not None and cancel.is_set():
            break
        batch = targets[i:i + bs]
        try:
            preds = model.predict([s.filepath for s in batch], cfg)
        except Exception:
            # retry one by one so a single corrupt image doesn't kill the run
            preds = []
            for s in batch:
                try:
                    preds.extend(model.predict([s.filepath], cfg))
                except Exception:
                    preds.append(Prediction())
                    failed += 1
        for s, p in zip(batch, preds):
            write_prediction(s, p, run_name, meta)
            n_det += len(p.detections)
            total_ms += p.infer_ms
        done += len(batch)
        if progress:
            progress(done, total)

    return {
        "model_name": run_name,
        "weights_sha1": meta["sha1"],
        "eval_mode": meta["eval_mode"],
        "processed": done,
        "total": total,
        "detections": n_det,
        "failed": failed,
        "avg_ms": round(total_ms / done, 2) if done else 0.0,
    }
