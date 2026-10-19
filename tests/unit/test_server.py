"""
Unit tests for Guava Native Web Server API endpoints.
"""
import pytest
from starlette.testclient import TestClient
from guava.server.app import app
import guava as gv
import os


@pytest.fixture
def client():
    return TestClient(app)


def test_index_page(client):
    response = client.get("/")
    assert response.status_code == 200
    assert "Guava Studio" in response.text
    assert "Discovered Datasets on Disk" in response.text


def test_dataset_info_endpoint(client):
    response = client.get("/api/dataset/info")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "total_samples" in data


def test_discover_datasets_endpoint(client):
    response = client.get("/api/dataset/discover")
    assert response.status_code == 200
    data = response.json()
    assert "datasets" in data
    assert isinstance(data["datasets"], list)
    assert len(data["datasets"]) > 0


def test_browse_endpoint(client):
    # Root browse
    response = client.get("/api/browse")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data

    # Browse D:\data if exists
    if os.path.exists(r"D:\data"):
        response = client.get("/api/browse?path=D:\\data")
        assert response.status_code == 200
        data = response.json()
        assert data["current"] == r"D:\data"
        assert len(data["items"]) > 0


def test_load_real_dataset(client):
    target = r"D:\data\Wits\coils_v1"
    if not os.path.exists(target):
        pytest.skip(f"Test path {target} does not exist on this machine")

    response = client.post("/api/dataset/load", json={"path": target, "format": "yolo"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["info"]["total_samples"] == 392

    # Verify samples endpoint returns real samples
    samples_resp = client.get("/api/samples?page=1&limit=5")
    assert samples_resp.status_code == 200
    samples_data = samples_resp.json()
    assert len(samples_data["samples"]) == 5
    assert samples_data["total"] == 392

    # Verify media endpoint serves actual image
    first_sample_id = samples_data["samples"][0]["id"]
    media_resp = client.get(f"/api/media/{first_sample_id}")
    assert media_resp.status_code == 200
    assert media_resp.headers["content-type"] in ("image/jpeg", "image/png", "image/webp")
