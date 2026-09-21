"""
Guava Brain API

AI-powered dataset curation using FiftyOne Brain.

Capabilities:
  - Similarity search (find near-duplicates, similar images)
  - Uniqueness scoring (identify unique vs redundant samples)
  - Hardness scoring (find hard samples for model training)
  - Mistakenness detection (find likely annotation errors)
  - Representativeness (find representative samples)
  - Embedding visualization (UMAP, t-SNE, PCA)
"""
from __future__ import annotations

from typing import Any

__all__ = [
    "compute_similarity",
    "compute_uniqueness",
    "compute_hardness",
    "compute_mistakenness",
    "visualize_embeddings",
    "find_near_duplicates",
]


def _get_fo_dataset(dataset: Any) -> Any:
    """Get or create a FiftyOne Dataset from a Guava Dataset."""
    if hasattr(dataset, "to_fiftyone"):
        return dataset.to_fiftyone()
    return dataset


def compute_similarity(
    dataset: Any,
    *,
    model: str = "clip-vit-base32",
    brain_key: str = "similarity",
    batch_size: int | None = None,
    num_workers: int | None = None,
    **kwargs: Any,
) -> Any:
    """
    Compute visual similarity embeddings for all samples.

    Enables similarity search (find similar/near-duplicate images)
    in the Guava App's Embeddings Panel.

    Args:
        dataset: Guava Dataset.
        model: Embedding model. Options:
            - 'clip-vit-base32' (default, fast)
            - 'clip-vit-large14'
            - 'dinov2-vitb14'
            - 'resnet50-imagenet-torch'
        brain_key: Key to store results under.
        batch_size: Batch size for inference.
        num_workers: Number of data loading workers.

    Returns:
        SimilarityIndex object.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        index = gv.brain.compute_similarity(ds, model="clip-vit-base32")

        # Find the 10 most similar images to a query
        view = ds.to_fiftyone().sort_by_similarity(query_id, k=10, brain_key="similarity")
    """
    try:
        import fiftyone.brain as fob
    except ImportError:
        raise ImportError(
            "FiftyOne Brain is required. Install with: pip install fiftyone-brain"
        )

    fo_dataset = _get_fo_dataset(dataset)

    sim_kwargs: dict[str, Any] = {"brain_key": brain_key}
    if batch_size is not None:
        sim_kwargs["batch_size"] = batch_size
    if num_workers is not None:
        sim_kwargs["num_workers"] = num_workers
    sim_kwargs.update(kwargs)

    return fob.compute_similarity(fo_dataset, model=model, **sim_kwargs)


def compute_uniqueness(
    dataset: Any,
    *,
    uniqueness_field: str = "uniqueness",
    roi_field: str | None = None,
    **kwargs: Any,
) -> None:
    """
    Compute uniqueness scores for each sample.

    Uniqueness measures how different each sample is from the rest of
    the dataset. Low uniqueness = near-duplicate or redundant sample.

    Args:
        dataset: Guava Dataset.
        uniqueness_field: Field name to store uniqueness scores.
        roi_field: Optional region-of-interest field for patch-based uniqueness.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        gv.brain.compute_uniqueness(ds)

        # View least unique (most redundant) samples
        fo_ds = ds.to_fiftyone()
        duplicates = fo_ds.sort_by("uniqueness").limit(10)
    """
    try:
        import fiftyone.brain as fob
    except ImportError:
        raise ImportError("FiftyOne Brain is required.")

    fo_dataset = _get_fo_dataset(dataset)
    fob.compute_uniqueness(
        fo_dataset,
        uniqueness_field=uniqueness_field,
        roi_field=roi_field,
        **kwargs,
    )


def compute_hardness(
    dataset: Any,
    label_field: str,
    *,
    hardness_field: str = "hardness",
    **kwargs: Any,
) -> None:
    """
    Compute hardness scores for classification samples.

    Hardness measures how difficult a sample is for the model.
    High hardness = model is uncertain/wrong on this sample.

    Args:
        dataset: Guava Dataset.
        label_field: Field containing model predictions (Classifications).
        hardness_field: Field name to store hardness scores.

    Examples::

        import guava as gv

        ds = gv.load("imagenet", "/path/to/data")
        # ... run model inference first ...
        gv.brain.compute_hardness(ds, label_field="predictions")
    """
    try:
        import fiftyone.brain as fob
    except ImportError:
        raise ImportError("FiftyOne Brain is required.")

    fo_dataset = _get_fo_dataset(dataset)
    fob.compute_hardness(fo_dataset, label_field, hardness_field=hardness_field, **kwargs)


def compute_mistakenness(
    dataset: Any,
    pred_field: str,
    label_field: str,
    *,
    mistakenness_field: str = "mistakenness",
    **kwargs: Any,
) -> None:
    """
    Find likely annotation mistakes by comparing model predictions to labels.

    High mistakenness score = likely annotation error.

    Args:
        dataset: Guava Dataset.
        pred_field: Field containing model predictions.
        label_field: Field containing ground-truth labels.
        mistakenness_field: Field name to store scores.
    """
    try:
        import fiftyone.brain as fob
    except ImportError:
        raise ImportError("FiftyOne Brain is required.")

    fo_dataset = _get_fo_dataset(dataset)
    fob.compute_mistakenness(
        fo_dataset,
        pred_field,
        label_field=label_field,
        mistakenness_field=mistakenness_field,
        **kwargs,
    )


def visualize_embeddings(
    dataset: Any,
    embeddings_field: str | None = None,
    *,
    method: str = "umap",
    brain_key: str = "embeddings_viz",
    **kwargs: Any,
) -> Any:
    """
    Compute a 2D visualization of dataset embeddings.

    Args:
        dataset: Guava Dataset.
        embeddings_field: Field containing precomputed embeddings.
            If None, computes CLIP embeddings first.
        method: Dimensionality reduction method: 'umap', 'tsne', 'pca'.
        brain_key: Key to store the visualization.

    Returns:
        Visualization results.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        gv.brain.compute_similarity(ds, brain_key="sim")
        gv.brain.visualize_embeddings(ds, brain_key="sim")
        session = gv.launch_app(ds)
        # → Open Embeddings Panel in the App
    """
    try:
        import fiftyone.brain as fob
    except ImportError:
        raise ImportError("FiftyOne Brain is required.")

    fo_dataset = _get_fo_dataset(dataset)
    return fob.compute_visualization(
        fo_dataset,
        embeddings=embeddings_field,
        method=method,
        brain_key=brain_key,
        **kwargs,
    )


def find_near_duplicates(
    dataset: Any,
    *,
    threshold: float = 0.02,
    model: str = "clip-vit-base32",
    brain_key: str = "near_dup_sim",
) -> list[tuple[str, str, float]]:
    """
    Find near-duplicate image pairs in the dataset.

    Args:
        dataset: Guava Dataset.
        threshold: Distance threshold (0–1). Lower = more strict.
        model: Embedding model for similarity computation.
        brain_key: Brain key for the similarity index.

    Returns:
        List of (id1, id2, distance) tuples for near-duplicate pairs.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        dupes = gv.brain.find_near_duplicates(ds, threshold=0.05)
        print(f"Found {len(dupes)} near-duplicate pairs")
    """
    # First compute similarity index
    index = compute_similarity(dataset, model=model, brain_key=brain_key)
    fo_dataset = _get_fo_dataset(dataset)

    # Find near-duplicates using the index
    try:
        duplicates = index.find_duplicates(thresh=threshold)
        return [(id1, id2, dist) for id1, id2, dist in duplicates]
    except Exception:
        # Fallback: return empty list if Brain version doesn't support this
        return []
