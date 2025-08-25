import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/spectacles-detail.scss";



const spectaclesData = {
  1: {
    titre: "Rêves Suspendus",
    description:
      "Voyage poétique où les corps flottent dans un univers aérien...",
    image: "/images/equilibre.jpg",
    infos: "Durée : 1h15 • Tout public • Création 2023",
  },
  2: {
    titre: "Éclats d’Ombres",
    description:
      "Entre théâtre et acrobatie, un récit visuel entre lumière et ombre...",
    image: "/images/Accrobatie.jpeg",
    infos: "Durée : 1h • Dès 10 ans • Création 2022",
  },
  3: {
    titre: "Les Étoiles Errantes",
    description:
      "Un spectacle aérien, entre voltige et équilibre, où les étoiles guident...",
    image: "/images/Corde-tissus.jpg",
    infos: "Durée : 1h30 • Tout public • Création 2021",
  },
};

export default function SpectacleDetail() {
  const { id } = useParams();
  const spectacle = spectaclesData[id];

  if (!spectacle) {
    return <p>Spectacle introuvable</p>;
  }

  return (
    <div className="spectacle-detail">
      <div className="spectacle-image">
        <img src={spectacle.image} alt={spectacle.titre} />
      </div>

      <div className="specacle-infos">
        <h2>{spectacle.titre}</h2>
        <p>{spectacle.description}</p>
        <p className="infos">{spectacle.infos}</p>
        <Link to="/spectacles" className="btn-back">
          ← Retour aux spectacles
        </Link>
      </div>
    </div>
  );
}