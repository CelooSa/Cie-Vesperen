import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/login.scss";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo Vesperen" />
          <h2>Sign in to your account</h2>
        </div>

        {/* Formulaire */}
        <div className="form-container">
          <form>

            {/*partie email*/}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>


              {/*partie password */}
            <div className="form-group password-section">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
              <div className="forgot-link">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>

          {/* mon bouton */}
            <button type="submit" className="submit-btn">
              Sign in
            </button>
          </form>

          {/* le lien d'incription */}
          <p className="register-link">
            Not a member? <Link to="/register">Create your account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
