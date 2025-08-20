import React from "react";
import { Link } from "react-router-dom";

import '../styles/navbar.scss';
import logo from '../assets/Logo-compagnie-Vesperen.webp';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo Vesperen" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/spectacles">Spectacles</Link></li>
        <li><Link to="/artistes">Artistes</Link></li>
        <li><Link to="/compte">Mon compte</Link></li>
      </ul>

      <div className="navbar-button">
        <Link to="/contact"><button>Nous contacter</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
