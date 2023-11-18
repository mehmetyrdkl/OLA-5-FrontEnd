"use client";

import React from "react";
import BookingWidget from "./BookingWidget";
import Image from "next/image";

function Hero({ handleClick }) {
  return (
    <section className="hero-section">
      <Image
        src="/hero.webp"
        alt="Hero background Image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <BookingWidget handleClick={handleClick} />
    </section>
  );
}

export default Hero;
