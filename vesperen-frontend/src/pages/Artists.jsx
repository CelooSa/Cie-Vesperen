import React from 'react';
import '../styles/artists.scss';

const artists = [
  {
    id: 1,
    name: "Aurore Lioran",
    discipline: "Corde / Tissus",
    bio: "Aurore explore les hauteurs avec grâce et légèreté, fusionnant danse et acrobaties aériennes.",
    description: "Ses mouvements dessinent des arabesques dans l'air, suspendant le temps au creux des tissus."
  },
  {
    id: 2,
    name: "Elias Faeren",
    discipline: "Trapèze",
    bio: "Maître du trapèze volant, Elias conjugue audace et poésie dans chaque envol.",
    description: "Chaque saut est un poème, chaque envol une note de musique suspendue dans l'espace."
  },
  {
    id: 3,
    name: "Lysandre Vey",
    discipline: "Théâtre acrobatique poétique",
    bio: "Lysandre mélange théâtre et acrobaties dans des performances où le rêve et la réalité se confondent.",
    description: "Ses histoires flottent entre ciel et terre, jouant avec l'ombre et la lumière des émotions."
  },
  {
    id: 4,
    name: "Noémie Thal",
    discipline: "Voltige / Équilibre",
    bio: "Spécialiste de l'équilibre et de la voltige, Noémie explore la fragilité et la force dans chaque geste.",
    description: "Sur le fil du monde, elle danse avec l'invisible, défiant la gravité comme une évidence."
  },
  {
    id: 5,
    name: "Orion Delar",
    discipline: "Spectacles aériens",
    bio: "Orion crée des spectacles aériens immersifs où le public est emporté dans un rêve collectif.",
    description: "Chaque envol raconte une histoire silencieuse, chaque chute devient une caresse du vent."
  }
];

const Artists = () => {
  return (
    <section id="artistes" className="artists">
      <div className="container">
        <h2 className="title">Nos Artistes</h2>
        <p className="intro">
          Découvrez les âmes créatrices qui donnent vie à nos spectacles, 
          chacune portant sa propre vision poétique du mouvement.
        </p>
        
        <div className="artists-grid">
          {artists.map((artist) => (
            <article key={artist.id} className="card">
              <div className="card-content">
                <h3 className="name">{artist.name}</h3>
                <p className="discipline">{artist.discipline}</p>
                <p className="bio">{artist.bio}</p>
                <blockquote className="quote">
                  "{artist.description}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;