# backend/core/config.py
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Configuración del modelo de settings (Pydantic v2)
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )

    PROJECT_NAME: str = "YouTube Toxic Comments API"

    # Configuración de la base de datos
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "toxic_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    # Directorio base del backend (carpeta backend/)
    BASE_DIR: Path = Path(__file__).resolve().parents[1]

    # Directorio donde están los modelos de ML (.pkl)
    MODELS_DIR: Path = BASE_DIR / "models"

    # Rutas a los modelos .pkl concretos
    SVM_MODEL_PATH: Path = MODELS_DIR / "svm_toxic_v1.pkl"
    NB_MODEL_PATH: Path = MODELS_DIR / "naive_bayes_multinomial_IsToxic.pkl"
    LOGREG_MODEL_PATH: Path = MODELS_DIR / "logistic_regression.pkl"


settings = Settings()
