"""
Unit tests for Guava native format converters: COCO, YOLO, VOC, ImageFolder.
"""
import os
import tempfile
import pytest

import guava as gv
from guava.core.annotation import BboxAnnotation
from guava.core.sample import ImageMetadata, Sample


@pytest.fixture
def sample_dataset():
    ds = gv.Dataset(name="test_converters_ds")
    for i in range(1, 11):
        s = Sample(
            id=f"img_{i}",
            filepath=f"path/to/img_{i}.jpg",
            subset="train" if i <= 7 else "val",
            metadata=ImageMetadata(width=640, height=480),
        )
        s.add_annotation(BboxAnnotation(
            id=f"box_{i}",
            label="car" if i % 2 == 0 else "person",
            x=50.0,
            y=60.0,
            w=100.0,
            h=120.0,
            confidence=0.9,
            is_normalized=False,
        ))
        ds.add_sample(s)
    return ds


def test_coco_export_and_load(sample_dataset):
    with tempfile.TemporaryDirectory() as tmpdir:
        json_file = os.path.join(tmpdir, "coco_test.json")
        gv.export(sample_dataset, "coco", json_file)
        assert os.path.exists(json_file)

        loaded = gv.load("coco", json_file)
        assert len(loaded) == 10
        assert len(loaded[0].annotations) == 1
        assert loaded[0].annotations[0].label in ("car", "person")


def test_yolo_export_and_load(sample_dataset):
    with tempfile.TemporaryDirectory() as tmpdir:
        gv.export(sample_dataset, "yolo", tmpdir, split_subsets=True)
        assert os.path.exists(os.path.join(tmpdir, "classes.txt"))
        assert os.path.exists(os.path.join(tmpdir, "data.yaml"))
        assert os.path.exists(os.path.join(tmpdir, "labels", "train"))

        # Check content of a label file
        label_files = os.listdir(os.path.join(tmpdir, "labels", "train"))
        assert len(label_files) == 7


def test_voc_export(sample_dataset):
    with tempfile.TemporaryDirectory() as tmpdir:
        gv.export(sample_dataset, "voc", tmpdir)
        ann_dir = os.path.join(tmpdir, "Annotations")
        assert os.path.exists(ann_dir)
        xml_files = os.listdir(ann_dir)
        assert len(xml_files) == 10
