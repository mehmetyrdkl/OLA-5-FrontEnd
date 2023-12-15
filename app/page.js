"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import HotelsSidebar from "./components/Sidebars/HotelsSidebar";
import RoomsSidebar from "./components/Sidebars/RoomsSidebar";
import BookingSidebar from "./components/Sidebars/BookingSidebar";
import React, { useState } from "react";
import Cards from "./components/Cards";
import WelcomeSection from "./components/WelcomeSection";
import useMyContext from "./MyContext";
import LogInDropdown from "./components/LogInDropdown";
import SignUpSidebar from "./components/Sidebars/SignUpSidebar";

export default function Home() {
  const value = useMyContext();
  const [fetchedUserInfo, setFetchedUserInfo] = useState({});
  const [selectedHotel, setSelectedHotel] = useState({});
  const [bookingDates, setBookingDates] = useState({
    check_in: "",
    check_out: "",
  });
  // const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [rooms, setRooms] = useState([
    {
      id: 1,
      numberOfGuests: 1,
      roomPrice: 0,
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  ]);
  const [addons, setAddons] = useState([]);

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

      <Hero
        selectedHotel={selectedHotel}
        rooms={rooms}
        setRooms={setRooms}
        bookingDates={bookingDates}
        setBookingDates={setBookingDates}
      ></Hero>
      <Cards />
      <LogInDropdown setFetchedUserInfo={setFetchedUserInfo} />
      <SignUpSidebar />
      <WelcomeSection selectedHotel={selectedHotel} />
      <HotelsSidebar setSelectedHotel={setSelectedHotel} />
      <RoomsSidebar rooms={rooms} setRooms={setRooms} />
      <BookingSidebar
        bookingDates={bookingDates}
        selectedHotel={selectedHotel}
        setRooms={setRooms}
        rooms={rooms}
        setAddons={setAddons}
        addons={addons}
        setBookingDates={setBookingDates}
        setFetchedUserInfo={setFetchedUserInfo}
        fetchedUserInfo={fetchedUserInfo}
      />
    </>
  );
}
