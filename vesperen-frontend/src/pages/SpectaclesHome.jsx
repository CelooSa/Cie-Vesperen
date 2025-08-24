import React from "react";
import "../styles/spectacles-home.scss";

const spectacles = [
  {
    id: 1,
    title: "Entre Ciel et Terre",
    subtitle: "Spectacle aérien",
    description:
      "Une création poétique où les corps dansent dans l'espace, explorant la relation entre l'humain et les éléments. Une performance aérienne qui mêle cirque contemporain et théâtre physique.",
    duration: "50 minutes",
    audience: "Tout public à partir de 8 ans",
    image: "vesperen-frontend/public/Tissus.jpg",
  },
  {
    id: 2,
    title: "Métamorphoses",
    subtitle: "Théâtre acrobatique",
    description:
      "Un voyage initiatique à travers les transformations de l'âme humaine. Les artistes incarnent différents états émotionnels par le mouvement et l'acrobatie, créant un spectacle viscéral et touchant.",
    duration: "45 minutes",
    audience: "Tout public à partir de 12 ans",
    image: "vesperen-frontend/public/accro_aerien.jpg",
  },
  {
    id: 3,
    title: "Passages",
    subtitle: "Solo intimiste",
    description:
      "Une création solo qui explore les passages de la vie, les transitions et les métamorphoses. Un spectacle intime où chaque geste raconte une histoire personnelle universelle.",
    duration: "30 minutes",
    audience: "Tout public à partir de 6 ans",
    image: "vesperen-frontend/public/maison-trapeze.jpg"
  },
];

const SpectaclesHome = () => {
  return (
    <section className="spectacles">
      <div className="container">
        <h2 className="section-title">Nos Spectacles</h2>
        <p className="intro">
          Découvrez notre univers artistique à travers nos créations originales, où chaque spectacle raconte une histoire unique mêlant cirque contemporain, théâtre physique et poésie du mouvement.
        </p>

        <div className="spectacles-grid">
          {spectacles.map((show) => (
            <div key={show.id} className="card">
              <img src={show.image} alt={show.title} className="image" />

              <h3 className="card-title">{show.title}</h3>
              <p className="subtitle">{show.subtitle}</p>
              <p className="description">{show.description}</p>
              <p className="details">
                <span>Durée :</span> {show.duration} <br />
                <span>Public :</span> {show.audience}
              </p>
              <button className="button">En savoir plus</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpectaclesHome;
