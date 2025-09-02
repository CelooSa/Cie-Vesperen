import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/register.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://cie-vesperen.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      console.log("Register response:", data);

      if (!res.ok) {
        alert(data.message || "Erreur lors de la création du compte");
      } else {
        alert("Compte créé avec succès !");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Impossible de créer un compte.");
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
              <label htmlFor="name">Username</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="username"
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
