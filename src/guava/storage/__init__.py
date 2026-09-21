"""
Guava Storage Package

Supports two backends:
  - MongoDB: Enterprise-grade, scalable (from FiftyOne)
  - Arrow: Lightweight, file-based (from Datumaro)

Usage::

    import guava.storage as gs

    # Use MongoDB backend
    gs.use_backend("mongodb", uri="mongodb://localhost:27017")

    # Use Arrow backend (default, no DB needed)
    gs.use_backend("arrow", data_dir="/path/to/data")
"""
from __future__ import annotations

from typing import Any

_BACKEND: str = "arrow"  # Default to lightweight backend
_BACKEND_CONFIG: dict = {}


def use_backend(backend: str, **config: Any) -> None:
    """
    Configure the storage backend.

    Args:
        backend: 'mongodb' or 'arrow'
        **config: Backend-specific configuration.
            - MongoDB: uri, database
            - Arrow: data_dir
    """
    global _BACKEND, _BACKEND_CONFIG
    if backend not in ("mongodb", "arrow"):
        raise ValueError(f"Unknown backend {backend!r}. Choose 'mongodb' or 'arrow'.")
    _BACKEND = backend
    _BACKEND_CONFIG = config


def get_backend() -> str:
    """Get the current storage backend name."""
    return _BACKEND


def get_backend_config() -> dict:
    """Get the current storage backend configuration."""
    return _BACKEND_CONFIG.copy()


__all__ = ["use_backend", "get_backend", "get_backend_config"]
