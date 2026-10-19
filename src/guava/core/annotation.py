"""
Guava Native Annotations Module.

Defines standalone annotation classes:
- BboxAnnotation
- PolygonAnnotation
- LabelAnnotation
- KeypointAnnotation
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
import uuid


@dataclass
class Annotation:
    """Base Annotation class."""
    label: str
    id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
    attributes: dict[str, Any] = field(default_factory=dict)
    confidence: float | None = None

    def to_dict(self) -> dict[str, Any]:
        data: dict[str, Any] = {
            "id": self.id,
            "type": self.__class__.__name__,
            "label": self.label,
            "attributes": self.attributes,
        }
        if self.confidence is not None:
            data["confidence"] = self.confidence
        return data


@dataclass
class BboxAnnotation(Annotation):
    """
    Bounding Box Annotation.

    Coordinate format:
        [x, y, w, h] where (x, y) is top-left, w is width, h is height.
    is_normalized:
        If True, x, y, w, h are in range [0, 1].
        If False, x, y, w, h are absolute pixel values.
    """
    x: float = 0.0
    y: float = 0.0
    w: float = 0.0
    h: float = 0.0
    is_normalized: bool = False

    @property
    def bounding_box(self) -> list[float]:
        """Return [x, y, w, h]."""
        return [self.x, self.y, self.w, self.h]

    @property
    def area(self) -> float:
        """Area of the bounding box."""
        return max(0.0, self.w) * max(0.0, self.h)

    def to_normalized(self, img_width: int | float, img_height: int | float) -> BboxAnnotation:
        """Return a normalized copy of this bbox [0, 1]."""
        if self.is_normalized:
            return self
        if img_width <= 0 or img_height <= 0:
            return self
        return BboxAnnotation(
            label=self.label,
            id=self.id,
            x=self.x / img_width,
            y=self.y / img_height,
            w=self.w / img_width,
            h=self.h / img_height,
            is_normalized=True,
            confidence=self.confidence,
            attributes=dict(self.attributes),
        )

    def to_absolute(self, img_width: int | float, img_height: int | float) -> BboxAnnotation:
        """Return an absolute pixel copy of this bbox."""
        if not self.is_normalized:
            return self
        return BboxAnnotation(
            label=self.label,
            id=self.id,
            x=self.x * img_width,
            y=self.y * img_height,
            w=self.w * img_width,
            h=self.h * img_height,
            is_normalized=False,
            confidence=self.confidence,
            attributes=dict(self.attributes),
        )

    def to_dict(self) -> dict[str, Any]:
        d = super().to_dict()
        d.update({
            "bounding_box": [self.x, self.y, self.w, self.h],
            "x": self.x,
            "y": self.y,
            "w": self.w,
            "h": self.h,
            "is_normalized": self.is_normalized,
            "area": self.area,
        })
        return d

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> BboxAnnotation:
        bbox = data.get("bounding_box") or [data.get("x", 0), data.get("y", 0), data.get("w", 0), data.get("h", 0)]
        return cls(
            label=data.get("label", "object"),
            id=data.get("id", str(uuid.uuid4())[:8]),
            x=float(bbox[0]),
            y=float(bbox[1]),
            w=float(bbox[2]),
            h=float(bbox[3]),
            is_normalized=bool(data.get("is_normalized", False)),
            confidence=data.get("confidence"),
            attributes=data.get("attributes", {}),
        )


@dataclass
class PolygonAnnotation(Annotation):
    """Polygon segmentation annotation: points = [[x1, y1], [x2, y2], ...]"""
    points: list[list[float]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        d = super().to_dict()
        d["points"] = self.points
        return d


@dataclass
class LabelAnnotation(Annotation):
    """Classification tag / label annotation."""
    pass


@dataclass
class KeypointAnnotation(Annotation):
    """Keypoint annotation: points = [[x, y, visibility], ...]"""
    points: list[list[float]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        d = super().to_dict()
        d["points"] = self.points
        return d
