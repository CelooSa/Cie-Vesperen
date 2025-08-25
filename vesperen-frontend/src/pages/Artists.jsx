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
    Depuis son enfance, elle explore l’harmonie entre force et légèreté, transformant chaque mouvement en poésie visuelle.
    Le tissus  devient un choix évident pour sa grâce et sa fluidité`,
    description:
      "Ses mouvements dessinent des arabesques dans l'air, suspendant le temps au creux des tissus.",
      image: "/images/Aurore Lioran.png"
  },
  {
    id: 2,
    name: "Elias Faeren",
    discipline: "Feu /Pyrotechnie expressive",
    bio: `Elias ne joue pas avec le feu : il converse avec lui. Dans ses mains, les flammes deviennent danseuses, les braises se font chuchotements. 
    Son art embrase l’espace tout en gardant une étrange douceur, comme un feu de camp au cœur d’une nuit sans lune.`,
    description:
    "Véritable dompteur d'étincelles, ses flammes dessinent des éclats lumineux dans l’obscurité, entre puissance incandescente et tendresse fragile ",
    image: "/images/Elias_Faerin.png"
  },
  {
    id: 3,
    name: "Lysandre Vey",
    discipline: "Théâtre acrobatique poétique",
    bio: `Lysandre aime brouiller les frontières. Il mélange théâtre et acrobaties dans des performances où le rêve et la réalité se confondent. 
    Depuis son enfance, il crée des histoires où le ciel et la terre se rencontrent pour captiver petits et grands. 
    Chaque représentation est un voyage dans un monde où l’impossible devient tangible.`,
    description:
      "Ses histoires comme suspendues dans l'imaginaire, jouent avec l'ombre et la lumière des émotions.",
      image: "/images/Equilibriste_poetique_ballon.png"
  },
  {
    id: 4,
    name: "Noémie Thal",
    discipline: "Trapèze/Voltige/Équilibre",
    bio: `Spécialiste de l'équilibre et de la voltige, Noémie, en véritable maîtresse du trapèze, défie la gravité
    avec audace et précision. Toujours sur le fil de la chute, à travers chaque saut , on se faufile vers une sensation de vertige,
    ou le vide devient solide , comme si le ciel devenait une route sur laquelle ses pieds peuvent se poser comme par magie `,
    description:
      "Sur le fil du monde, elle danse avec l'invisible, défiant la gravité comme une évidence.",
      image: "/images/Naomie Thal.png"
  },
  {
    id: 5,
    name: "Orion Delar",
    discipline: "Spectacles aériens",
    bio: `Orion crée des spectacles aériens immersifs où le public est emporté dans un rêve collectif.
    Depuis toujours fasciné par le mouvement, l'espace et son vide ainsi que son immensité silencieuse,
    il a choisi de s'en inspirer pour trasnformer chaque performance en véritable voyage poétique`,
    description:
      "Chaque envol raconte une histoire silencieuse, chaque chute devient une caresse du vent, comme un chuchotement dans le vide.",
      image:"/images/Orion Delar.png"
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
