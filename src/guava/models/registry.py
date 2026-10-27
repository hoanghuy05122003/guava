"""
Local model registry: discover weight files on disk and load them once (cached).
Everything is offline: models are only ever read from local paths.
"""
from __future__ import annotations

import os
import threading
from typing import Any

from guava.models.base import Model

WEIGHT_EXTS = (".pt", ".onnx", ".engine", ".torchscript")
DEFAULT_MODEL_DIRS = [
    os.path.join(os.path.expanduser("~"), ".guava", "models"),
    r"D:\models",
    r"D:\data",
]

_cache: dict[tuple[str, str, float], Model] = {}
_lock = threading.Lock()


def _saved_dirs_file() -> str:
    return os.path.join(os.path.expanduser("~"), ".guava", "model_dirs.json")


def saved_model_dirs() -> list[str]:
    """Folders added with "Scan another folder", most recent first."""
    import json
    try:
        with open(_saved_dirs_file(), encoding="utf-8") as f:
            return [d for d in json.load(f) if isinstance(d, str)]
    except (OSError, ValueError):
        return []


def remember_model_dir(path: str) -> None:
    import json
    path = os.path.normpath(path)
    dirs = [path] + [d for d in saved_model_dirs() if os.path.normcase(d) != os.path.normcase(path)]
    os.makedirs(os.path.dirname(_saved_dirs_file()), exist_ok=True)
    with open(_saved_dirs_file(), "w", encoding="utf-8") as f:
        json.dump(dirs[:20], f, indent=1)


def forget_model_dir(path: str) -> None:
    import json
    dirs = [d for d in saved_model_dirs() if os.path.normcase(d) != os.path.normcase(os.path.normpath(path))]
    with open(_saved_dirs_file(), "w", encoding="utf-8") as f:
        json.dump(dirs, f, indent=1)


def model_dirs() -> list[str]:
    """Scanned folders: remembered ones first, then GUAVA_MODEL_DIRS, then the defaults."""
    env = os.environ.get("GUAVA_MODEL_DIRS", "")
    dirs = saved_model_dirs() + [d for d in env.split(os.pathsep) if d] + DEFAULT_MODEL_DIRS
    return [d for d in dict.fromkeys(dirs) if os.path.isdir(d)]


def discover_models(dirs: list[str] | None = None, max_depth: int = 5, limit: int = 300) -> list[dict[str, Any]]:
    """Scan folders for weight files (.pt/.onnx/.engine) and OpenVINO model dirs."""
    found: list[dict[str, Any]] = []
    for root in dirs or model_dirs():
        root_depth = root.rstrip("/\\").count(os.sep)
        for cur, subdirs, files in os.walk(root):
            if cur.count(os.sep) - root_depth >= max_depth:
                subdirs[:] = []
            subdirs[:] = [d for d in subdirs if not d.startswith(".") and d not in ("node_modules", "__pycache__")]
            if cur.endswith("_openvino_model"):
                found.append(_entry(cur, "openvino"))
                subdirs[:] = []
                continue
            for f in files:
                if f.lower().endswith(WEIGHT_EXTS):
                    found.append(_entry(os.path.join(cur, f), os.path.splitext(f)[1][1:].lower()))
            if len(found) >= limit:
                break
        if len(found) >= limit:
            break
    found.sort(key=lambda m: -m["mtime"])
    return found


def _entry(path: str, fmt: str) -> dict[str, Any]:
    st = os.stat(path)
    return {
        "name": os.path.basename(path.rstrip("/\\")),
        "path": path,
        "format": fmt,
        "size_mb": round(st.st_size / 1e6, 1) if os.path.isfile(path) else None,
        "mtime": st.st_mtime,
        "folder": os.path.basename(os.path.dirname(path)),
    }


def available_backends() -> dict[str, bool]:
    from guava.models import onnx_backend, ultralytics_backend
    return {"ultralytics": ultralytics_backend.is_available(), "onnxruntime": onnx_backend.is_available()}


def load_model(path: str, backend: str = "auto", task: str | None = None, device: str | None = None) -> Model:
    """Load (and cache) a local model. backend: auto | ultralytics | onnxruntime."""
    path = path.strip().strip('"').strip("'")
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model not found: {path}")
    avail = available_backends()
    if backend == "auto":
        if avail["ultralytics"]:
            backend = "ultralytics"
        elif path.lower().endswith(".onnx") and avail["onnxruntime"]:
            backend = "onnxruntime"
        else:
            raise RuntimeError("No inference backend installed: pip install ultralytics (or onnxruntime for .onnx)")

    key = (os.path.abspath(path), backend, os.path.getmtime(path))
    with _lock:
        if key in _cache:
            return _cache[key]
        if backend == "ultralytics":
            from guava.models.ultralytics_backend import UltralyticsModel
            model: Model = UltralyticsModel(path, task=task)
        elif backend == "onnxruntime":
            from guava.models.onnx_backend import OnnxModel
            model = OnnxModel(path, device=device)
        else:
            raise ValueError(f"Unknown backend: {backend}")
        _cache[key] = model
        return model


def clear_cache() -> None:
    with _lock:
        _cache.clear()


def system_info() -> dict[str, Any]:
    info: dict[str, Any] = {"backends": available_backends(), "cuda": False, "gpu": None}
    try:
        import torch
        info["torch"] = torch.__version__
        if torch.cuda.is_available():
            info["cuda"] = True
            info["gpu"] = torch.cuda.get_device_name(0)
    except Exception:
        pass
    try:
        import onnxruntime as ort
        info["onnx_providers"] = ort.get_available_providers()
    except Exception:
        pass
    return info
