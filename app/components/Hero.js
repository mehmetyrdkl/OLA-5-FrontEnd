"use client";

import React from "react";
import BookingWidget from "./BookingWidget";
import Image from "next/image";

function Hero({ selectedHotel, rooms, setBookingDates, bookingDates }) {
  return (
    <section className="hero-section">
      <Image
        src={selectedHotel.hotelImage ? selectedHotel.hotelImage : "/hero.webp"}
        alt={selectedHotel.name ? selectedHotel.name : "Hero image"}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <BookingWidget
        selectedHotel={selectedHotel}
        rooms={rooms}
        setBookingDates={setBookingDates}
        bookingDates={bookingDates}
      />
    </section>
  );
}

export default Hero;
