import React from "react";
import "../styles/artists-card.scss";

const ArtistsCard = ({ name, discipline, bio, description, image }) => {
  return (
    <div className="artist-card">
      <div className="artist-image">
        <img src={image} alt={name} />
      </div>
      <div className="artist-info">
        <h3 className="artist-name">{name}</h3>
        <p className="artist-discipline">{discipline}</p>
        <p className="artist-bio">{bio}</p>
        <p className="artist-description">{description}</p>
      </div>
    </div>
  );
};

export default ArtistsCard;
