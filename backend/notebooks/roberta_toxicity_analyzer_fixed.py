import pandas as pd
import numpy as np
import json
from pathlib import Path
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments, pipeline
import torch
import re

# -----------------------------
# CONFIGURACIÓN
# -----------------------------
MODEL_NAME = "xlm-roberta-base"
MAX_LENGTH = 128
EPOCHS = 3
BATCH_SIZE = 8
LEARNING_RATE = 3e-5
RANDOM_STATE = 42

# -----------------------------
# 1) Cargar dataset
# -----------------------------
df = pd.read_csv("data/preprocessing_data/youtoxic_english_1000_clean.csv")
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
    for pattern in malicious_patterns:
        if re.search(pattern, text_lower):
            return True
    return False

# -----------------------------
# 3) Pipeline preentrenado de toxicidad (HuggingFace)
# -----------------------------
# Usaremos el modelo “unitary/toxic-bert” (multilingüe)
toxic_model_name = "unitary/toxic-bert"
toxic_pipeline = pipeline("text-classification", model=toxic_model_name, tokenizer=toxic_model_name, return_all_scores=True)

def predict_toxicity(text):
    preds = toxic_pipeline(text)[0]
    # Tomamos la categoría "toxic" si existe
    for p in preds:
        if p["label"].lower() == "toxic" and p["score"] > 0.5:
            return True
    return False

# -----------------------------
# 4) Etiquetado automático combinando regex + modelo preentrenado
# -----------------------------
labels = []
for text in texts:
    if contains_malicious_words(text) or predict_toxicity(text):
        labels.append(1)
    else:
        labels.append(0)

df["Label"] = labels

# -----------------------------
# 5) Train/Test split
# -----------------------------
X_train_texts, X_test_texts, y_train, y_test = train_test_split(
    texts, labels, test_size=0.20, random_state=RANDOM_STATE
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
# 7) Modelo binario XLM-RoBERTa
# -----------------------------
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=2
)

# -----------------------------
# 8) Métricas
# -----------------------------
def compute_metrics(pred):
    logits, labels = pred
    preds = np.argmax(logits, axis=1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1_macro": f1_score(labels, preds, average="macro")
    }

# -----------------------------
# 9) Trainer
# -----------------------------
training_args = TrainingArguments(
    output_dir="models/xlm_roberta_binary_toxic",
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    learning_rate=LEARNING_RATE,
    num_train_epochs=EPOCHS,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_steps=50,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=compute_metrics,
)

trainer.train()

# -----------------------------
# 10) Evaluación final
# -----------------------------
preds_test = trainer.predict(test_dataset)
logits = preds_test.predictions
pred_test = np.argmax(logits, axis=1)

accuracy = accuracy_score(y_test, pred_test)
f1_macro = f1_score(y_test, pred_test, average="macro")

# -----------------------------
# 11) Guardar modelo y resultados
# -----------------------------
models_dir = Path("models")
results_dir = Path("results")
models_dir.mkdir(exist_ok=True)
results_dir.mkdir(exist_ok=True)

model_dir = models_dir / "xlm_roberta_binary_toxic"
trainer.save_model(model_dir)
tokenizer.save_pretrained(model_dir)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
json_path = results_dir / f"xlm_roberta_binary_toxic_{timestamp}.json"

results_dict = {
    "model_name": MODEL_NAME,
    "task": "Binary malicious text classification",
    "labels": ["Not malicious", "Malicious"],
    "train_size": len(X_train_texts),
    "test_size": len(X_test_texts),
    "metrics": {
        "accuracy": accuracy,
        "f1_macro": f1_macro,
    },
    "timestamp": timestamp
}

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(results_dict, f, indent=2, ensure_ascii=False)

print("JSON generado:", json_path)
