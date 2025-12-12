# Retrospectiva Scrum - Proyecto NLP Toxicity Detection

---

## 1. Contexto del Proyecto

**Equipo**: Grupo 4 - PX_NLP_G4  
**Proyecto**: Sistema de Detección de Comentarios Tóxicos  
**Repositorio**: https://github.com/[tu-org]/PX_NLP_G4  
**Duración del Proyecto**: 18 días  
**Fecha Retrospectiva**: 12 de Diciembre de 2025  
**Participantes**: Mónica, Yeder, Alfonso.
---

### Stack Tecnológico Implementado

- **Machine Learning**: Naive Bayes, Random Forest, SVM, Logistic Regression, RNN-BiGRU, DistilBERT
- **Backend**: FastAPI + PostgreSQL
- **Frontend**: React + Vite
- **MLOps**: MLflow + Docker + GitHub Actions (CI/CD)
- **Control de Versiones**: Git con Git Flow (dev, feature branches)

---

### Técnica Utilizada: Barco de Vela / Barco Pirata (Metáfora Visual)

**Descripción**: Esta técnica de retrospectiva utiliza la metáfora de un barco (nuestro equipo) navegando hacia una isla (nuestra meta). Identificamos:

- **⛵ Viento a Favor / Motor**: ¿Qué nos impulsa? Las fuerzas positivas que aceleran nuestro progreso
- **⚓ Anclas**: ¿Qué nos frena? Los impedimentos y obstáculos que nos ralentizan
- **🪨 Rocas / Icebergs**: ¿Qué riesgos vemos en el horizonte? Amenazas potenciales
- **⭐ Estrella / Isla**: ¿Hacia dónde queremos ir? Nuestros objetivos de mejora

**Razón de elección**: Seleccionamos esta técnica por su naturaleza visual y creativa, ideal para equipos técnicos. La metáfora del viaje nos ayuda a identificar claramente los impulsores y frenos sin señalar culpables. Es especialmente efectiva para visualizar el estado actual del proyecto y trazar el rumbo de mejora.

---

## 2. Desarrollo de la Sesión

### 2.1 Organización de la Retrospectiva

**Facilitador**: Alfonso Bermúdez  
**Herramienta utilizada**: Miro para post-its, Zoom, Discord, CANVA/GAMMA.
**Duración total**: 60 minutos  
**Modalidad**: Remota

---

### 2.2 Agenda Ejecutada

| Tiempo | Actividad | Descripción |
|--------|-----------|-------------|
| **0-5 min** | **Introducción** | Explicación de la metáfora del Barco de Vela y establecimiento de reglas: ambiente seguro, sin culpas, todos participan, focus en el viaje del equipo |
| **5-15 min** | **Dibujo y reflexión individual** | Se dibuja un barco (físico o digital). Cada miembro escribe en silencio sus ideas en post-its y los coloca en: Viento (impulsa), Anclas (frena), Rocas (riesgos), o Isla (destino) |
| **15-40 min** | **Compartir y discutir** | Cada participante comparte sus puntos. Se agrupan ideas similares en cada categoría de la metáfora |
| **40-55 min** | **Votación y ruta a seguir** | Votación democrática (3 votos por persona) para priorizar: qué anclas soltar, qué vientos potenciar, qué rocas evitar |
| **55-60 min** | **Trazar el rumbo** | Definir 5 acciones concretas que nos llevarán a la isla (objetivo), con responsables y plazos |

---

### 2.3 Preparación Previa

Antes de la sesión, el equipo revisó:

- **Repositorio Git**: Análisis de commits, Pull Requests, branches activas
- **Métricas del proyecto**:
  - 6 modelos de ML comparados
  - Backend con API REST funcional
  - Frontend desplegable con React
  - Integración MLflow en fase final
- **Bloqueos identificados**: Dependencias entre módulos, integraciones tardías, falta de tests
- **Preparación del tablero**: Se dibujó un barco en el centro, con secciones para: Viento, Anclas, Rocas e Isla

**Materiales utilizados**:
- Tablero físico o Miro con dibujo del barco
- Post-its de 4 colores diferentes (uno por categoría)
- Timer para mantener el timeboxing

---

## 3. Resultados de la Retrospectiva

### 3.1 ⛵ VIENTO A FAVOR / MOTOR - ¿Qué nos impulsa?

*Las fuerzas positivas que aceleran nuestro progreso y nos hacen avanzar rápido*

#### **1. Comparativa exhaustiva de modelos con métricas claras**

- **Impulso identificado**: 6 algoritmos comparados (Naive Bayes, Random Forest, SVM, Logistic Regression, RNN-BiGRU, DistilBERT) con evaluación sistemática.
- **Valor**: El archivo `comparison_models.ipynb` permite tomar decisiones basadas en datos objetivos, no intuiciones.
- **Viento que debemos mantener**: Siempre comparar múltiples enfoques antes de elegir el modelo final. Esta práctica nos da confianza en las decisiones técnicas.

#### **2. Uso de Docker para servicios de MLOps (MLflow + MinIO/Azure)**

- **Impulso identificado**: Configuración dockerizada reproducible.
- **Valor**: Facilita onboarding de nuevos miembros (setup en 5 minutos), elimina problemas de "en mi máquina funciona".
- **Viento que debemos mantener**: Extender Docker a toda la aplicación, e incluir MLflow.

#### **3. Separación clara Frontend/Backend con APIs REST**

- **Impulso identificado**: Arquitectura limpia con FastAPI (backend) y React (frontend) comunicándose por API REST bien definida.
- **Valor**: Escalabilidad futura. Equipos pueden trabajar en paralelo sin interferencias.
- **Viento que debemos mantener**: Continuar con arquitectura desacoplada y documentar contratos de API.

#### **4. EDA (Exploratory Data Analysis) detallado antes de modelar**

- **Impulso identificado**: Notebooks `eda.ipynb` y `preprocessing_eda.ipynb` con análisis profundo del dataset.
- **Valor**: Entender los datos evitó problemas posteriores (desbalanceo de clases, outliers, distribuciones anómalas).
- **Viento que debemos mantener**: Nunca saltarse la fase de exploración, es tiempo bien invertido.

#### **5. Git Branching Strategy (Feature branches + Pull Requests)**

- **Impulso identificado**: Uso correcto de feature branches como `21-feature-api`, `15-feature-ml_logisticregression`, permitiendo trabajo paralelo sin conflictos.
- **Valor**: Historial limpio de Git. Fácil hacer rollback si algo falla. Trazabilidad de quién hizo qué y por qué.
- **Viento que debemos mantener**: Seguir usando Git Flow rigurosamente en futuros proyectos.

---

### 3.2 ⚓ ANCLAS - ¿Qué nos frena?

*Los impedimentos y obstáculos que nos ralentizan y debemos soltar para avanzar más rápido*

#### **1. Falta de tests automatizados (especialmente en Backend)**

- **Ancla identificada**: No hay tests unitarios en backend (`main.py`, routers, schemas). Toda la validación es manual.
- **Impacto**: Miedo a refactorizar código porque no sabemos si romperemos algo. Bugs que llegan hasta el final del desarrollo.
- **Cómo soltar el ancla**: Implementar pytest con al menos 60% de cobertura en endpoints críticos antes de continuar con nuevas features.

#### **2. Integración tardía de componentes**

- **Ancla identificada**: Frontend y backend se integraron casi al final. MLflow llegó en las últimas semanas.
- **Impacto**: Retrabajos masivos de última hora. Estrés innecesario. Descubrimiento tardío de incompatibilidades.
- **Cómo soltar el ancla**: Integración continua desde el Sprint 1. "Integrar temprano, integrar frecuentemente".

#### **3. Hardcodeo de credenciales y configuraciones**

- **Ancla identificada**: Encontramos API keys, contraseñas de BD y rutas absolutas directamente en el código.
- **Impacto**: Riesgo de seguridad grave. Código no portable entre máquinas. Credenciales expuestas en Git.
- **Cómo soltar el ancla**: Usar `.env` desde el día 1, con `.env.example` como plantilla y `.env` en `.gitignore`.

#### **4. Notebooks sin estructura modular (mezcla de fases)**

- **Ancla identificada**: Notebooks muy largos que duplican código.
- **Impacto**: Difícil reutilizar código. Ejecutar todo el notebook cada vez que cambias una línea. Dificulta colaboración.
- **Cómo soltar el ancla**: Separar notebooks por fase (01_eda, 02_preprocessing, 04_evaluation) y extraer funciones comunes a módulos Python.

---

### 3.3 🪨 ROCAS / ICEBERGS - ¿Qué riesgos vemos en el horizonte?

*Amenazas potenciales que debemos evitar para no chocar y hundir el barco*

#### **1. Falta de CI/CD automatizado**

- **Riesgo detectado**: Sin pipeline de CI/CD, cada merge a `dev` es un salto al vacío. No sabemos si el código compila o pasa tests hasta que alguien lo ejecuta manualmente.
- **Impacto potencial**: Bug crítico en producción que pudo haberse detectado con tests automatizados. Deployment manual propenso a errores humanos.
- **Cómo evitar la roca**: Implementar GitHub Actions ANTES del próximo proyecto, no después.

#### **2. Ausencia de monitoreo en producción**

- **Riesgo detectado**: Si desplegamos el modelo a producción, no tenemos manera de detectar degradación de performance, drift de datos o errores en runtime.
- **Impacto potencial**: Modelo dando predicciones erróneas durante semanas sin que nadie lo note. Pérdida de confianza del usuario final.
- **Cómo evitar la roca**: Implementar logging estructurado y alertas básicas (ej: Prometheus + Grafana).

#### **3. Dependencia de conocimiento individual (no documentado)**

- **Riesgo detectado**: Mucho conocimiento del proyecto está en la cabeza de miembros individuales, no en documentación.
- **Impacto potencial**: Si un miembro clave no está disponible, el resto del equipo no puede continuar su trabajo. "Bus factor" muy bajo.
- **Cómo evitar la roca**: README por módulo, sesiones de pair programming para compartir conocimiento.

#### **4. Escalabilidad no considerada en diseño inicial**

- **Riesgo detectado**: No tenemos el cálculo de petición/segundo de la API.
- **Impacto potencial**: Sistema caído en producción por carga inesperada. Refactorización completa necesaria.
- **Cómo evitar la roca**: Load testing antes de desplegar. Implementar rate limiting y caching.

#### **5. Deuda técnica acumulada**

- **Riesgo detectado**: Código duplicado, TODOs en comentarios.

- **Impacto potencial**: Mantenimiento cada vez más difícil. 

- **Cómo evitar la roca**: Dedicar 20% de cada sprint a refactorización.

---

### 3.4 ⭐ ESTRELLA / ISLA - ¿Hacia dónde queremos ir?

*Nuestro objetivo de mejora, el destino al que navegamos como equipo*

#### **Visión de la Isla (Estado deseado)**

> "Queremos ser un equipo de alto rendimiento en ML/NLP que entrega proyectos con calidad de producción, no solo prototipos académicos. Un equipo donde cualquier miembro puede retomar el trabajo de otro sin bloquearse, donde el código es auto-documentado y testeado, y donde los deployments son aburridos porque siempre funcionan."

#### **Características de nuestra Isla**

**🏝️ En lo Técnico:**
- ✅ Aplicación completamente dockerizada (un comando para levantar todo)
- ✅ CI/CD automatizado que detecta bugs antes de merge
- ✅ Cobertura de tests > 70% en backend, > 50% en frontend
- ✅ MLflow integrado desde el Sprint 1, no al final
- ✅ Documentación clara que cualquier desarrollador nuevo puede seguir

**🏝️ En lo Metodológico:**
- ✅ Dailies de 15 minutos (Lun/Mié/Vie) para sincronizar
- ✅ Code reviews obligatorios antes de merge (mínimo 1 aprobación)
- ✅ Retrospectivas cada 2 semanas para ajustar el rumbo
- ✅ Definition of Done establecida y respetada

**🏝️ En lo Cultural:**
- ✅ Ambiente seguro donde es OK decir "no sé" o "cometí un error"
- ✅ Celebrar pequeños logros al final de cada sprint
- ✅ Aprendizaje continuo (compartir artículos, técnicas nuevas)
- ✅ Equilibrio trabajo-vida (no crunchs de última hora)
- ✅ Orgullo por la calidad del código que escribimos

#### **Coordenadas de la Isla (Métricas)**

Para saber si llegamos a la isla, mediremos:

1. **Velocidad de onboarding**: < 2 horas para que un nuevo miembro esté productivo
2. **Tiempo de deployment**: < 15 minutos desde merge a producción
3. **Tasa de bugs en producción**: < 1 bug crítico por sprint
4. **Cobertura de tests**: > 70% backend, > 50% frontend
5. **Satisfacción del equipo**: Score > 8/10 en retrospectivas

---

## 4. Acciones de Mejora Priorizadas

### 4.1 Top 5 Acciones (Votadas por el equipo)

#### **Acción #1: Implementar CI/CD con GitHub Actions**

- **Descripción**: Pipeline automatizado que ejecute tests, linters y build al hacer push a `dev` o PR.
- **Responsable**: Yeder
- **Plazo**: Sprint 1 del próximo proyecto (Semana 1-2)
- **Métrica de éxito**: 
  - Pipeline configurado con al menos 3 jobs (lint, test, build)
  - 80% de los PRs pasan los checks antes de revisión manual
- **Prioridad**: ⭐⭐⭐⭐⭐ (Máxima - evita bugs en producción)

---

#### **Acción #2: Dockerizar aplicación completa (Frontend + Backend + BD)**

- **Descripción**: Crear `docker-compose.yml` en la raíz con servicios: FastAPI, React, PostgreSQL, MLflow.
- **Responsable**: Alfonso
- **Plazo**: Semana 1 del próximo proyecto
- **Métrica de éxito**: 
  - Comando único `docker-compose up -d` levanta toda la aplicación
  - README con instrucciones de setup 
- **Prioridad**: ⭐⭐⭐⭐⭐ (Máxima - mejora reproducibilidad)

---

#### **Acción #3: Integrar MLflow desde el inicio del proyecto**

- **Descripción**: Configurar tracking de experimentos en el Sprint 1, no al final.
- **Responsable**: Alfonso
- **Plazo**: Día 1 de entrenamiento de modelos
- **Métrica de éxito**: 
  - Todos los experimentos registrados en MLflow desde el primer modelo
  - No perder trazabilidad de ningún experimento
- **Prioridad**: ⭐⭐⭐⭐ (Alta - evita pérdida de experimentos)

---

#### **Acción #4: Establecer Dailies de 15 minutos (Lun/Mié/Vie)**

- **Descripción**: Reuniones cortas de sincronización para compartir progreso y bloqueos.
- **Responsable**: Todo el equipo (rotar facilitador cada semana)
- **Plazo**: Inmediato (próximo proyecto)
- **Métrica de éxito**: 
  - 90% de asistencia a las dailies
  - Reducción de bloqueos reportados al final del sprint
- **Prioridad**: ⭐⭐⭐⭐ (Alta - mejora comunicación)

---

#### **Acción #5: Crear plantilla de README por módulo**

- **Descripción**: Template estandarizado con secciones: Objetivo, Instalación, Uso, Arquitectura, Decisiones Técnicas.
- **Responsable**: Mónica
- **Plazo**: Semana 1 del próximo proyecto
- **Métrica de éxito**: 
  - 100% de los módulos nuevos tienen README siguiendo el template
  - Tiempo de onboarding de nuevos miembros < 2 horas
- **Prioridad**: ⭐⭐⭐ (Media-Alta - facilita mantenimiento)

---

### 4.2 Acciones Consideradas pero No Priorizadas (Importante pero menos urgente)

Las siguientes acciones fueron discutidas pero no entraron en el Top 5:

- **Implementar logging estructurado** (ELK Stack o similar) → Dejar para cuando la aplicación esté en producción
- **Añadir autenticación JWT en el backend** → Feature para versión 2.0
- **Optimización de hiperparámetros con Transformers** → Ya se probaron buenos defaults, no crítico

---

### 4.3 Plan de Seguimiento

**Revisión intermedia de acciones**: Fecha: 2 semanas después de la retrospectiva

- **Formato**: Reunión de 30 minutos
- **Objetivo**: Verificar progreso de las 5 acciones. ¿Cuáles están completadas? ¿Cuáles necesitan ajuste?

**Próxima retrospectiva completa**: Fecha: Fin del siguiente sprint/proyecto

**Canal de comunicación**: 
- Slack/Discord para updates rápidos
- Issues de GitHub para tracking de cada acción
- GitHub Wiki para notas

---

## 5. Reflexión Final del Equipo

### 5.1 Sobre la Aplicación de Scrum en el Proyecto

**Lo que funcionó**:

- El uso de **feature branches** nos permitió trabajar en paralelo sin pisarnos. Cada miembro pudo avanzar en su módulo (modelos, backend, frontend) de forma independiente.
- La **estructura del backlog** en GitHub (issues por funcionalidad) nos dio visibilidad de qué faltaba y quién estaba trabajando en qué.
- Los **sprints implícitos** (aunque no formales) nos ayudaron a mantener momentum: primero EDA, luego modelos clásicos, luego deep learning, luego backend, finalmente frontend.

**Lo que no funcionamos bien**:

- **No aplicamos ceremonias Scrum formalmente**: No tuvimos dailies regularmente, sprint plannings ni sprint reviews estructurados. Todo fue ad-hoc.
- **Sprints sin duración fija**: No hubo timeboxing. Algunos módulos se alargaron más de lo necesario.
- **Integración tardía**: Frontend-backend y MLflow se integraron casi al final, generando estrés innecesario.

**Aprendizajes clave**:

> "Scrum no es solo tener un repositorio Git organizado. Es comunicación constante, priorización clara y adaptación continua. En nuestro próximo proyecto, queremos implementar las ceremonias formales."

---

### 5.2 Sobre la Técnica de Retrospectiva "Barco de Vela / Barco Pirata"

**Opinión del equipo**:

La técnica fue **muy efectiva** para identificar impulsos, frenos y riesgos de forma visual y colaborativa. La metáfora ayudó a que todos aportaran sin buscar culpables, enfocándonos en el rumbo del equipo.

**Aspectos destacados**:

- **Simplicidad visual**: Fácil de entender, no requiere formación previa.
- **Actionable**: Cada punto identificado se convierte naturalmente en una acción.
- **Equilibrio**: Permite resaltar tanto lo que impulsa (viento) como lo que frena (anclas) y los riesgos (rocas).

**Sorpresa del equipo**:

> "Nos sorprendió la cantidad de mejoras pequeñas que, sumadas, pueden tener un gran impacto. Por ejemplo, commits descriptivos o habr integrado mlflow nos hubiera permitido llevar un mejor control de las versiones de los parámetros de los notebooks."

---

### 5.3 Compromiso para el Futuro

**Compromisos concretos del equipo**:

1. ✅ **Aplicar las 5 acciones priorizadas** en nuestro próximo proyecto desde el día 1.
2. ✅ **Hacer retrospectivas más frecuentes**: Cada 2 semanas (al final de cada sprint de 2 semanas).
3. ✅ **Implementar dailies de 15 minutos** (Lunes, Miércoles, Viernes a las 9:00 AM).
4. ✅ **Crear un backlog priorizado** con un Product Owner rotativo cada sprint.
5. ✅ **Celebrar los pequeños logros**: Al terminar cada sprint, reconocer el trabajo del equipo.

**Aprendizaje más valioso**:

> "La retrospectiva nos hizo conscientes de que, aunque el proyecto fue exitoso técnicamente (buenos modelos, arquitectura limpia, frontend funcional), nuestros **procesos de equipo tienen margen de mejora**. La tecnología es solo una parte del éxito; la comunicación y organización son igual de importantes."

**Frase que resume nuestra experiencia**:

> *"No se trata de hacer Scrum perfecto desde el inicio, sino de mejorar continuamente. Esta retrospectiva es el primer paso de muchos hacia convertirnos en un equipo de alto rendimiento."*

---

## Anexos

### A. Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Commits totales** | 102 commits |
| **Pull Requests mergeados** | 7 PRs |
| **Issues cerrados** | 23 issues |
| **Modelos de ML entrenados** | 6 (NB, RF, SVM, LR, RNN-BiGRU, DistilBERT) |
| **Accuracy del mejor modelo** | [0.80%] |
| **Líneas de código (Backend)** | 1007043 total |
| **Componentes de Frontend** | 10 |
| **Cobertura de tests** | 0% (a mejorar en próximo proyecto) |

---

### B. Timeline del Proyecto

```
Sprint 1-2: EDA y Preprocesamiento
├─ eda.ipynb
├─ preprocessing_eda.ipynb
└─ Limpieza de datos, análisis de distribuciones

Sprint 3-4: Modelado Clásico
├─ Naive Bayes
├─ Random Forest
├─ SVM
└─ Logistic Regression

Sprint 5-6: Deep Learning
├─ RNN-BiGRU
└─ DistilBERT (fine-tuning)

Sprint 7-8: Backend
├─ FastAPI setup
├─ PostgreSQL integration
├─ Endpoints de predicción
└─ Schemas y validaciones

Sprint 9-10: Frontend
├─ React + Vite setup
├─ Páginas (Home, Results, Model comparisons)
└─ Integración con backend

Sprint 11: MLOps (MLflow)
├─ Docker setup (MinIO y Azure)
└─ Tracking de experimentos (integración tardía)
```

---

### C. Evidencias de la Sesión de Retrospectiva

**Tablero de Start-Stop-Continue**:

- **Tablero Ideación**: https://miro.com/app/board/uXjVGcMw7E8=/

---

### D. Recursos Consultados

- **Técnica utilizada**: https://www.funretrospectives.com/start-stop-continue/
- **Guía de Scrum**: https://scrumguides.org/
- **Git Workflow**: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

---

## Conclusión

Esta retrospectiva ha sido **extremadamente valiosa** para el equipo. Nos ha permitido:

✅ Identificar **15 puntos de mejora concretos** (5 START, 5 STOP, 5 CONTINUE)  
✅ Priorizar **5 acciones de alto impacto** con responsables y plazos  
✅ Reflexionar sobre nuestra aplicación de Scrum y cómo mejorarla  
✅ Celebrar nuestros logros técnicos (comparativa de 6 modelos, arquitectura limpia)  
✅ Comprometernos a hacer retrospectivas más frecuentes  

**El proyecto NLP Toxicity Detection fue un éxito técnico**, pero ahora sabemos que podemos ser aún mejores como equipo si aplicamos estas lecciones aprendidas.

---

**Equipo PX_NLP_G4**  
*"Código que aprende, equipo que mejora"*

Fecha: 12 de Diciembre de 2025
