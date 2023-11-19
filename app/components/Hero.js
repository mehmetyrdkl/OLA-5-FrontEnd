"use client";

import React from "react";
import BookingWidget from "./BookingWidget";
import Image from "next/image";

function Hero({ handleClick, selectedHotel }) {
  return (
    <section className="hero-section">
      <Image
        src={selectedHotel.image ? selectedHotel.image : "/hero.webp"}
        alt={selectedHotel.name}
        layout="fill"
        objectFit="cover"
        priority
      />
      <BookingWidget handleClick={handleClick} selectedHotel={selectedHotel} />
    </section>
  );
}

export default Hero;
