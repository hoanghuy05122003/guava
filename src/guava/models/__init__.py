"""
Guava offline model layer.

    import guava as gv
    model = gv.models.load_model(r"D:/models/best.pt")                 # Ultralytics (.pt/.onnx/.engine)
    model = gv.models.load_model("best.onnx", backend="onnxruntime")   # no torch needed
    gv.models.apply_model(dataset, model, gv.models.InferenceConfig(conf=0.25))
"""
from guava.models.apply import apply_model, clear_predictions, prediction_models, resolve_run_name, run_meta, sample_ran
from guava.models.base import Detection, InferenceConfig, Model, Prediction, default_model_name, weights_sha1
from guava.models.registry import (
    available_backends,
    clear_cache,
    discover_models,
    load_model,
    model_dirs,
    system_info,
)

__all__ = [
    "Model",
    "Detection",
    "Prediction",
    "InferenceConfig",
    "load_model",
    "discover_models",
    "model_dirs",
    "available_backends",
    "system_info",
    "clear_cache",
    "apply_model",
    "clear_predictions",
    "prediction_models",
    "sample_ran",
    "resolve_run_name",
    "run_meta",
    "default_model_name",
    "weights_sha1",
]
