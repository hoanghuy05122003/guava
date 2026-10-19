"""
Guava Native Duplicate Detection.
"""
from __future__ import annotations

from typing import Any

from guava.brain.hashing import dhash, hamming_distance
from guava.core.dataset import Dataset


def find_near_duplicates(
    dataset: Dataset,
    threshold: int = 5,
    hash_size: int = 8,
) -> list[dict[str, Any]]:
    """
    Find near-duplicate images in a dataset using perceptual hashing.

    Args:
        dataset: Guava Dataset.
        threshold: Max Hamming distance to consider near-duplicate (default: 5).
        hash_size: Hash grid size (default: 8).

    Returns:
        List of duplicate groups, each containing:
        - group_id
        - sample_ids
        - sample_paths
        - distances
    """
    hashes: list[tuple[str, str, int]] = []
    for sample in dataset:
        path = sample.filepath or sample.id
        h = dhash(path, hash_size=hash_size)
        hashes.append((sample.id, sample.filepath, h))

    duplicates: list[dict[str, Any]] = []
    visited = set()

    for i in range(len(hashes)):
        id_i, path_i, hash_i = hashes[i]
        if id_i in visited:
            continue

        cluster = [id_i]
        cluster_paths = [path_i]
        cluster_distances = []

        for j in range(i + 1, len(hashes)):
            id_j, path_j, hash_j = hashes[j]
            dist = hamming_distance(hash_i, hash_j)
            if dist <= threshold:
                cluster.append(id_j)
                cluster_paths.append(path_j)
                cluster_distances.append(dist)
                visited.add(id_j)

        if len(cluster) > 1:
            visited.add(id_i)
            duplicates.append({
                "group_id": len(duplicates) + 1,
                "count": len(cluster),
                "sample_ids": cluster,
                "sample_paths": cluster_paths,
                "avg_distance": sum(cluster_distances) / len(cluster_distances) if cluster_distances else 0,
            })

    return duplicates
