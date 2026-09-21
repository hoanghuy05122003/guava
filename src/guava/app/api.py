"""
Guava App API

Launch the FiftyOne visual web application to explore datasets.

The App provides:
  - Sample grid with image/video browsing
  - Annotation overlay (bboxes, masks, keypoints, etc.)
  - Embeddings panel (UMAP, t-SNE, PCA visualization)
  - Filtering & search
  - Tagging & labeling
  - Model evaluation views
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    pass

__all__ = ["launch_app", "close_app", "get_session"]

_active_session = None


def launch_app(
    dataset: Any | None = None,
    *,
    port: int | None = None,
    address: str | None = None,
    auto: bool = True,
    remote: bool = False,
    desktop: bool = False,
    height: int | None = None,
    **kwargs: Any,
) -> Any:
    """
    Launch the Guava visual web application.

    Wraps FiftyOne's App launcher, converting Guava datasets to
    FiftyOne datasets automatically.

    Args:
        dataset: A Guava Dataset to visualize. If None, opens an empty App.
        port: Port to use for the App server (default: 5151).
        address: Address to bind to (default: localhost).
        auto: If True, auto-open the App in the browser.
        remote: If True, launch in remote mode (no browser).
        desktop: If True, launch in desktop mode.
        height: Height of the App in pixels (for notebook mode).
        **kwargs: Additional args passed to ``fiftyone.launch_app()``.

    Returns:
        A FiftyOne Session object.

    Examples::

        import guava as gv

        ds = gv.load("coco", "/path/to/data")
        session = gv.launch_app(ds)

        # In a script, block until the App is closed
        session.wait()
    """
    global _active_session

    try:
        import fiftyone as fo
    except ImportError:
        raise ImportError(
            "FiftyOne is required for the visual App. "
            "Install with: pip install fiftyone"
        )

    # Convert Guava Dataset → FiftyOne Dataset if needed
    fo_dataset = None
    if dataset is not None:
        if hasattr(dataset, "to_fiftyone"):
            # It's a Guava Dataset
            fo_dataset = dataset.to_fiftyone()
        elif hasattr(dataset, "name") and hasattr(dataset, "add_samples"):
            # It's already a FiftyOne Dataset
            fo_dataset = dataset

    launch_kwargs: dict[str, Any] = {}
    if port is not None:
        launch_kwargs["port"] = port
    if address is not None:
        launch_kwargs["address"] = address
    if height is not None:
        launch_kwargs["height"] = height
    launch_kwargs.update(kwargs)

    session = fo.launch_app(
        dataset=fo_dataset,
        auto=auto,
        remote=remote,
        desktop=desktop,
        **launch_kwargs,
    )

    _active_session = session
    return session


def close_app() -> None:
    """Close the active Guava App session."""
    global _active_session

    if _active_session is not None:
        try:
            _active_session.close()
        except Exception:
            pass
        _active_session = None
    else:
        try:
            import fiftyone as fo
            fo.close_app()
        except Exception:
            pass


def get_session() -> Any | None:
    """Get the currently active Guava App session."""
    return _active_session
