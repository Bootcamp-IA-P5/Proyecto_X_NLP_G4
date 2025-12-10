// src/pages/RnnBigruPage.jsx
import React from "react";
import ModelChat from "../components/ModelChat";

const RnnBigruPage = () => {
  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
            RNN BiGRU
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Red neuronal recurrente bidireccional con GRU para capturar dependencias secuenciales.
          </p>
        </div>
      </header>

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
          <p className="text-xs text-slate-400 mb-3">
            Escribe un comentario y RNN BiGRU lo clasificará como
            tóxico (1) o no tóxico (0) procesando el texto de forma secuencial.
          </p>
          <ModelChat modelKey="rnn_bigru" />
        </div>

        <aside className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl p-5 text-xs text-slate-300 space-y-2">
          <h3 className="text-sm font-semibold text-slate-100">
            Sobre este modelo
          </h3>
          <p>
            RNN BiGRU combina redes recurrentes bidireccionales con Gated Recurrent Units (GRU)
            para procesar texto en ambas direcciones simultáneamente.
          </p>
          <p className="mt-2">
            Las GRU son más eficientes que las LSTM tradicionales mientras mantienen
            la capacidad de capturar dependencias a largo plazo en secuencias de texto.
          </p>
          <p className="mt-2">
            Parámetros: vocabulario de 10,000 palabras, secuencias de máximo 120 tokens,
            con TextVectorization integrada.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default RnnBigruPage;
