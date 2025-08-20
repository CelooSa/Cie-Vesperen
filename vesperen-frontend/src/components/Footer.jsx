import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/footer.scss';


const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-content'>
          <div className="footer-section">
            <h4>Compagnie Vesperen</h4>
            <p>Créatrice d'émotions en apesanteur</p>
          </div>


          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/artistes">Artistes</Link></li>
              <li><Link to="/spectacles">Spectacles</Link></li>
              <li><Link to="/univers">L'univers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>


          <div className="footer-section">
            <h4>Contact</h4>
            <p>contact@vesperen.com</p>
            <p>+33 1 23 45 67 89</p>
          </div>
        </div>


        <div className="footer-bottom">
          <p>© Compagnie Vesperen – Tous droits réservés</p>
        </div>
        </footer>       
  );
};





export default Footer;