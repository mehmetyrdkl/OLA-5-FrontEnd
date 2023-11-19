"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import HotelsSidebar from "./components/HotelsSidebar";
import React, { useState } from "react";

export default function Home() {
  const [displayHotelSidebar, setDisplayHotelSidebar] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});

  const handleClick = () => {
    setDisplayHotelSidebar(!displayHotelSidebar); // Toggles the display state
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
      <Hero handleClick={handleClick} selectedHotel={selectedHotel}></Hero>
      <HotelsSidebar
        displayHotelSidebar={displayHotelSidebar}
        setDisplayHotelSidebar={setDisplayHotelSidebar}
        setSelectedHotel={setSelectedHotel}
      />
    </>
  );
}
