"use client";

import React from "react";
import BookingWidget from "./BookingWidget";
import Image from "next/image";

function Hero({
  handleClick,
  selectedHotel,
  numberOfGuests,
  setBookingDates,
  bookingDates,
}) {
  return (
    <section className="hero-section">
      <Image
        src={selectedHotel.hotelImage ? selectedHotel.hotelImage : "/hero.webp"}
        alt={selectedHotel.name ? selectedHotel.name : "Hero image"}
        layout="fill"
        objectFit="cover"
        priority
      />
      <BookingWidget
        handleClick={handleClick}
        selectedHotel={selectedHotel}
        numberOfGuests={numberOfGuests}
        setBookingDates={setBookingDates}
        bookingDates={bookingDates}
      />
    </section>
  );
}

export default Hero;
