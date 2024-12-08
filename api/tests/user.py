from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_register_user():
    response = client.post("/users/", json={"name": "Test", "description": "Test item"})
    assert response.status_code == 200
    assert "id" in response.json()
