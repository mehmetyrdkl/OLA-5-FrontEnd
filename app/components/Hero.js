"use client";

import React from "react";
import BookingWidget from "./BookingWidget";
import Image from "next/image";

function Hero() {
  return (
    <section className="hero-section">
      <Image
        src="/hero.webp"
        alt="Hero background Image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <BookingWidget />
    </section>
  );
}

export default Hero;
