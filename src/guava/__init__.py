"""
Guava 🍈 — Unified Dataset Management & Visualization Platform

Combines the best of:
  - Datumaro (Intel): 50+ format I/O, Rust/C++ core, transforms, validation
  - FiftyOne (Voxel51): Visual web app, embeddings, AI curation, integrations

Usage::

    import guava as gv

    # Load a dataset
    dataset = gv.load("coco", "/path/to/data")

    # Visualize
    session = gv.launch_app(dataset)

    # Export to another format
    gv.export(dataset, format="yolo", output_dir="/path/to/output")

"""

from guava.version import __version__

# ── Core data model ─────────────────────────────────────────────────────────
from guava.core.guava_dataset import GuavaDataset, Dataset  # noqa: F401

# Try importing Datumaro types (optional, only if datumaro is installed)
try:
    from datumaro.components.dataset_base import DatasetItem  # noqa: F401
    from datumaro.components.annotation import (  # noqa: F401
        Annotation,
        Label,
        Bbox,
        Polygon,
        Mask,
        Points,
        Caption,
        Cuboid3d,
        Ellipse,
    )
    # PolyLine is the correct name in Datumaro (note capital L)
    try:
        from datumaro.components.annotation import PolyLine  # noqa: F401
        Polyline = PolyLine  # alias for convenience
    except ImportError:
        pass
    from datumaro.components.media import Image, Video, PointCloud  # noqa: F401
    _DATUMARO_AVAILABLE = True
except ImportError:
    _DATUMARO_AVAILABLE = False

# ── I/O functions ────────────────────────────────────────────────────────────
from guava.io.api import load, export, detect_format  # noqa: F401

# ── Transform functions ──────────────────────────────────────────────────────
from guava.transforms.api import (  # noqa: F401
    filter_dataset,
    merge_datasets,
    split_dataset,
    validate_dataset,
)

# ── App launcher (from FiftyOne) ─────────────────────────────────────────────
from guava.app.api import launch_app, close_app  # noqa: F401

# ── Submodules available for explicit import ─────────────────────────────────
from guava import (  # noqa: F401
    core,
    io,
    transforms,
    storage,
    brain,
    util,
)

__all__ = [
    "__version__",
    # Core
    "Dataset",
    "GuavaDataset",
    "DatasetItem",
    "Annotation",
    "Label",
    "Bbox",
    "Polygon",
    "Mask",
    "Points",
    "Polyline",
    "Caption",
    "Cuboid3d",
    "Ellipse",
    "Image",
    "Video",
    "PointCloud",
    # I/O
    "load",
    "export",
    "detect_format",
    # Transforms
    "filter_dataset",
    "merge_datasets",
    "split_dataset",
    "validate_dataset",
    # App
    "launch_app",
    "close_app",
    # Submodules
    "core",
    "io",
    "transforms",
    "storage",
    "brain",
    "integrations",
    "plugins",
    "zoo",
    "cli",
    "util",
]
