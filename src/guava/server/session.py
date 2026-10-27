"""
Guava Web App Session & Hypercorn Runner.
"""
from __future__ import annotations

import asyncio
import os
import threading
import time
import webbrowser
from typing import Any

from hypercorn.asyncio import serve
from hypercorn.config import Config

from guava.core.dataset import Dataset
from guava.server.app import app, dataset_manager


class GuavaAppSession:
    """Manages the lifecycle of a Guava Native Web App session."""

    def __init__(self, port: int = 5151, address: str = "127.0.0.1"):
        self.port = port
        self.address = address
        # 0.0.0.0 listens on every interface but is not a browsable address
        local = "127.0.0.1" if address in ("0.0.0.0", "::", "") else address
        self.url = f"http://{local}:{port}"
        self._thread: threading.Thread | None = None
        self._loop: asyncio.AbstractEventLoop | None = None
        self._shutdown_event: asyncio.Event | None = None
        self._ready_event = threading.Event()
        self._stopped_event = threading.Event()

    def start(self, dataset: Dataset | None = None, auto_open: bool = True, desktop: bool = False) -> None:
        """Start the web server in a background thread."""
        if dataset is not None:
            dataset_manager.set_dataset(dataset)

        def run_server():
            self._loop = asyncio.new_event_loop()
            asyncio.set_event_loop(self._loop)
            self._shutdown_event = asyncio.Event()

            config = Config()
            config.bind = [f"{self.address}:{self.port}"]
            config.access_log_format = ""
            config.use_reloader = False

            async def runner():
                self._ready_event.set()
                await serve(app, config, shutdown_trigger=self._shutdown_event.wait)

            try:
                self._loop.run_until_complete(runner())
            except Exception:
                pass
            finally:
                self._stopped_event.set()

        self._thread = threading.Thread(target=run_server, daemon=True)
        self._thread.start()

        # Wait for server to bind
        self._ready_event.wait(timeout=5.0)
        time.sleep(0.3)

        if auto_open:
            if desktop:
                from guava.server.desktop import open_app_window
                threading.Timer(0.3, lambda: open_app_window(self.url)).start()
            else:
                threading.Timer(0.5, lambda: webbrowser.open(self.url, new=2)).start()

    def lan_urls(self) -> list[str]:
        """URLs other machines on the network can open (empty when bound to localhost only)."""
        if self.address not in ("0.0.0.0", "::", ""):
            return []
        import socket
        try:
            ips = socket.gethostbyname_ex(socket.gethostname())[2]
        except OSError:
            ips = []
        # primary interface first: the one the default route uses (UDP connect sends no packet)
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.connect(("10.255.255.255", 1))
                primary = s.getsockname()[0]
            ips = [primary] + [ip for ip in ips if ip != primary]
        except OSError:
            pass
        return [f"http://{ip}:{self.port}" for ip in ips if not ip.startswith(("127.", "0."))]

    def wait(self) -> None:
        """Keep the session running until interrupted by user (Ctrl+C)."""
        try:
            while not self._stopped_event.is_set():
                time.sleep(0.5)
        except KeyboardInterrupt:
            self.close()

    def close(self) -> None:
        """Shut down the web server."""
        if self._loop and self._shutdown_event:
            self._loop.call_soon_threadsafe(self._shutdown_event.set)
        self._stopped_event.wait(timeout=2.0)


def launch_server(
    dataset: Dataset | None = None,
    port: int = 5151,
    address: str = "127.0.0.1",
    auto: bool = True,
    desktop: bool = False,
) -> GuavaAppSession:
    """Launch Guava Studio Web App."""
    session = GuavaAppSession(port=port, address=address)
    session.start(dataset=dataset, auto_open=auto, desktop=desktop)
    return session
