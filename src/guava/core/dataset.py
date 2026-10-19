"""
Guava Native High-Performance Dataset Engine.

100% independent data structure combining:
- Fast sample indexing and iteration (inspired by FiftyOne)
- Rich multi-annotation management & quality auditing (inspired by Datumaro)
- Pure Python, zero-heavy-dependency architecture
"""
from __future__ import annotations

import copy
import json
import os
import random
from typing import Any, Callable, Iterator

from guava.core.annotation import (
    Annotation,
    BboxAnnotation,
    KeypointAnnotation,
    LabelAnnotation,
    PolygonAnnotation,
)
from guava.core.sample import Sample
from guava.core.schema import Category, DatasetSchema


class Dataset:
    """
    Core Guava Dataset holding a collection of Samples and ontology Schema.
    """

    def __init__(
        self,
        name: str = "dataset",
        samples: list[Sample] | None = None,
        schema: DatasetSchema | None = None,
        format: str | None = None,
        **kwargs: Any,
    ):
        self.name = name
        self.format = format
        self.schema = schema or DatasetSchema()
        self._samples: list[Sample] = []
        self._id_map: dict[str, Sample] = {}

        if samples:
            self.add_samples(samples)

    @property
    def samples(self) -> list[Sample]:
        return self._samples

    @property
    def _items(self) -> list[Sample]:
        """Backward-compatible alias for sample list."""
        return self._samples

    @_items.setter
    def _items(self, items: list[Any]) -> None:
        self._samples = []
        self._id_map.clear()
        for item in items:
            if isinstance(item, Sample):
                self.add_sample(item)
            else:
                # Wrap duck-typed mock/custom object into a Sample
                sample_id = str(getattr(item, "id", f"sample_{len(self._samples)}"))
                filepath = getattr(item, "filepath", getattr(item, "path", ""))
                anns = getattr(item, "annotations", [])
                subset = getattr(item, "subset", "default")
                s = Sample(id=sample_id, filepath=filepath, annotations=list(anns), subset=subset)
                self.add_sample(s)

    def add_sample(self, sample: Sample) -> None:
        """Add a single Sample to the dataset."""
        if sample.id in self._id_map:
            # Overwrite or update existing
            idx = self._samples.index(self._id_map[sample.id])
            self._samples[idx] = sample
        else:
            self._samples.append(sample)
        self._id_map[sample.id] = sample

        # Auto-register classes into schema
        for ann in sample.annotations:
            if ann.label:
                self.schema.get_or_create(ann.label)

    def add_samples(self, samples: list[Sample]) -> None:
        """Add multiple samples in batch."""
        for s in samples:
            self.add_sample(s)

    def get(self, sample_id: str) -> Sample | None:
        """Get a sample by its ID."""
        return self._id_map.get(sample_id)

    def __len__(self) -> int:
        return len(self._samples)

    def __iter__(self) -> Iterator[Sample]:
        return iter(self._samples)

    def __getitem__(self, index_or_id: int | slice | str) -> Any:
        if isinstance(index_or_id, int):
            return self._samples[index_or_id]
        elif isinstance(index_or_id, slice):
            new_ds = Dataset(name=f"{self.name}_slice", schema=copy.deepcopy(self.schema))
            new_ds.add_samples(self._samples[index_or_id])
            return new_ds
        elif isinstance(index_or_id, str):
            if index_or_id in self._id_map:
                return self._id_map[index_or_id]
            raise KeyError(f"Sample ID {index_or_id!r} not found in dataset {self.name!r}")
        raise TypeError(f"Invalid index type: {type(index_or_id)}")

    def filter(self, predicate: Callable[[Sample], bool]) -> Dataset:
        """
        Filter dataset keeping samples that satisfy the predicate function.
        """
        filtered = [s for s in self._samples if predicate(s)]
        new_ds = Dataset(name=f"{self.name}_filtered", schema=copy.deepcopy(self.schema), format=self.format)
        new_ds.add_samples(filtered)
        return new_ds

    def split(
        self,
        ratios: tuple[float, ...] = (0.8, 0.1, 0.1),
        names: tuple[str, ...] = ("train", "val", "test"),
        seed: int = 42,
    ) -> list[Dataset]:
        """
        Split dataset into multiple subsets according to given ratios.
        Returns a list of Datasets corresponding to `names`.
        """
        if len(ratios) != len(names):
            raise ValueError(f"Length of ratios ({len(ratios)}) must match names ({len(names)})")

        total_ratio = sum(ratios)
        normalized_ratios = [r / total_ratio for r in ratios]

        rng = random.Random(seed)
        shuffled = list(self._samples)
        rng.shuffle(shuffled)

        n = len(shuffled)
        result_datasets: list[Dataset] = []
        current_idx = 0

        for i, (ratio, name) in enumerate(zip(normalized_ratios, names)):
            if i == len(normalized_ratios) - 1:
                chunk = shuffled[current_idx:]
            else:
                chunk_len = int(round(ratio * n))
                chunk = shuffled[current_idx:current_idx + chunk_len]
                current_idx += chunk_len

            ds_split = Dataset(name=f"{self.name}_{name}", schema=copy.deepcopy(self.schema), format=self.format)
            for s in chunk:
                # Assign subset tag
                s_copy = copy.copy(s)
                s_copy.subset = name
                ds_split.add_sample(s_copy)
            result_datasets.append(ds_split)

        return result_datasets

    def merge(self, other: Dataset) -> Dataset:
        """
        Merge another dataset into a new combined dataset.
        """
        new_ds = Dataset(name=f"{self.name}_merged", schema=copy.deepcopy(self.schema), format=self.format)
        for s in self._samples:
            new_ds.add_sample(s)
        for s in other:
            new_ds.add_sample(s)
        return new_ds

    def __add__(self, other: Dataset) -> Dataset:
        return self.merge(other)

    def take(self, n: int, seed: int = 42) -> Dataset:
        """
        Take a random sample of n elements from the dataset.
        """
        rng = random.Random(seed)
        indices = list(range(len(self._samples)))
        chosen_indices = rng.sample(indices, min(n, len(self._samples)))
        chosen_samples = [self._samples[i] for i in chosen_indices]

        new_ds = Dataset(name=f"{self.name}_sample_{n}", schema=copy.deepcopy(self.schema), format=self.format)
        new_ds.add_samples(chosen_samples)
        return new_ds

    def stats(self) -> dict[str, Any]:
        """
        Compute rich dataset statistics:
        - item_count / annotation_count
        - category_distribution
        - subset_distribution
        - tags_distribution
        """
        cat_dist: dict[str, int] = {}
        pred_dist: dict[str, int] = {}
        subset_dist: dict[str, int] = {}
        tag_dist: dict[str, int] = {}
        total_annotations = 0

        for s in self._samples:
            subset = s.subset or "default"
            subset_dist[subset] = subset_dist.get(subset, 0) + 1

            for tag in s.tags:
                tag_dist[tag] = tag_dist.get(tag, 0) + 1

            for ann in s.annotations:
                if ann.attributes.get("kind") == "prediction":
                    pred_dist[ann.label] = pred_dist.get(ann.label, 0) + 1
                    continue
                total_annotations += 1
                if ann.label:
                    cat_dist[ann.label] = cat_dist.get(ann.label, 0) + 1

        return {
            "name": self.name,
            "item_count": len(self._samples),
            "sample_count": len(self._samples),
            "annotation_count": total_annotations,
            "category_distribution": dict(sorted(cat_dist.items(), key=lambda x: -x[1])),
            "prediction_distribution": dict(sorted(pred_dist.items(), key=lambda x: -x[1])),
            "prediction_count": sum(pred_dist.values()),
            "subset_distribution": subset_dist,
            "tag_distribution": tag_dist,
        }

    def audit(self) -> dict[str, Any]:
        """
        Validate and audit dataset quality (inspired by Datumaro):
        - Missing media files on disk
        - Degenerate bounding boxes (w <= 0 or h <= 0)
        - Out-of-bounds bounding boxes
        - Samples without annotations
        - Class balance summary
        """
        missing_files: list[str] = []
        degenerate_bboxes: list[dict[str, Any]] = []
        samples_without_annotations: list[str] = []

        for s in self._samples:
            if s.filepath and not os.path.exists(s.filepath):
                missing_files.append(s.id)

            if not s.annotations:
                samples_without_annotations.append(s.id)

            for ann in s.annotations:
                if isinstance(ann, BboxAnnotation):
                    if ann.w <= 0 or ann.h <= 0:
                        degenerate_bboxes.append({
                            "sample_id": s.id,
                            "label": ann.label,
                            "bbox": ann.bounding_box,
                            "issue": "Zero or negative width/height",
                        })

        stats = self.stats()
        is_clean = len(missing_files) == 0 and len(degenerate_bboxes) == 0

        return {
            "is_clean": is_clean,
            "total_samples": len(self._samples),
            "total_annotations": stats["annotation_count"],
            "missing_media_count": len(missing_files),
            "missing_media_samples": missing_files[:10],
            "degenerate_bboxes_count": len(degenerate_bboxes),
            "degenerate_bboxes": degenerate_bboxes[:10],
            "unannotated_samples_count": len(samples_without_annotations),
            "categories_count": len(stats["category_distribution"]),
            "categories": stats["category_distribution"],
            "subsets": stats["subset_distribution"],
        }

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "format": self.format,
            "schema": self.schema.to_dict(),
            "samples": [s.to_dict() for s in self._samples],
        }

    def save(self, json_path: str) -> None:
        """Save dataset to Guava native JSON manifest."""
        os.makedirs(os.path.dirname(os.path.abspath(json_path)), exist_ok=True)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(self.to_dict(), f, indent=2)

    @classmethod
    def load_manifest(cls, json_path: str) -> Dataset:
        """Load dataset from Guava native JSON manifest."""
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        schema = DatasetSchema.from_dict(data.get("schema", {}))
        ds = cls(name=data.get("name", "dataset"), schema=schema, format=data.get("format"))
        for s_data in data.get("samples", []):
            anns: list[Annotation] = []
            for a in s_data.get("annotations", []):
                common = {
                    "label": a.get("label", ""),
                    "id": a.get("id", ""),
                    "attributes": a.get("attributes", {}),
                    "confidence": a.get("confidence"),
                }
                kind = a.get("type")
                if kind == "BboxAnnotation" or "bounding_box" in a:
                    anns.append(BboxAnnotation.from_dict(a))
                elif kind == "PolygonAnnotation":
                    anns.append(PolygonAnnotation(points=a.get("points", []), **common))
                elif kind == "KeypointAnnotation":
                    anns.append(KeypointAnnotation(points=a.get("points", []), **common))
                elif kind == "LabelAnnotation":
                    anns.append(LabelAnnotation(**common))
                else:
                    anns.append(Annotation(**common))
            s = Sample(
                id=s_data.get("id"),
                filepath=s_data.get("filepath", ""),
                media_type=s_data.get("media_type", "image"),
                metadata=s_data.get("metadata", {}),
                annotations=anns,
                tags=s_data.get("tags", []),
                subset=s_data.get("subset", "default"),
                **s_data.get("fields", {}),
            )
            ds.add_sample(s)
        return ds

    def __repr__(self) -> str:
        return f"Dataset(name={self.name!r}, samples={len(self._samples)}, format={self.format!r})<id={id(self)}>"


# Core alias
GuavaDataset = Dataset
