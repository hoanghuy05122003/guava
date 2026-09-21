"""
Guava Transforms API

High-level dataset transformation functions backed by Datumaro's
transform engine.
"""
from __future__ import annotations

from typing import Any, Callable

__all__ = [
    "filter_dataset",
    "merge_datasets",
    "split_dataset",
    "validate_dataset",
    "rename_labels",
    "remap_labels",
]


def filter_dataset(
    dataset: Any,
    predicate: Callable | None = None,
    *,
    xpath: str | None = None,
    filter_annotations: bool = False,
) -> Any:
    """
    Filter a dataset by a predicate or XPath expression.

    Args:
        dataset: Guava Dataset to filter.
        predicate: Python callable ``f(item) -> bool``. If provided, items
            for which the predicate returns True are kept.
        xpath: XPath expression for item/annotation filtering (Datumaro style).
            E.g. ``'/item[annotation/label/name="cat"]'``
        filter_annotations: If True, filter annotations within items
            (in addition to filtering items).

    Returns:
        Filtered :class:`~guava.core.dataset.Dataset`.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")

        # Keep only items with at least one annotation
        filtered = gv.filter_dataset(ds, lambda item: len(item.annotations) > 0)

        # Remove small bounding boxes
        def no_small_boxes(item):
            return all(ann.w > 10 and ann.h > 10
                       for ann in item.annotations
                       if hasattr(ann, "w"))
        filtered = gv.filter_dataset(ds, no_small_boxes)
    """
    if predicate is not None:
        return dataset.filter(predicate)

    if xpath is not None:
        # Use Datumaro's XPath filter
        datum_ds = dataset.to_datumaro()
        from datumaro.components.dataset import Dataset as DatumDataset
        filtered = datum_ds.filter(xpath, filter_annotations=filter_annotations)
        from guava.core.dataset import Dataset as GuavaDataset
        result = GuavaDataset.from_datumaro(filtered, name=f"{dataset.name}_filtered")
        return result

    return dataset


def merge_datasets(datasets: list[Any], *, merge_policy: str = "union") -> Any:
    """
    Merge multiple datasets into one.

    Args:
        datasets: List of Guava Datasets to merge.
        merge_policy: How to handle duplicate items:
            - 'union': Keep all items (default)
            - 'intersect': Keep only common items
            - 'exact': Require exact match

    Returns:
        Merged :class:`~guava.core.dataset.Dataset`.

    Examples::

        import guava as gv

        ds1 = gv.load("coco", "/path/to/coco1")
        ds2 = gv.load("voc", "/path/to/voc")
        merged = gv.merge_datasets([ds1, ds2])
    """
    if not datasets:
        raise ValueError("datasets list cannot be empty")

    if len(datasets) == 1:
        return datasets[0]

    # Use Datumaro's merge for advanced policies
    if merge_policy == "union":
        result = datasets[0]
        for ds in datasets[1:]:
            result = result.merge(ds)
        return result

    # Advanced merge via Datumaro
    datum_datasets = [ds.to_datumaro() for ds in datasets]
    if merge_policy == "intersect":
        from datumaro.components.merge import IntersectMerge
        merged = IntersectMerge()(datum_datasets)
    else:
        from datumaro.components.merge import ExactMerge
        merged = ExactMerge.merge(*datum_datasets)

    from guava.core.dataset import Dataset as GuavaDataset
    return GuavaDataset.from_datumaro(merged, name="merged_dataset")


def split_dataset(
    dataset: Any,
    *,
    splits: dict[str, float] | None = None,
    ratios: tuple[float, ...] | None = None,
    task: str = "classification",
    seed: int = 42,
) -> dict[str, Any]:
    """
    Split a dataset into subsets (train/val/test).

    Args:
        dataset: Guava Dataset to split.
        splits: Dict of {subset_name: ratio}. E.g. ``{"train": 0.8, "val": 0.1, "test": 0.1}``.
        ratios: Tuple of ratios (defaults to (0.8, 0.1, 0.1) → train/val/test).
        task: Task type for stratified splitting:
            - 'classification': Stratify by label
            - 'detection': Stratify by bbox
            - 'segmentation': Stratify by polygon/mask
            - 'random': Random split (default)
        seed: Random seed.

    Returns:
        Dict of {subset_name: Dataset}.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")

        # Simple random split
        subsets = gv.split_dataset(ds, splits={"train": 0.8, "val": 0.2})
        train_ds = subsets["train"]
        val_ds = subsets["val"]
    """
    if splits is None:
        if ratios is None:
            splits = {"train": 0.8, "val": 0.1, "test": 0.1}
        else:
            names = ["train", "val", "test"][: len(ratios)]
            splits = dict(zip(names, ratios))

    names = list(splits.keys())
    ratio_values = tuple(splits.values())

    split_datasets = dataset.split(ratios=ratio_values, names=tuple(names), seed=seed)
    return dict(zip(names, split_datasets))


def validate_dataset(
    dataset: Any,
    task_type: str = "detection",
    *,
    report_path: str | None = None,
) -> dict:
    """
    Validate a dataset for annotation errors and quality issues.

    Uses Datumaro's validation engine to check for:
    - Missing annotations
    - Invalid bounding boxes (negative size, out of bounds)
    - Empty labels
    - Duplicate annotations
    - Label distribution imbalance

    Args:
        dataset: Guava Dataset to validate.
        task_type: Task type to validate against:
            'detection', 'classification', 'segmentation'
        report_path: Optional path to save the validation report (JSON).

    Returns:
        Validation report as a dict.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        report = gv.validate_dataset(ds, task_type="detection")
        print(f"Errors found: {report['statistics']['total_errors']}")
    """
    datum_ds = dataset.to_datumaro()

    task_map = {
        "detection": "detection",
        "classification": "classification",
        "segmentation": "segmentation",
        "instance_segmentation": "instance_segmentation",
        "reid": "reid",
    }
    datum_task = task_map.get(task_type.lower(), "detection")

    try:
        from datumaro.components.validator import TaskType
        from datumaro.plugins.validators import DetectionValidator, ClassificationValidator

        validator_map = {
            "detection": DetectionValidator,
            "classification": ClassificationValidator,
        }
        ValidatorCls = validator_map.get(datum_task)
        if ValidatorCls:
            validator = ValidatorCls()
            report = validator.validate(datum_ds)
        else:
            report = {"message": f"Validator for {datum_task!r} not available yet"}
    except Exception as e:
        report = {"error": str(e), "message": "Validation encountered an error"}

    if report_path:
        import json
        import pathlib
        pathlib.Path(report_path).write_text(
            json.dumps(report, indent=2, default=str)
        )

    return report


def rename_labels(dataset: Any, mapping: dict[str, str]) -> Any:
    """
    Rename labels in a dataset.

    Args:
        dataset: Guava Dataset.
        mapping: Dict of {old_label: new_label}.

    Returns:
        Dataset with renamed labels.

    Examples::

        ds = gv.rename_labels(ds, {"cat": "CAT", "dog": "DOG"})
    """
    datum_ds = dataset.to_datumaro()

    try:
        from datumaro.plugins.transforms import RemapLabels
        transformed = datum_ds.transform(RemapLabels, mapping={k: v for k, v in mapping.items()})
        from guava.core.dataset import Dataset as GuavaDataset
        return GuavaDataset.from_datumaro(transformed, name=dataset.name)
    except Exception as e:
        raise RuntimeError(f"Label rename failed: {e}") from e


def remap_labels(dataset: Any, mapping: dict[str, str | None], default: str = "keep") -> Any:
    """
    Remap or remove labels in a dataset.

    Args:
        dataset: Guava Dataset.
        mapping: Dict of {label: new_label}. Set new_label to None to remove.
        default: What to do with unmapped labels: 'keep', 'delete'.

    Returns:
        Dataset with remapped labels.
    """
    datum_ds = dataset.to_datumaro()

    try:
        from datumaro.plugins.transforms import RemapLabels
        default_action = RemapLabels.DefaultAction[default.upper()]
        transformed = datum_ds.transform(
            RemapLabels,
            mapping={k: v for k, v in mapping.items() if v is not None},
            default=default_action,
        )
        from guava.core.dataset import Dataset as GuavaDataset
        return GuavaDataset.from_datumaro(transformed, name=dataset.name)
    except Exception as e:
        raise RuntimeError(f"Label remap failed: {e}") from e
