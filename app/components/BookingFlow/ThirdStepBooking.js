import React, { useState } from "react";
import "../../styles/BookingFlow/thirdStepBooking.scss";
import BookingOverview from "./BookingOverview";

function ThirdStepBooking({ selectedRoom, setBookingStep, bookingStep }) {
  const [selectedField, setSelectedField] = useState(null);

  return (
    <div className="wrapper-with-overview">
      <div className="step-wrapper">
        <h2>Guest Information</h2>
        <form className="guest-info-form">
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              onFocus={() => setSelectedField("name")}
              onBlur={() => setSelectedField(null)}
            />
            <label
              className={`input-label ${selectedField === "name" && "active"}`}
            >
              Full Name
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              onFocus={() => setSelectedField("email")}
              onBlur={() => setSelectedField(null)}
            />
            <label
              className={`input-label ${selectedField === "email" && "active"}`}
            >
              Email
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="tel"
              name="phone"
              onFocus={() => setSelectedField("phone")}
              onBlur={() => setSelectedField(null)}
            />
            <label
              className={`input-label ${selectedField === "phone" && "active"}`}
            >
              Phone Number
            </label>
          </div>
        </form>
      </div>
      <div className="booking-footer">
        <button onClick={() => setBookingStep(bookingStep + 1)}>
          Continue
        </button>
      </div>
      <BookingOverview selectedRoom={selectedRoom} />
    </div>
  );
}

export default ThirdStepBooking;
