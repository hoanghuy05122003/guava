"""
Guava Native Pascal VOC Format Parser and Exporter.

Pure Python implementation using xml.etree.ElementTree:
- Reads Pascal VOC XML annotation files
- Exports Guava Dataset to standard VOC XML annotations
"""
from __future__ import annotations

import glob
import os
import shutil
import xml.etree.ElementTree as ET
from typing import Any

from guava.core.annotation import BboxAnnotation
from guava.core.dataset import Dataset
from guava.core.sample import ImageMetadata, Sample
from guava.core.schema import Category, DatasetSchema


def load_voc(
    annotations_dir: str,
    images_dir: str | None = None,
    subset: str = "default",
) -> Dataset:
    """
    Load Pascal VOC XML annotations into a Guava Dataset.
    """
    xml_files = glob.glob(os.path.join(annotations_dir, "*.xml"))
    schema = DatasetSchema()
    samples: list[Sample] = []

    for xml_path in xml_files:
        try:
            tree = ET.parse(xml_path)
            root = tree.getroot()
        except Exception:
            continue

        filename_el = root.find("filename")
        filename = filename_el.text if filename_el is not None and filename_el.text else os.path.splitext(os.path.basename(xml_path))[0] + ".jpg"

        filepath = os.path.join(images_dir, filename) if images_dir else filename

        size_el = root.find("size")
        width = 640
        height = 480
        if size_el is not None:
            w_el = size_el.find("width")
            h_el = size_el.find("height")
            if w_el is not None and w_el.text:
                width = int(w_el.text)
            if h_el is not None and h_el.text:
                height = int(h_el.text)

        sample_id = os.path.splitext(os.path.basename(xml_path))[0]
        sample = Sample(
            id=sample_id,
            filepath=filepath,
            metadata=ImageMetadata(width=width, height=height),
            subset=subset,
        )

        for idx, obj in enumerate(root.findall("object")):
            name_el = obj.find("name")
            label_name = name_el.text if name_el is not None and name_el.text else "object"
            schema.get_or_create(label_name)

            bndbox = obj.find("bndbox")
            if bndbox is not None:
                xmin = float(bndbox.find("xmin").text) if bndbox.find("xmin") is not None else 0.0
                ymin = float(bndbox.find("ymin").text) if bndbox.find("ymin") is not None else 0.0
                xmax = float(bndbox.find("xmax").text) if bndbox.find("xmax") is not None else 0.0
                ymax = float(bndbox.find("ymax").text) if bndbox.find("ymax") is not None else 0.0

                w = max(0.0, xmax - xmin)
                h = max(0.0, ymax - ymin)

                bbox = BboxAnnotation(
                    id=f"{sample_id}_{idx}",
                    label=label_name,
                    x=xmin,
                    y=ymin,
                    w=w,
                    h=h,
                    is_normalized=False,
                )
                sample.add_annotation(bbox)

        samples.append(sample)

    ds_name = os.path.basename(os.path.normpath(annotations_dir))
    ds = Dataset(name=ds_name, schema=schema, format="voc")
    ds.add_samples(samples)
    return ds


def export_voc(
    dataset: Dataset,
    output_dir: str,
    copy_images: bool = False,
) -> None:
    """
    Export a Guava Dataset to Pascal VOC XML format:
    - Annotations/
    - JPEGImages/ (if copy_images)
    """
    ann_dir = os.path.join(output_dir, "Annotations")
    os.makedirs(ann_dir, exist_ok=True)
    img_dir = os.path.join(output_dir, "JPEGImages")
    if copy_images:
        os.makedirs(img_dir, exist_ok=True)

    for sample in dataset:
        w = sample.metadata.width or 640
        h = sample.metadata.height or 480
        filename = os.path.basename(sample.filepath) if sample.filepath else f"{sample.id}.jpg"

        root = ET.Element("annotation")
        ET.SubElement(root, "folder").text = "VOC"
        ET.SubElement(root, "filename").text = filename

        source = ET.SubElement(root, "source")
        ET.SubElement(source, "database").text = "Guava Dataset"

        size = ET.SubElement(root, "size")
        ET.SubElement(size, "width").text = str(w)
        ET.SubElement(size, "height").text = str(h)
        ET.SubElement(size, "depth").text = str(sample.metadata.channels or 3)

        ET.SubElement(root, "segmented").text = "0"

        for ann in sample.annotations:
            if isinstance(ann, BboxAnnotation):
                abs_box = ann.to_absolute(w, h)
                obj = ET.SubElement(root, "object")
                ET.SubElement(obj, "name").text = ann.label
                ET.SubElement(obj, "pose").text = "Unspecified"
                ET.SubElement(obj, "truncated").text = "0"
                ET.SubElement(obj, "difficult").text = "0"

                bndbox = ET.SubElement(obj, "bndbox")
                ET.SubElement(bndbox, "xmin").text = str(int(round(abs_box.x)))
                ET.SubElement(bndbox, "ymin").text = str(int(round(abs_box.y)))
                ET.SubElement(bndbox, "xmax").text = str(int(round(abs_box.x + abs_box.w)))
                ET.SubElement(bndbox, "ymax").text = str(int(round(abs_box.y + abs_box.h)))

        tree = ET.ElementTree(root)
        out_xml = os.path.join(ann_dir, f"{sample.id}.xml")
        tree.write(out_xml, encoding="utf-8", xml_declaration=True)

        if copy_images and sample.filepath and os.path.exists(sample.filepath):
            shutil.copy2(sample.filepath, os.path.join(img_dir, filename))
