import React, { useEffect, useState } from "react";
import axios from "axios";


import "../styles/home.scss";
import SpectaclesHome from './SpectaclesHome';

const Home = () => {
  return (
    <div className="home">
      {/* ma partie hero*/}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Compagnie <em>Vesperen</em>
          </h1>
          <p className="hero-subtitle">ARTS DU CIRQUE CONTEMPORAIN</p>
          <p>
            Une compagnie qui explore les limites entre rêve et réalité, où
            chaque
            <br />
            mouvement raconte une histoire, poétique et féérique, suspendue dans
            l'espace et le temps.
          </p>
          <button>Découvrir nos artistes</button>
        </div>
      </section>


        <SpectaclesHome />
      
    

      {/* petite phrase de présentation à voir si on la garde */}
      <section className="presentation">
        <h3>Notre univers</h3>
        <p>
          Fondée par Aurore Lioran et Elias Faeren, la Compagnie Vesperen
          explore les rêves, la poésie et l’imaginaire à travers un cirque
          contemporain aérien et sensible.
        </p>
      </section>
    </div>
  );
};

export default Home;
