# Código Fuente (src)

Este directorio contiene los módulos de Python reutilizables del proyecto.

## 📦 Módulos

### data_loader.py
**Cargador y Validador de Datos**

Proporciona la clase `DataLoader` para:
- Cargar datasets desde CSV
- Validar la estructura de los datos
- Verificar calidad de datos
- Generar resúmenes estadísticos

#### Uso básico:
```python
from src.data_loader import DataLoader

# Crear instancia
loader = DataLoader(data_dir='../data/raw')

# Cargar datos
df = loader.load_csv('youtube_comments.csv')

# Validar estructura
is_valid, errors = loader.validate_structure(df, text_col='text', label_col='label')

# Mostrar resumen
loader.print_summary(df)
```

## 🔮 Módulos Futuros

Los siguientes módulos serán añadidos en futuras fases:

### preprocessor.py
- Limpieza de texto
- Normalización
- Tokenización
- Eliminación de stopwords
- Lematización/Stemming

### feature_engineer.py
- Vectorización (TF-IDF, BoW)
- Extracción de n-gramas
- Generación de embeddings
- Features estadísticas

### model_trainer.py
- Entrenamiento de modelos
- Validación cruzada
- Guardado de modelos
- Métricas de evaluación

### predictor.py
- Carga de modelos entrenados
- Pipeline de predicción
- Procesamiento de nuevos textos

### utils.py
- Funciones auxiliares comunes
- Configuración
- Logging

## 📝 Convenciones

- **Nombres de archivos**: snake_case (ej: `data_loader.py`)
- **Nombres de clases**: PascalCase (ej: `DataLoader`)
- **Nombres de funciones**: snake_case (ej: `load_csv`)
- **Constantes**: UPPER_CASE (ej: `MAX_LENGTH`)

## 🧪 Testing

Se recomienda añadir tests para cada módulo:

```
tests/
├── test_data_loader.py
├── test_preprocessor.py
└── test_feature_engineer.py
```

## 📚 Documentación

Cada módulo debe incluir:
- Docstrings en formato Google o NumPy
- Type hints cuando sea posible
- Ejemplos de uso
- Descripción de parámetros y retornos

## 🤝 Contribución

Al añadir nuevos módulos:
1. Incluye docstrings completos
2. Añade type hints
3. Proporciona ejemplos de uso
4. Actualiza este README
5. Considera añadir tests
