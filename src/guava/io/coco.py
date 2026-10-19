"""
Guava Native COCO Format Parser and Exporter.

Pure Python implementation:
- Reads standard COCO instances JSON format
- Exports Guava Dataset to standard COCO JSON format
"""
from __future__ import annotations

import json
import os
import shutil
from typing import Any

from guava.core.annotation import BboxAnnotation, PolygonAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import ImageMetadata, Sample
from guava.core.schema import Category, DatasetSchema


def load_coco(
    annotation_path: str,
    image_dir: str | None = None,
    subset: str = "default",
) -> Dataset:
    """
    Load a COCO instances JSON dataset into a Guava Dataset.
    """
    with open(annotation_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Parse categories
    schema = DatasetSchema()
    cat_id_to_name: dict[int, str] = {}
    for cat in data.get("categories", []):
        cid = int(cat.get("id", 0))
        cname = cat.get("name", str(cid))
        supercat = cat.get("supercategory")
        schema.add_category(Category(id=cid, name=cname, supercategory=supercat))
        cat_id_to_name[cid] = cname

    # 2. Parse images
    img_id_to_sample: dict[int, Sample] = {}
    for img in data.get("images", []):
        iid = int(img.get("id", 0))
        file_name = img.get("file_name", f"{iid}.jpg")
        filepath = os.path.join(image_dir, file_name) if image_dir else file_name
        w = int(img.get("width", 640))
        h = int(img.get("height", 480))
        sample = Sample(
            id=str(iid),
            filepath=filepath,
            metadata=ImageMetadata(width=w, height=h),
            subset=subset,
            file_name=file_name,
        )
        img_id_to_sample[iid] = sample

    # 3. Parse annotations
    for ann in data.get("annotations", []):
        image_id = int(ann.get("image_id", 0))
        if image_id not in img_id_to_sample:
            continue

        sample = img_id_to_sample[image_id]
        category_id = int(ann.get("category_id", 0))
        label_name = cat_id_to_name.get(category_id, str(category_id))

        bbox = ann.get("bbox")
        ann_obj = None
        if bbox and len(bbox) == 4:
            x, y, w, h = [float(v) for v in bbox]
            ann_obj = BboxAnnotation(
                id=str(ann.get("id", len(sample.annotations))),
                label=label_name,
                x=x,
                y=y,
                w=w,
                h=h,
                confidence=ann.get("score", 1.0),
                is_normalized=False,
                attributes={"category_id": category_id, "iscrowd": ann.get("iscrowd", 0)},
            )
            sample.add_annotation(ann_obj)

        segmentation = ann.get("segmentation")
        if segmentation and isinstance(segmentation, list) and len(segmentation) > 0:
            if isinstance(segmentation[0], list):
                poly_pts = [[segmentation[0][i], segmentation[0][i+1]] for i in range(0, len(segmentation[0]) - 1, 2)]
                poly_ann = PolygonAnnotation(
                    id=f"{ann.get('id', '')}_poly",
                    label=label_name,
                    points=poly_pts,
                    confidence=ann.get("score", 1.0),
                )
                sample.add_annotation(poly_ann)

    ds_name = os.path.splitext(os.path.basename(annotation_path))[0]
    ds = Dataset(name=ds_name, schema=schema, format="coco")
    ds.add_samples(list(img_id_to_sample.values()))
    return ds


def export_coco(
    dataset: Dataset,
    output_file: str,
    image_dir: str | None = None,
    copy_images: bool = False,
) -> None:
    """
    Export a Guava Dataset to standard COCO instances JSON format.
    """
    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    if image_dir and copy_images:
        os.makedirs(image_dir, exist_ok=True)

    # Categories
    categories_list = []
    label_to_id: dict[str, int] = {}
    for i, cat in enumerate(dataset.schema.categories):
        cid = cat.id if cat.id else (i + 1)
        label_to_id[cat.name] = cid
        categories_list.append({
            "id": cid,
            "name": cat.name,
            "supercategory": cat.supercategory or "none",
        })

    # Ensure all labels in dataset are present in categories
    for sample in dataset:
        for ann in sample.annotations:
            if ann.label and ann.label not in label_to_id:
                cid = len(label_to_id) + 1
                label_to_id[ann.label] = cid
                categories_list.append({"id": cid, "name": ann.label, "supercategory": "none"})

    images_list = []
    annotations_list = []
    ann_counter = 1

    for sample_idx, sample in enumerate(dataset):
        try:
            image_id = int(sample.id)
        except ValueError:
            image_id = sample_idx + 1

        file_name = os.path.basename(sample.filepath) if sample.filepath else f"{sample.id}.jpg"
        w = sample.metadata.width or 640
        h = sample.metadata.height or 480

        images_list.append({
            "id": image_id,
            "file_name": file_name,
            "width": w,
            "height": h,
        })

        if copy_images and image_dir and sample.filepath and os.path.exists(sample.filepath):
            dest_img = os.path.join(image_dir, file_name)
            if not os.path.exists(dest_img):
                shutil.copy2(sample.filepath, dest_img)

        for ann in sample.annotations:
            if isinstance(ann, BboxAnnotation):
                abs_box = ann.to_absolute(w, h)
                cat_id = label_to_id.get(ann.label, 1)
                annotations_list.append({
                    "id": ann_counter,
                    "image_id": image_id,
                    "category_id": cat_id,
                    "bbox": [round(abs_box.x, 2), round(abs_box.y, 2), round(abs_box.w, 2), round(abs_box.h, 2)],
                    "area": round(abs_box.area, 2),
                    "score": ann.confidence if ann.confidence is not None else 1.0,
                    "iscrowd": 0,
                })
                ann_counter += 1

    coco_data = {
        "info": {"description": f"Guava exported dataset: {dataset.name}", "version": "1.0"},
        "licenses": [],
        "categories": categories_list,
        "images": images_list,
        "annotations": annotations_list,
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(coco_data, f, indent=2)
