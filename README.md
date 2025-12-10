<div align="center">

# 🛡️ Sistema de Detección de Mensajes de Odio

### 🤖 Aplicación ML Full-stack para Detección de Comentarios Tóxicos en Tiempo Real

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13-orange.svg)](https://www.tensorflow.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0-red.svg)](https://pytorch.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Sistema NLP end-to-end que combina enfoques de ML clásico y deep learning para la detección automática de discurso de odio en comentarios de YouTube, con una API REST lista para producción y una interfaz web interactiva.**

</div>

<br>

---

<div align="center">

## 📊 Descripción del Proyecto

</div>

Este proyecto implementa un **pipeline completo de detección de comentarios tóxicos** utilizando 6 modelos de machine learning diferentes, desde algoritmos clásicos hasta transformers de última generación. Construido con un backend FastAPI y frontend React, el sistema proporciona predicciones en tiempo real con puntuaciones de confianza detalladas y comparaciones entre modelos.

<div align="center">

### 🎯 Objetivos Clave

</div>

| 🔍 Análisis de Datos | 📊 Entrenamiento de Modelos | 🚀 Despliegue en Producción |
|---|---|---|
| Preprocesar 1,000 comentarios tóxicos de YouTube | Entrenar y evaluar 6 modelos ML/DL | API REST FastAPI con PostgreSQL |
| Manejar clasificación multi-etiqueta | Comparar ML clásico vs deep learning | Dashboard interactivo en React |
| EDA con estadísticas y distribuciones de texto | Fine-tuning de transformer DistilBERT | Predicciones en tiempo real con scores de confianza |

<div align="center">

### 🏆 Resumen de Rendimiento de Modelos

</div>

| Modelo | Tipo | Precisión | F1-Score | Tiempo de Inferencia |
|---|---|---|---|---|
| 🔵 **SVM** | Clásico | 73.5% | 0.679 | ~50ms |
| 🟢 **Naive Bayes** | Clásico | 76.0% | 0.696 | ~40ms |
| 🟠 **Regresión Logística** | Clásico | 62.0% | 0.672 | ~45ms |
| 🟣 **Random Forest** | Ensemble | 78.5% | 0.712 | ~80ms |
| 🔴 **DistilBERT** | Transformer | **85.2%** | **0.831** | ~200ms |
| ⚫ **RNN BiGRU** | Deep Learning | 81.3% | 0.789 | ~120ms |

<br>

---

<div align="center">

## 📈 Arquitectura General

</div>

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Frontend (React + Vite)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   SVM    │  │NaiveBayes│  │ LogReg   │  │ RandForest│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │DistilBERT│  │RNN BiGRU │  │ Results  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP REST API
┌───────────────────────▼─────────────────────────────────────┐
│              ⚡ Backend (FastAPI + Uvicorn)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          🤖 ML Model Registry (6 Models)              │  │
│  │  SVM • Naive Bayes • LogReg • Random Forest          │  │
│  │  DistilBERT (HuggingFace) • RNN BiGRU (Keras 3)      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         🗄️ PostgreSQL (Prediction History)           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

<br>

---

<div align="center">

## 🗂️ Estructura del Proyecto

</div>

```
📦 Proyecto_X_NLP_G4/
│
├── 📊 data/
│   ├── 📥 youtoxic_english_1000.csv              # 📋 Raw dataset (1,000 samples)
│   ├── 📂 preprocessing_data/
│   │   └── youtoxic_english_1000_clean.csv       # ✅ Cleaned dataset
│   └── 📈 results/
│       ├── svm_toxic_v1.json                     # 📊 SVM metrics
│       ├── naive_bayes_multinomial_IsToxic.json
│       ├── logistic_regression.json
│       └── model_comparison.csv                  # 📋 Comparative results
│
├── 🧠 backend/
│   ├── 🎯 main.py                                # 🚀 FastAPI application entry
│   ├── 🗄️ init_db.py                             # 🏗️ Database initialization
│   │
│   ├── 📂 core/
│   │   ├── config.py                             # ⚙️ Configuration & paths
│   │   └── database.py                           # 🔌 PostgreSQL connection
│   │
│   ├── 📂 db_models/
│   │   └── prediction_model.py                   # 🗃️ SQLAlchemy ORM models
│   │
│   ├── 📂 schemas/
│   │   └── prediction_schema.py                  # 📋 Pydantic request/response
│   │
│   ├── 📂 routers/
│   │   └── predictions_router.py                 # 🔀 API endpoints (6 models)
│   │
│   ├── 📂 ml_model/
│   │   └── registry.py                           # 🤖 Model loader & manager
│   │
│   ├── 📂 models/                                # 💾 Serialized ML models
│   │   ├── svm_toxic_v1.pkl                      # 🔵 Support Vector Machine
│   │   ├── naive_bayes_multinomial_IsToxic.pkl   # 🟢 Naive Bayes
│   │   ├── logistic_regression.pkl               # 🟠 Logistic Regression
│   │   ├── random_forest_IsToxic_manual_ultra.pkl # 🟣 Random Forest
│   │   ├── 🤗 distilbert_toxic_v1/               # 🔴 HuggingFace Transformers
│   │   │   ├── config.json
│   │   │   ├── model.safetensors
│   │   │   └── tokenizer files...
│   │   └── 🧠 rnn_bigru_IsToxic_bigru_reg_export/ # ⚫ TensorFlow SavedModel
│   │       ├── saved_model.pb
│   │       └── variables/
│   │
│   └── 📓 notebooks/                             # 🔬 Research & training notebooks
│       ├── eda.ipynb                             # 📊 Exploratory Data Analysis
│       ├── preprocessing_eda.ipynb               # 🧹 Data cleaning pipeline
│       ├── svm.ipynb                             # 🔵 SVM training
│       ├── naive_bayes_multinomial.ipynb         # 🟢 Naive Bayes training
│       ├── logistic_regression.ipynb             # 🟠 LogReg training
│       ├── distilbert_finetuning.ipynb           # 🔴 Transformer fine-tuning
│       └── comparison_models.ipynb               # 📊 Model comparison
│
├── 🎨 frontend/
│   ├── 📦 package.json                           # 📋 Node dependencies
│   ├── ⚙️ vite.config.js                         # ⚡ Vite bundler config
│   │
│   ├── 📂 src/
│   │   ├── 🎯 main.jsx                           # 🚀 React entry point
│   │   ├── 🎨 index.css                          # 💅 Global Tailwind styles
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── Nav.jsx                           # 🧭 Sidebar navigation
│   │   │   ├── Footer.jsx                        # 🦶 Page footer
│   │   │   └── ModelChat.jsx                     # 💬 Chat-like prediction UI
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx                          # 🏠 Landing page
│   │   │   ├── About.jsx                         # ℹ️ Project info
│   │   │   ├── SvmPage.jsx                       # 🔵 SVM interface
│   │   │   ├── NaiveBayesPage.jsx                # 🟢 Naive Bayes interface
│   │   │   ├── LogRegPage.jsx                    # 🟠 LogReg interface
│   │   │   ├── RandomForestPage.jsx              # 🟣 Random Forest interface
│   │   │   ├── DistilBertPage.jsx                # 🔴 DistilBERT interface
│   │   │   ├── RnnBigruPage.jsx                  # ⚫ RNN BiGRU interface
│   │   │   ├── Results.jsx                       # 📊 Model comparison
│   │   │   └── Settings.jsx                      # ⚙️ Configuration
│   │   │
│   │   ├── 📂 routes/
│   │   │   └── Routes.jsx                        # 🔀 React Router config
│   │   │
│   │   ├── 📂 services/
│   │   │   └── modelServices.js                  # 🌐 API client functions
│   │   │
│   │   ├── 📂 data/
│   │   │   └── modelMetrics.js                   # 📊 Model performance data
│   │   │
│   │   └── 📂 layout/
│   │       └── Layout.jsx                        # 🏗️ Main layout wrapper
│   │
│   └── 📂 public/                                # 🌐 Static assets
│
├── 📋 requirements.txt                           # 🐍 Python dependencies
├── 📄 LICENSE                                    # ⚖️ MIT License
└── 📘 README.md                                  # 📖 This file
```

<br>

---

<div align="center">

## 🔧 Stack Tecnológico

</div>

<div align="center">

### 📊 Machine Learning y Ciencia de Datos

</div>

| Tecnología | Propósito | Versión |
|---|---|---|
| 🐍 **Python** | Lenguaje principal | 3.13+ |
| 🔢 **NumPy** | Cómputo numérico | 1.24+ |
| 📊 **Pandas** | Manipulación de datos | 2.0+ |
| 🤖 **scikit-learn** | Modelos ML clásicos | 1.3+ |
| 🧠 **TensorFlow** | Deep learning (RNN BiGRU) | 2.13+ |
| 🔥 **PyTorch** | Deep learning (DistilBERT) | 2.0+ |
| 🤗 **Transformers** | Modelos preentrenados | 4.40+ |
| 📓 **Jupyter** | Notebooks interactivos | Latest |

<div align="center">

### ⚡ Infraestructura Backend

</div>

| Tecnología | Propósito | Versión |
|---|---|---|
| 🚀 **FastAPI** | Framework REST API | 0.104+ |
| 🦄 **Uvicorn** | Servidor ASGI | 0.24+ |
| 🗄️ **PostgreSQL** | Base de datos relacional | 14+ |
| 🔌 **SQLAlchemy** | ORM | 2.0+ |
| ✅ **Pydantic** | Validación de datos | 2.0+ |
| 🔧 **psycopg2** | Adaptador PostgreSQL | 2.9+ |

<div align="center">

### 🎨 Tecnologías Frontend

</div>

| Tecnología | Propósito | Versión |
|---|---|---|
| ⚛️ **React** | Framework UI | 18+ |
| ⚡ **Vite** | Herramienta de build | Latest |
| 🔀 **React Router** | Enrutamiento client-side | 6+ |
| 💅 **Tailwind CSS** | CSS utility-first | Latest |
| 🎨 **Lottie** | Animaciones | Latest |

<br>

---

<div align="center">

## 🚀 Comenzando

</div>

<div align="center">

### 📋 Requisitos Previos

</div>

```bash
# Python 3.13 or higher
python --version

# Node.js 18 or higher (for frontend)
node --version

# PostgreSQL 14 or higher
psql --version

# Git
git --version
```

<div align="center">

### 📥 Instalación

</div>

#### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4.git
cd Proyecto_X_NLP_G4
```

#### 2️⃣ Configuración del Backend

```bash
# Crear entorno virtual
python -m venv .venv

# Activar entorno
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# Linux/macOS
source .venv/bin/activate

# Instalar dependencias Python
pip install -r requirements.txt

# Inicializar base de datos
python backend/init_db.py
```

#### 3️⃣ Configuración del Frontend

```bash
cd frontend

# Instalar dependencias Node
npm install

# Volver a la raíz del proyecto
cd ..
```

<div align="center">

### 🏃 Ejecutar la Aplicación

</div>

#### 🖥️ Opción 1: Ejecutar Ambos Servicios Simultáneamente

**Terminal 1 - Backend:**
```bash
# Desde la raíz del proyecto, con .venv activado
uvicorn backend.main:app --reload

# El servidor iniciará en: http://127.0.0.1:8000
# Documentación API disponible en: http://127.0.0.1:8000/docs
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev

# El frontend iniciará en: http://localhost:5173
```

#### 🔬 Opción 2: Explorar Notebooks de Jupyter

```bash
# Desde la raíz del proyecto, con .venv activado
jupyter notebook

# Navegar a backend/notebooks/ y ejecutar:
# 1. eda.ipynb - Análisis Exploratorio de Datos
# 2. preprocessing_eda.ipynb - Limpieza de Datos
# 3. Notebooks individuales de modelos (svm.ipynb, distilbert_finetuning.ipynb, etc.)
# 4. comparison_models.ipynb - Comparación de Modelos
```

<br>

---

<div align="center">

## 📊 Información del Dataset

</div>

<div align="center">

### 📥 Dataset Fuente

</div>

| Métrica | Valor |
|---|---|
| 📊 **Total de Muestras** | 1,000 comentarios de YouTube |
| 🌐 **Fuente** | [YouToxic Dataset](https://www.kaggle.com/datasets/gyanprakashkushwaha/youtoxic-dataset) |
| 🏷️ **Columnas de Etiquetas** | `IsToxic`, `IsAbusive`, `IsThreat`, `IsProvocative`, `IsObscene`, `IsHate`, `IsRacist`, `IsNationalist`, `IsSexist`, `IsHomophobic`, `IsReligiousHate`, `IsRadicalism` |
| 🎯 **Tipo de Tarea** | Clasificación binaria multi-etiqueta |
| 📝 **Columna de Texto** | `Text` (comentarios en inglés) |
| ✅ **Versión Limpia** | `data/preprocessing_data/youtoxic_english_1000_clean.csv` |

<div align="center">

### 🧹 Pipeline de Preprocesamiento de Datos

</div>

```python
# 1. Limpieza de Texto
- Conversión a minúsculas
- Eliminación de URLs
- Manejo de caracteres especiales
- Normalización de espacios en blanco

# 2. Ingeniería de Características
- AnyToxic: Etiqueta de toxicidad agregada (cualquier etiqueta = 1)
- LabelCount: Número de etiquetas tóxicas activas por comentario
- Estadísticas de texto: conteo de palabras, conteo de caracteres, longitud promedio de palabras

# 3. División Train/Test
- División 80/20
- Estratificada por etiqueta AnyToxic
- Estado aleatorio: 42 para reproducibilidad
```

<br>

---

<div align="center">

## 🤖 Detalles de los Modelos

</div>

### 🔵 Support Vector Machine (SVM)

**Arquitectura:**
- Kernel: Lineal
- Parámetro C: 1.0
- Vectorización TF-IDF (máx 5000 características)

**Métricas:**
- Precisión: 73.5%
- Precision: 0.767
- Recall: 0.609
- F1-Score: 0.679
- ROC-AUC: 0.807

### 🟢 Naive Bayes Multinomial

**Arquitectura:**
- Vectorización TF-IDF
- Suavizado Alpha: 1.0

**Métricas:**
- Precisión: 76.0%
- Precision: 0.833
- Recall: 0.598
- F1-Score: 0.696
- ROC-AUC: 0.801

### 🟠 Regresión Logística

**Arquitectura:**
- TF-IDF + TruncatedSVD (100 componentes)
- Solver: lbfgs
- Iteraciones máx: 1000

**Métricas:**
- Precisión: 62.0%
- Precision: 0.557
- Recall: 0.848
- F1-Score: 0.672
- ROC-AUC: 0.776

### 🟣 Random Forest

**Arquitectura:**
- Estimadores: 100 árboles
- Profundidad máx: Auto
- Vectorización TF-IDF

**Métricas:**
- Precisión: 78.5%
- Precision: 0.825
- Recall: 0.681
- F1-Score: 0.712

### 🔴 DistilBERT (Fine-tuned)

**Arquitectura:**
- Modelo base: `distilbert-base-uncased`
- Longitud de secuencia: 128 tokens
- Épocas de entrenamiento: 3
- Tasa de aprendizaje: 2e-5
- Optimizador: AdamW

**Métricas:**
- Precisión: 85.2% ⭐
- Precision: 0.871
- Recall: 0.794
- F1-Score: 0.831 ⭐
- Inferencia: ~200ms/muestra

### ⚫ RNN BiGRU

**Arquitectura:**
- Capas GRU bidireccionales
- Dimensión de embedding: 100
- Longitud máx de secuencia: 120 tokens
- Tamaño de vocabulario: 10,000
- Capa TextVectorization integrada

**Métricas:**
- Precisión: 81.3%
- Precision: 0.812
- Recall: 0.768
- F1-Score: 0.789
- Inferencia: ~120ms/muestra

<br>

---

<div align="center">

## 🌐 Endpoints de la API

</div>

<div align="center">

### 📋 Endpoints Disponibles

</div>

| Endpoint | Método | Modelo | Descripción |
|---|---|---|---|
| `/predict/svm` | POST | SVM | Predicción con SVM clásico |
| `/predict/naive-bayes` | POST | Naive Bayes | Predicción con Naive Bayes Multinomial |
| `/predict/logreg` | POST | Regresión Logística | Predicción con LogReg |
| `/predict/random-forest` | POST | Random Forest | Predicción con Ensemble |
| `/predict/distilbert` | POST | DistilBERT | Predicción basada en Transformer |
| `/predict/rnn-bigru` | POST | RNN BiGRU | Predicción con GRU bidireccional |

<div align="center">

### 📝 Formato de Petición/Respuesta

</div>

**Cuerpo de la Petición:**
```json
{
  "text": "You are disgusting, go away!"
}
```

**Cuerpo de la Respuesta:**
```json
{
  "id": 1,
  "text": "You are disgusting, go away!",
  "predicted_label": 1,
  "score": 0.923,
  "model_name": "distilbert",
  "created_at": "2025-12-10T19:30:00.000Z"
}
```

<div align="center">

### 🧪 Probar Endpoints (curl)

</div>

```bash
# Probar endpoint DistilBERT
curl -X POST "http://127.0.0.1:8000/predict/distilbert" \
  -H "Content-Type: application/json" \
  -d '{"text": "You are stupid and annoying"}'

# Test RNN BiGRU endpoint
curl -X POST "http://127.0.0.1:8000/predict/rnn-bigru" \
  -H "Content-Type: application/json" \
  -d '{"text": "Great video, thanks for sharing!"}'
```

<div align="center">

### 📚 Documentación Interactiva de la API

</div>

FastAPI proporciona documentación interactiva automática:

- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc

<br>

---

<div align="center">

## 🎨 Características del Frontend

</div>

<div align="center">

### 🖥️ Interfaz de Usuario

</div>

- **🧭 Navegación Lateral:** Acceso rápido a las 6 páginas de modelos
- **💬 Interfaz tipo Chat:** Entrada de texto intuitiva con predicciones en tiempo real
- **📊 Scores de Confianza:** Visualización gráfica de la certeza del modelo
- **🎯 Ejemplos Rápidos:** Muestras tóxicas/no tóxicas precargadas
- **📈 Página de Resultados:** Métricas comparativas de rendimiento de modelos
- 🌙 **Tema Oscuro:** Diseño moderno basado en slate con Tailwind CSS

<div align="center">

### 📱 Diseño Responsivo

</div>

- Diseño desktop-first con responsividad móvil
- Clases utilitarias de Tailwind CSS para estilos rápidos
- Animaciones suaves con Lottie para estados de carga

<br>

---

<div align="center">

## 📈 Comparación de Modelos

</div>

<div align="center">

### 🏆 Resumen de Rendimiento

</div>

| Modelo | Tiempo de Entrenamiento | Tiempo de Inferencia | F1-Score | Mejor Para |
|---|---|---|---|---|
| 🔵 SVM | ~2 min | 50ms | 0.679 | Balance entre velocidad y precisión |
| 🟢 Naive Bayes | ~1 min | 40ms | 0.696 | Inferencia más rápida |
| 🟠 LogReg | ~1 min | 45ms | 0.672 | Alto recall (pocos falsos negativos) |
| 🟣 Random Forest | ~5 min | 80ms | 0.712 | Ensemble robusto |
| 🔴 DistilBERT | ~30 min | 200ms | **0.831** ⭐ | Máxima precisión |
| ⚫ RNN BiGRU | ~20 min | 120ms | 0.789 | Comprensión de contexto secuencial |

<div align="center">

### 💡 Recomendaciones

</div>

| Caso de Uso | Modelo Recomendado | Razón |
|---|---|---|
| 🚀 **API en Producción (alto tráfico)** | Naive Bayes / SVM | Inferencia rápida, baja latencia |
| 🎯 **Máxima Precisión** | DistilBERT | Mejor F1-score, comprensión contextual |
| ⚖️ **Rendimiento Equilibrado** | Random Forest / RNN BiGRU | Buena precisión con velocidad razonable |
| 🔍 **Investigación/Experimentación** | Todos los modelos | Comparar ML clásico vs deep learning |

<br>

---

<div align="center">

## 🔍 Insights Clave y Hallazgos

</div>

<div align="center">

### 📊 Insights de Datos

</div>

- **Dataset Desbalanceado:** ~70% comentarios tóxicos, 30% no tóxicos
- **Complejidad Multi-etiqueta:** Promedio de 2.3 etiquetas tóxicas por comentario tóxico
- **Longitud de Texto:** Media de 15 palabras por comentario (std: 8.2 palabras)
- **Categorías Tóxicas Más Comunes:**
  1. IsAbusive (45%)
  2. IsToxic (40%)
  3. IsObscene (28%)

<div align="center">

### 🤖 Insights de Modelos

</div>

- **Ventaja del Deep Learning:** Transformers (DistilBERT) superan a ML clásico en 8-15% de F1-score
- **El Contexto Importa:** RNN BiGRU captura dependencias secuenciales mejor que modelos basados en TF-IDF
- **Poder del Ensemble:** Random Forest muestra el mejor rendimiento entre modelos clásicos
- **Trade-off:** DistilBERT logra la máxima precisión pero requiere 4x tiempo de inferencia vs Naive Bayes

<div align="center">

### ⚠️ Desafíos y Limitaciones

</div>

- **Detección de Sarcasmo:** Todos los modelos tienen dificultades con comentarios tóxicos sarcásticos
- **Dependencia del Contexto:** Los comentarios cortos carecen de contexto suficiente para alta confianza
- **Tamaño del Dataset:** 1,000 muestras limita el potencial de los modelos de deep learning (idealmente 10k+)
- **Ruido en Etiquetas:** Algunas anotaciones multi-etiqueta son subjetivas e inconsistentes

<br>

---

<div align="center">

## 💡 Mejoras Futuras

</div>

<div align="center">

### 🚀 Objetivos a Corto Plazo

</div>

- [ ] **Aumento de Datos:** Implementar back-translation y reemplazo de sinónimos
- [ ] **Ajuste de Hiperparámetros:** Usar Optuna para optimización automatizada
- [ ] **Ensembling de Modelos:** Combinar predicciones de múltiples modelos
- [ ] **Explicabilidad:** Añadir visualizaciones SHAP/LIME para interpretabilidad del modelo

<div align="center">

### 🌟 Objetivos a Largo Plazo

</div>

- [ ] **Dataset Más Grande:** Expandir a 10k+ muestras para mejor generalización
- [ ] **Soporte Multi-idioma:** Entrenar modelos para español, francés, alemán
- [ ] **Aprendizaje Activo:** Implementar bucle de retroalimentación de usuarios para mejora continua
- [ ] **Despliegue Docker:** Containerizar aplicación para despliegue fácil
- [ ] **Hosting en la Nube:** Desplegar en AWS/Azure con auto-escalado

<br>

---

<div align="center">

## 👥 Equipo

**📊 Proyecto: Detección de Discurso de Odio NLP**  
**🎓 Factoría F5 - Bootcamp IA Promoción 5**

</div>

| Desarrollador | Rol | GitHub |
|---|---|---|
| 🧑‍💻 **José Andrés Lazaroth Núñez** | Ingeniero ML y Desarrollador Backend | [@Lazaroth93](https://github.com/Lazaroth93) |
| 👩‍💻 **Mónica Gómez González** | Científica de Datos y Especialista NLP | [@monigogo](https://github.com/monigogo) |
| 🧑‍💻 **Yeder Johansen Pimentel Tapia** | Desarrollador Full-stack y DevOps | [@Yedpt](https://github.com/Yedpt) |
| 🧑‍💻 **Alfonso Bermúdez Torres** | Ingeniero ML e Investigación | [@GHalfbbt](https://github.com/GHalfbbt) |

<br>

---

<div align="center">

## 📧 Contacto

**📫 ¿Preguntas o Problemas?**

</div>

- 🐛 [GitHub Issues](https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4/issues)
- 📧 Email: [contact@bootcamp-ia-p5.org](mailto:contact@bootcamp-ia-p5.org)
- 💬 Discusiones: [GitHub Discussions](https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4/discussions)

<br>

---

<div align="center">

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

**Atribución del Dataset:** [YouToxic Dataset](https://www.kaggle.com/datasets/gyanprakashkushwaha/youtoxic-dataset) (Kaggle - Dominio Público)

</div>

<br>

---

<div align="center">

## 🔄 Estado del Proyecto

### ✅ Completado

</div>

| Componente | Estado | Completado |
|---|---|---|
| 📥 **Recolección de Datos** | ✅ Completo | 100% |
| 🧹 **Preprocesamiento de Datos** | ✅ Completo | 100% |
| 🔍 **Análisis Exploratorio de Datos** | ✅ Completo | 100% |
| 🤖 **Modelos ML Clásicos** | ✅ Completo | 100% |
| 🧠 **Modelos de Deep Learning** | ✅ Completo | 100% |
| ⚡ **Backend FastAPI** | ✅ Completo | 100% |
| 🎨 **Frontend React** | ✅ Completo | 100% |
| 🗄️ **Integración de Base de Datos** | ✅ Completo | 100% |
| 📚 **Documentación** | ✅ Completo | 100% |

**📅 Última Actualización:** 10 de diciembre de 2025

<br>

---

<div align="center">

## 🚀 Comandos de Inicio Rápido

</div>

```bash
# 📦 Clonar y configurarurar
git clone https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4.git
cd Proyecto_X_NLP_G4
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows
source .venv/bin/activate      # Linux/macOS
pip install -r requirements.txt

# 🚀 Ejecutar backend
uvicorn backend.main:app --reload

# 🎨 Ejecutar frontend (nueva terminal)
cd frontend
npm install
npm run dev

# 📓 Explorar notebooks
jupyter notebook
```

<br>

---

<div align="center">

## 📚 Recursos Adicionales

</div>

| Recurso | Descripción |
|---|---|
| 📊 [Notebook de Comparación de Modelos](backend/notebooks/comparison_models.ipynb) | Análisis detallado de rendimiento |
| 🔬 [Fine-tuning de DistilBERT](backend/notebooks/distilbert_finetuning.ipynb) | Proceso de entrenamiento del Transformer |
| 📈 [Notebook EDA](backend/notebooks/eda.ipynb) | Análisis exploratorio de datos |
| 🧹 [Pipeline de Preprocesamiento](backend/notebooks/preprocessing_eda.ipynb) | Metodología de limpieza de datos |
| 🌐 [Documentación API](http://127.0.0.1:8000/docs) | Swagger UI Interactivo |

<br>

---

<div align="center">

### ⭐ Si encuentras este proyecto útil, ¡dale una estrella en GitHub! ⭐

**Hecho con ❤️  Bootcamp IA - Promoción 5**

[⬆ Volver Arriba](#️-sistema-de-detección-de-mensajes-de-odio)

</div>

