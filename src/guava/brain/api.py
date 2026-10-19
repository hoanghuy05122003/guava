"""
Guava Native Brain API.

Capabilities:
  - Near-duplicate image detection
  - Visual uniqueness scoring
  - Image similarity ranking
"""
from __future__ import annotations

from guava.brain.duplicates import find_near_duplicates
from guava.brain.hashing import ahash, dhash, hamming_distance
from guava.brain.similarity import compute_similarity, compute_uniqueness

__all__ = [
    "find_near_duplicates",
    "compute_uniqueness",
    "compute_similarity",
    "dhash",
    "ahash",
    "hamming_distance",
]
