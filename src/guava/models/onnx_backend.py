"""
Pure ONNX Runtime backend (no torch / ultralytics needed).

Supports the common YOLO detection export layouts:
  (1, 4 + nc, N)  -> YOLOv8/11/12 (cx, cy, w, h, class scores...)
  (1, N, 5 + nc)  -> YOLOv5 (cx, cy, w, h, obj, class scores...)
  (1, N, 6)       -> end-to-end / NMS included (x1, y1, x2, y2, score, cls)
Class names are read from the ONNX metadata key "names" written by Ultralytics.
"""
from __future__ import annotations

import ast
import os
import time
from typing import Any

import numpy as np

from guava.models.base import Detection, InferenceConfig, Model, Prediction, default_model_name


def is_available() -> bool:
    try:
        import onnxruntime  # noqa: F401
        return True
    except Exception:
        return False


def read_image(path: str) -> np.ndarray:
    import cv2
    data = np.fromfile(path, dtype=np.uint8)  # unicode-safe on Windows
    img = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError(f"Cannot read image: {path}")
    return img


def letterbox(img: np.ndarray, size: tuple[int, int]) -> tuple[np.ndarray, float, tuple[int, int]]:
    import cv2
    h, w = img.shape[:2]
    th, tw = size
    r = min(th / h, tw / w)
    nw, nh = int(round(w * r)), int(round(h * r))
    resized = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_LINEAR)
    left, top = (tw - nw) // 2, (th - nh) // 2
    out = np.full((th, tw, 3), 114, dtype=np.uint8)
    out[top:top + nh, left:left + nw] = resized
    return out, r, (left, top)


class OnnxModel(Model):
    backend = "onnxruntime"

    def __init__(self, path: str, device: str | None = None):
        import onnxruntime as ort

        self.path = path
        self.name = default_model_name(path)
        providers = ["CPUExecutionProvider"]
        if device != "cpu" and "CUDAExecutionProvider" in ort.get_available_providers():
            providers = ["CUDAExecutionProvider", "CPUExecutionProvider"]
        self._sess = ort.InferenceSession(path, providers=providers)
        self._input = self._sess.get_inputs()[0]
        meta = self._sess.get_modelmeta().custom_metadata_map or {}
        self._names: list[str] = []
        if "names" in meta:
            try:
                parsed: Any = ast.literal_eval(meta["names"])
                if isinstance(parsed, dict):
                    self._names = [str(parsed[k]) for k in sorted(parsed)]
                else:
                    self._names = [str(n) for n in parsed]
            except Exception:
                pass
        self.task = meta.get("task", "detect")
        shape = self._input.shape
        self._size = (
            shape[2] if isinstance(shape[2], int) else 640,
            shape[3] if isinstance(shape[3], int) else 640,
        )
        self._fp16 = "float16" in (self._input.type or "")

    @property
    def class_names(self) -> list[str]:
        return self._names

    def _decode(self, out: np.ndarray, cfg: InferenceConfig) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        """Return boxes xyxy (network-input pixels), scores, class ids."""
        out = out[0]
        if out.ndim != 2:
            raise ValueError(f"Unsupported ONNX output shape: {out.shape}")
        if out.shape[1] == 6 and out.shape[0] > 6:
            keep = out[:, 4] >= cfg.conf
            return out[keep, :4], out[keep, 4], out[keep, 5].astype(int)

        nc = len(self._names) or None
        if nc is not None and out.shape[1] == 5 + nc:
            scores_all = out[:, 5:] * out[:, 4:5]
        else:
            if out.shape[0] < out.shape[1]:
                out = out.T
            scores_all = out[:, 4:]

        cls = scores_all.argmax(1)
        scores = scores_all[np.arange(len(cls)), cls]
        keep = scores >= cfg.conf
        cxcywh, scores, cls = out[keep, :4], scores[keep], cls[keep]
        xyxy = np.concatenate([cxcywh[:, :2] - cxcywh[:, 2:] / 2, cxcywh[:, :2] + cxcywh[:, 2:] / 2], axis=1)
        if len(xyxy) == 0:
            return xyxy, scores, cls

        import cv2
        shifted = xyxy + cls[:, None].astype(np.float32) * 7680.0  # class-aware NMS
        rects = [[float(a), float(b), float(c - a), float(d - b)] for a, b, c, d in shifted]
        idx = cv2.dnn.NMSBoxes(rects, scores.astype(float).tolist(), cfg.conf, cfg.iou)
        idx = np.array(idx, dtype=int).reshape(-1)[: cfg.max_det]
        return xyxy[idx], scores[idx], cls[idx]

    def predict(self, image_paths: list[str], cfg: InferenceConfig) -> list[Prediction]:
        results: list[Prediction] = []
        dtype = np.float16 if self._fp16 else np.float32
        for p in image_paths:
            t0 = time.perf_counter()
            img = read_image(p)
            h, w = img.shape[:2]
            lb, r, (padx, pady) = letterbox(img, self._size)
            x = lb[:, :, ::-1].transpose(2, 0, 1)[None].astype(dtype) / 255.0
            out = self._sess.run(None, {self._input.name: np.ascontiguousarray(x)})[0]
            boxes, scores, cls = self._decode(out, cfg)

            pred = Prediction(image_size=(w, h))
            for (x1, y1, x2, y2), s, c in zip(boxes, scores, cls):
                x1 = float(np.clip((x1 - padx) / r, 0, w))
                x2 = float(np.clip((x2 - padx) / r, 0, w))
                y1 = float(np.clip((y1 - pady) / r, 0, h))
                y2 = float(np.clip((y2 - pady) / r, 0, h))
                c = int(c)
                pred.detections.append(Detection(
                    label=self._names[c] if c < len(self._names) else str(c),
                    confidence=float(s),
                    x=x1 / w, y=y1 / h, w=(x2 - x1) / w, h=(y2 - y1) / h,
                    class_id=c,
                ))
            pred.infer_ms = (time.perf_counter() - t0) * 1000
            results.append(pred)
        return results
