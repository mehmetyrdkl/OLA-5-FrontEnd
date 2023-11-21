import React from "react";
import "../styles/cards.scss";
import Image from "next/image";

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <Image
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/2d07f5cd2afd708064ef21f9677cf289.webp"
          alt="Image 1"
          className="card-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="card-tag">
          <p>See venues and meeting packages</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">
            Let us help you with your next meeting
          </p>
          <p className="card-text-details">
            We offer meeting space, catering, and professional meeting planning.
          </p>
        </div>
      </div>
      <div className="card">
        <Image
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/jul/jul-paa-hotellerne/comwell-centralvaerkstedet-julestemning.jpg/bfb70417588c1835e0dd5823f6adc91c.webp"
          alt="Image 2"
          className="card-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="card-tag">
          <p>Mark your calendar</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">Christmas party with food and music</p>
          <p className="card-text-details">
            Ready for your company&apos;s Christmas party? Check out the
            hotels&apos; Chrimstas deals.
          </p>
        </div>
      </div>
      <div className="card">
        <Image
          src="https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/black_weekend_2023/spil2_bw.jpg/925fa776956f562d5e94a6a80b27fac8.webp"
          alt="Image 3"
          className="card-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="card-tag">
          <p>Wind a dream getaway</p>
        </div>
        <div className="card-text">
          <p className="card-text-title">
            Get ready for Black Weekend with our exclusive deals
          </p>
          <p className="card-text-details">
            Spin out one-armed bandit for a chance to win big before Black
            Weekend
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
