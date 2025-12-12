# backend/ml_models/registry.py
from pathlib import Path
from typing import Dict, Any

import joblib

from backend.core.config import settings

_MODEL_REGISTRY: Dict[str, Any] = {}


def load_models() -> None:
    """
    Carga los modelos .pkl y modelos de Deep Learning en memoria al arrancar la API.
    """
    # Modelos clásicos (.pkl)
    pkl_models = {
        "svm": settings.SVM_MODEL_PATH,
        "naive_bayes": settings.NB_MODEL_PATH,
        "logreg": settings.LOGREG_MODEL_PATH,
        "random_forest": settings.RANDOM_FOREST_MODEL_PATH,
    }

    for name, path in pkl_models.items():
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
    
    # Cargar DistilBERT (HuggingFace Transformers)
    _load_distilbert()
    
    # Cargar RNN BiGRU (TensorFlow/Keras)
    _load_rnn_bigru()


def _load_distilbert() -> None:
    """Carga el modelo DistilBERT de HuggingFace."""
    try:
        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        
        model_path = Path(settings.DISTILBERT_MODEL_PATH)
        if not model_path.exists():
            print(f"[WARN] DistilBERT model not found at {model_path}")
            return
        
        tokenizer = AutoTokenizer.from_pretrained(str(model_path))
        model = AutoModelForSequenceClassification.from_pretrained(str(model_path))
        
        _MODEL_REGISTRY["distilbert"] = {
            "tokenizer": tokenizer,
            "model": model
        }
        print(f"[INFO] Loaded DistilBERT model from {model_path}")
    except ImportError:
        print("[WARN] transformers library not installed. Skipping DistilBERT model.")
    except Exception as e:
        print(f"[ERROR] Failed to load DistilBERT model: {e}")


def _load_rnn_bigru() -> None:
    """Carga el modelo RNN BiGRU de TensorFlow/Keras usando TFSMLayer para SavedModel legacy."""
    try:
        import tensorflow as tf
        import keras
        
        model_path = Path(settings.RNN_BIGRU_MODEL_PATH)
        if not model_path.exists():
            print(f"[WARN] RNN BiGRU model not found at {model_path}")
            return
        
        # Usar TFSMLayer para cargar SavedModel legacy en Keras 3
        model = keras.layers.TFSMLayer(str(model_path), call_endpoint='serving_default')
        _MODEL_REGISTRY["rnn_bigru"] = model
        print(f"[INFO] Loaded RNN BiGRU model from {model_path}")
    except ImportError:
        print("[WARN] tensorflow library not installed. Skipping RNN BiGRU model.")
    except Exception as e:
        print(f"[ERROR] Failed to load RNN BiGRU model: {e}")


def get_model(name: str):
    """
    Devuelve el modelo cargado desde el registro.
    """
    model = _MODEL_REGISTRY.get(name)
    if model is None:
        raise ValueError(f"Model '{name}' not loaded or not found in registry.")
    return model
