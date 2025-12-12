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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { MODEL_METRICS } from "../data/modelMetrics";

// Colores para cada barra (un color por modelo - 6 modelos)
const BAR_COLORS = ["#6366f1", "#22c55e", "#f97316", "#ec4899", "#8b5cf6", "#06b6d4"];

// Colores para la dona (TN, FP, FN, TP)
const PIE_COLORS = ["#22c55e", "#dc2626", "#eab308", "#64748b"];

const Results = () => {
  const bestModel = useMemo(() => {
    if (!MODEL_METRICS.length) return null;
    return [...MODEL_METRICS].sort((a, b) => b.f1 - a.f1)[0];
  }, []);

  const confusionData = useMemo(() => {
    if (!bestModel) return [];
    return [
      { name: "True Negatives (TN)", value: bestModel.tn },
      { name: "False Positives (FP)", value: bestModel.fp },
      { name: "False Negatives (FN)", value: bestModel.fn },
      { name: "True Positives (TP)", value: bestModel.tp },
    ];
  }, [bestModel]);

  // Datos para gráfico de líneas comparando todas las métricas
  const multiMetricsData = useMemo(() => {
    return MODEL_METRICS.map((model) => ({
      name: model.name.split(" ")[0], // Abreviamos el nombre
      Accuracy: model.accuracy,
      Precision: model.precision,
      Recall: model.recall,
      "F1-Score": model.f1,
    }));
  }, []);

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <section className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
          Resultados de los modelos
        </h2>
        <p className="text-sm md:text-base text-slate-100 max-w-3xl">
          Aquí puedes ver un resumen de las métricas de cada modelo entrenado
          para detectar mensajes de odio. Las métricas se han calculado sobre
          el conjunto de test.
        </p>
      </section>

      {/* Top cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Modelos evaluados</h3>
          <p className="text-3xl font-bold">{MODEL_METRICS.length}</p>
          <p className="text-xs text-slate-300 mt-1">
            ML Clásico (SVM, Naive Bayes, LogReg, Random Forest) y Deep Learning (DistilBERT, RNN BiGRU).
          </p>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Métrica principal</h3>
          <p className="text-3xl font-bold text-indigo-300">F1-score</p>
          <p className="text-xs text-slate-300 mt-1">
            Se usa el F1 porque equilibra <b>precision</b> y <b>recall</b>, muy
            importante en problemas de toxicidad.
          </p>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">
            Mejor modelo (según F1)
          </h3>
          {bestModel ? (
            <>
              <p className="text-sm font-semibold">{bestModel.name}</p>
              <p className="text-xs text-slate-200 mt-1">
                F1-score:{" "}
                <span className="font-semibold">
                  {bestModel.f1.toFixed(3)}
                </span>
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Accuracy: {bestModel.accuracy.toFixed(3)} · ROC-AUC:{" "}
                {bestModel.roc_auc.toFixed(3)}
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-300">
              Añade métricas reales en <code>modelMetrics.js</code>.
            </p>
          )}
        </div>
      </section>

      {/* Charts + table */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.8fr_1.2fr] gap-6">
        {/* Chart de barras */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 md:p-6 shadow-xl">
          <h3 className="text-sm font-semibold mb-4">
            Comparación de F1-score por modelo
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_METRICS}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "#e5e7eb" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fontSize: 10, fill: "#e5e7eb" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fffffa",
                    border: "1px solid #1e293b",
                    fontSize: "11px",
                    color: "#1e293b",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#e5e7eb" }}
                />
                <Bar dataKey="f1" name="F1-score">
                  {MODEL_METRICS.map((entry, index) => (
                    <Cell
                      key={`bar-${entry.id ?? index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart de matriz de confusión */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 md:p-6 shadow-xl flex flex-col">
          <h3 className="text-sm font-semibold mb-2">
            Matriz de confusión del mejor modelo
          </h3>
          <p className="text-[11px] text-slate-300 mb-3">
            Distribución de verdaderos positivos/negativos y falsos
            positivos/negativos para el modelo con mejor F1.
          </p>
          <div className="flex-1 flex items-center justify-center">
            {/* 👉 Más grande: altura y radios aumentados */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confusionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {confusionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fffafa",
                      border: "1px solid #1e293b",
                      fontSize: "11px",
                      color: "#1e293b",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: "10px",
                      color: "#e5e7eb",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Nuevo gráfico: Comparación de todas las métricas */}
      <section className="bg-slate-900 text-slate-100 rounded-3xl p-4 md:p-6 shadow-xl">
        <h3 className="text-sm font-semibold mb-2">
          Comparación multi-métrica de los 6 modelos
        </h3>
        <p className="text-[11px] text-slate-300 mb-4">
          Visualización comparativa de Accuracy, Precision, Recall y F1-Score para todos los modelos.
          Las líneas muestran el rendimiento de cada métrica a través de los 6 modelos.
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiMetricsData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#e5e7eb" }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={[0, 1]}
                tick={{ fontSize: 10, fill: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffafa",
                  border: "1px solid #1e293b",
                  fontSize: "11px",
                  color: "#1e293b",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "#e5e7eb" }}
              />
              <Line
                type="monotone"
                dataKey="Accuracy"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Precision"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Recall"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="F1-Score"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tabla de métricas */}
      <section className="bg-slate-900 text-slate-100 rounded-3xl p-4 md:p-6 shadow-xl">
        <h3 className="text-sm font-semibold mb-4">
          Métricas detalladas por modelo
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="text-[11px] uppercase text-slate-300 border-b border-slate-700">
              <tr>
                <th className="py-2 pr-4">Modelo</th>
                <th className="py-2 px-2">Accuracy</th>
                <th className="py-2 px-2">Precision</th>
                <th className="py-2 px-2">Recall</th>
                <th className="py-2 px-2">F1</th>
                <th className="py-2 px-2">ROC-AUC</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_METRICS.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-slate-800 last:border-0"
                >
                  <td className="py-2 pr-4 text-[11px]">{m.name}</td>
                  <td className="py-2 px-2">{m.accuracy.toFixed(3)}</td>
                  <td className="py-2 px-2">{m.precision.toFixed(3)}</td>
                  <td className="py-2 px-2">{m.recall.toFixed(3)}</td>
                  <td className="py-2 px-2">{m.f1.toFixed(3)}</td>
                  <td className="py-2 px-2">{m.roc_auc.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-slate-400">
          Las métricas se han calculado a partir de los ficheros JSON de
          resultados generados durante el entrenamiento.
        </p>
      </section>
    </div>
  );
};

export default Results;
