import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/forgot-password.scss";

export default function ForgotPassword() {
  return (
    <div className="forgot-page">
      <div className="forgot-container">

       
        <div className="return-button">
          <Link to="/compte">← Return</Link>
        </div>

        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo Vesperen" />
          <h2>Forgot your password?</h2>
        </div>

        {/* Formulaire */}
        <div className="form-container">
          <form>
            <div className="form-group">
              <label htmlFor="email">Your email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
              />
            </div>

            <button type="submit" className="submit-btn">
              → Send reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}