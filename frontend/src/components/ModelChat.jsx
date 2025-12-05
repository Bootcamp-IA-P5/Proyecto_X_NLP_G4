// src/components/ModelChat.jsx
import React, { useState } from "react";
import {
  predictWithSVM,
  predictWithNaiveBayes,
  predictWithLogReg,
} from "../services/modelServices";

const ModelChat = ({ modelKey }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setError("");
    setLoading(true);
    setInput("");

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
      if (label === 1) interpretation = "TÓXICO (1)";
      else if (label === 0) interpretation = "NO TÓXICO (0)";
      else interpretation = `Etiqueta desconocida (${label})`;

      setMessages((prev) => [
        ...prev,
        { role: "model", text: interpretation, score },
      ]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error llamando al modelo");
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Ocurrió un error al procesar el comentario." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 md:p-4 flex flex-col gap-3 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {messages.length === 0 && (
            <p className="text-xs text-slate-500">
              Escribe un comentario y pulsa <b>Enter</b> o <b>Enviar</b> para
              ver si el modelo lo clasifica como tóxico (1) o no tóxico (0).
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

export default ModelChat;
