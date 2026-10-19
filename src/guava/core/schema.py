"""
Guava Dataset Schema & Category ontology.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class Category:
    """Class label category definition."""
    name: str
    id: int = 0
    color: str | None = None
    supercategory: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "supercategory": self.supercategory,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Category:
        return cls(
            name=data.get("name", ""),
            id=int(data.get("id", 0)),
            color=data.get("color"),
            supercategory=data.get("supercategory"),
        )


class DatasetSchema:
    """Ontology and schema defining dataset categories and metadata."""

    def __init__(self, categories: list[Category] | list[str] | None = None):
        self.categories: list[Category] = []
        self._name_to_cat: dict[str, Category] = {}
        self._id_to_cat: dict[int, Category] = {}

        if categories:
            for i, cat in enumerate(categories):
                if isinstance(cat, str):
                    self.add_category(Category(name=cat, id=i))
                elif isinstance(cat, Category):
                    self.add_category(cat)

    def add_category(self, category: Category) -> None:
        """Register a category."""
        if category.id in self._id_to_cat:
            category.id = max(self._id_to_cat.keys(), default=-1) + 1
        self.categories.append(category)
        self._name_to_cat[category.name] = category
        self._id_to_cat[category.id] = category

    def get_category_by_name(self, name: str) -> Category | None:
        return self._name_to_cat.get(name)

    def get_category_by_id(self, cat_id: int) -> Category | None:
        return self._id_to_cat.get(cat_id)

    def get_or_create(self, name: str) -> Category:
        if name not in self._name_to_cat:
            cat = Category(name=name, id=len(self.categories))
            self.add_category(cat)
            return cat
        return self._name_to_cat[name]

    @property
    def class_names(self) -> list[str]:
        return [c.name for c in self.categories]

    def to_dict(self) -> dict[str, Any]:
        return {
            "categories": [c.to_dict() for c in self.categories],
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> DatasetSchema:
        cats = [Category.from_dict(c) for c in data.get("categories", [])]
        return cls(categories=cats)
