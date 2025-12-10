// src/components/Nav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import aiAvatar from "../assets/react.svg";

const linkClasses = ({ isActive }) =>
  `block px-3 py-2 rounded-lg text-sm transition ${
    isActive
      ? "bg-slate-800 text-slate-50"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
  }`;

const Nav = () => {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-slate-800">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
          <img
            src={aiAvatar}
            alt="AI avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide uppercase text-slate-200">
            HATE SPEECH
          </h1>
          <p className="text-xs text-slate-400">Detection v1</p>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
        {/* ⬇️ IMPORTANTE: Ahora apunta a /app */}
        <NavLink to="/app" className={linkClasses} end>
          Sobre la app
        </NavLink>

        {/* ⬇️ Todos los demás ahora empiezan con /app/... */}
        <NavLink to="/app/svm" className={linkClasses}>
          Support Vector Machine (SVM)
        </NavLink>

        <NavLink to="/app/naive-bayes" className={linkClasses}>
          Naive Bayes
        </NavLink>

        <NavLink to="/app/logreg" className={linkClasses}>
          Logistic Regression
        </NavLink>

        <NavLink to="/app/random-forest" className={linkClasses}>
          Random Forest
        </NavLink>

        <NavLink to="/app/distilbert" className={linkClasses}>
          DistilBERT
        </NavLink>

        <NavLink to="/app/rnn-bigru" className={linkClasses}>
          RNN BiGRU
        </NavLink>

        <NavLink to="/app/results" className={linkClasses}>
          Resultados
        </NavLink>

        <NavLink to="/app/settings" className={linkClasses}>
          Configuración
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 text-xs text-slate-500 border-t border-slate-800 flex justify-between">
        <span>Proyecto NLP • Bootcamp IA</span>
        <span>Equipo G4 • 2025</span>
      </div>
    </aside>
  );
};

export default Nav;
