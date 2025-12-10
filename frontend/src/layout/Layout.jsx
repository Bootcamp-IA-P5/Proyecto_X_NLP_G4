// src/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <Nav />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-slate-900/80 border-l border-slate-800">
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
