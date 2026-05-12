from fastapi import FastAPI

from app.routes import router

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application that demonstrates JWT-based authentication.",
    version="0.1.0",
)

app.include_router(router)


@app.get("/health", tags=["health"], summary="Health check")
def health_check() -> dict:
    return {"status": "ok"}
