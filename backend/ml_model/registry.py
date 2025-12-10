# backend/ml_models/registry.py
from pathlib import Path
from typing import Dict

import joblib

from backend.core.config import settings

_MODEL_REGISTRY: Dict[str, object] = {}


def load_models() -> None:
    """
    Carga los modelos .pkl en memoria al arrancar la API.
    """
    models_to_load = {
        "svm": settings.SVM_MODEL_PATH,
        "naive_bayes": settings.NB_MODEL_PATH,
        "logreg": settings.LOGREG_MODEL_PATH,
    }

    for name, path in models_to_load.items():
        path = Path(path)
        if not path.exists():
            print(f"[WARN] Model file not found for '{name}': {path}")
            continue

        try:
            model = joblib.load(path)
            _MODEL_REGISTRY[name] = model
            print(f"[INFO] Loaded model '{name}' from {path}")
        except Exception as e:
            print(f"[ERROR] Failed to load model '{name}' from {path}: {e}")


def get_model(name: str):
    """
    Devuelve el modelo cargado desde el registro.
    """
    model = _MODEL_REGISTRY.get(name)
    if model is None:
        raise ValueError(f"Model '{name}' not loaded or not found in registry.")
    return model
