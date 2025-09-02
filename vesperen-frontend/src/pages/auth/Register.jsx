import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://cie-vesperen.onrender.com/api/users/signUp",
        formData
      );
      console.log("User created:", res.data);
      alert("Utilisateur créé avec succès ! Vérifiez votre email.");
    } catch (error) {
      console.error("Erreur création:", error);
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="return-button">
          <Link to="/compte">← Return</Link>
        </div>

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
