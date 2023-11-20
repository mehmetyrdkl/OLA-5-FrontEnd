import React from "react";
import "../styles/cards.scss";

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <img
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/2d07f5cd2afd708064ef21f9677cf289.webp"
          alt="Image 1"
          className="card-image"
        />
        <div className="card-tag">
          <p>See premises and meeting packages</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">
            Let us help you with your next meeting
          </p>
          <p className="card-text-details">
            We have the primeses, the good catering and professional meeting
            planing.
          </p>
        </div>
      </div>
      <div className="card">
        <img
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/jul/jul-paa-hotellerne/comwell-centralvaerkstedet-julestemning.jpg/bfb70417588c1835e0dd5823f6adc91c.webp"
          alt="Image 2"
          className="card-image"
        />
        <div className="card-tag">
          <p>Put a mark in your calendar</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">Christmas party with food and music</p>
          <p className="card-text-details">
            Ready for this year's company Christmas lunch? See the hotels'
            Chrimstas offers for you.
          </p>
        </div>
      </div>
      <div className="card">
        <img
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/black_weekend_2023/spil2_bw.jpg/925fa776956f562d5e94a6a80b27fac8.webp"
          alt="Image 3"
          className="card-image"
        />
        <div className="card-tag">
          <p>Play and win</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">Black Weekend with offers</p>
          <p className="card-text-details">
            Try your luck in our on-armed thief as we warm up to black Weekend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
