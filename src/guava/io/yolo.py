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
        # Check standard locations
        txt_classes = os.path.join(data_dir, "classes.txt")
        yaml_classes = os.path.join(data_dir, "data.yaml")
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

        if os.path.exists(label_path):
            with open(label_path, "r", encoding="utf-8") as f:
                for line_idx, line in enumerate(f):
                    parts = line.strip().split()
                    if len(parts) >= 5:
                        cls_idx = int(parts[0])
                        cx, cy, nw, nh = [float(v) for v in parts[1:5]]
                        label_name = classes[cls_idx] if cls_idx < len(classes) else f"class_{cls_idx}"
                        # Convert (center_x, center_y, w, h) -> top-left (x, y, w, h)
                        top_left_x = max(0.0, cx - nw / 2.0)
                        top_left_y = max(0.0, cy - nh / 2.0)
                        conf = float(parts[5]) if len(parts) > 5 else 1.0

                        bbox = BboxAnnotation(
                            id=f"{base_name}_{line_idx}",
                            label=label_name,
                            x=top_left_x,
                            y=top_left_y,
                            w=nw,
                            h=nh,
                            is_normalized=True,
                            confidence=conf,
                        )
                        sample.add_annotation(bbox)

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
                if isinstance(ann, BboxAnnotation):
                    norm_box = ann.to_normalized(w, h)
                    cls_idx = class_to_idx.get(ann.label, 0)
                    cx = norm_box.x + norm_box.w / 2.0
                    cy = norm_box.y + norm_box.h / 2.0
                    f.write(f"{cls_idx} {cx:.6f} {cy:.6f} {norm_box.w:.6f} {norm_box.h:.6f}\n")

        if copy_images and sample.filepath and os.path.exists(sample.filepath):
            os.makedirs(img_dest_dir, exist_ok=True)
            fname = os.path.basename(sample.filepath)
            shutil.copy2(sample.filepath, os.path.join(img_dest_dir, fname))
