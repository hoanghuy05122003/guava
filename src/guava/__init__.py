"""
Guava 🍈 — Unified Dataset Management & AI Visual Studio.

Pure Python architecture combining:
  - Universal format I/O (COCO, YOLO, Pascal VOC, ImageFolder)
  - Rich sample data model with bounding boxes, segmentation, keypoints, and labels
  - Dataset transformations: filter, split (train/val/test), merge, take
  - Quality validation & health audit (missing media, invalid bboxes, class balance)
  - Brain AI curation (perceptual hashing, near-duplicate detection, visual similarity)
  - 100% Native Visual Web Application (Guava Studio)

Usage:
    import guava as gv

    # 1. Load dataset
    dataset = gv.load("coco", "/path/to/annotations.json")

    # 2. Inspect & audit
    print(dataset.stats())
    report = dataset.audit()

    # 3. Transform & split
    train_ds, val_ds, test_ds = dataset.split((0.8, 0.1, 0.1))

    # 4. Convert & export
    gv.export(dataset, "yolo", "/output/yolo")

    # 5. Launch Guava Studio
    session = gv.launch_app(dataset)
"""
from guava.version import __version__

# ── Core Data Model ──────────────────────────────────────────────────────────
from guava.core import (
    Annotation,
    BboxAnnotation,
    Category,
    Dataset,
    DatasetSchema,
    GuavaDataset,
    ImageMetadata,
    KeypointAnnotation,
    LabelAnnotation,
    PolygonAnnotation,
    Sample,
)

# ── I/O Operations ───────────────────────────────────────────────────────────
from guava.io import (
    FORMAT_ALIASES,
    detect_format,
    export,
    export_coco,
    export_imagefolder,
    export_voc,
    export_yolo,
    list_formats,
    load,
    load_coco,
    load_imagefolder,
    load_voc,
    load_yolo,
)

# ── Transforms & Auditing ────────────────────────────────────────────────────
from guava.transforms import (
    filter_dataset,
    merge_datasets,
    split_dataset,
    validate_dataset,
)

# ── Native Web Application ───────────────────────────────────────────────────
from guava.app import (
    close_app,
    get_session,
    launch_app,
)

# ── Submodules ───────────────────────────────────────────────────────────────
from guava import (
    app,
    brain,
    cli,
    core,
    eval,
    io,
    models,
    server,
    transforms,
)
from guava.eval import evaluate, evaluate_detections
from guava.models import InferenceConfig, apply_model, load_model

__all__ = [
    "__version__",
    # Core
    "Dataset",
    "GuavaDataset",
    "Sample",
    "ImageMetadata",
    "Annotation",
    "BboxAnnotation",
    "PolygonAnnotation",
    "LabelAnnotation",
    "KeypointAnnotation",
    "Category",
    "DatasetSchema",
    # I/O
    "load",
    "export",
    "detect_format",
    "list_formats",
    "FORMAT_ALIASES",
    "load_coco",
    "export_coco",
    "load_yolo",
    "export_yolo",
    "load_voc",
    "export_voc",
    "load_imagefolder",
    "export_imagefolder",
    # Transforms
    "split_dataset",
    "filter_dataset",
    "merge_datasets",
    "validate_dataset",
    # App
    "launch_app",
    "close_app",
    "get_session",
    # Models & evaluation (offline)
    "load_model",
    "apply_model",
    "InferenceConfig",
    "evaluate",
    "evaluate_detections",
    # Submodules
    "models",
    "eval",
    "core",
    "io",
    "transforms",
    "brain",
    "server",
    "app",
    "cli",
]
