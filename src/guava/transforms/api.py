"""
Guava Native Transforms & Quality Validation API.
"""
from __future__ import annotations

from typing import Any, Callable

from guava.core.dataset import Dataset
from guava.core.sample import Sample

__all__ = [
    "split_dataset",
    "filter_dataset",
    "merge_datasets",
    "validate_dataset",
]


def split_dataset(
    dataset: Dataset,
    splits: dict[str, float] | None = None,
    seed: int = 42,
) -> dict[str, Dataset]:
    """
    Split a dataset into named subsets (e.g. train, val, test).

    Args:
        dataset: Dataset to split.
        splits: Dict of split name -> ratio, e.g. {"train": 0.8, "val": 0.1, "test": 0.1}
        seed: Random seed for reproducibility.

    Returns:
        Dict mapping split name to Dataset subset.
    """
    if splits is None:
        splits = {"train": 0.8, "val": 0.1, "test": 0.1}

    names = tuple(splits.keys())
    ratios = tuple(splits.values())

    subsets = dataset.split(ratios=ratios, names=names, seed=seed)
    return {name: ds for name, ds in zip(names, subsets)}


def filter_dataset(
    dataset: Dataset,
    predicate: Callable[[Sample], bool],
) -> Dataset:
    """Filter samples in a dataset using a predicate function."""
    return dataset.filter(predicate)


def merge_datasets(*datasets: Dataset) -> Dataset:
    """Merge multiple datasets into a single combined dataset."""
    if not datasets:
        return Dataset(name="empty_merged")

    base = datasets[0]
    for other in datasets[1:]:
        base = base.merge(other)
    return base


def validate_dataset(dataset: Dataset) -> dict[str, Any]:
    """
    Perform a complete dataset quality audit:
    - Missing media verification
    - Degenerate bounding box detection (w <= 0, h <= 0)
    - Unannotated sample tracking
    - Class balance statistics
    """
    return dataset.audit()
