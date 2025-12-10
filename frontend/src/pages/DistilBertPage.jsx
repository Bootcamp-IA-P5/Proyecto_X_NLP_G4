// src/pages/DistilBertPage.jsx
import React from "react";
import ModelChat from "../components/ModelChat";

const DistilBertPage = () => {
  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
            DistilBERT
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Transformer ligero basado en BERT, optimizado para velocidad sin sacrificar precisión.
          </p>
        </div>
      </header>

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
          <p className="text-xs text-slate-400 mb-3">
            Escribe un comentario y DistilBERT lo clasificará como
            tóxico (1) o no tóxico (0) usando atención contextual.
          </p>
          <ModelChat modelKey="distilbert" />
        </div>

        <aside className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-5 text-xs text-slate-300 space-y-2">
          <h3 className="text-sm font-semibold text-slate-100">
            Sobre este modelo
          </h3>
          <p>
            DistilBERT es una versión destilada de BERT que retiene el 97% de su capacidad
            de comprensión del lenguaje con solo el 60% de los parámetros.
          </p>
          <p className="mt-2">
            Utiliza mecanismos de atención multi-cabeza para capturar relaciones contextuales
            entre palabras, logrando comprensión semántica profunda del texto.
          </p>
          <p className="mt-2">
            Fine-tuned específicamente para detección de toxicidad en comentarios.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default DistilBertPage;
