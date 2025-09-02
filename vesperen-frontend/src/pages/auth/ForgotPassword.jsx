import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Logo-compagnie-Vesperen.webp";
import "../../styles/forgot-password.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        { email }
      );
      setMessage(res.data.message || "Vérifie ton email pour le lien de réinitialisation !");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="return-button">
          <Link to="/compte">← Return</Link>
        </div>

        <div className="logo-section">
          <img src={logo} alt="Logo Vesperen" />
          <h2>Forgot your password?</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Your email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "→ Send reset link"}
            </button>
          </form>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
