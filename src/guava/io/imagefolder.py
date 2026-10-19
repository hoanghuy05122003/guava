"""
Guava Native ImageFolder / Directory Parser and Exporter.

Standard directory structure:
  root/
    class_a/
      img1.jpg
      img2.jpg
    class_b/
      img3.jpg
"""
from __future__ import annotations

import glob
import os
import shutil
from typing import Any

from guava.core.annotation import LabelAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import Sample
from guava.core.schema import Category, DatasetSchema


def load_imagefolder(
    root_dir: str,
    image_exts: tuple[str, ...] = (".jpg", ".jpeg", ".png", ".bmp", ".webp"),
) -> Dataset:
    """
    Load an ImageFolder dataset into a Guava Dataset.
    """
    schema = DatasetSchema()
    samples: list[Sample] = []

    subdirs = [d for d in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, d))]

    if subdirs:
        # Standard class-per-directory structure
        for cat_name in sorted(subdirs):
            cat_dir = os.path.join(root_dir, cat_name)
            schema.get_or_create(cat_name)

            for ext in image_exts:
                for img_path in glob.glob(os.path.join(cat_dir, f"*{ext}")):
                    sid = os.path.splitext(os.path.basename(img_path))[0]
                    s = Sample(id=sid, filepath=img_path, subset="default")
                    s.add_annotation(LabelAnnotation(label=cat_name))
                    samples.append(s)
    else:
        # Flat directory with image files
        for ext in image_exts:
            for img_path in glob.glob(os.path.join(root_dir, f"*{ext}")):
                sid = os.path.splitext(os.path.basename(img_path))[0]
                s = Sample(id=sid, filepath=img_path, subset="default")
                samples.append(s)

    ds_name = os.path.basename(os.path.normpath(root_dir))
    ds = Dataset(name=ds_name, schema=schema, format="imagefolder")
    ds.add_samples(samples)
    return ds


def export_imagefolder(
    dataset: Dataset,
    output_dir: str,
    copy_images: bool = True,
) -> None:
    """
    Export a Guava Dataset to ImageFolder structure.
    """
    os.makedirs(output_dir, exist_ok=True)

    for sample in dataset:
        label = "unlabeled"
        for ann in sample.annotations:
            if ann.label:
                label = ann.label
                break

        class_dir = os.path.join(output_dir, label)
        os.makedirs(class_dir, exist_ok=True)

        if copy_images and sample.filepath and os.path.exists(sample.filepath):
            fname = os.path.basename(sample.filepath)
            shutil.copy2(sample.filepath, os.path.join(class_dir, fname))
