import pandas as pd
import numpy as np
import json
import pickle
from pathlib import Path
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification, Trainer,
    TrainingArguments, pipeline, EarlyStoppingCallback)
import torch
import re

# -----------------------------
# CONFIGURACIÓN GPU
# -----------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🚀 Usando dispositivo: {device}")
if torch.cuda.is_available():
    print(f"GPU detectada: {torch.cuda.get_device_name(0)}")
    print(f"Memoria GPU disponible: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
else:
    print("⚠️ GPU no disponible, usando CPU")

# -----------------------------
# CONFIGURACIÓN
# -----------------------------
MODEL_NAME = "xlm-roberta-base"
MAX_LENGTH = 128
EPOCHS = 2
BATCH_SIZE = 32
LEARNING_RATE = 1e-5
RANDOM_STATE = 42
EARLY_STOPPING_PATIENCE = 2
WEIGHT_DECAY = 0.2

# -----------------------------
# 1) Cargar dataset
# -----------------------------
df = pd.read_csv("../../data/preprocessing_data/youtoxic_english_1000_clean.csv")
print("✅ Dataset procesado cargado exitosamente")

texts = df["Text"].astype(str).tolist()

# -----------------------------
# 2) Palabras maliciosas complejas (regex)
# -----------------------------
malicious_patterns = [
    r"\bstupid\b", r"\bidiot\b", r"\bdumb\b", r"\bhate\b", r"\bbitch\b",
    r"\bfuck\b", r"\bshit\b", r"\bkill\b", r"\bmurder\b",
    r"\bloser\b", r"\bbastard\b", r"\bpathetic\b", r"\bdisgusting\b",
    r"\bawful\b", r"\bterrible\b", r"\bidiotic\b", r"\bscum\b",
]

def contains_malicious_words(text):
    text_lower = text.lower()
    return any(re.search(pattern, text_lower) for pattern in malicious_patterns)

# -----------------------------
# 3) Pipeline preentrenado de toxicidad
# -----------------------------
toxic_model_name = "unitary/toxic-bert"
toxic_pipeline = pipeline(
    "text-classification",
    model=toxic_model_name,
    tokenizer=toxic_model_name,
    device=0 if torch.cuda.is_available() else -1,
    top_k=None
)

def predict_toxicity(text):
    try:
        preds = toxic_pipeline(text)
        if isinstance(preds, list) and len(preds) > 0:
            if isinstance(preds[0], list):
                preds = preds[0]  # desanidar
            # Ahora preds es lista de diccionarios
            for p in preds:
                if isinstance(p, dict) and "label" in p and "score" in p:
                    if "toxic" in p["label"].lower() and p["score"] > 0.5:
                        return True
        return False
    except Exception as e:
        print(f"Error en predict_toxicity: {e}")
        return False

# -----------------------------
# 4) Etiquetado automático combinando regex + modelo preentrenado
# -----------------------------
labels = [1 if contains_malicious_words(t) or predict_toxicity(t) else 0 for t in texts]
df["Label"] = labels

n_toxic = sum(labels)
n_clean = len(labels) - n_toxic

# -----------------------------
# 5) Train/Test split
# -----------------------------
X_train_texts, X_test_texts, y_train, y_test = train_test_split(
    texts, labels, test_size=0.25, random_state=RANDOM_STATE, stratify=labels
)

# -----------------------------
# 6) Tokenizer y Dataset
# -----------------------------
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

class TextDataset(torch.utils.data.Dataset):
    def __init__(self, texts, labels):
        self.encodings = tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=MAX_LENGTH
        )
        self.labels = torch.tensor(labels, dtype=torch.long)

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = self.labels[idx]
        return item

    def __len__(self):
        return len(self.labels)

train_dataset = TextDataset(X_train_texts, y_train)
test_dataset = TextDataset(X_test_texts, y_test)

# -----------------------------
# 7) Modelo binario XLM-RoBERTa con configuración anti-overfitting
# -----------------------------
from transformers import AutoConfig

config = AutoConfig.from_pretrained(
    MODEL_NAME,
    num_labels=2,
    hidden_dropout_prob=0.1,      # Reducir aún más: 0.2 → 0.1
    attention_probs_dropout_prob=0.05,  # Reducir: 0.1 → 0.05
    classifier_dropout=0.15        # Reducir: 0.3 → 0.15
)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    config=config
)
model = model.to(device)
# -----------------------------
# 8) Métricas
# -----------------------------
def compute_metrics(pred):
    logits, labels = pred
    preds = np.argmax(logits, axis=1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1_macro": f1_score(labels, preds, average="macro"),
        "precision": precision_score(labels, preds, average="macro", zero_division=0),
        "recall": recall_score(labels, preds, average="macro", zero_division=0)
    }

# -----------------------------
# 9) Trainer con Early Stopping
# -----------------------------
training_args = TrainingArguments(
    output_dir="/data/tmp_output",
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    learning_rate=3e-5,  # Aumentar: 2e-5 → 3e-5
    num_train_epochs=4,  # Aumentar: 3 → 4 epochs
    eval_strategy="epoch",
    save_strategy="epoch",
    logging_steps=20,
    load_best_model_at_end=True,
    metric_for_best_model="f1_macro",
    overwrite_output_dir=True,
    weight_decay=0.05,   # Reducir: 0.1 → 0.05         
    warmup_steps=50,                   
    warmup_ratio=0.05,                  
        # LABEL SMOOTHING
    label_smoothing_factor=0.0,  # Eliminar: 0.05 → 0.0        
    
    # GRADIENT CLIPPING
    max_grad_norm=0.5,                  
    
    # OPTIMIZACIÓN
    save_total_limit=1,
    greater_is_better=True,
    dataloader_drop_last=True,
    fp16=torch.cuda.is_available(),     
    
    # LOGGING
    logging_dir=None,
    report_to="none"
    
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=compute_metrics,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)]  # Aumentar paciencia: 1 → 2
)

trainer.train()

# -----------------------------
# 10) Evaluación final
# -----------------------------
preds_test = trainer.predict(test_dataset)
pred_test = np.argmax(preds_test.predictions, axis=1)

# Verificar dimensiones y ajustar si es necesario
print(f"Dimensiones - y_test: {len(y_test)}, pred_test: {len(pred_test)}")
if len(y_test) != len(pred_test):
    # Usar solo las primeras predicciones que coincidan
    min_len = min(len(y_test), len(pred_test))
    y_test_adjusted = y_test[:min_len]
    pred_test_adjusted = pred_test[:min_len]
    print(f"Ajustando a {min_len} muestras")
else:
    y_test_adjusted = y_test
    pred_test_adjusted = pred_test

test_accuracy = accuracy_score(y_test_adjusted, pred_test_adjusted)
test_f1 = f1_score(y_test_adjusted, pred_test_adjusted, average="macro")
test_precision = precision_score(y_test_adjusted, pred_test_adjusted, average="macro", zero_division=0)
test_recall = recall_score(y_test_adjusted, pred_test_adjusted, average="macro", zero_division=0)


# Evaluación en train para calcular overfitting
preds_train = trainer.predict(train_dataset)
pred_train = np.argmax(preds_train.predictions, axis=1)

# Verificar dimensiones para train también
print(f"Dimensiones - y_train: {len(y_train)}, pred_train: {len(pred_train)}")
if len(y_train) != len(pred_train):
    min_len = min(len(y_train), len(pred_train))
    y_train_adjusted = y_train[:min_len]
    pred_train_adjusted = pred_train[:min_len]
    print(f"Ajustando train a {min_len} muestras")
else:
    y_train_adjusted = y_train
    pred_train_adjusted = pred_train

train_accuracy = accuracy_score(y_train_adjusted, pred_train_adjusted)
train_f1 = f1_score(y_train_adjusted, pred_train_adjusted, average="macro")

overfitting_percentage = (train_accuracy - test_accuracy) * 100
print(f"🔹 Accuracy Test: {test_accuracy:.4f}, Train: {train_accuracy:.4f}")
print(f"🔹 Overfitting estimado: {overfitting_percentage:.2f}%")

# -----------------------------
# 11) Guardar modelo y resultados
# -----------------------------
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
models_path = Path("../../backend/models")
results_path = Path("../../data/results")

model_pkl_path = models_path / f"roberta_toxicity_model_{timestamp}.pkl"
tokenizer_pkl_path = models_path / f"roberta_tokenizer_{timestamp}.pkl"

with open(model_pkl_path, 'wb') as f:
    pickle.dump(model, f)
    
with open(tokenizer_pkl_path, 'wb') as f:
    pickle.dump(tokenizer, f)

print(f"✓ Modelo: {model_pkl_path}")
print(f"✓ Tokenizer: {tokenizer_pkl_path}")

# Guardar métricas en JSON
results_dict = {
    "model_name": MODEL_NAME,
    "task": "binary_toxic_classification",
    "labels": ["Not malicious", "Malicious"],
    "data": {
        "n_samples": len(texts),
        "n_train": len(X_train_texts),
        "n_test": len(X_test_texts),
        "n_toxic": n_toxic,
        "n_clean": n_clean,
        "random_state": RANDOM_STATE
    },
    "training": {
        "epochs": EPOCHS,
        "batch_size": BATCH_SIZE,
        "learning_rate": LEARNING_RATE,
        "weight_decay": WEIGHT_DECAY,
        "max_length": MAX_LENGTH,
        "dropout_hidden": config.hidden_dropout_prob,
        "dropout_attention": config.attention_probs_dropout_prob,
        "dropout_classifier": config.classifier_dropout,
        "label_smoothing": 0.15,
    },
    "metrics": {
        "train_accuracy": float(train_accuracy),
        "train_f1": float(train_f1),
        "test_accuracy": float(test_accuracy),
        "test_precision": float(test_precision),
        "test_recall": float(test_recall),
        "test_f1": float(test_f1),
        "overfitting_percent": float(overfitting_percentage)
    },
    "timestamp": timestamp,
    "notes": f"Anti-overfitting configuration: high dropout, low LR, weight decay {WEIGHT_DECAY}, {EPOCHS} epochs"
}

json_path = results_path / f"xlm_roberta_binary_{timestamp}.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(results_dict, f, indent=2, ensure_ascii=False)

print(f"✓ JSON: {json_path}")

print(f"✅ Modelo guardado en: {model_pkl_path}")
print(f"✅ Tokenizer guardado en: {tokenizer_pkl_path}")
    
print(f"✅ Resultados del entrenamiento:")
print(f"   - Test Accuracy: {test_accuracy:.4f}")
print(f"   - Test F1 Score: {test_f1:.4f}")
print(f"   - Train Accuracy: {train_accuracy:.4f}")
print(f"   - Overfitting estimado: {overfitting_percentage:.2f}%")
print(f"   - Timestamp: {timestamp}")