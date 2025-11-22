# Notebooks del Proyecto

Este directorio contiene los Jupyter notebooks para el análisis y desarrollo del proyecto de detección de mensajes de odio.

## 📓 Notebooks Disponibles

### 01_EDA.ipynb
**Exploratory Data Analysis (Análisis Exploratorio de Datos)**

Este notebook contiene el análisis inicial del dataset de comentarios de YouTube.

#### Contenido:
1. **Carga de datos**: Importación y primera inspección del dataset
2. **Análisis de valores faltantes**: Identificación de datos incompletos
3. **Distribución de clases**: Análisis del balance entre clases
4. **Estadísticas de texto**: 
   - Longitud de caracteres
   - Cantidad de palabras
   - Longitud promedio de palabras
5. **Análisis de palabras frecuentes**: Top palabras más comunes
6. **Análisis por clase**: Comparación entre mensajes normales y de odio
7. **Nubes de palabras**: Visualización de términos frecuentes
8. **Análisis de n-gramas**: Bigramas y trigramas más comunes
9. **Detección de duplicados**: Identificación de comentarios repetidos

#### Cómo usar:
```bash
# Instalar dependencias
pip install -r ../requirements.txt

# Iniciar Jupyter
jupyter notebook

# Abrir 01_EDA.ipynb
```

## 🚀 Próximos Notebooks

Los siguientes notebooks serán añadidos en futuras fases:

- `02_Preprocessing.ipynb`: Preprocesamiento de texto
- `03_Feature_Engineering.ipynb`: Creación de features (TF-IDF, embeddings)
- `04_Baseline_Models.ipynb`: Modelos baseline (Logistic Regression, SVM)
- `05_Advanced_Models.ipynb`: Modelos avanzados (LSTM, Transformers)
- `06_Model_Evaluation.ipynb`: Evaluación y comparación de modelos
- `07_Hyperparameter_Tuning.ipynb`: Optimización de hiperparámetros

## 📋 Requisitos

Antes de ejecutar los notebooks, asegúrate de:

1. **Instalar las dependencias**:
   ```bash
   pip install -r ../requirements.txt
   ```

2. **Descargar recursos de NLTK** (si es necesario):
   ```python
   import nltk
   nltk.download('stopwords')
   nltk.download('punkt')
   ```

3. **Colocar el dataset** en `../data/raw/`

## 📊 Estructura de Datos Esperada

Los notebooks esperan que el dataset tenga la siguiente estructura:

```
Columnas requeridas:
- text / comment: Texto del comentario
- label / class: Etiqueta (0: normal, 1: hate speech)

Columnas opcionales:
- video_id: ID del video de YouTube
- author: Autor del comentario
- timestamp: Fecha del comentario
```

## 🔧 Configuración

### Jupyter Notebook
```bash
# Instalar Jupyter
pip install jupyter

# Ejecutar
jupyter notebook
```

### JupyterLab (alternativa moderna)
```bash
# Instalar JupyterLab
pip install jupyterlab

# Ejecutar
jupyter lab
```

## 💡 Buenas Prácticas

1. **Ejecuta las celdas en orden**: Los notebooks están diseñados para ejecutarse secuencialmente
2. **Guarda regularmente**: Usa Ctrl+S o Cmd+S frecuentemente
3. **Reinicia el kernel si es necesario**: Kernel > Restart & Clear Output
4. **Documenta tus cambios**: Añade celdas markdown para explicar análisis adicionales
5. **Versionado**: Considera usar nbdime para hacer diff de notebooks

## 📈 Visualizaciones

Los notebooks generan diversas visualizaciones:
- Gráficos de distribución
- Boxplots comparativos
- Nubes de palabras
- Gráficos de barras de frecuencias
- Heatmaps

## 🤝 Colaboración

Si trabajas en equipo:
1. Crea una copia del notebook antes de hacer cambios experimentales
2. Usa nombres descriptivos: `01_EDA_experimento_stopwords.ipynb`
3. Limpia las salidas antes de hacer commit: Cell > All Output > Clear

## 📝 Notas

- Los datos no se suben al repositorio (ver `.gitignore`)
- Las rutas en los notebooks son relativas al directorio `notebooks/`
- Se recomienda usar un entorno virtual para las dependencias
