"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogInDropdown from "../components/LogInDropdown";
import Login from "./components/login";
import membershipCard from "./assets/membership-card.png";
import "../styles/profilePage.scss";
import useMyContext from "@/app/MyContext";
export default function Page() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [bookingData, setBookingData] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const value = useMyContext();

  useEffect(() => {
    if (!token) {
      redirect("/");
    } else {
      // console.log(token);
      checkLogin();
    }
    async function checkLogin() {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/${localStorage.getItem("user_id")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            redirect("/");
          }

          throw new Error("Network response was not ok.");
        } else {
          const responseData = await response.json();
          // call another fetch request
          getBookings();
          setUserInfo(responseData.fullName);
          value.setLoggedIn(true);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  }, []);

  async function getBookings() {
    try {
      const response = await fetch(`http://localhost:8080/booking`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // console.error("no bookings");
        }

        throw new Error("Network response was not ok.");
      } else {
        const responseData = await response.json();
        setBookingData(responseData);
      }
    } catch (error) {
      console.error(error.message);

      // console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    calculateNights();
  }, [bookingData]);

  function calculateNights() {
    function calculateNumberOfNights(checkIn, checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      return differenceInTime / (1000 * 3600 * 24);
    }

    let totalNights = 0;

    if (bookingData.length >= 1) {
      bookingData.forEach((booking) => {
        const { check_in, check_out } = booking.booking_dates;
        totalNights += calculateNumberOfNights(check_in, check_out);
      });
      console.log(totalNights);
    }
  }

  function formattedPrice(price) {
    return price.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatShortDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="profile-page-wrapper">
      <LogInDropdown />
      {!value.loggedIn ? (
        <Login />
      ) : (
        <div className="flex flex-col gap-28">
          <section className="profile-comwell-club">
            <div className="membership-details">
              <h2>My Comwell Club</h2>
              <p>25 points expires at 1 March 2027.</p>
              <p>All points are valid 3 years from date earned.</p>
            </div>
            <div className="membership-card">
              <Image
                src={membershipCard}
                alt="membership card"
                width={900}
                height={500}
              />
              <div className="card-title">Membership</div>
              <div className="card-name">
                <span>Name</span>
                <span>{userInfo}</span>
              </div>
              <div className="card-points">
                <span>Points</span>
                <span>25 Points</span>
              </div>
            </div>
          </section>
          <section className="profile-reward-card">
            <div>
              <h2>Reward Card</h2>
              <p>
                Get one stamp for each night you stay at a Comwell hotel. 8
                stamps entitle you to one bonus night including breakfast in a
                standard room at a selected Comwell hotel in Denmark. The reward
                card remains active with a minimum of 1 overnight stay every 12
                months.
              </p>
            </div>
            <div className="reward-card">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li className="ticket-line"> </li>
                <li> </li>
              </ul>
            </div>
          </section>
          <section className="profile-purchase-history">
            <h2>Purchase History</h2>
            <p>Here you can see your booking history</p>
            <table>
              <thead className="border-b border-gray-200">
                <tr>
                  <th>Period</th>
                  <th>Hotel</th>
                  <th>Guest</th>
                  <th>Booker</th>
                  <th>Status</th>
                  <th>Booking no.</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.length === 0 ? (
                  <tr>
                    <td>No bookings found</td>
                  </tr>
                ) : (
                  bookingData.map((booking, index) => (
                    <tr key={index}>
                      <td>
                        {formatShortDate(booking.booking_dates.check_in)} -{" "}
                        {formatShortDate(booking.booking_dates.check_out)}
                      </td>
                      <td>{booking.hotel_name}</td>
                      <td>
                        {booking.rooms.length > 1 ? (
                          <ul className="guest-list">
                            {booking.rooms.slice(1).map((room, roomIndex) => (
                              <li key={roomIndex}>{room.guest_full_name}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="single-guest">
                            {booking.rooms[0].guest_full_name}
                          </div>
                        )}
                      </td>
                      <td>{booking.rooms[0].guest_full_name}</td>
                      <td>Booked</td>
                      <td>{booking._id}</td>
                      <td>{formattedPrice(booking.total_price)}.kr</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </main>
  );
}
