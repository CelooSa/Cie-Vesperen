import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import logo from "../assets/Logo-compagnie-Vesperen.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // j'ai décidé d'ajouter un state + un bouton burger pr responsive sur mobile

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo Vesperen" />
        </Link>
      </div>

      {/* ici je rajoute mon bouton burger qui sera visible slmt sur mobile */}
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${isOpen ? "show" : ""}`}>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/spectacles">Spectacles</Link>
        </li>
        <li>
          <Link to="/artistes">Artistes</Link>
        </li>
        <li>
          <Link to="/compte">Mon compte</Link>
        </li>
      </ul>

      <div className="navbar-button">
        <Link to="/contact">
          <button>Nous contacter</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
