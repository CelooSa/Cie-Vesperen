import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/login.scss";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const token = res.data.token;

      // Pr mon stokage côté front :
      localStorage.setItem("token", token);

      // ensuite ma redirection vers le dasboard
      navigate("/dashboard/profile");
    }catch (err) {
      setError("Email ou mot de passe incorrect");
      console.log(err);
    }
  };
    
    
      return (
    <div className="login-page">
      <div className="login-container">

        {/* Ajout d'un petit return */}
        <div className="return-button">
          <Link to="/">← Return</Link>
        </div>


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
