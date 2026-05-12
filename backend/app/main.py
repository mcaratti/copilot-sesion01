import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application that demonstrates JWT-based authentication.",
    version="0.1.0",
)

# Allow the React dev server and any local origin by default.
# Override CORS_ORIGINS env var with a comma-separated list for production.
_raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:4173")
_allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", tags=["health"], summary="Health check")
def health_check() -> dict:
    return {"status": "ok"}
