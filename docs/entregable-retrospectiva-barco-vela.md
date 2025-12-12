# Entregable — Retrospectiva Scrum (Barco de Vela)

Fecha: 12 de diciembre de 2025  
Equipo: Grupo 4 — PX_NLP_G4  
Proyecto: Detección de Comentarios Tóxicos (NLP)  
Técnica utilizada: Barco de Vela / Barco Pirata (metáfora visual)

---

## 1) Contexto
- Objetivo: Reflexionar tras la entrega del proyecto, identificar aprendizajes, aciertos y áreas de mejora, y definir acciones concretas.  
- Técnica: La metáfora del barco ayuda a visualizar de forma clara qué nos impulsa (viento), qué nos frena (anclas), qué riesgos vemos (rocas) y hacia dónde vamos (isla/estrella).  
- Referencia: funretrospectives.com — “Sailboat Retrospective”.

---

## 2) Desarrollo de la Sesión
- Organización: 60 minutos, ambiente seguro, foco en mejora continua.
- Facilitador: Alfonso Bermúdez.  
- Modalidad/Herramienta: Miro.  
- Participantes: Mónica, Yeder, Alfonso.  
- Flujo:
  - 0–5’ Introducción a la metáfora y reglas
  - 5–15’ Ideación individual (post-its) en 4 áreas: Viento, Anclas, Rocas, Isla
  - 15–40’ Compartir, agrupar y discutir
  - 40–55’ Votación y priorización
  - 55–60’ Definir acciones (máx. 5) con responsables y plazos

---

## 3) Resultados (Barco de Vela)

### 3.1 Viento a Favor / Motor — ¿Qué nos impulsa?
- Comparativa de 6 modelos (NB, RF, SVM, LR, RNN-BiGRU, DistilBERT) con métricas claras; decisiones basadas en datos.
- Arquitectura desacoplada: FastAPI + React por API acelera trabajo en paralelo.
- EDA sólido previo al modelado: evita retrabajos y sorpresas en datos.
- Estrategia de ramas con PRs: historial limpio y fácil rollback.

### 3.2 Anclas — ¿Qué nos frena?
- Falta de tests en backend; poca confianza al refactorizar.
- Commits poco descriptivos; difícil rastrear cambios.
- Integración tardía (frontend–backend) generó retrabajos.
- Configuración/credenciales hardcodeadas; riesgos de seguridad y portabilidad.
- Notebooks monolíticos; difícil reutilización y colaboración.

### 3.3 Rocas / Icebergs — Riesgos en el horizonte
- GitHub Actions CI/CD: riesgo de introducir bugs al hacer merge.
- Ausencia de monitoreo/alertas para modelos en producción.
- Conocimiento distribuido sin documentación; bus factor bajo.
- Escalabilidad no validada (cargas, límites).


### 3.4 Estrella / Isla — Objetivo de mejora
- Equipo de alto rendimiento que entrega con calidad “production-ready”.
- Todo dockerizado; CI/CD desde el inicio; MLflow integrado desde el Sprint 1 para facilitar setup y trazabilidad. 
- Cobertura de tests > 70% backend / > 50% frontend.  
- Documentación clara. 
- Cultura de seguridad psicológica, aprendizaje continuo y celebraciones por sprint (motivación).

---

## 4) Acciones de Mejora (máximo 5)

1) CI/CD con GitHub Actions  
- Descripción: Ejecutar linters, tests y build en PRs a `dev`.  
- Responsable: Yeder.  
- Plazo: Sprint 1.  
- Métrica: Pipelines verdes en >80% de PRs.

2) Dockerizar app completa (Frontend, Backend, BD, MLflow)  
- Descripción: `docker-compose` único para levantar todo.  
- Responsable: Alfonso.  
- Plazo: Semana 1.  
- Métrica: Setup < 5 minutos con README claro.

3) MLflow desde el día 1  
- Descripción: Trazar todos los experimentos desde el primer modelo.  
- Responsable: Alfonso.  
- Plazo: Inicio del entrenamiento.  
- Métrica: 100% de runs registrados.

4) Dailies de 15’ (Lun/Mié/Vie)  
- Descripción: Sincronizar progreso y bloqueos; facilitador rotativo.  
- Responsable: Equipo.  
- Plazo: Inmediato.  
- Métrica: >90% asistencia; menos bloqueos.

5) Plantilla de README por módulo  
- Descripción: Template con objetivo, instalación, uso, arquitectura y decisiones.  
- Responsable: Mónica.  
- Plazo: Semana 1.  
- Métrica: 100% módulos nuevos con README; onboarding < 2 horas.

---

## 5) Reflexión Final
- Scrum: Reestructuración de roles por necesidades (integrantes del equipo) y afectó la priorización y la integración temprana.  
- Aprendizaje: La metáfora del barco brindó un lenguaje común para hablar de impulsores y frenos sin culpas, y facilitó priorizar acciones útiles.  
- Compromiso: Implementar las 5 acciones desde el inicio del próximo proyecto y sostener retrospectivas cada 2 semanas.

---

### Nota — Dónde buscar ejemplos
- Inspiración y guías: https://www.funretrospectives.com/

