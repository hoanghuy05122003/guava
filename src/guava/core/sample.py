"""
Guava Native Sample Model.

Represents a single media item (image/video) with its metadata,
annotations (ground truth, predictions), tags, and custom fields.
"""
from __future__ import annotations

from dataclasses import dataclass, field
import os
from typing import Any
import uuid

from guava.core.annotation import Annotation, BboxAnnotation, LabelAnnotation, PolygonAnnotation


@dataclass
class ImageMetadata:
    """Metadata for an image."""
    width: int = 640
    height: int = 480
    channels: int = 3
    size_bytes: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "width": self.width,
            "height": self.height,
            "channels": self.channels,
            "size_bytes": self.size_bytes,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> ImageMetadata:
        return cls(
            width=int(data.get("width", 640)),
            height=int(data.get("height", 480)),
            channels=int(data.get("channels", 3)),
            size_bytes=int(data.get("size_bytes", 0)),
        )


class Sample:
    """
    Core Guava Sample representing an image/media element.
    """

    def __init__(
        self,
        id: str | None = None,
        filepath: str = "",
        media_type: str = "image",
        metadata: ImageMetadata | dict[str, Any] | None = None,
        annotations: list[Annotation] | None = None,
        tags: list[str] | set[str] | None = None,
        subset: str = "default",
        **fields: Any,
    ):
        self.id = id if id is not None else str(uuid.uuid4())[:12]
        self.filepath = filepath
        self.media_type = media_type

        if isinstance(metadata, dict):
            self.metadata = ImageMetadata.from_dict(metadata)
        elif isinstance(metadata, ImageMetadata):
            self.metadata = metadata
        else:
            self.metadata = ImageMetadata()

        self.annotations: list[Annotation] = annotations or []
        self.tags: set[str] = set(tags) if tags else set()
        self.subset = subset
        self.fields: dict[str, Any] = fields

    def add_annotation(self, annotation: Annotation) -> None:
        """Add an annotation to this sample."""
        self.annotations.append(annotation)

    def add_tag(self, tag: str) -> None:
        """Add a tag to this sample."""
        self.tags.add(tag)

    def remove_tag(self, tag: str) -> None:
        """Remove a tag if present."""
        self.tags.discard(tag)

    def has_tag(self, tag: str) -> bool:
        """Check if sample has tag."""
        return tag in self.tags

    @property
    def ground_truth(self) -> list[Annotation]:
        """Return annotations designated as ground truth."""
        return [
            a for a in self.annotations
            if a.attributes.get("kind") != "prediction"
        ]

    @property
    def predictions(self) -> list[Annotation]:
        """Return annotations designated as prediction."""
        return [
            a for a in self.annotations
            if a.attributes.get("kind") == "prediction"
        ]

    def read_image_metadata(self) -> None:
        """Auto-detect image width and height from disk if available."""
        if self.filepath and os.path.exists(self.filepath):
            try:
                from PIL import Image as PILImage
                with PILImage.open(self.filepath) as img:
                    w, h = img.size
                    channels = len(img.getbands()) if hasattr(img, "getbands") else 3
                    self.metadata = ImageMetadata(
                        width=w,
                        height=h,
                        channels=channels,
                        size_bytes=os.path.getsize(self.filepath),
                    )
            except Exception:
                pass

    def to_dict(self) -> dict[str, Any]:
        """Serialize sample to JSON-serializable dictionary."""
        return {
            "id": self.id,
            "filepath": self.filepath,
            "media_type": self.media_type,
            "metadata": self.metadata.to_dict(),
            "subset": self.subset,
            "tags": list(self.tags),
            "annotations": [a.to_dict() for a in self.annotations],
            "ground_truth": [a.to_dict() for a in self.ground_truth],
            "predictions": [a.to_dict() for a in self.predictions],
            "fields": self.fields,
        }

    def __repr__(self) -> str:
        return f"<Sample id={self.id!r} filepath={self.filepath!r} annotations={len(self.annotations)} subset={self.subset!r}>"
