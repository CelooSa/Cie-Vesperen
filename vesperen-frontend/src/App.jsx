import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/auth/Login";

import Home from "./pages/Home";
import Artists from "./pages/Artists";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/compte';

  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistes" element={<Artists />} />
        <Route path="/compte" element={<LoginPage />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
