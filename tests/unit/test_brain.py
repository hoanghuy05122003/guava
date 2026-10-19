"""
Unit tests for Guava Brain AI curation.
"""
import pytest
import guava as gv
from guava.core.sample import Sample


def test_perceptual_hashing():
    h1 = gv.brain.dhash("test_string_1")
    h2 = gv.brain.dhash("test_string_1")
    h3 = gv.brain.dhash("different_string_2")

    assert h1 == h2
    assert isinstance(h1, int)
    dist = gv.brain.hamming_distance(h1, h2)
    assert dist == 0


def test_near_duplicates_and_uniqueness():
    ds = gv.Dataset(name="brain_test")
    s1 = Sample(id="s1", filepath="same_img")
    s2 = Sample(id="s2", filepath="same_img")
    s3 = Sample(id="s3", filepath="different_path_xyz")
    ds.add_samples([s1, s2, s3])

    dupes = gv.brain.find_near_duplicates(ds, threshold=2)
    assert len(dupes) == 1
    assert "s1" in dupes[0]["sample_ids"]
    assert "s2" in dupes[0]["sample_ids"]

    uniqueness = gv.brain.compute_uniqueness(ds)
    assert len(uniqueness) == 3
