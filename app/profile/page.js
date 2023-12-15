"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
export default function Page() {
  const token = localStorage.getItem("token");
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    if (!token) {
      redirect("/");
    } else {
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
        if (response.status === 401) {
        }

        throw new Error("Network response was not ok.");
      } else {
        const responseData = await response.json();
        console.log(responseData);
        setBookingData(responseData);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
        <table>
          <thead>
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
            {bookingData.map((booking, index) => {
              <tr key="booking.index">
                <td>
                  {booking.booking_dates.check_in}-
                  {booking.booking_dates.check_out}
                </td>
                <td>{booking.hotel_namee}</td>
                <td>
                  {booking.rooms.length > 1 &&
                    booking.rooms.map((room) => room.guest_full_name)}
                  {booking.rooms.guest_full_name}
                </td>
                <td>Booked</td>
                <td>{booking._id}</td>
                <td>{booking.total_price}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
