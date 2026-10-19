"""
Guava Native Visual Similarity & Uniqueness Scoring.
"""
from __future__ import annotations

import os
from typing import Any

from guava.brain.hashing import dhash, hamming_distance
from guava.core.dataset import Dataset


def compute_uniqueness(
    dataset: Dataset,
    brain_key: str = "uniqueness",
) -> dict[str, float]:
    """
    Compute uniqueness score for each sample (0.0 = redundant, 1.0 = highly unique).
    Based on minimum Hamming distance to nearest neighbor in dataset.
    """
    hashes = [(s.id, dhash(s.filepath or s.id)) for s in dataset]
    n = len(hashes)
    scores: dict[str, float] = {}

    if n <= 1:
        for s in dataset:
            scores[s.id] = 1.0
            s.fields[brain_key] = 1.0
        return scores

    for i in range(n):
        id_i, hash_i = hashes[i]
        min_dist = 64
        for j in range(n):
            if i == j:
                continue
            dist = hamming_distance(hash_i, hashes[j][1])
            if dist < min_dist:
                min_dist = dist
        # Normalize distance (64 max bit distance)
        uniqueness = min(1.0, min_dist / 32.0)
        scores[id_i] = round(uniqueness, 4)

    # Attach to dataset samples
    for sample in dataset:
        if sample.id in scores:
            sample.fields[brain_key] = scores[sample.id]

    return scores


def compute_similarity(
    dataset: Dataset,
    query_sample_id: str,
    top_k: int = 10,
) -> list[tuple[str, float]]:
    """
    Find most similar samples to a given sample.
    Returns list of (sample_id, similarity_score_0_to_1).
    """
    target_sample = dataset.get(query_sample_id)
    if not target_sample:
        return []

    target_hash = dhash(target_sample.filepath or target_sample.id)
    results = []

    for s in dataset:
        if s.id == query_sample_id:
            continue
        h = dhash(s.filepath or s.id)
        dist = hamming_distance(target_hash, h)
        # Convert distance to similarity 0..1
        sim = max(0.0, 1.0 - (dist / 64.0))
        results.append((s.id, round(sim, 4)))

    results.sort(key=lambda x: -x[1])
    return results[:top_k]
