"""
Open Guava Studio as a standalone desktop window (no tabs, no address bar).

Order of preference:
  1. pywebview (pip install pywebview) -> native window, fully offline
  2. Microsoft Edge / Google Chrome in --app mode (Edge ships with Windows)
  3. default web browser
"""
from __future__ import annotations

import os
import shutil
import subprocess
import webbrowser


def _browser_candidates() -> list[str]:
    env = os.environ
    pf = [env.get("PROGRAMFILES(X86)", r"C:\Program Files (x86)"), env.get("PROGRAMFILES", r"C:\Program Files"),
          env.get("LOCALAPPDATA", "")]
    paths = []
    for base in pf:
        if base:
            paths.append(os.path.join(base, "Microsoft", "Edge", "Application", "msedge.exe"))
            paths.append(os.path.join(base, "Google", "Chrome", "Application", "chrome.exe"))
    for name in ("msedge", "google-chrome", "chromium", "chromium-browser", "chrome"):
        found = shutil.which(name)
        if found:
            paths.append(found)
    return [p for p in paths if p and os.path.exists(p)]


def has_webview() -> bool:
    try:
        import webview  # noqa: F401
        return True
    except Exception:
        return False


def run_webview(url: str, title: str = "Guava Studio") -> None:
    """Blocking: shows a native window until the user closes it."""
    import webview
    webview.create_window(title, url, width=1600, height=1000, min_size=(1000, 650))
    webview.start()


def open_app_window(url: str) -> str:
    """Open `url` in an app-style browser window. Returns the method used."""
    profile = os.path.join(os.path.expanduser("~"), ".guava", "browser-profile")
    for exe in _browser_candidates():
        try:
            subprocess.Popen(
                [exe, f"--app={url}", f"--user-data-dir={profile}", "--window-size=1600,1000", "--no-first-run"],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            )
            return os.path.basename(exe)
        except OSError:
            continue
    webbrowser.open(url, new=2)
    return "browser"