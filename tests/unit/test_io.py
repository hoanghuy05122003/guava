"""
Unit tests for Guava I/O API — format aliases and listing.
"""
import pytest

from guava.io.api import FORMAT_ALIASES, list_formats


class TestFormatAliases:
    def test_coco_alias(self):
        assert "coco" in FORMAT_ALIASES
        assert FORMAT_ALIASES["coco"] == "coco_instances"

    def test_yolo_alias(self):
        assert "yolo" in FORMAT_ALIASES
        assert "yolov8" in FORMAT_ALIASES

    def test_voc_alias(self):
        assert "voc" in FORMAT_ALIASES
        assert "pascal_voc" in FORMAT_ALIASES

    def test_all_key_formats_present(self):
        required = ["coco", "yolo", "voc", "cvat", "labelme", "cityscapes",
                    "kitti", "imagenet", "mnist", "cifar10", "lfw", "mot",
                    "images", "roboflow", "sam"]
        for fmt in required:
            assert fmt in FORMAT_ALIASES, f"Missing format alias: {fmt}"


class TestListFormats:
    def test_list_formats_returns_list(self):
        formats = list_formats()
        assert isinstance(formats, list)
        assert len(formats) > 0

    def test_list_formats_includes_aliases(self):
        formats = list_formats()
        assert "coco" in formats
        assert "yolo" in formats
        assert "voc" in formats
