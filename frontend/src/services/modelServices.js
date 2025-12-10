// src/services/modelServices.js
const API_BASE_URL = "http://127.0.0.1:8000";

async function callModelEndpoint(endpoint, text) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.detail || `Error calling endpoint ${endpoint}: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export async function predictWithSVM(text) {
  return callModelEndpoint("/predict/svm", text);
}

export async function predictWithNaiveBayes(text) {
  return callModelEndpoint("/predict/naive-bayes", text);
}

export async function predictWithLogReg(text) {
  return callModelEndpoint("/predict/logreg", text);
}
