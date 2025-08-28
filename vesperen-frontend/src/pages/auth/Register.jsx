import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/register.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // 👉 ici tu mettras ton axios plus tard
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Bouton retour */}
        <div className="return-button">
          <Link to="/compte">← Return</Link>
        </div>

        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo Vesperen" />
          <h2>Create an account</h2>
        </div>

        {/* Formulaire */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              → Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
