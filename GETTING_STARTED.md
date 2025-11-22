# 🚀 Guía de Inicio Rápido - Proyecto NLP Hate Speech Detection

Esta guía te ayudará a configurar tu entorno y comenzar con el análisis exploratorio de datos (EDA).

## 📋 Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Git
- Un dataset de comentarios de YouTube (ver sección de Datos)

## 🔧 Configuración del Entorno

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Bootcamp-IA-P5/Proyecto_X_NLP_G4.git
cd Proyecto_X_NLP_G4
```

### 2. Crear Entorno Virtual (Recomendado)

#### En Linux/Mac:
```bash
python3 -m venv venv
source venv/bin/activate
```

#### En Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Instalar Dependencias

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Descargar Recursos de NLTK

Abre Python y ejecuta:

```python
import nltk
nltk.download('stopwords')
nltk.download('punkt')
```

O desde la terminal:

```bash
python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"
```

## 📊 Preparar los Datos

### 1. Obtener el Dataset

Necesitas un dataset de comentarios de YouTube con las siguientes columnas:
- `text` o `comment`: El texto del comentario
- `label` o `class`: La etiqueta (0 = normal, 1 = hate speech)

**Fuentes sugeridas:**
- [YouTube Hate Speech Dataset](https://www.kaggle.com/datasets)
- [Davidson et al. Hate Speech Dataset](https://github.com/t-davidson/hate-speech-and-offensive-language)
- Crear tu propio dataset usando la API de YouTube

### 2. Colocar el Dataset

Coloca tu archivo CSV en la carpeta `data/raw/`:

```bash
# Estructura esperada:
data/
└── raw/
    └── youtube_comments.csv  # Tu dataset aquí
```

### 3. Verificar el Formato

Tu dataset debe verse algo así:

| text | label |
|------|-------|
| "Great video!" | 0 |
| "Offensive comment here..." | 1 |

## 🎯 Ejecutar el EDA

### 1. Iniciar Jupyter Notebook

```bash
jupyter notebook
```

O si prefieres JupyterLab:

```bash
jupyter lab
```

### 2. Abrir el Notebook de EDA

1. Navega a la carpeta `notebooks/`
2. Abre `01_EDA.ipynb`
3. En la celda de carga de datos, actualiza el nombre del archivo:
   ```python
   df = pd.read_csv(DATA_PATH / 'tu_archivo.csv')
   ```

### 3. Ejecutar el Análisis

Ejecuta las celdas en orden (Shift + Enter) o ejecuta todo:
- Menú: Cell > Run All

## 📖 Usar el Data Loader

También puedes usar el módulo `DataLoader` para cargar y validar datos:

```python
from src.data_loader import DataLoader

# Crear instancia
loader = DataLoader(data_dir='data/raw')

# Cargar datos
df = loader.load_csv('youtube_comments.csv')

# Validar estructura
is_valid, errors = loader.validate_structure(df, text_col='text', label_col='label')

# Mostrar resumen
loader.print_summary(df)
```

## 🐛 Solución de Problemas

### Error: "ModuleNotFoundError: No module named 'pandas'"

**Solución:** Instala las dependencias:
```bash
pip install -r requirements.txt
```

### Error: "FileNotFoundError: [Errno 2] No such file or directory"

**Solución:** Verifica que:
1. Tu dataset está en `data/raw/`
2. El nombre del archivo en el código coincide con tu archivo real

### Jupyter no se inicia

**Solución:** Verifica que está instalado:
```bash
pip install jupyter
```

### Problemas con NLTK

**Solución:** Descarga los recursos manualmente:
```python
import nltk
nltk.download('all')  # Descarga todos los recursos (puede tardar)
```

## 📚 Próximos Pasos

Después de completar el EDA:

1. **Revisar los resultados**: Analiza las visualizaciones y estadísticas
2. **Documentar hallazgos**: Anota insights importantes en el notebook
3. **Compartir con el equipo**: Discute los resultados con tus compañeros
4. **Planificar preprocesamiento**: Basándote en el EDA, decide qué técnicas de limpieza aplicar
5. **Preparar para modelado**: Identifica features relevantes

## 🤝 Colaboración

### Estructura de Ramas

```bash
# Crear una rama para tu trabajo
git checkout -b feature/tu-nombre-caracteristica

# Hacer commits
git add .
git commit -m "Add: descripción del cambio"

# Push
git push origin feature/tu-nombre-caracteristica
```

### Convenciones de Commits

- `Add:` Añadir nueva funcionalidad
- `Fix:` Corregir un bug
- `Update:` Actualizar código existente
- `Docs:` Cambios en documentación
- `Refactor:` Refactorización de código

## 📞 Ayuda

Si tienes problemas:

1. **Revisa la documentación**: Lee los README en cada carpeta
2. **Consulta al equipo**: Pregunta a tus compañeros de proyecto
3. **Issues de GitHub**: Crea un issue describiendo el problema

---

## ✅ Checklist de Inicio

- [ ] Repositorio clonado
- [ ] Entorno virtual creado y activado
- [ ] Dependencias instaladas
- [ ] Recursos de NLTK descargados
- [ ] Dataset colocado en `data/raw/`
- [ ] Jupyter Notebook funcionando
- [ ] Notebook `01_EDA.ipynb` ejecutado exitosamente
- [ ] Resultados del EDA revisados

---

¡Buena suerte con el proyecto! 🎉
