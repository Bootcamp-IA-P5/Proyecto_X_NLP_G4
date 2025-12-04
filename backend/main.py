# backend/main.py
from fastapi import FastAPI

from backend.core.config import settings
from backend.ml_model.registry import load_models  # ojo: carpeta ml_model (singular)
from backend.routers.predictions_router import router as predictions_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    @app.on_event("startup")
    def startup_event():
        load_models()

    # Registramos los routers de predicción
    app.include_router(predictions_router)

    @app.get("/health", tags=["health"])
    def health_check():
        return {"status": "ok"}

    return app


app = create_app()
