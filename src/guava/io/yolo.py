"""
Guava Native YOLO Format Parser and Exporter.

Pure Python implementation:
- Reads YOLO normalized txt format (class cx cy w h)
- Supports classes.txt and data.yaml
- Exports Guava Dataset to standard YOLO structure
"""
from __future__ import annotations

import glob
import os
import shutil
from typing import Any

from guava.core.annotation import BboxAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import ImageMetadata, Sample
from guava.core.schema import Category, DatasetSchema


def parse_label_line(line: str, classes: list[str], ann_id: str) -> BboxAnnotation | None:
    """One YOLO label line, any of the Ultralytics label formats (all normalized):

      class cx cy w h [conf]               detection box
      class x1 y1 x2 y2 x3 y3 x4 y4        oriented box (OBB), shape "obb"
      class x1 y1 ... xn yn  (n >= 3)       segmentation polygon, shape "polygon"

    OBB and polygons become a BboxAnnotation holding the enclosing box, with the
    corner points in attributes["points"] and the kind in attributes["shape"].
    """
    parts = line.strip().split()
    if len(parts) < 5:
        return None
    try:
        cls_idx = int(float(parts[0]))
        vals = [float(v) for v in parts[1:]]
    except ValueError:
        return None
    label = classes[cls_idx] if 0 <= cls_idx < len(classes) else f"class_{cls_idx}"
    if len(vals) in (4, 5):
        cx, cy, nw, nh = vals[:4]
        conf = vals[4] if len(vals) == 5 else 1.0
        return BboxAnnotation(id=ann_id, label=label, x=max(0.0, cx - nw / 2.0), y=max(0.0, cy - nh / 2.0),
                              w=nw, h=nh, is_normalized=True, confidence=conf)
    if len(vals) % 2:
        return None
    pts = [[vals[i], vals[i + 1]] for i in range(0, len(vals), 2)]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    x1, y1 = max(0.0, min(xs)), max(0.0, min(ys))
    x2, y2 = min(1.0, max(xs)), min(1.0, max(ys))
    return BboxAnnotation(id=ann_id, label=label, x=x1, y=y1, w=max(0.0, x2 - x1), h=max(0.0, y2 - y1),
                          is_normalized=True, confidence=1.0,
                          attributes={"points": pts, "shape": "obb" if len(pts) == 4 else "polygon"})


def format_label_line(ann: BboxAnnotation, cls_idx: int, w: int | None, h: int | None, as_obb: bool = False) -> str:
    """Inverse of parse_label_line: OBB / polygon annotations keep their points; a plain box
    is written as `cx cy w h`, or as its 4 corners when `as_obb` (OBB datasets)."""
    pts = ann.attributes.get("points")
    if not pts:
        b = ann if ann.is_normalized else ann.to_normalized(w or 1, h or 1)
        if not as_obb:
            return f"{cls_idx} {b.x + b.w / 2:.6f} {b.y + b.h / 2:.6f} {b.w:.6f} {b.h:.6f}\n"
        pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.h], [b.x, b.y + b.h]]
    return f"{cls_idx} " + " ".join(f"{float(x):.6f} {float(y):.6f}" for x, y in pts) + "\n"


def _find_class_file(data_dir: str) -> tuple[str | None, str | None]:
    """classes.txt / data.yaml (or another *.yaml with names:) in the folder or up to 2 parents."""
    d = os.path.abspath(data_dir)
    for _ in range(3):
        txt = os.path.join(d, "classes.txt")
        if os.path.exists(txt):
            return txt, None
        yamls = [os.path.join(d, "data.yaml")] + sorted(glob.glob(os.path.join(d, "*.yaml")))
        for y in yamls:
            if os.path.exists(y):
                try:
                    with open(y, "r", encoding="utf-8") as f:
                        if "names" in f.read():
                            return None, y
                except OSError:
                    pass
        parent = os.path.dirname(d)
        if parent == d:
            break
        d = parent
    return None, None


def load_yolo(
    data_dir: str,
    classes_file: str | None = None,
    image_exts: tuple[str, ...] = (".jpg", ".jpeg", ".png", ".bmp", ".webp"),
) -> Dataset:
    """
    Load a YOLO dataset into a Guava Dataset.
    """
    # 1. Discover classes
    classes: list[str] = []
    if classes_file and os.path.exists(classes_file):
        with open(classes_file, "r", encoding="utf-8") as f:
            classes = [line.strip() for line in f if line.strip()]
    else:
        # Check standard locations (also in the parent folders, for a path pointing at images/ or train/)
        txt_classes, yaml_classes = _find_class_file(data_dir)
        txt_classes = txt_classes or os.path.join(data_dir, "classes.txt")
        yaml_classes = yaml_classes or os.path.join(data_dir, "data.yaml")
        if os.path.exists(txt_classes):
            with open(txt_classes, "r", encoding="utf-8") as f:
                classes = [line.strip() for line in f if line.strip()]
        elif os.path.exists(yaml_classes):
            try:
                import yaml
                with open(yaml_classes, "r", encoding="utf-8") as f:
                    y_data = yaml.safe_load(f)
                    if isinstance(y_data, dict):
                        y_names = y_data.get("names")
                        if isinstance(y_names, dict):
                            classes = [str(y_names[k]) for k in sorted(y_names.keys(), key=lambda x: int(x))]
                        elif isinstance(y_names, list):
                            classes = [str(c) for c in y_names]
            except Exception:
                pass
            if not classes:
                with open(yaml_classes, "r", encoding="utf-8") as f:
                    for line in f:
                        if "names:" in line:
                            continue
                        if line.strip().startswith("-"):
                            classes.append(line.strip().lstrip("- ").strip("'\""))

    schema = DatasetSchema([Category(name=c, id=i) for i, c in enumerate(classes)])

    # 2. Find images
    samples: list[Sample] = []
    img_files: list[str] = []
    for ext in image_exts:
        img_files.extend(glob.glob(os.path.join(data_dir, "**", f"*{ext}"), recursive=True))

    for img_path in img_files:
        base_name = os.path.splitext(os.path.basename(img_path))[0]
        # Look for corresponding .txt label
        label_path = os.path.splitext(img_path)[0] + ".txt"
        if not os.path.exists(label_path):
            # Try in sibling labels/ dir if images/ is used
            parent_dir = os.path.dirname(img_path)
            label_dir = parent_dir.replace("images", "labels")
            label_path = os.path.join(label_dir, f"{base_name}.txt")

        # Determine subset from path (train/val/test)
        norm_path = img_path.replace("\\", "/").lower()
        subset = "train" if "train" in norm_path else ("val" if "val" in norm_path else ("test" if "test" in norm_path else "default"))

        sample = Sample(
            id=base_name,
            filepath=img_path,
            subset=subset,
        )
        # where edited labels are written back (also for images that had no label file yet)
        sample.fields["label_path"] = label_path

        if os.path.exists(label_path):
            with open(label_path, "r", encoding="utf-8") as f:
                for line_idx, line in enumerate(f):
                    ann = parse_label_line(line, classes, f"{base_name}_{line_idx}")
                    if ann is not None:
                        sample.add_annotation(ann)

        samples.append(sample)

    ds_name = os.path.basename(os.path.normpath(data_dir))
    ds = Dataset(name=ds_name, schema=schema, format="yolo")
    ds.add_samples(samples)
    return ds


def export_yolo(
    dataset: Dataset,
    output_dir: str,
    split_subsets: bool = True,
    copy_images: bool = False,
) -> None:
    """
    Export a Guava Dataset to standard YOLO format:
    - data.yaml / classes.txt
    - images/{train,val,test} (if split_subsets)
    - labels/{train,val,test} (if split_subsets)
    """
    os.makedirs(output_dir, exist_ok=True)

    # 1. Build classes map
    classes = dataset.schema.class_names
    if not classes:
        all_labels = set()
        for s in dataset:
            for ann in s.annotations:
                if ann.label:
                    all_labels.add(ann.label)
        classes = sorted(all_labels)

    class_to_idx = {c: i for i, c in enumerate(classes)}

    # Save classes.txt
    with open(os.path.join(output_dir, "classes.txt"), "w", encoding="utf-8") as f:
        for c in classes:
            f.write(f"{c}\n")

    # Save data.yaml
    with open(os.path.join(output_dir, "data.yaml"), "w", encoding="utf-8") as f:
        f.write(f"names:\n")
        for i, c in enumerate(classes):
            f.write(f"  {i}: '{c}'\n")
        f.write(f"nc: {len(classes)}\n")

    # 2. Write annotations
    for sample in dataset:
        subset = sample.subset if split_subsets and sample.subset else "train"
        label_dir = os.path.join(output_dir, "labels", subset) if split_subsets else os.path.join(output_dir, "labels")
        img_dest_dir = os.path.join(output_dir, "images", subset) if split_subsets else os.path.join(output_dir, "images")
        os.makedirs(label_dir, exist_ok=True)

        w = sample.metadata.width or 640
        h = sample.metadata.height or 480

        label_file = os.path.join(label_dir, f"{sample.id}.txt")
        with open(label_file, "w", encoding="utf-8") as f:
            for ann in sample.annotations:
                if isinstance(ann, BboxAnnotation) and ann.attributes.get("kind") != "prediction":
                    f.write(format_label_line(ann, class_to_idx.get(ann.label, 0), w, h))

        if copy_images and sample.filepath and os.path.exists(sample.filepath):
            os.makedirs(img_dest_dir, exist_ok=True)
            fname = os.path.basename(sample.filepath)
            shutil.copy2(sample.filepath, os.path.join(img_dest_dir, fname))
