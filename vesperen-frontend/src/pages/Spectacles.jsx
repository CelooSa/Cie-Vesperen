
import React from "react";
import { Link } from "react-router-dom";
import "../styles/spectacles.scss";

const spectaclesData = [
  {
    id: 1,
    titre: "Rêves Suspendus",
    description: "Un voyage poétique dans les airs, entre corde et tissus.",
    image: "/images/reves-suspendus.jpg",
  },
  {
    id: 2,
    titre: "Éclats d’Ombres",
    description: "Un théâtre acrobatique entre lumière et obscurité.",
    image: "/images/eclats-ombres.jpg",
  },
  {
    id: 3,
    titre: "Les Étoiles Errantes",
    description: "Un spectacle aérien entre voltige et équilibre.",
    image: "/images/etoiles-errantes.jpg",
  },
];

export default function Spectacles() {
  return (
    <div className="spectacles-page">
      <h2>Nos Spectacles</h2>
      <div className="spectacles-list">
        {spectaclesData.map((show) => (
          <div key={show.id} className="spectacle-card">
            <img src={show.image} alt={show.titre} />
            <h3>{show.titre}</h3>
            <p>{show.description}</p>
            <Link to={`/spectacles/${show.id}`} className="btn">
              Découvrir
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
