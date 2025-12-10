# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import settings
from backend.ml_model.registry import load_models
from backend.routers.predictions_router import router as predictions_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    # 🔹 Configuración de CORS para permitir llamadas desde el frontend (Vite)
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],   # GET, POST, OPTIONS, etc.
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def startup_event():
        load_models()

    # Routers
    app.include_router(predictions_router)

    @app.get("/health", tags=["health"])
    def health_check():
        return {"status": "ok"}

    return app


app = create_app()
