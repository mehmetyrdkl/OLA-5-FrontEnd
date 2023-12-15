"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import "../styles/profilePage.scss";
export default function Page() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    if (!token) {
      redirect("/");
    } else {
      console.log(token);
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
        console.log(responseData);
        setBookingData(responseData);
      }
    } catch (error) {
      console.error(error.message);

      // console.error("There was a problem with the fetch operation:", error);
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
      <section className="profile-comwell-club">
        <h2>My Comwell Club</h2>
      </section>
      <section className="profile-reward-card">
        <h2>Reward Card</h2>
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
    </main>
  );
}
