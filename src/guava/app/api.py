"""
Guava App API.

Launch the Guava Visual Web Application to explore datasets.
"""
from __future__ import annotations

from typing import Any

from guava.core.dataset import Dataset
from guava.server.session import GuavaAppSession, launch_server

__all__ = ["launch_app", "close_app", "get_session"]

_active_session: GuavaAppSession | None = None


def launch_app(
    dataset: Dataset | None = None,
    *,
    port: int = 5151,
    address: str = "127.0.0.1",
    auto: bool = True,
    desktop: bool = False,
    **kwargs: Any,
) -> GuavaAppSession:
    """
    Launch the 100% Native Guava Visual Web Application.

    Args:
        dataset: A Guava Dataset instance.
        port: Port to bind to (default: 5151).
        address: Address to bind to (default: 127.0.0.1).
        auto: If True, auto-open the browser.
        desktop: If True, open as a standalone app window (Edge/Chrome --app mode).

    Returns:
        GuavaAppSession object with .wait(), .close(), .url.
    """
    global _active_session

    session = launch_server(
        dataset=dataset,
        port=port,
        address=address,
        auto=auto,
        desktop=desktop,
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


def get_session() -> GuavaAppSession | None:
    """Get the currently active Guava App session."""
    return _active_session
