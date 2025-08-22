import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/artists-carousel.scss";
import ArtistsCard from "../components/ArtistsCard";
import { image } from "framer-motion/client";

const artists = [
  {
    id: 1,
    name: "Aurore Lioran",
    discipline: "Corde / Tissus",
    bio: `Aurore explore les hauteurs avec grâce et légèreté, fusionnant danse et acrobaties aériennes.
    Depuis son enfance, elle explore l’harmonie entre force et légèreté, transformant chaque mouvement en poésie visuelle.`,
    description:
      "Ses mouvements dessinent des arabesques dans l'air, suspendant le temps au creux des tissus.",
      image: "/src/images/Aurore Lioran.png"
  },
  {
    id: 2,
    name: "Elias Faeren",
    discipline: "Trapèze",
    bio: "Maître du trapèze volant, Elias conjugue audace et poésie dans chaque envol.",
    description:
      "Chaque saut est un poème, chaque envol une note de musique suspendue dans l'espace.",
  },
  {
    id: 3,
    name: "Lysandre Vey",
    discipline: "Théâtre acrobatique poétique",
    bio: "Lysandre mélange théâtre et acrobaties dans des performances où le rêve et la réalité se confondent.",
    description:
      "Ses histoires flottent entre ciel et terre, jouant avec l'ombre et la lumière des émotions.",
  },
  {
    id: 4,
    name: "Noémie Thal",
    discipline: "Voltige / Équilibre",
    bio: "Spécialiste de l'équilibre et de la voltige, Noémie explore la fragilité et la force dans chaque geste.",
    description:
      "Sur le fil du monde, elle danse avec l'invisible, défiant la gravité comme une évidence.",
  },
  {
    id: 5,
    name: "Orion Delar",
    discipline: "Spectacles aériens",
    bio: "Orion crée des spectacles aériens immersifs où le public est emporté dans un rêve collectif.",
    description:
      "Chaque envol raconte une histoire silencieuse, chaque chute devient une caresse du vent.",
  },
];

const Artists = () => {
  return (
    <section id="artistes" className="artists-carousel">
      <div className="container">
        <h2 className="title">Nos Artistes</h2>
        <p className="intro">
          Découvrez les âmes créatrices qui donnent vie à nos spectacles,
          chacune portant sa propre vision poétique du mouvement.
        </p>

        <Swiper
          modules={[Navigation]}
          navigation
          loop={true}
          spaceBetween={50}
          slidesPreview={1}
          className="artists-swiper"
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <ArtistsCard {...artist} />
           </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Artists;
