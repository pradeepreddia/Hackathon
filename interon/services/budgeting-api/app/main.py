from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Budgeting API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True, "service": "budgeting-api"}

@app.post("/budget-versions")
def create_budget_version(payload: dict):
    # mock: echo back
    return {"id": 1, "received": payload, "message": "created (mock)"}
