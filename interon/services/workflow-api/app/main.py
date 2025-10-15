from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Workflow API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True, "service": "workflow-api"}

@app.post("/transitions")
def transition(payload: dict):
    # mock: pretend it moved to Approved
    return {"ok": True, "next_state": "Approved", "received": payload}
