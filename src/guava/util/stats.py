"""Guava Dataset Statistics Utilities."""
from __future__ import annotations

from typing import Any

__all__ = ["compute_stats", "compute_stats_from_iter", "print_stats", "print_stats_from_iter"]


def compute_stats_from_iter(iterable: Any, name: str = "dataset", fmt: str | None = None) -> dict:
    """Compute stats from any iterable of DatasetItems (Guava or Datumaro)."""
    stats: dict[str, Any] = {
        "name": name,
        "format": fmt,
        "item_count": 0,
        "annotation_count": 0,
        "annotation_types": {},
        "label_distribution": {},
        "subset_distribution": {},
    }

    for item in iterable:
        stats["item_count"] += 1
        subset = getattr(item, "subset", "") or "default"
        stats["subset_distribution"][subset] = stats["subset_distribution"].get(subset, 0) + 1
        annotations = getattr(item, "annotations", [])
        stats["annotation_count"] += len(annotations)
        for ann in annotations:
            ann_type = type(ann).__name__
            stats["annotation_types"][ann_type] = stats["annotation_types"].get(ann_type, 0) + 1
            if hasattr(ann, "label") and ann.label is not None:
                label = str(ann.label)
                stats["label_distribution"][label] = stats["label_distribution"].get(label, 0) + 1

    stats["label_distribution"] = dict(
        sorted(stats["label_distribution"].items(), key=lambda x: -x[1])
    )
    return stats


def compute_stats(dataset: Any) -> dict:
    """
    Compute statistics for a Guava or Datumaro Dataset.

    Args:
        dataset: Any dataset-like object that is iterable.

    Returns:
        Statistics dict with item_count, annotation_count, label_distribution, etc.
    """
    name = getattr(dataset, "name", "dataset") or "dataset"
    fmt = getattr(dataset, "format", None) or getattr(dataset, "_format", None)
    return compute_stats_from_iter(dataset, name=name, fmt=fmt)


def print_stats_dict(s: dict) -> None:
    """Print a statistics dict in human-readable format."""
    print(f"\n{'=' * 50}")
    print("🍈 Guava Dataset Statistics")
    print(f"{'=' * 50}")
    print(f"  Name:             {s.get('name', 'N/A')}")
    print(f"  Format:           {s.get('format') or 'N/A'}")
    print(f"  Items:            {s.get('item_count', 0):,}")
    print(f"  Annotations:      {s.get('annotation_count', 0):,}")

    subset_dist = s.get("subset_distribution", {})
    if subset_dist:
        print("\n  Subsets:")
        for subset, count in sorted(subset_dist.items()):
            print(f"    {subset:<20} {count:>6,}")

    ann_types = s.get("annotation_types", {})
    if ann_types:
        print("\n  Annotation types:")
        for ann_type, count in sorted(ann_types.items(), key=lambda x: -x[1]):
            print(f"    {ann_type:<20} {count:>6,}")

    label_dist = s.get("label_distribution", {})
    if label_dist:
        print("\n  Top 20 labels:")
        for label, count in list(label_dist.items())[:20]:
            print(f"    {label:<20} {count:>6,}")

    print(f"{'=' * 50}\n")


def print_stats_from_iter(iterable: Any, name: str = "dataset", fmt: str | None = None) -> None:
    """Print stats from any iterable of DatasetItems."""
    print_stats_dict(compute_stats_from_iter(iterable, name=name, fmt=fmt))


def print_stats(dataset: Any) -> None:
    """Print human-readable statistics for a Guava or Datumaro Dataset."""
    print_stats_dict(compute_stats(dataset))
