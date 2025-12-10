// src/pages/ClassicalModels.jsx
import React, { useState } from "react";
import ModelChat from "../components/ModelChat";

const TABS = ["SVM", "Naive Bayes", "Logistic Regression"];

const ClassicalModels = () => {
  const [activeTab, setActiveTab] = useState("SVM");

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
            Hate Speech Detection
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Clasifica comentarios como tóxicos o no tóxicos usando varios
            modelos clásicos de Machine Learning.
          </p>
        </div>
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-300 shadow-lg">
          <p className="font-semibold text-slate-100">
            Backend conectado ✅
          </p>
          <p>FastAPI • PostgreSQL • SKLearn</p>
        </div>
      </header>

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
          {/* Tabs SOLO de modelos */}
          <div className="flex gap-2 border-b border-slate-800 mb-4">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-xs md:text-sm rounded-t-lg transition border-b-2 ${
                    isActive
                      ? "border-indigo-400 text-slate-50 bg-slate-900"
                      : "border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === "SVM" && (
              ModelChat({
                title: "Support Vector Machine (SVM)",
                description:
                  "Modelo clásico de clasificación con TF-IDF + features numéricas. Bueno en espacios de alta dimensión.",
                modelKey: "svm",
              })
            )}
            {activeTab === "Naive Bayes" && (
              <ModelChat
                title="Naive Bayes Multinomial"
                description="Modelo probabilístico sencillo y rápido, ideal como baseline para texto."
                modelKey="naive_bayes"
              />
            )}
            {activeTab === "Logistic Regression" && (
              <ModelChat
                title="Logistic Regression"
                description="Modelo lineal que devuelve probabilidades, fácil de interpretar y comparar."
                modelKey="logreg"
              />
            )}
          </div>
        </div>

        <aside className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-5 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-100">
            ¿Qué puedes hacer aquí?
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• Probar distintos modelos de detección de hate speech.</li>
            <li>• Comparar cómo responden ante el mismo comentario.</li>
            <li>• Ver en tiempo real si un mensaje es tóxico (1) o no (0).</li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default ClassicalModels;
