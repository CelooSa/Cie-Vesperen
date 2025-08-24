import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Reservations from "./pages/dashboard/Reservations";
import Tickets from "./pages/dashboard/Tickets";


import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Spectacles from "./pages/Spectacles";
import SpectacleDetail from "./pages/SpectaclesDetail";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();
  const isAuthPage = 
    location.pathname ==="/compte" ||
    location.pathname ==="/register" ||
    location.pathname ==="/forgot-password" ||
    location.pathname ==="/verify-email";
  
  
  const isLoginPage = location.pathname === "/compte";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* pr mes pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/artistes" element={<Artists />} />
        <Route path="/spectacles" element={<Spectacles />} />
        <Route path="/spectacles/:id" element={<SpectacleDetail />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* pr mes pages avec authentification */}
        <Route path="/compte" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/*  mes pages dashboard protégé avec des sous-routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="tickets" element={<Tickets />} />   
      </Route>
    </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
