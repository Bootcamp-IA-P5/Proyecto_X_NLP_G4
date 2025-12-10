// src/pages/Home.jsx
import React, { useState } from "react";
import {
  predictWithSVM,
  predictWithNaiveBayes,
  predictWithLogReg,
} from "../services/modelServices";

const TABS = ["Sobre la app", "SVM", "Naive Bayes", "Logistic Regression"];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Sobre la app");

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
            Hate Speech Detection
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Clasifica comentarios de YouTube como tóxicos o no tóxicos usando
            varios modelos de Machine Learning.
          </p>
        </div>
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-300 shadow-lg">
          <p className="font-semibold text-slate-100">
            Backend conectado ✅
          </p>
          <p>FastAPI • PostgreSQL • SKLearn</p>
        </div>
      </header>

      {/* Card principal */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
        {/* Panel principal con tabs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
          {/* Tabs */}
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

          {/* Contenido según tab */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "Sobre la app" && <AboutApp />}
            {activeTab === "SVM" && (
              <ModelChat
                title="Support Vector Machine (SVM)"
                description="Modelo clásico de clasificación con TF-IDF + features numéricas. Bueno en espacios de alta dimensión."
                modelKey="svm"
              />
            )}
            {activeTab === "Naive Bayes" && (
              <ModelChat
                title="Naive Bayes Multinomial"
                description="Modelo probabilístico sencillo y muy rápido, ideal como baseline para texto."
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

        {/* Panel lateral tipo 'Where your money go?' */}
        <aside className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-5 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-100">
            ¿Qué puedes hacer aquí?
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• Probar distintos modelos de detección de hate speech.</li>
            <li>• Comparar cómo responden ante el mismo comentario.</li>
            <li>• Ver en tiempo real si un mensaje es tóxico (1) o no (0).</li>
          </ul>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <p className="font-semibold text-slate-200 mb-2">
              Tip para la demo 🎯
            </p>
            <p>
              Envía el mismo texto a cada modelo y comenta cómo cambian las
              predicciones según el algoritmo.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

const AboutApp = () => {
  return (
    <div className="h-full flex flex-col gap-4 text-sm text-slate-200">
      <p>
        Esta aplicación es un prototipo de{" "}
        <span className="font-semibold text-indigo-300">
          detección automática de mensajes de odio
        </span>{" "}
        en comentarios de YouTube.
      </p>
      <p>
        En el backend utilizamos FastAPI, modelos clásicos de Machine Learning
        (Naive Bayes, Regresión Logística y SVM) entrenados sobre un dataset
        etiquetado de comentarios tóxicos/no tóxicos, además de PostgreSQL para
        almacenar todas las predicciones.
      </p>
      <p>
        Desde este panel puedes escribir un comentario y elegir qué modelo usar
        para clasificarlo. El resultado se devuelve en tiempo real y el backend
        registra la predicción para análisis posteriores y comparación entre
        modelos.
      </p>
      <p className="text-xs text-slate-400 mt-2">
        Nota: este sistema es sólo con fines educativos y no debe usarse como
        sistema de moderación en producción sin una revisión adecuada.
      </p>
    </div>
  );
};

const ModelChat = ({ title, description, modelKey }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {role: 'user'|'model', text, label?}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setError("");
    setLoading(true);
    setInput("");

    // Añadimos mensaje del usuario al chat
    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      let response;
      if (modelKey === "svm") {
        response = await predictWithSVM(text);
      } else if (modelKey === "naive_bayes") {
        response = await predictWithNaiveBayes(text);
      } else if (modelKey === "logreg") {
        response = await predictWithLogReg(text);
      }

      const label = response?.predicted_label;
      const score = response?.score;

      let interpretation = "";
      if (label === 1) {
        interpretation = "TÓXICO (1)";
      } else if (label === 0) {
        interpretation = "NO TÓXICO (0)";
      } else {
        interpretation = `Etiqueta desconocida (${label})`;
      }

      const modelMessage = {
        role: "model",
        text: interpretation,
        raw: response,
        score,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error llamando al modelo");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Ocurrió un error al procesar el comentario.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 md:p-4 flex flex-col gap-3 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {messages.length === 0 && (
            <p className="text-xs text-slate-500">
              Escribe un comentario abajo y pulsa <b>Enviar</b> para ver si el
              modelo lo clasifica como tóxico (1) o no tóxico (0).
            </p>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                msg.role === "user"
                  ? "ml-auto bg-indigo-600 text-white"
                  : "mr-auto bg-slate-800 text-slate-100"
              }`}
            >
              <p>{msg.text}</p>
              {msg.role === "model" && msg.score != null && (
                <p className="mt-1 text-[10px] text-slate-300 opacity-80">
                  score: {msg.score.toFixed(3)}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-[11px] text-red-400 bg-red-950/40 border border-red-700/60 rounded-xl px-3 py-1">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe tu comentario aquí..."
            className="flex-1 rounded-full bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!loading) handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-full bg-indigo-500 text-xs font-semibold text-white hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md"
          >
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
