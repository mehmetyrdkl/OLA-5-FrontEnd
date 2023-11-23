"use client";
import { useState } from "react";

function BookingWidget({
  handleClick,
  selectedHotel,
  numberOfGuests,
  setBookingDates,
  bookingDates,
}) {
  function handleDateChange(e, dateType) {
    const selectedDate = e.target.value;
    setBookingDates((prevDates) => ({
      ...prevDates,
      [dateType]: selectedDate,
    }));
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="widget-wrapper">
      <h1>
        {selectedHotel.description
          ? selectedHotel.description
          : "Check in at Comwell and discover Denmark"}
      </h1>
      <ul>
        <li className="accomodation">Accommodation</li>
        <li className="meeting-conference">Meeting & Conference</li>
        <li className="banquet">Banquet</li>
      </ul>
      <div className="flex flex-col space-y-3">
        <div className="hotel-picker input-button">
          <button onClick={() => handleClick("hotel")}>
            Hotel
            <div>
              <span>
                <span>
                  {selectedHotel.name ? selectedHotel.name : "Choose hotel"}
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="w-[16px] rotate-180"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M16.666 12.916 10 6.666l-6.667 6.25"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="room-persons-picker input-button">
          <button onClick={() => handleClick("rooms")}>
            Rooms
            <div>
              <span>
                1 Room,
                {numberOfGuests > 1
                  ? numberOfGuests + " Persons"
                  : numberOfGuests + " Person"}{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="w-[16px] rotate-180"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M16.666 12.916 10 6.666l-6.667 6.25"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="date-picker input-button">
          <div>
            <label>Check in</label>
            <input
              onChange={(e) => handleDateChange(e, "check_in")}
              min={currentDate}
              type="date"
            ></input>
          </div>
          <div>
            <label>Check out</label>
            <input
              onChange={(e) => handleDateChange(e, "check_out")}
              min={bookingDates.check_in}
              type="date"
              disabled={!bookingDates.check_in}
            ></input>
          </div>
        </div>
        <button
          className={
            selectedHotel.name &&
            bookingDates.check_in &&
            bookingDates.check_out
              ? "active search"
              : "search"
          }
          onClick={() => handleClick("booking")}
        >
          Search
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
