import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-100">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
