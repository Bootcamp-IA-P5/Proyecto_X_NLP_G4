# backend/routers/predictions_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd

from backend.core.database import get_db
from backend.db_models.prediction_model import Prediction
from backend.ml_model import get_model
from backend.schemas.prediction_schema import (
    PredictionRequest,
    PredictionResponse,
)

router = APIRouter(prefix="/predict", tags=["predictions"])

# Columnas que usaron los modelos clásicos en entrenamiento
TEXT_COL = "text_classic"
NUMERIC_FEATURES = [
    "text_len_classic",
    "word_count_classic",
    "uppercase_ratio",
    "exclamation_count",
    "hate_words_count",
]

# Lista pequeñita de palabras "de odio" para aproximar hate_words_count
HATE_WORDS = {
    "hate",
    "idiot",
    "stupid",
    "dumb",
    "disgusting",
    "trash",
    "loser",
    "kill",
    "bastard",
}


def build_input_from_text(text: str) -> pd.DataFrame:
    """
    Construye un DataFrame con las columnas que esperan los modelos clásicos:
    - text_classic
    - text_len_classic
    - word_count_classic
    - uppercase_ratio
    - exclamation_count
    - hate_words_count

    Nota: esta es una versión aproximada de las features que generasteis en el
    notebook de preprocessing. Idealmente, la lógica debería compartirse en un
    módulo común, pero esto es suficiente para que los pipelines funcionen.
    """
    raw = text or ""
    text_clean = raw.strip()

    # Longitud y número de palabras
    text_len = len(text_clean)
    words = text_clean.split()
    word_count = len(words)

    # Proporción de mayúsculas en el texto original
    if len(raw) > 0:
        uppercase_ratio = sum(1 for c in raw if c.isupper()) / len(raw)
    else:
        uppercase_ratio = 0.0

    # Número de signos de exclamación
    exclamation_count = raw.count("!")

    # Conteo de "hate words" sencillo
    tokens_lower = [w.lower().strip(".,!?;:") for w in words]
    hate_words_count = sum(1 for w in tokens_lower if w in HATE_WORDS)

    data = {
        TEXT_COL: text_clean,
        "text_len_classic": text_len,
        "word_count_classic": word_count,
        "uppercase_ratio": uppercase_ratio,
        "exclamation_count": exclamation_count,
        "hate_words_count": hate_words_count,
    }

    return pd.DataFrame([data])


def _run_model_and_store(
    model_name: str,
    text: str,
    db: Session,
) -> Prediction:
    """
    Ejecuta el modelo seleccionado sobre el texto y guarda la predicción en BBDD.
    """
    try:
        model = get_model(model_name)
    except ValueError as e:
        raise ValueError(str(e))

    # 🔹 Todos los modelos clásicos se entrenaron con las mismas features tabulares
    X = build_input_from_text(text)

    # Predicción de etiqueta
    try:
        y_pred = model.predict(X)[0]
    except Exception as e:
        raise ValueError(f"Error running model '{model_name}': {e}")

    # Score opcional (si el modelo lo soporta)
    score = None
    if hasattr(model, "predict_proba"):
        try:
            score = float(model.predict_proba(X)[0, 1])
        except Exception:
            score = None
    elif hasattr(model, "decision_function"):
        try:
            score = float(model.decision_function(X)[0])
        except Exception:
            score = None

    pred_row = Prediction(
        model_name=model_name,
        input_text=text,
        predicted_label=int(y_pred),
        score=score,
    )

    db.add(pred_row)
    db.commit()
    db.refresh(pred_row)

    return pred_row


@router.post("/svm", response_model=PredictionResponse)
def predict_svm(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    try:
        pred = _run_model_and_store("svm", payload.text, db)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return pred


@router.post("/naive-bayes", response_model=PredictionResponse)
def predict_naive_bayes(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    try:
        pred = _run_model_and_store("naive_bayes", payload.text, db)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return pred


@router.post("/logreg", response_model=PredictionResponse)
def predict_logistic_regression(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    try:
        pred = _run_model_and_store("logreg", payload.text, db)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return pred


@router.post("/random-forest", response_model=PredictionResponse)
def predict_random_forest(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    """
    Predicción usando Random Forest (modelo clásico con features tabulares).
    """
    try:
        pred = _run_model_and_store("random_forest", payload.text, db)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return pred


@router.post("/distilbert", response_model=PredictionResponse)
def predict_distilbert(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    """
    Predicción usando DistilBERT (transformer de HuggingFace).
    """
    import torch
    
    try:
        distilbert = get_model("distilbert")
        tokenizer = distilbert["tokenizer"]
        model = distilbert["model"]
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    text = payload.text or ""
    
    # Tokenizar el texto
    inputs = tokenizer(
        text,
        truncation=True,
        padding="max_length",
        max_length=128,
        return_tensors="pt"
    )
    
    # Predicción
    model.eval()
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=-1)
        pred_label = torch.argmax(probs, dim=-1).item()
        confidence = probs[0][pred_label].item()
    
    # Guardar en BBDD
    pred_row = Prediction(
        model_name="distilbert",
        input_text=text,
        predicted_label=int(pred_label),
        score=float(confidence),
    )
    db.add(pred_row)
    db.commit()
    db.refresh(pred_row)
    
    return pred_row


@router.post("/rnn-bigru", response_model=PredictionResponse)
def predict_rnn_bigru(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
):
    """
    Predicción usando RNN BiGRU (TensorFlow/Keras).
    
    El modelo incluye TextVectorization integrada, por lo que acepta texto crudo directamente.
    Parámetros del modelo:
    - MAX_WORDS: 10000 (vocabulario máximo)
    - MAX_LEN: 120 (longitud de secuencia)
    """
    import numpy as np
    import tensorflow as tf
    
    try:
        model = get_model("rnn_bigru")
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    text = payload.text or ""
    
    try:
        # El modelo RNN BiGRU tiene TextVectorization integrada
        # La signature espera input con forma (batch_size, 1) de tipo string
        text_input = tf.constant([[text]], dtype=tf.string)
        
        # Predicción usando TFSMLayer (serving_default endpoint)
        # TFSMLayer requiere el argumento 'inputs' (no el nombre del tensor)
        prediction = model(inputs=text_input)
        
        # El resultado es un diccionario con 'output_0' de forma (batch_size, 1)
        output_value = prediction['output_0'].numpy()
        
        # Extraer el valor de probabilidad
        confidence = float(output_value[0][0])
        pred_label = int(confidence > 0.5)  # Threshold 0.5
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error running RNN BiGRU model: {str(e)}"
        )
    
    # Guardar en BBDD
    pred_row = Prediction(
        model_name="rnn_bigru",
        input_text=text,
        predicted_label=pred_label,
        score=confidence,
    )
    db.add(pred_row)
    db.commit()
    db.refresh(pred_row)
    
    return pred_row
