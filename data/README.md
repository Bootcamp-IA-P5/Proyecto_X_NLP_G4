# Directorio de Datos

Este directorio contiene los datos para el proyecto de detección de mensajes de odio.

## Estructura

```
data/
├── raw/           # Datos originales sin procesar
│   └── *.csv      # Datasets de comentarios de YouTube
├── processed/     # Datos procesados y con features
│   └── *.csv      # Datasets después del preprocesamiento
└── README.md      # Este archivo
```

## Datos Raw

Los datos originales deben colocarse en la carpeta `raw/`. 

### Formato Esperado

El dataset debe contener al menos las siguientes columnas:
- `text` o `comment`: Texto del comentario
- `label` o `class`: Etiqueta de clasificación
  - 0: Comentario normal
  - 1: Mensaje de odio (hate speech)

### Fuentes de Datos Sugeridas

Para este proyecto, puedes utilizar datasets públicos de detección de hate speech:

1. **YouTube Hate Speech Dataset**
2. **Twitter Hate Speech Dataset**
3. **Davidson et al. Hate Speech Dataset**
4. **HateXplain Dataset**

## Datos Procesados

La carpeta `processed/` contendrá:
- Datasets con features adicionales generadas durante el EDA
- Datasets preprocesados listos para modelado
- Archivos de resumen estadístico (JSON)

## Nota Importante

⚠️ Los archivos de datos (.csv, .json, etc.) están excluidos del control de versiones mediante `.gitignore` para evitar subir datasets grandes al repositorio.

Para compartir datos con el equipo, considerar:
- Usar servicios de almacenamiento en la nube (Google Drive, Dropbox)
- Usar DVC (Data Version Control)
- Documentar la fuente y el proceso de obtención de los datos
