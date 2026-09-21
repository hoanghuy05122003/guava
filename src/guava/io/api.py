"""
Guava I/O API

High-level functions for loading and exporting datasets using
Datumaro's format engine (50+ supported formats).
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

__all__ = ["load", "export", "detect_format", "list_formats"]

# Mapping of friendly format aliases → Datumaro format names
FORMAT_ALIASES: dict[str, str] = {
    # Datumaro native
    "coco": "coco_instances",
    "coco_detection": "coco_instances",
    "coco_segmentation": "coco_panoptic",
    "coco_keypoints": "coco_person_keypoints",
    "coco_captions": "coco_captions",
    "yolo": "yolo_ultralytics",
    "yolo_v8": "yolo_ultralytics",
    "yolov8": "yolo_ultralytics",
    "yolo_v5": "yolo",
    "voc": "voc",
    "pascal_voc": "voc",
    "cvat": "cvat",
    "labelme": "labelme",
    "cityscapes": "cityscapes",
    "kitti": "kitti",
    "kitti_3d": "kitti_3d",
    "imagenet": "imagenet",
    "mnist": "mnist",
    "cifar10": "cifar",
    "cifar100": "cifar",
    "lfw": "lfw",
    "open_images": "open_images",
    "roboflow": "roboflow",
    "segment_anything": "segment_anything",
    "sam": "segment_anything",
    "ade20k": "ade20k2017",
    "camvid": "camvid",
    "mot": "mot_seq_gt",
    "mpii": "mpii",
    "widerface": "wider_face",
    "dota": "dota",
    "image_dir": "image_dir",
    "images": "image_dir",
    "arrow": "arrow",
}


def load(
    format: str,
    path: str | Path,
    *,
    subset: str | None = None,
    name: str | None = None,
    **kwargs: Any,
) -> Any:
    """
    Load a dataset from disk using the specified format.

    Wraps Datumaro's format detection and reading engine.

    Args:
        format: Dataset format. See ``guava.io.list_formats()`` for all options.
            Aliases like 'yolo', 'coco', 'voc' are supported.
        path: Path to the dataset directory or file.
        subset: Optional subset to load ('train', 'val', 'test').
        name: Optional name for the dataset.
        **kwargs: Additional arguments passed to the format reader.

    Returns:
        A :class:`guava.core.dataset.Dataset` object.

    Examples::

        import guava as gv

        # Load COCO dataset
        ds = gv.load("coco", "/path/to/coco")

        # Load YOLO dataset, train split only
        ds = gv.load("yolo", "/path/to/yolo", subset="train")

        # Load a folder of images
        ds = gv.load("images", "/path/to/images")
    """
    from guava.core.guava_dataset import GuavaDataset

    fmt = FORMAT_ALIASES.get(format.lower(), format)
    path = Path(path)

    try:
        from datumaro.components.dataset import Dataset as DatumDataset
        datum_ds = DatumDataset.import_from(str(path), fmt, **kwargs)
    except ImportError:
        raise ImportError("Datumaro is required. Install with: pip install datumaro")
    except Exception as e:
        raise ValueError(
            f"Failed to load dataset from {path!r} in format {fmt!r}: {e}\n"
            f"Available formats: {', '.join(sorted(FORMAT_ALIASES))}"
        ) from e

    ds = GuavaDataset.from_datumaro(datum_ds, name=name or path.name)
    ds._format = fmt

    if subset is not None:
        ds = ds.filter(lambda item: getattr(item, "subset", "") == subset)

    return ds


def export(
    dataset: Any,
    format: str,
    output_dir: str | Path,
    *,
    save_media: bool = False,
    **kwargs: Any,
) -> None:
    """
    Export a dataset to the specified format.

    Uses Datumaro's export engine to write in any of the 50+ supported formats.

    Args:
        dataset: A Guava Dataset to export.
        format: Target format. E.g. 'yolo', 'coco', 'voc', 'cvat', etc.
        output_dir: Directory to write output files to.
        save_media: If True, also copy media files to the output directory.
        **kwargs: Additional arguments passed to the format writer.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/input/coco")
        gv.export(ds, "yolo", "/output/yolo")
        gv.export(ds, "voc", "/output/voc", save_media=True)
    """
    fmt = FORMAT_ALIASES.get(format.lower(), format)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Convert to Datumaro Dataset for export
    datum_ds = dataset.to_datumaro()
    datum_ds.export(str(output_dir), fmt, save_media=save_media, **kwargs)


def detect_format(path: str | Path) -> str | None:
    """
    Auto-detect the format of a dataset directory.

    Uses Datumaro's format detection heuristics.

    Args:
        path: Path to the dataset directory.

    Returns:
        Detected format name, or None if not detected.
    """
    path = Path(path)

    try:
        from datumaro.components.environment import DEFAULT_ENVIRONMENT
        env = DEFAULT_ENVIRONMENT
        detected = []
        for fmt in env.importers:
            try:
                importer = env.importers[fmt]
                if hasattr(importer, 'detect') and importer.detect(str(path), env):
                    detected.append(fmt)
            except Exception:
                pass
        return detected[0] if detected else None
    except Exception:
        return None


def list_formats() -> list[str]:
    """
    List all supported dataset formats.

    Returns:
        Sorted list of format names (aliases + native names).
    """
    try:
        from datumaro.components.environment import DEFAULT_ENVIRONMENT
        native = sorted(list(DEFAULT_ENVIRONMENT.importers))
    except ImportError:
        native = []

    aliases = sorted(FORMAT_ALIASES.keys())
    return sorted(set(aliases + native))
