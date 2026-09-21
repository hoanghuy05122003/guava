"""
GuavaDataset — High-level dataset wrapper

Provides a simplified, unified API that wraps Datumaro's Dataset
with additional FiftyOne-powered capabilities (visual app, AI curation).

The Datumaro Dataset is available in ``guava.core.dataset.Dataset``
for direct, low-level use. This wrapper provides:
  - Simplified constructor (gv.load() is preferred)
  - .launch_app() for one-liner visualization
  - .to_fiftyone() for FiftyOne curation
  - .to_datumaro() to get the raw Datumaro Dataset
  - .stats() for quick statistics
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Any, Callable, Iterator

if TYPE_CHECKING:
    pass

__all__ = ["GuavaDataset"]


class GuavaDataset:
    """
    Guava high-level Dataset wrapper.

    Wraps a Datumaro Dataset (for I/O & transforms) and optionally
    a FiftyOne Dataset (for visualization & AI curation).

    Prefer using ``guava.load()`` to create instances.

    Example::

        import guava as gv

        ds = gv.load("coco", "/path/to/coco")        # Returns GuavaDataset
        filtered = ds.filter(lambda x: len(x.annotations) > 0)
        session = ds.launch_app()
        gv.export(ds, "yolo", "/output")
    """

    def __init__(
        self,
        datumaro_dataset: Any = None,
        *,
        name: str = "dataset",
        media_type: str = "image",
    ) -> None:
        self._name = name
        self._media_type = media_type
        self._datum_ds = datumaro_dataset
        self._fo_dataset = None
        self._format: str | None = None

    @property
    def name(self) -> str:
        return self._name

    @property
    def media_type(self) -> str:
        return self._media_type

    @property
    def format(self) -> str | None:
        return self._format

    def __len__(self) -> int:
        if self._datum_ds is not None:
            return len(self._datum_ds)
        return 0

    def __iter__(self) -> Iterator:
        if self._datum_ds is not None:
            return iter(self._datum_ds)
        return iter([])

    def __repr__(self) -> str:
        return (
            f"GuavaDataset(name={self._name!r}, "
            f"format={self._format!r}, "
            f"size={len(self)})"
        )

    # ── Conversion ───────────────────────────────────────────────────────────

    def to_datumaro(self) -> Any:
        """Get the underlying Datumaro Dataset for I/O and transforms."""
        return self._datum_ds

    def to_fiftyone(self, name: str | None = None, persistent: bool = False) -> Any:
        """Convert to a FiftyOne Dataset for visualization and AI curation."""
        if self._fo_dataset is not None:
            return self._fo_dataset
        from guava.core.adapter import guava_to_fiftyone
        self._fo_dataset = guava_to_fiftyone(self, name=name or self._name, persistent=persistent)
        return self._fo_dataset

    # ── High-level operations ────────────────────────────────────────────────

    def filter(self, predicate: Callable) -> "GuavaDataset":
        """Filter items using a Python predicate function."""
        if self._datum_ds is None:
            return GuavaDataset(name=f"{self._name}_filtered")

        filtered_items = [item for item in self._datum_ds if predicate(item)]
        try:
            # Build new Datumaro Dataset from filtered items
            from datumaro.components.dataset import Dataset as DatumDataset
            new_datum_ds = DatumDataset.from_iterable(
                filtered_items,
                categories=self._datum_ds.categories(),
            )
        except Exception:
            new_datum_ds = None

        result = GuavaDataset(new_datum_ds, name=f"{self._name}_filtered")
        result._format = self._format
        return result

    def split(
        self,
        ratios: tuple[float, ...] = (0.8, 0.1, 0.1),
        names: tuple[str, ...] | None = None,
        seed: int = 42,
    ) -> list["GuavaDataset"]:
        """Split into multiple subsets."""
        import random
        if names is None:
            names = ("train", "val", "test")[: len(ratios)]

        items = list(self)
        random.Random(seed).shuffle(items)
        total = len(items)

        try:
            from datumaro.components.dataset import Dataset as DatumDataset
            cats = self._datum_ds.categories() if self._datum_ds else {}
        except Exception:
            cats = {}

        splits = []
        start = 0
        for i, (ratio, split_name) in enumerate(zip(ratios, names)):
            end = total if i == len(ratios) - 1 else start + int(total * ratio)
            try:
                sub_ds = DatumDataset.from_iterable(items[start:end], categories=cats)
            except Exception:
                sub_ds = None
            sub = GuavaDataset(sub_ds, name=split_name)
            sub._format = self._format
            splits.append(sub)
            start = end

        return splits

    def merge(self, other: "GuavaDataset") -> "GuavaDataset":
        """Merge with another GuavaDataset."""
        items = list(self) + list(other)
        try:
            from datumaro.components.dataset import Dataset as DatumDataset
            cats = {**(self._datum_ds.categories() if self._datum_ds else {})}
            merged_ds = DatumDataset.from_iterable(items, categories=cats)
        except Exception:
            merged_ds = None

        result = GuavaDataset(merged_ds, name=f"{self._name}_merged")
        result._format = self._format
        return result

    def take(self, count: int, seed: int | None = None) -> "GuavaDataset":
        """Take a random sample of ``count`` items."""
        import random
        items = list(self)
        random.Random(seed).shuffle(items)
        try:
            from datumaro.components.dataset import Dataset as DatumDataset
            cats = self._datum_ds.categories() if self._datum_ds else {}
            sub_ds = DatumDataset.from_iterable(items[:count], categories=cats)
        except Exception:
            sub_ds = None
        result = GuavaDataset(sub_ds, name=f"{self._name}_sample")
        result._format = self._format
        return result

    def stats(self) -> dict:
        """Compute dataset statistics."""
        from guava.util.stats import compute_stats_from_iter
        return compute_stats_from_iter(self, name=self._name, fmt=self._format)

    def info(self) -> None:
        """Print dataset summary."""
        from guava.util.stats import print_stats_from_iter
        print_stats_from_iter(self, name=self._name, fmt=self._format)

    def launch_app(self, **kwargs: Any) -> Any:
        """Launch the Guava visual web App for this dataset."""
        from guava.app.api import launch_app
        return launch_app(self, **kwargs)

    # ── Dunder ───────────────────────────────────────────────────────────────

    def __add__(self, other: "GuavaDataset") -> "GuavaDataset":
        return self.merge(other)

    @classmethod
    def from_datumaro(cls, datum_ds: Any, name: str = "dataset") -> "GuavaDataset":
        """Create a GuavaDataset from a Datumaro Dataset."""
        inst = cls(datum_ds, name=name)
        return inst

    @classmethod
    def from_fiftyone(cls, fo_ds: Any, name: str | None = None) -> "GuavaDataset":
        """Create a GuavaDataset from a FiftyOne Dataset."""
        from guava.core.adapter import fiftyone_to_guava
        items = list(fiftyone_to_guava(fo_ds))
        try:
            from datumaro.components.dataset import Dataset as DatumDataset
            datum_ds = DatumDataset.from_iterable(items)
        except Exception:
            datum_ds = None
        inst = cls(datum_ds, name=name or fo_ds.name)
        inst._fo_dataset = fo_ds
        return inst
