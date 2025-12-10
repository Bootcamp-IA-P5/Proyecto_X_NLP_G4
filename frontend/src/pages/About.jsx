// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="h-full flex flex-col gap-8">
      {/* Título y texto principal */}
      <section className="space-y-3">
        <h2 className="text-4xl font-bold text-slate-50 tracking-tight">
          Hate Speech Detection
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
          Esta aplicación es un prototipo de{" "}
          <span className="font-semibold text-indigo-300">
            detección automática de mensajes de odio
          </span>{" "}
          en comentarios de YouTube. Permite escribir un comentario y ver en
          tiempo real si se clasifica como tóxico (1) o no tóxico (0) usando
          distintos modelos de Machine Learning.
        </p>
      </section>

      {/* Tarjetas de info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Stack técnico
          </h3>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• Backend: FastAPI + Python</li>
            <li>• Modelos: Naive Bayes, Regresión Logística, SVM</li>
            <li>• NLP: TF-IDF + features numéricas</li>
            <li>• BBDD: PostgreSQL</li>
            <li>• Frontend: React + Vite + Tailwind</li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Flujo de trabajo
          </h3>
          <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside">
            <li>Preprocesado de los comentarios.</li>
            <li>Entrenamiento y evaluación de modelos.</li>
            <li>Exposición del modelo vía API REST.</li>
            <li>
              Interfaz web para probar comentarios en tiempo real.
            </li>
            <li>Registro de predicciones en base de datos.</li>
          </ol>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-2">
              Objetivo del proyecto
            </h3>
            <p className="text-xs text-slate-300">
              Demostrar cómo un modelo de NLP puede integrarse en un producto:
              desde el dataset hasta el despliegue de una API consumida por una
              interfaz moderna.
            </p>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Nota: proyecto educativo, no apto para moderación en producción sin
            revisión humana.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
