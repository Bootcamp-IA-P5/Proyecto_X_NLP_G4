// src/pages/Results.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MODEL_METRICS } from "../data/modelMetrics";

const Results = () => {
  const bestModel = useMemo(() => {
    if (!MODEL_METRICS.length) return null;
    return [...MODEL_METRICS].sort((a, b) => b.f1 - a.f1)[0];
  }, []);

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <section className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
          Resultados de los modelos
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl">
          Aquí puedes ver un resumen de las métricas de cada modelo entrenado
          para detectar mensajes de odio. Las métricas se han calculado sobre
          el conjunto de test.
        </p>
      </section>

      {/* Top cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Modelos evaluados
          </h3>
          <p className="text-3xl font-bold text-slate-50">
            {MODEL_METRICS.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Modelos clásicos: Naive Bayes, Regresión Logística y SVM.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Métrica principal
          </h3>
          <p className="text-3xl font-bold text-indigo-300">F1-score</p>
          <p className="text-xs text-slate-400 mt-1">
            Se usa el F1 porque equilibra <b>precision</b> y <b>recall</b>, muy
            importante en problemas de toxicidad.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Mejor modelo (según F1)
          </h3>
          {bestModel ? (
            <>
              <p className="text-sm font-semibold text-slate-50">
                {bestModel.name}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                F1-score:{" "}
                <span className="font-semibold">
                  {bestModel.f1.toFixed(3)}
                </span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Accuracy: {bestModel.accuracy.toFixed(3)} · ROC-AUC:{" "}
                {bestModel.roc_auc.toFixed(3)}
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-400">
              Añade métricas reales en <code>modelMetrics.js</code>.
            </p>
          )}
        </div>
      </section>

      {/* Charts + table */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] gap-6">
        {/* Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-slate-100 mb-4">
            Comparación de F1-score por modelo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_METRICS}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#cbd5f5" }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fontSize: 10, fill: "#cbd5f5" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #1e293b",
                    fontSize: "11px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#e2e8f0" }}
                />
                <Bar dataKey="f1" name="F1-score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-slate-100 mb-4">
            Métricas detalladas
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left text-slate-200">
              <thead className="text-[11px] uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-2 pr-4">Modelo</th>
                  <th className="py-2 px-2">Accuracy</th>
                  <th className="py-2 px-2">Precision</th>
                  <th className="py-2 px-2">Recall</th>
                  <th className="py-2 px-2">F1</th>
                  <th className="py-2 pl-2">ROC-AUC</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_METRICS.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-slate-800 last:border-0"
                  >
                    <td className="py-2 pr-4 text-[11px]">{m.name}</td>
                    <td className="py-2 px-2">
                      {m.accuracy.toFixed(3)}
                    </td>
                    <td className="py-2 px-2">
                      {m.precision.toFixed(3)}
                    </td>
                    <td className="py-2 px-2">
                      {m.recall.toFixed(3)}
                    </td>
                    <td className="py-2 px-2">{m.f1.toFixed(3)}</td>
                    <td className="py-2 pl-2">
                      {m.roc_auc.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Las métricas se han calculado a partir de los ficheros JSON de
            resultados generados en el entrenamiento.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Results;
