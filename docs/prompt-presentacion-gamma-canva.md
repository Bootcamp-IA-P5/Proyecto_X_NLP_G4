# 🎨 PROMPT PARA GAMMA.APP o CANVA

---

## INSTRUCCIONES PARA USAR ESTE PROMPT

1. **Copia todo el texto de abajo** (desde "Crea una presentación..." hasta el final)
2. **Pégalo en GAMMA.APP** (https://gamma.app/) o en el asistente de IA de **Canva**
3. **Revisa el resultado** y ajusta colores/imágenes según tu preferencia
4. **Exporta a PDF** o comparte el link

---

## PROMPT COMPLETO

Crea una presentación profesional de **6 diapositivas** sobre una **Retrospectiva Scrum** con el siguiente contenido:

---

### **DIAPOSITIVA 1: Portada**

**Título principal**: "Retrospectiva Scrum - Proyecto NLP"

**Subtítulo**: "Sistema de Detección de Comentarios Tóxicos"

**Información adicional**:
- Equipo: Grupo 4 - PX_NLP_G4
- Técnica utilizada: Barco de Vela / Barco Pirata
- Fecha: 12 de Diciembre de 2025
- Duración: 60 minutos

**Estilo visual**: 
- Fondo degradado moderno (azul oscuro a morado)
- Ícono de sprint/retrospectiva
- Tipografía profesional y limpia

---

### **DIAPOSITIVA 2: Contexto del Proyecto**

**Título**: "Contexto del Proyecto"

**Contenido estructurado**:

**Stack Tecnológico Implementado:**
- 🤖 Machine Learning: 6 modelos (Naive Bayes, Random Forest, SVM, Logistic Regression, RNN-BiGRU, DistilBERT)
- ⚙️ Backend: FastAPI + PostgreSQL
- 🎨 Frontend: React + Vite
- 📊 MLOps: MLflow + Docker (MinIO y Azure)
- 🔀 Control de Versiones: Git Flow

**Técnica de Retrospectiva: Barco de Vela / Barco Pirata**

Breve descripción en 2-3 líneas:
"Metáfora visual donde el equipo es un barco navegando hacia una isla (meta). Identificamos: Viento a favor (impulsos), Anclas (impedimentos), Rocas (riesgos), y la Isla/Estrella (objetivo). Elegida por su naturaleza visual y creativa."

**Estilo visual**:
- Usar íconos para cada tecnología
- Layout en 2 columnas: Stack técnico a la izquierda, Técnica a la derecha
- Colores corporativos del equipo

---

### **DIAPOSITIVA 3: Desarrollo de la Sesión**

**Título**: "Cómo Organizamos la Retrospectiva"

**Contenido en tabla**:

| Tiempo | Actividad | Descripción |
|--------|-----------|-------------|
| 0-5 min | Introducción | Explicación de la técnica y establecimiento de reglas de ambiente seguro |
| 5-15 min | Reflexión individual | Cada miembro escribe ideas en post-its (físicos o digitales) |
| 15-40 min | Compartir y agrupar | Presentación de puntos y agrupación de ideas similares |
| 40-55 min | Votación | Priorización democrática de las 5 acciones más importantes |
| 55-60 min | Cierre | Asignación de responsables y plazos |

**Participantes**: [Nombres del equipo]
**Facilitador**: [Nombre]
**Herramienta**: [Miro/Presencial]

**Estilo visual**:
- Tabla moderna con alternancia de colores
- Ícono de reloj/cronómetro
- Timeline visual si es posible

---

### **DIAPOSITIVA 4: Resultados - Barco de Vela (Metáfora Visual)**

**Título**: "Hallazgos Principales: Nuestro Viaje como Equipo"

**Contenido en 4 cuadrantes** (con ilustración de barco en el centro):

**⛵ VIENTO A FAVOR (Lo que nos impulsa)**
1. Comparativa exhaustiva de 6 modelos ML
2. Docker para MLOps (reproducibilidad)
3. Arquitectura Frontend/Backend desacoplada
4. EDA detallado antes de modelar
5. Git Branching Strategy efectivo

**⚓ ANCLAS (Lo que nos frena)**
1. Falta de tests automatizados en backend
2. Commits sin mensajes descriptivos
3. Integración tardía de componentes
4. Credenciales hardcodeadas en código
5. Notebooks monolíticos sin modularizar

**🪨 ROCAS/ICEBERGS (Riesgos en el horizonte)**
1. Sin CI/CD: bugs pueden llegar a producción
2. Sin monitoreo: degradación del modelo invisible
3. Conocimiento no documentado (bus factor)
4. Escalabilidad no validada
5. Deuda técnica acumulada sin plan

**⭐ ISLA/ESTRELLA (Hacia dónde vamos)**
"Ser un equipo de alto rendimiento que entrega proyectos con calidad de producción:
- App completamente dockerizada
- CI/CD automatizado
- MLflow desde Sprint 1
- Cobertura tests >70% backend
- Documentación clara para onboarding <2h"

**Estilo visual**:
- Ilustración central de un barco navegando
- 4 secciones alrededor del barco con colores:
  - Viento: Azul cielo (#3B82F6)
  - Anclas: Gris oscuro (#6B7280)
  - Rocas: Rojo alerta (#EF4444)
  - Isla: Verde esperanza (#10B981)
- Usar emojis marítimos: ⛵⚓🪨⭐🏝️

---

### **DIAPOSITIVA 5: Top 5 Acciones de Mejora**

**Título**: "Acciones de Mejora Priorizadas"

**Contenido en tarjetas o lista numerada**:

**1️⃣ Implementar CI/CD con GitHub Actions**
- Responsable: [Nombre]
- Plazo: Sprint 1 (Semana 1-2)
- Prioridad: ⭐⭐⭐⭐⭐

**2️⃣ Dockerizar aplicación completa**
- Responsable: [Nombre]
- Plazo: Semana 1
- Prioridad: ⭐⭐⭐⭐⭐

**3️⃣ Integrar MLflow desde el inicio**
- Responsable: [Nombre]
- Plazo: Día 1 de entrenamiento
- Prioridad: ⭐⭐⭐⭐

**4️⃣ Establecer Dailies de 15 min (Lun/Mié/Vie)**
- Responsable: Todo el equipo
- Plazo: Inmediato
- Prioridad: ⭐⭐⭐⭐

**5️⃣ Crear plantilla de README por módulo**
- Responsable: [Nombre]
- Plazo: Semana 1
- Prioridad: ⭐⭐⭐

**Estilo visual**:
- Tarjetas con sombra para cada acción
- Estrellas para mostrar prioridad visualmente
- Colores progresivos según prioridad

---

### **DIAPOSITIVA 6: Reflexión Final y Compromiso**

**Título**: "Reflexión Final del Equipo"

**Contenido estructurado**:

**Sobre la aplicación de Scrum:**

✅ **Lo que funcionó bien:**
- Feature branches para trabajo paralelo
- Estructura del backlog en GitHub

⚠️ **Lo que faltó:**
- Ceremonias Scrum formales (dailies, sprint plannings)
- Product Owner claro para priorizar
- Sprints sin duración fija

**Aprendizaje clave:**
> "Scrum no es solo herramientas (Git, Jira), sino comunicación constante y adaptación continua."

**Compromiso del equipo:**
1. ✅ Aplicar las 5 acciones priorizadas en el próximo proyecto
2. ✅ Hacer retrospectivas cada 2 semanas
3. ✅ Implementar dailies de 15 minutos (Lun/Mié/Vie)
4. ✅ Crear backlog priorizado con Product Owner rotativo
5. ✅ Celebrar pequeños logros al final de cada sprint

**Frase de cierre:**
> *"No se trata de hacer Scrum perfecto desde el inicio, sino de mejorar continuamente."*

**Estilo visual**:
- Caja destacada para la cita principal
- Checklist visual para los compromisos
- Fondo inspirador (equipo colaborando, sprint board)
- Incluir logo del equipo o universidad si aplica

---

## CONFIGURACIÓN ADICIONAL PARA GAMMA/CANVA

**Paleta de colores sugerida:**
- Principal: #2563EB (azul profesional)
- Acento: #7C3AED (morado)
- Éxito: #10B981 (verde)
- Advertencia: #EF4444 (rojo)
- Texto: #1F2937 (gris oscuro)
- Fondo: #FFFFFF o #F9FAFB (blanco/gris muy claro)

**Tipografía:**
- Títulos: Inter Bold o Montserrat Bold
- Cuerpo: Inter Regular o Open Sans
- Código (si aplica): JetBrains Mono

**Elementos visuales:**
- Íconos: Usar set coherente (ej: Phosphor Icons, Heroicons)
- Gráficos: Minimalistas y modernos
- Imágenes: Fotos de equipos colaborando o ilustraciones de metodologías ágiles

**Transiciones:**
- Suaves y profesionales
- No abusar de animaciones

---

## INSTRUCCIONES FINALES

Una vez generada la presentación en GAMMA o CANVA:

1. **Revisa el contenido**: Asegúrate de que todos los datos estén correctos
2. **Personaliza nombres**: Reemplaza [Nombre] con nombres reales del equipo
3. **Añade imágenes**: Si tomaste fotos de la sesión (tablero, post-its), inclúyelas en diapositiva 3
4. **Ajusta colores**: Adapta a los colores de tu universidad o empresa si es necesario
5. **Exporta**: 
   - GAMMA: "Share" → "Download as PDF"
   - CANVA: "Share" → "Download" → "PDF Print" (mejor calidad)

---

## NOTAS IMPORTANTES

- Si GAMMA/CANVA no reconoce bien las tablas, conviértelas a listas con viñetas
- Para la diapositiva 4 (3 columnas), si no caben bien, divide en 2 diapositivas: una para START/STOP, otra para CONTINUE
- Añade el logo de tu universidad/empresa en el footer de cada diapositiva
- Incluye número de diapositiva en esquina inferior derecha

---

**¡Listo para generar tu presentación profesional! 🎉**
