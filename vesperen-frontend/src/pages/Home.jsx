import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/home.scss";
import Artistes from './Artists';

const Home = () => {
  const [show, setShow] = useState(null);

  // Charger le spectacle en avant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsRes = await axios.get("http://localhost:8000/api/shows");
        setShow(showsRes.data[0]); // exemple : premier spectacle
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Compagnie <em>Vesperen</em></h1>
          <p className="hero-subtitle">ARTS DU CIRQUE CONTEMPORAIN</p>
          <p>Une compagnie qui explore les limites entre rêve et réalité, où chaque<br />
          mouvement raconte une histoire, poétique et féérique, suspendue dans l'espace et le temps.</p>
          <button>Découvrir nos artistes</button>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="presentation">
        <h2>Notre univers</h2>
        <p>
          Fondée par Aurore Lioran et Elias Faeren, la Compagnie Vesperen explore
          les rêves, la poésie et l’imaginaire à travers un cirque contemporain
          aérien et sensible.
        </p>
      </section>

      {/* SPECTACLE EN AVANT */}
      {show && (
        <section className="show">
          <h2>Prochain spectacle</h2>
          <div className="show-card">
            <div>
              <img src={show.imageUrl} alt={show.title} />
              <h3>{show.title}</h3>
              <p>{show.description}</p>
              <p><strong>Date :</strong> {show.date}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
