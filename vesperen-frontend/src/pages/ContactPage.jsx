import React, { useState } from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram, SlSocialYoutube } from "react-icons/sl";

import "../styles/contact-page.scss";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://cie-vesperen.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contactez-nous</h1>
        <p>
          Une question ? Un projet ? Nous sommes là pour vous accompagner dans
          votre découverte des arts du cirque ou pour organiser un spectacle sur
          mesure.
        </p>

        <div className="contact-grid">
          <form onSubmit={handleSubmit} className="contact-form">
            {submitStatus === "success" && (
              <div className="alert alert-success">
                ✅ Votre message a été envoyé avec succès !
              </div>
            )}
            {submitStatus === "error" && (
              <div className="alert alert-error">
                ❌ Une erreur est survenue, veuillez réessayer.
              </div>
            )}

            <label>Nom complet *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Sujet *</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Choisissez un sujet</option>
              <option value="Organisation de spectacle">
                Organisation de spectacle
              </option>
              <option value="Découverte & ateliers">
                Découverte & ateliers
              </option>
              <option value="Autre demande">Autre demande</option>
            </select>

            <label>Message *</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Envoyer le message</button>
          </form>

          <div className="contact-info">
            <div className="info-block">
              <h2>Nos coordonnées</h2>
              <p>📍 123 Rue des Arts, 75001 Paris, France</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>✉️ contact@compagnie-vesperen.fr</p>
            </div>

            <div className="info-block">
              <h2>Horaires d'ouverture</h2>
              <p>Lundi - Vendredi : 9h00 - 21h00</p>
              <p>Samedi : 10h00 - 18h00</p>
              <p>Dimanche : 14h00 - 18h00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
