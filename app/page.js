"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import HotelsSidebar from "./components/Sidebars/HotelsSidebar";
import RoomsSidebar from "./components/Sidebars/RoomsSidebar";
import BookingSidebar from "./components/Sidebars/BookingSidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useState } from "react";
import Cards from "./components/Cards";
import WelcomeSection from "./components/WelcomeSection";
import useMyContext from "./MyContext";
import LogInDropdown from "./components/LogInDropdown";
import SignUpSidebar from "./components/Sidebars/SignUpSidebar";

export default function Home() {
  const value = useMyContext();
  const [selectedHotel, setSelectedHotel] = useState({});
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [bookingDates, setBookingDates] = useState({
    check_in: "",
    check_out: "",
  });

  const handleClick = (state) => {
    // setDisplayHotelSidebar(!displayHotelSidebar); // Toggles the display state
    value.setSidebar(state);
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
      <Cards />
      <LogInDropdown />
      <SignUpSidebar />
      <WelcomeSection selectedHotel={selectedHotel} />
      <HotelsSidebar setSelectedHotel={setSelectedHotel} />
      <RoomsSidebar setNumberOfGuests={setNumberOfGuests} />
      <BookingSidebar
        bookingDates={bookingDates}
        numberOfGuests={numberOfGuests}
        selectedHotel={selectedHotel}
      />
      <Footer />
    </>
  );
}
