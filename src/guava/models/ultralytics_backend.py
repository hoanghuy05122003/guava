"""
Ultralytics backend: YOLOv5u/v8/v9/v10/11/12/RT-DETR weights in any format
Ultralytics can load offline (.pt, .onnx, .engine, .torchscript, *_openvino_model/).
"""
from __future__ import annotations

import os
import time
from typing import Any

from guava.models.base import Detection, InferenceConfig, Model, Prediction, default_model_name


def is_available() -> bool:
    try:
        import ultralytics  # noqa: F401
        return True
    except Exception:
        return False


class UltralyticsModel(Model):
    backend = "ultralytics"

    def __init__(self, path: str, task: str | None = None):
        os.environ.setdefault("YOLO_OFFLINE", "1")  # never try to phone home / auto-download
        from ultralytics import YOLO

        self.path = path
        self.name = default_model_name(path)
        self._model = YOLO(path, task=task) if task else YOLO(path)
        self.task = getattr(self._model, "task", None) or "detect"

    @property
    def class_names(self) -> list[str]:
        names: Any = getattr(self._model, "names", None) or {}
        if isinstance(names, dict):
            return [str(names[k]) for k in sorted(names)]
        return [str(n) for n in names]

    def predict(self, image_paths: list[str], cfg: InferenceConfig) -> list[Prediction]:
        kwargs: dict[str, Any] = {
            "conf": cfg.conf,
            "iou": cfg.iou,
            "max_det": cfg.max_det,
            "verbose": False,
            "half": cfg.half,
        }
        if cfg.imgsz:
            kwargs["imgsz"] = cfg.imgsz
        if cfg.device not in (None, "", "auto"):
            kwargs["device"] = cfg.device

        names = self.class_names
        out: list[Prediction] = []
        t0 = time.perf_counter()
        results = self._model.predict(image_paths, **kwargs)
        per_img_ms = (time.perf_counter() - t0) * 1000 / max(1, len(image_paths))

        for r in results:
            h, w = r.orig_shape[:2]
            pred = Prediction(image_size=(int(w), int(h)), infer_ms=per_img_ms)
            speed = getattr(r, "speed", None)
            if isinstance(speed, dict) and speed.get("inference") is not None:
                pred.infer_ms = float(sum(v for v in speed.values() if v is not None))

            if getattr(r, "probs", None) is not None:
                top1 = int(r.probs.top1)
                pred.classification = (names[top1] if top1 < len(names) else str(top1), float(r.probs.top1conf))
                out.append(pred)
                continue

            boxes = r.obb if getattr(r, "obb", None) is not None else r.boxes
            if boxes is None or len(boxes) == 0:
                out.append(pred)
                continue

            xyxy = boxes.xyxy.cpu().numpy()
            confs = boxes.conf.cpu().numpy()
            clss = boxes.cls.cpu().numpy().astype(int)
            polys = None
            if getattr(r, "masks", None) is not None:
                polys = r.masks.xyn
            elif getattr(r, "obb", None) is not None:
                polys = (r.obb.xyxyxyxy.cpu().numpy() / [w, h]).tolist()

            for i in range(len(confs)):
                x1, y1, x2, y2 = (float(v) for v in xyxy[i])
                cid = int(clss[i])
                det = Detection(
                    label=names[cid] if cid < len(names) else str(cid),
                    confidence=float(confs[i]),
                    x=x1 / w, y=y1 / h, w=(x2 - x1) / w, h=(y2 - y1) / h,
                    class_id=cid,
                )
                if polys is not None and i < len(polys):
                    det.points = [[float(p[0]), float(p[1])] for p in polys[i]]
                pred.detections.append(det)
            out.append(pred)
        return out
