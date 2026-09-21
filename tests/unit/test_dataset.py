"""
Unit tests for Guava core — Dataset class.
"""
import pytest

from guava.core.dataset import Dataset


class TestDatasetCreation:
    def test_empty_dataset(self):
        ds = Dataset(name="test")
        assert ds.name == "test"
        assert len(ds) == 0
        assert ds.format is None

    def test_dataset_repr(self):
        ds = Dataset(name="my_ds")
        r = repr(ds)
        assert "my_ds" in r
        assert "Dataset" in r

    def test_dataset_iter_empty(self):
        ds = Dataset(name="empty")
        assert list(ds) == []


class TestDatasetSplit:
    def test_split_default(self):
        ds = Dataset(name="big")
        # Manually add mock items
        from unittest.mock import MagicMock
        ds._items = [MagicMock(id=str(i)) for i in range(100)]

        subsets = ds.split(ratios=(0.8, 0.1, 0.1), names=("train", "val", "test"))
        assert len(subsets) == 3

        total = sum(len(s) for s in subsets)
        assert total == 100

    def test_split_two_way(self):
        ds = Dataset(name="data")
        from unittest.mock import MagicMock
        ds._items = [MagicMock(id=str(i)) for i in range(50)]

        train, val = ds.split(ratios=(0.8, 0.2), names=("train", "val"))
        assert len(train) + len(val) == 50


class TestDatasetFilter:
    def test_filter_keeps_matching(self):
        ds = Dataset(name="test")
        from unittest.mock import MagicMock
        items = [MagicMock(id=str(i), annotations=[MagicMock()] if i % 2 == 0 else []) for i in range(10)]
        ds._items = items

        filtered = ds.filter(lambda item: len(item.annotations) > 0)
        assert len(filtered) == 5

    def test_filter_empty_result(self):
        ds = Dataset(name="test")
        from unittest.mock import MagicMock
        ds._items = [MagicMock(id=str(i)) for i in range(5)]

        filtered = ds.filter(lambda item: False)
        assert len(filtered) == 0


class TestDatasetMerge:
    def test_merge_two_datasets(self):
        ds1 = Dataset(name="ds1")
        ds2 = Dataset(name="ds2")
        from unittest.mock import MagicMock
        ds1._items = [MagicMock(id="a")]
        ds2._items = [MagicMock(id="b")]

        merged = ds1.merge(ds2)
        assert len(merged) == 2

    def test_merge_operator(self):
        ds1 = Dataset(name="ds1")
        ds2 = Dataset(name="ds2")
        from unittest.mock import MagicMock
        ds1._items = [MagicMock(id="a"), MagicMock(id="b")]
        ds2._items = [MagicMock(id="c")]

        merged = ds1 + ds2
        assert len(merged) == 3


class TestDatasetTake:
    def test_take_n_samples(self):
        ds = Dataset(name="test")
        from unittest.mock import MagicMock
        ds._items = [MagicMock(id=str(i)) for i in range(100)]

        sampled = ds.take(10, seed=42)
        assert len(sampled) == 10

    def test_take_reproducible(self):
        ds = Dataset(name="test")
        from unittest.mock import MagicMock
        ds._items = [MagicMock(id=str(i)) for i in range(100)]

        s1 = [item.id for item in ds.take(10, seed=42)]
        s2 = [item.id for item in ds.take(10, seed=42)]
        assert s1 == s2
