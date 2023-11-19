"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import HotelsSidebar from "./components/HotelsSidebar";
import RoomsSidebar from "./components/RoomsSidebar";
import BookingSidebar from "./components/BookingSidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useState } from "react";

export default function Home() {
  const [sidebar, setSidebar] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [bookingDates, setBookingDates] = useState({
    check_in: "",
    check_out: "",
  });

  const handleClick = (state) => {
    // setDisplayHotelSidebar(!displayHotelSidebar); // Toggles the display state
    setSidebar(state);
  };

  return (
    <>
      <Head>
        <title>Welcome to Comwell&apos;s hotels throughout the country</title>
        <meta name="author" content="Group 9"></meta>
        <meta
          name="description"
          content="Meeting rooms, conference rooms, venues and lovely rooms. Comwell has it all. We aim high, also regarding sustainability, so you get the best experiences"
        ></meta>
      </Head>
      <Header handleClick={handleClick} />
      <Hero
        handleClick={handleClick}
        selectedHotel={selectedHotel}
        numberOfGuests={numberOfGuests}
        setBookingDates={setBookingDates}
        bookingDates={bookingDates}
      ></Hero>
      <HotelsSidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        setSelectedHotel={setSelectedHotel}
      />
      <RoomsSidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        setNumberOfGuests={setNumberOfGuests}
      />
      <BookingSidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        bookingDates={bookingDates}
        numberOfGuests={numberOfGuests}
        selectedHotel={selectedHotel}
      />
      <Footer />
    </>
  );
}
