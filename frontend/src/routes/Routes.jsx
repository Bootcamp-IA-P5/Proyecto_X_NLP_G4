// src/routes/Routes.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/About";
import Results from "../pages/Results";
import Settings from "../pages/Settings";
import SvmPage from "../pages/SvmPage";
import NaiveBayesPage from "../pages/NaiveBayesPage";
import LogRegPage from "../pages/LogRegPage";
import RandomForestPage from "../pages/RandomForestPage";
import DistilBertPage from "../pages/DistilBertPage";
import RnnBigruPage from "../pages/RnnBigruPage";
import LoadingScreen from "../pages/LoadingScreen";

export const routes = createBrowserRouter([
  // ⬇️ Página de carga al entrar en /
  {
    path: "/",
    element: <LoadingScreen />,
  },

  // ⬇️ App real bajo /app
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: "svm",
        element: <SvmPage />,
      },
      {
        path: "naive-bayes",
        element: <NaiveBayesPage />,
      },
      {
        path: "logreg",
        element: <LogRegPage />,
      },
      {
        path: "random-forest",
        element: <RandomForestPage />,
      },
      {
        path: "distilbert",
        element: <DistilBertPage />,
      },
      {
        path: "rnn-bigru",
        element: <RnnBigruPage />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  // ⬇️ Cualquier ruta rara redirige al spinner
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
