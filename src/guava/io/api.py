"""
Guava Native I/O API.

High-level functions for loading and exporting datasets across standard formats:
- COCO (instances JSON)
- YOLO (v5, v8, ultralytics normalized format)
- Pascal VOC (XML format)
- ImageFolder / Directory
- Guava Native Manifest (.guava / JSON)
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Any

from guava.core.dataset import Dataset
from guava.io.coco import export_coco, load_coco
from guava.io.imagefolder import export_imagefolder, load_imagefolder
from guava.io.voc import export_voc, load_voc
from guava.io.yolo import export_yolo, load_yolo

__all__ = ["load", "export", "detect_format", "list_formats", "FORMAT_ALIASES"]

# Complete format aliases dictionary
FORMAT_ALIASES: dict[str, str] = {
    "coco": "coco_instances",
    "coco_instances": "coco_instances",
    "coco_detection": "coco_instances",
    "coco_segmentation": "coco_panoptic",
    "coco_keypoints": "coco_person_keypoints",
    "coco_captions": "coco_captions",
    "yolo": "yolo_ultralytics",
    "yolov5": "yolo_ultralytics",
    "yolov8": "yolo_ultralytics",
    "yolo_v8": "yolo_ultralytics",
    "yolo_v5": "yolo_ultralytics",
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
    "cifar": "cifar",
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
    "imagefolder": "imagefolder",
    "image_dir": "imagefolder",
    "images": "imagefolder",
    "guava": "guava_native",
}


def list_formats() -> list[str]:
    """Return list of all supported formats and aliases."""
    return sorted(list(FORMAT_ALIASES.keys()))


def detect_format(path: str | Path) -> str:
    """
    Auto-detect dataset format based on file extension and directory contents.
    """
    p = str(path)
    if os.path.isfile(p):
        if p.endswith(".guava.json"):
            return "guava"
        if p.endswith(".json"):
            return "coco"
        elif p.endswith(".xml"):
            return "voc"
        elif p.endswith(".yaml") or p.endswith(".yml"):
            return "yolo"
        elif p.endswith(".txt"):
            return "yolo"
        return "coco"

    if os.path.isdir(p):
        # Look for YOLO
        if (
            os.path.exists(os.path.join(p, "labels"))
            or os.path.exists(os.path.join(p, "data.yaml"))
            or os.path.exists(os.path.join(p, "classes.txt"))
            or os.path.exists(os.path.join(p, "train", "labels"))
            or os.path.exists(os.path.join(p, "train", "images"))
        ):
            return "yolo"
        if os.path.exists(os.path.join(p, "Annotations")):
            return "voc"
        if any(f.endswith(".json") and "annotation" in f.lower() for f in os.listdir(p) if os.path.isfile(os.path.join(p, f))):
            return "coco"
        if any(f.endswith(".json") for f in os.listdir(p) if os.path.isfile(os.path.join(p, f))):
            return "coco"
        return "imagefolder"

    return "coco"


def load(
    format: str,
    path: str | Path,
    *,
    subset: str = "default",
    name: str | None = None,
    **kwargs: Any,
) -> Dataset:
    """
    Load a dataset from disk in the specified format.

    Supported formats:
      - 'coco': COCO instances JSON file (or dir with image_dir=...)
      - 'yolo': YOLO directory with data.yaml/classes.txt and labels/
      - 'voc': Pascal VOC directory with Annotations/ and JPEGImages/
      - 'imagefolder' / 'images': Folder of images (optionally subfolders per class)
      - 'guava': Native JSON manifest
    """
    p = str(path)
    fmt = format.lower()
    canonical = FORMAT_ALIASES.get(fmt, fmt)

    if "coco" in canonical:
        if os.path.isdir(p):
            # Find json file in directory
            json_files = [f for f in os.listdir(p) if f.endswith(".json")]
            json_path = os.path.join(p, json_files[0]) if json_files else p
            img_dir = kwargs.get("image_dir", p)
        else:
            json_path = p
            img_dir = kwargs.get("image_dir", os.path.dirname(p))
        ds = load_coco(json_path, image_dir=img_dir, subset=subset)

    elif "yolo" in canonical:
        ds = load_yolo(p, classes_file=kwargs.get("classes_file"))

    elif "voc" in canonical:
        ann_dir = os.path.join(p, "Annotations") if os.path.isdir(os.path.join(p, "Annotations")) else p
        img_dir = os.path.join(p, "JPEGImages") if os.path.isdir(os.path.join(p, "JPEGImages")) else kwargs.get("image_dir")
        ds = load_voc(ann_dir, images_dir=img_dir, subset=subset)

    elif canonical in ("imagefolder", "image_dir", "images"):
        ds = load_imagefolder(p)

    elif canonical == "guava_native":
        ds = Dataset.load_manifest(p)

    else:
        # Fallback to imagefolder if directory
        if os.path.isdir(p):
            ds = load_imagefolder(p)
        else:
            raise ValueError(f"Unsupported dataset format: {format!r}")

    if name:
        ds.name = name
    return ds


def export(
    dataset: Dataset,
    format: str,
    output_dir: str | Path,
    **kwargs: Any,
) -> None:
    """
    Export a Guava Dataset to the specified format.

    Supported formats:
      - 'coco': Exports to output_dir/annotations.json
      - 'yolo': Exports to YOLO images/ and labels/ with data.yaml
      - 'voc': Exports to Annotations/ and JPEGImages/
      - 'imagefolder': Organizes images by class folder
      - 'guava': Exports native Guava manifest
    """
    out = str(output_dir)
    fmt = format.lower()
    canonical = FORMAT_ALIASES.get(fmt, fmt)
    copy_images = kwargs.get("copy_images", kwargs.get("save_media", False))

    if "coco" in canonical:
        if out.endswith(".json"):
            json_file = out
            img_dir = kwargs.get("image_dir", os.path.join(os.path.dirname(out), "images"))
        else:
            json_file = os.path.join(out, "annotations.json")
            img_dir = os.path.join(out, "images")
        export_coco(dataset, json_file, image_dir=img_dir, copy_images=copy_images)

    elif "yolo" in canonical:
        export_yolo(dataset, out, split_subsets=kwargs.get("split_subsets", True), copy_images=copy_images)

    elif "voc" in canonical:
        export_voc(dataset, out, copy_images=copy_images)

    elif canonical in ("imagefolder", "image_dir", "images"):
        export_imagefolder(dataset, out, copy_images=copy_images)

    elif canonical == "guava_native":
        json_file = out if out.endswith(".json") else os.path.join(out, "dataset.guava.json")
        dataset.save(json_file)

    else:
        raise ValueError(f"Unsupported export format: {format!r}")
