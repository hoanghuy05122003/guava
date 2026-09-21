"""
Guava Core — Adapter Layer

Bridges between:
  - Datumaro's data model (Dataset, DatasetItem, Annotation types)
  - FiftyOne's data model (Dataset, Sample, Label types)

This adapter allows seamless conversion between the two systems so that:
  - Datumaro can handle I/O (50+ formats) and transforms
  - FiftyOne can handle visualization (App) and AI curation (Brain)
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Any, Generator

if TYPE_CHECKING:
    pass

__all__ = [
    "datumaro_to_guava_items",
    "fiftyone_to_guava_items",
    "guava_dataset_to_datumaro",
    "guava_dataset_to_fiftyone",
]


# ── Datumaro → Guava ─────────────────────────────────────────────────────────

def datumaro_to_guava(datumaro_dataset: Any) -> Generator:
    """
    Lazily yield Guava-compatible items from a Datumaro Dataset.

    Since Datumaro's DatasetItem is very similar to what Guava needs,
    we wrap items in a thin Guava adapter.
    """
    for item in datumaro_dataset:
        yield _wrap_datumaro_item(item)


def _wrap_datumaro_item(datum_item: Any) -> Any:
    """Wrap a Datumaro DatasetItem as a Guava DatasetItem (pass-through for now)."""
    # Datumaro DatasetItem is already close to what we want.
    # In the future, we can add Guava-specific attributes here.
    return datum_item


# ── FiftyOne → Guava ─────────────────────────────────────────────────────────

def fiftyone_to_guava(fo_dataset: Any) -> Generator:
    """
    Lazily yield Guava-compatible items from a FiftyOne Dataset.

    Converts FiftyOne Samples to Datumaro-compatible DatasetItems.
    """
    try:
        from datumaro.components.dataset_base import DatasetItem
        from datumaro.components.annotation import AnnotationType
    except ImportError:
        raise ImportError(
            "Datumaro is required for FiftyOne → Guava conversion. "
            "Install with: pip install datumaro"
        )

    for sample in fo_dataset:
        yield _fo_sample_to_datumaro_item(sample)


def _fo_sample_to_datumaro_item(sample: Any) -> Any:
    """Convert a FiftyOne Sample to a Datumaro DatasetItem."""
    try:
        from datumaro.components.dataset_base import DatasetItem
        from datumaro.components.media import ImageFromFile
    except ImportError:
        raise ImportError("Datumaro is required for conversion.")

    annotations = []
    media_path = sample.filepath

    # Convert FiftyOne detections → Datumaro Bbox annotations
    if hasattr(sample, "detections") and sample.detections:
        for det in sample.detections.detections:
            annotation = _fo_detection_to_datumaro_bbox(det)
            if annotation is not None:
                annotations.append(annotation)

    # Convert FiftyOne segmentations → Datumaro Polygon
    if hasattr(sample, "segmentations") and sample.segmentations:
        for seg in sample.segmentations.polylines:
            annotation = _fo_polyline_to_datumaro_polygon(seg)
            if annotation is not None:
                annotations.append(annotation)

    return DatasetItem(
        id=sample.id,
        media=ImageFromFile(path=media_path),
        annotations=annotations,
        attributes={
            "fo_id": sample.id,
            "fo_tags": list(sample.tags) if sample.tags else [],
        },
    )


def _fo_detection_to_datumaro_bbox(det: Any) -> Any:
    """Convert a FiftyOne Detection to a Datumaro Bbox."""
    try:
        from datumaro.components.annotation import Bbox
    except ImportError:
        return None

    if det.bounding_box is None:
        return None

    # FiftyOne bbox: [x, y, w, h] in relative coords [0, 1]
    # Datumaro Bbox: (x, y, w, h) in absolute coords — needs image dims
    # For now, store as relative (will be converted when image dims known)
    x, y, w, h = det.bounding_box
    return Bbox(
        x=x, y=y, w=w, h=h,
        label=0,  # Will be resolved via label map
        attributes={"label": det.label, "confidence": det.confidence or 0.0},
    )


def _fo_polyline_to_datumaro_polygon(seg: Any) -> Any:
    """Convert a FiftyOne Polyline to a Datumaro Polygon."""
    try:
        from datumaro.components.annotation import Polygon
    except ImportError:
        return None

    if not seg.points:
        return None

    points_flat = []
    for pt in seg.points[0]:
        points_flat.extend(pt)

    return Polygon(
        points=points_flat,
        label=0,
        attributes={"label": seg.label},
    )


# ── Guava → Datumaro ─────────────────────────────────────────────────────────

def guava_to_datumaro(guava_dataset: Any) -> Any:
    """
    Convert a Guava Dataset to a Datumaro Dataset.

    This allows using all Datumaro I/O (export to 50+ formats)
    and transforms (filter, merge, split, validate) on Guava data.
    """
    try:
        from datumaro.components.dataset import Dataset as DatumDataset
        from datumaro.components.dataset_base import DatasetItem
    except ImportError:
        raise ImportError(
            "Datumaro is required. Install with: pip install datumaro"
        )

    # If already backed by Datumaro, return directly
    if guava_dataset._datumaro_dataset is not None:
        return guava_dataset._datumaro_dataset

    # Build a Datumaro Dataset from Guava items
    items = list(guava_dataset)
    return DatumDataset.from_iterable(
        items,
        categories=guava_dataset._categories,
    )


# ── Guava → FiftyOne ─────────────────────────────────────────────────────────

def guava_to_fiftyone(guava_dataset: Any, name: str = "guava_dataset", persistent: bool = False) -> Any:
    """
    Convert a Guava Dataset to a FiftyOne Dataset.

    This enables:
      - Visual exploration in FiftyOne App
      - AI curation via FiftyOne Brain (similarity, uniqueness, etc.)
      - Integration with HuggingFace, Ultralytics, SAM, etc.
    """
    try:
        import fiftyone as fo
    except ImportError:
        raise ImportError(
            "FiftyOne is required for visualization. "
            "Install with: pip install fiftyone"
        )

    # If already backed by FiftyOne, return directly
    if guava_dataset._fo_dataset is not None:
        return guava_dataset._fo_dataset

    # Create FiftyOne Dataset
    fo_dataset = fo.Dataset(name=name, persistent=persistent)
    samples = []

    for item in guava_dataset:
        sample = _datumaro_item_to_fo_sample(item)
        samples.append(sample)

    fo_dataset.add_samples(samples)
    return fo_dataset


def _datumaro_item_to_fo_sample(item: Any) -> Any:
    """Convert a Datumaro DatasetItem to a FiftyOne Sample."""
    try:
        import fiftyone as fo
        from fiftyone.core.labels import Detection, Detections, Polyline, Polylines
    except ImportError:
        raise ImportError("FiftyOne is required for conversion.")

    media_path = str(item.media.path) if hasattr(item, "media") and item.media else ""
    sample = fo.Sample(filepath=media_path)

    detections = []
    polylines = []

    try:
        from datumaro.components.annotation import AnnotationType
        for ann in item.annotations:
            if ann.type == AnnotationType.bbox:
                det = Detection(
                    label=str(ann.label),
                    bounding_box=[ann.x, ann.y, ann.w, ann.h],
                    confidence=ann.attributes.get("confidence"),
                )
                detections.append(det)
            elif ann.type == AnnotationType.polygon:
                pts = [(ann.points[i], ann.points[i + 1]) for i in range(0, len(ann.points), 2)]
                poly = Polyline(
                    label=str(ann.label),
                    points=[pts],
                    closed=True,
                    filled=True,
                )
                polylines.append(poly)
    except Exception:
        pass  # Skip annotation conversion errors

    if detections:
        sample["detections"] = Detections(detections=detections)
    if polylines:
        sample["segmentations"] = Polylines(polylines=polylines)

    # Store Datumaro metadata
    sample["datumaro_id"] = item.id
    if hasattr(item, "subset"):
        sample["subset"] = item.subset

    return sample
