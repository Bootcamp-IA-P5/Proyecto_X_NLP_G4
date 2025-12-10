// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";

const Settings = () => {
  // Inicializamos leyendo de localStorage (sin useEffect)
  const [showScore, setShowScore] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("hsd_showScore");
    return saved !== null ? saved === "true" : true;
  });

  const [showBadges, setShowBadges] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("hsd_showBadges");
    return saved !== null ? saved === "true" : true;
  });

  const [backendUrl, setBackendUrl] = useState(() => {
    if (typeof window === "undefined") return "http://127.0.0.1:8000";
    const saved = localStorage.getItem("hsd_backendUrl");
    return saved || "http://127.0.0.1:8000";
  });

  // A partir de aquí, los efectos solo ESCRIBEN en localStorage

  useEffect(() => {
    localStorage.setItem("hsd_showScore", String(showScore));
  }, [showScore]);

  useEffect(() => {
    localStorage.setItem("hsd_showBadges", String(showBadges));
  }, [showBadges]);

  useEffect(() => {
    localStorage.setItem("hsd_backendUrl", backendUrl);
  }, [backendUrl]);

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <section className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
          Configuración
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl">
          Ajustes visuales y de conexión para la demo de Hate Speech Detection.
          Algunas opciones se guardan en <code>localStorage</code>.
        </p>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Apariencia / chat */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-100">
            Apariencia del chat
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-200">
                Mostrar score de predicción
              </p>
              <p className="text-[11px] text-slate-400">
                Muestra la probabilidad devuelta por el modelo.
              </p>
            </div>
            <button
              onClick={() => setShowScore((s) => !s)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                showScore ? "bg-indigo-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  showScore ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-200">
                Mostrar badges TOXIC / NOT TOXIC
              </p>
              <p className="text-[11px] text-slate-400">
                Activa o desactiva las etiquetas de color junto al resultado.
              </p>
            </div>
            <button
              onClick={() => setShowBadges((s) => !s)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                showBadges ? "bg-indigo-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  showBadges ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <p className="mt-1 text-[11px] text-slate-500">
            * Estos ajustes todavía no están conectados a la lógica del chat,
            pero muestran cómo podría configurarse la UI.
          </p>
        </div>

        {/* Backend */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-100">
            Conexión con backend
          </h3>
          <p className="text-xs text-slate-300">
            URL base del servidor FastAPI utilizado para las predicciones.
          </p>

          <label className="text-[11px] text-slate-400 mb-1">
            Backend URL
          </label>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="text-xs rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
          />

          <p className="text-[11px] text-slate-500">
            Si desplegáis la API en la nube, podéis cambiar aquí la URL para la
            demo sin tocar el código.
          </p>
        </div>

        {/* Info extra */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-100">
            Información de la demo
          </h3>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• Proyecto del Bootcamp de IA - Hate Speech Detection.</li>
            <li>• Frontend en React + Vite + Tailwind.</li>
            <li>• Backend en FastAPI con modelos de NLP clásicos.</li>
            <li>• Predicciones almacenadas en PostgreSQL.</li>
          </ul>
          <p className="mt-2 text-[11px] text-slate-500">
            Esta sección sirve para mostrar que la app es configurable y podría
            evolucionar a un panel de administración completo.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
