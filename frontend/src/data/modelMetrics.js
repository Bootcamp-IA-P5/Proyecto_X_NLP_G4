// src/data/modelMetrics.js

// Métricas reales extraídas de los JSON de resultados del backend
// - backend/data/results/svm_toxic_v1.json
// - backend/data/results/naive_bayes_multinomial_IsToxic.json
// - backend/data/results/logistic_regression.json

export const MODEL_METRICS = [
  {
    id: "svm",
    name: "Support Vector Machine (SVM)",
    accuracy: 0.735,
    precision: 0.7671232876712328,
    recall: 0.6086956521739131,
    f1: 0.6787878787878788,
    roc_auc: 0.8070652173913043,
  },
  {
    id: "naive_bayes",
    name: "Naive Bayes Multinomial",
    accuracy: 0.76,
    precision: 0.8333333333333334,
    recall: 0.5978260869565217,
    f1: 0.6962025316455697,
    roc_auc: 0.8014291465378421,
  },
  {
    id: "logreg",
    name: "Logistic Regression",
    accuracy: 0.62,
    precision: 0.5571428571428572,
    recall: 0.8478260869565217,
    f1: 0.6724137931034483,
    roc_auc: 0.7758655394524959,
  },
];
