"""
Guava Model Interface.

Every backend turns a list of image paths into a list of detections per image.
Coordinates are always returned normalized [x, y, w, h] (top-left origin) so they
render and evaluate against any dataset regardless of stored image metadata.
"""
from __future__ import annotations

import hashlib
import os
from dataclasses import dataclass, field
from typing import Any

# Ultralytics training writes runs/<name>/weights/{best,last}.pt: the stem alone is not a model name
GENERIC_STEMS = {"best", "last", "model", "weights", "epoch"}


def default_model_name(path: str) -> str:
    """Readable, mostly unique name for a weights path.

    `runs/train194/weights/best.pt` -> "train194/best" (not just "best");
    `D:/models/yolo12n_housing.pt` -> "yolo12n_housing".
    """
    path = path.rstrip("/\\")
    if not path:
        return "model"
    stem = os.path.splitext(os.path.basename(path))[0]
    if stem.endswith("_openvino_model"):
        stem = stem[: -len("_openvino_model")]
    if stem.lower().rstrip("0123456789_") not in GENERIC_STEMS:
        return stem
    parent = os.path.dirname(path)
    if os.path.basename(parent).lower() == "weights":
        parent = os.path.dirname(parent)
    run = os.path.basename(parent)
    return f"{run}/{stem}" if run else stem


_sha_cache: dict[tuple[str, float, int], str] = {}


def weights_sha1(path: str, length: int = 8) -> str:
    """Short sha1 of a weights file (or of every file in a model folder); "" if unreadable."""
    try:
        files = [path] if os.path.isfile(path) else sorted(
            os.path.join(r, f) for r, _, fs in os.walk(path) for f in fs)
        key = (os.path.abspath(path), max(os.path.getmtime(f) for f in files), sum(os.path.getsize(f) for f in files))
    except (OSError, ValueError):
        return ""
    if key not in _sha_cache:
        h = hashlib.sha1()
        for f in files:
            with open(f, "rb") as fh:
                for chunk in iter(lambda: fh.read(1 << 20), b""):
                    h.update(chunk)
        _sha_cache[key] = h.hexdigest()
    return _sha_cache[key][:length]


@dataclass
class Detection:
    label: str
    confidence: float
    x: float
    y: float
    w: float
    h: float
    class_id: int = -1
    points: list[list[float]] | None = None  # normalized polygon (segmentation models)


@dataclass
class Prediction:
    """Result for one image."""
    detections: list[Detection] = field(default_factory=list)
    classification: tuple[str, float] | None = None  # (label, prob) for classifier models
    image_size: tuple[int, int] | None = None  # (width, height)
    infer_ms: float = 0.0


@dataclass
class InferenceConfig:
    conf: float = 0.25
    iou: float = 0.45
    imgsz: int | None = None
    device: str | None = None  # "cpu", "0", "cuda:0" ... None = auto
    max_det: int = 300
    batch: int = 8
    half: bool = False

    @classmethod
    def for_eval(cls, **kwargs: Any) -> "InferenceConfig":
        """Settings `ultralytics val` uses for mAP: keep (almost) every box so the PR curve is complete."""
        kwargs.update(conf=EVAL_CONF, iou=EVAL_NMS_IOU, max_det=300)
        return cls(**kwargs)


EVAL_CONF = 0.001
EVAL_NMS_IOU = 0.7


class Model:
    """Abstract offline model."""

    name: str = "model"
    path: str = ""
    task: str = "detect"  # detect | segment | classify | obb | pose
    backend: str = "base"

    @property
    def class_names(self) -> list[str]:
        return []

    def predict(self, image_paths: list[str], cfg: InferenceConfig) -> list[Prediction]:
        raise NotImplementedError

    def info(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "path": self.path,
            "task": self.task,
            "backend": self.backend,
            "classes": self.class_names,
        }
