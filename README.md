# Proyecto NLP para Detección de Mensajes de Odio 
<img width="11520" height="3456" alt="424981434-aa8ae666-25aa-416c-8be4-58e1af7a00c6" src="https://github.com/user-attachments/assets/7f7c8f7d-9a6a-403c-a9fb-9cd789f66fa1" />

Repositorio académico para un proyecto de **Data Scientist / AI Developer** centrado en **Procesamiento de Lenguaje Natural (NLP)** y **Análisis de Sentimientos / Detección de discurso de odio** en comentarios de una red social.

El objetivo es diseñar, entrenar e implementar un modelo capaz de **detectar automáticamente mensajes de odio** para ayudar en tareas de moderación (eliminar comentarios, banear usuarios o lanzar alertas), priorizando una **solución práctica y desplegable** por encima de una precisión perfecta.

---

## 🎯 Objetivos del Proyecto

- Analizar un **dataset de comentarios de YouTube**.
- Realizar el **preprocesamiento de texto** (limpieza, normalización, etc.).
- Implementar técnicas clásicas de **NLP**.
- Entrenar y evaluar **modelos de clasificación** para detección de odio.
- Controlar el **overfitting** (diferencia entre train/test < 5 puntos porcentuales).
- Experimentar con:
  - **Vectorización** (Bag-of-Words, TF-IDF, etc.).
  - **Modelos clásicos de ML** (p. ej. Logistic Regression, SVM, Random Forest…).
  - **Ensembles** y **redes neuronales** (RNN/LSTM/Transformers) en niveles avanzados.
  - **Ajuste de hiperparámetros** (Optuna, AutoML, etc.).
  - **Data augmentation** en texto (traducción, sinónimos, etc.).
- Desarrollar una **solución productiva** (API, interfaz web, etc.) que permita a un usuario introducir un texto o una URL de vídeo y obtener una predicción.

---

## 📁 Estructura del Proyecto

```
Proyecto_X_NLP_G4/
├── data/                    # Directorio de datos
│   ├── raw/                # Datos originales
│   ├── processed/          # Datos procesados
│   └── README.md           # Documentación de datos
├── notebooks/              # Jupyter notebooks
│   ├── 01_EDA.ipynb       # Análisis Exploratorio de Datos
│   └── README.md          # Guía de notebooks
├── src/                    # Código fuente
│   └── data_loader.py     # Utilidades para cargar datos
├── requirements.txt        # Dependencias del proyecto
├── .gitignore             # Archivos a ignorar en git
└── README.md              # Este archivo
```

## 🚀 Comenzando

### Prerrequisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Jupyter Notebook o JupyterLab

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4.git
   cd Proyecto_X_NLP_G4
   ```

2. **Crear un entorno virtual (recomendado)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Descargar recursos de NLTK**
   ```python
   import nltk
   nltk.download('stopwords')
   nltk.download('punkt')
   ```

5. **Iniciar Jupyter Notebook**
   ```bash
   jupyter notebook
   ```

## 📊 Fases del Proyecto

### ✅ Fase 1: Análisis Exploratorio de Datos (EDA)
- **Notebook**: `notebooks/01_EDA.ipynb`
- **Objetivos**:
  - Cargar y explorar el dataset
  - Analizar distribución de clases
  - Explorar estadísticas de texto
  - Identificar patrones y características
  - Visualizar palabras frecuentes y n-gramas

### 🔄 Fase 2: Preprocesamiento (En desarrollo)
- Limpieza de texto
- Normalización
- Tokenización
- Eliminación de stopwords

### 🔄 Fase 3: Feature Engineering (Planificado)
- Vectorización (TF-IDF, Bag-of-Words)
- Embeddings (Word2Vec, GloVe)

### 🔄 Fase 4: Modelado (Planificado)
- Modelos baseline
- Modelos avanzados
- Optimización de hiperparámetros

### 🔄 Fase 5: Despliegue (Planificado)
- API REST
- Interfaz web
- Documentación de uso

## 🛠️ Tecnologías Utilizadas

- **Python**: Lenguaje principal
- **Pandas**: Manipulación de datos
- **NumPy**: Operaciones numéricas
- **Matplotlib/Seaborn**: Visualización
- **NLTK**: Procesamiento de lenguaje natural
- **Scikit-learn**: Machine learning
- **Jupyter**: Notebooks interactivos

## 📈 Análisis Exploratorio (EDA)

El análisis exploratorio incluye:

1. **Carga de datos**: Importación y validación del dataset
2. **Análisis de calidad**: Detección de valores faltantes y duplicados
3. **Distribución de clases**: Verificación de balance entre clases
4. **Estadísticas de texto**: Longitud, palabras, caracteres
5. **Análisis léxico**: Palabras frecuentes, n-gramas
6. **Visualizaciones**: Gráficos, nubes de palabras, distribuciones

Para más detalles, consulta el notebook `notebooks/01_EDA.ipynb`.

## 📝 Datos

Los datos deben colocarse en `data/raw/`. El formato esperado del dataset:

| Columna | Descripción | Tipo |
|---------|-------------|------|
| text/comment | Texto del comentario | String |
| label/class | Etiqueta (0: normal, 1: odio) | Integer |

**Nota**: Los archivos de datos no se suben al repositorio (ver `.gitignore`).

## 🤝 Contribución

Este es un proyecto académico del Bootcamp IA-P5. Si eres parte del equipo:

1. Crea una rama para tu trabajo: `git checkout -b feature/nueva-funcionalidad`
2. Haz commits descriptivos: `git commit -m "Add: nueva funcionalidad"`
3. Push a tu rama: `git push origin feature/nueva-funcionalidad`
4. Crea un Pull Request

## 📄 Licencia

Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores
    
- [José Andrés Lazaroth Núñez](https://github.com/Lazaroth93)  
- [Mónica Gómez González](https://github.com/monigogo)   
- [Yeder Johansen Pimentel Tapia](https://github.com/Yedpt)
- [Alfonso Bermúdez Torres](https://github.com/GHalfbbt)

---

⭐ Si este proyecto te resulta útil, ¡considera darle una estrella!
