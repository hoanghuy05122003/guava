"""
"Scan another folder" in Run Model: folders are remembered, a weights file means its folder,
a wrong path is an error instead of a silent fallback to the default folders.
"""
import pytest
from starlette.testclient import TestClient

from guava.server.app import app


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("USERPROFILE", str(tmp_path / "home"))
    monkeypatch.setenv("HOME", str(tmp_path / "home"))
    return TestClient(app)


def test_scan_folder_is_remembered_and_forgotten(client, tmp_path):
    w = tmp_path / "weights" / "run1"
    w.mkdir(parents=True)
    (w / "best.pt").write_bytes(b"x")
    folder = str(tmp_path / "weights")

    data = client.get("/api/models", params={"dir": str(w / "best.pt")}).json()  # a file: its folder is added
    assert data["added"].endswith("run1") and data["added"] in data["saved"]

    data = client.get("/api/models", params={"dir": folder}).json()
    assert data["saved"][0] == data["added"]
    assert any(m["path"].endswith("best.pt") for m in data["models"])

    again = client.get("/api/models").json()  # remembered without passing dir
    assert any(m["path"].endswith("best.pt") for m in again["models"])

    gone = client.get("/api/models", params={"forget": data["added"]}).json()
    assert data["added"] not in gone["saved"]


def test_scan_missing_folder_is_an_error(client, tmp_path):
    r = client.get("/api/models", params={"dir": str(tmp_path / "nope")})
    assert r.status_code == 404 and "Folder not found" in r.json()["message"]
