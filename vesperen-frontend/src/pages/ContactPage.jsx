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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contactez-nous</h1>
        <p>
          Une question ? Un projet ? Nous sommes là pour vous accompagner dans
          votre découverte des arts du cirque ou pour organiser un spectacle sur mesure.
        </p>

        <div className="contact-grid">
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Nom complet *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Sujet *</label>
            <select name="subject" value={formData.subject} onChange={handleChange}>
              <option>Choisissez un sujet</option>
              <option>Organisation de spectacle</option>
              <option>Découverte & ateliers</option>
              <option>Autre demande</option>
            </select>

            <label>Message *</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} />

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

            <div className="info-block">
              <h2>Suivez-nous</h2>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><TiSocialFacebook /></a>
                <a href="#" aria-label="Instagram"><SlSocialInstagram /></a>
                <a href="#" aria-label="YouTube"><SlSocialYoutube /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
