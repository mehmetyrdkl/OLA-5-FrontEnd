import React, { useState, useEffect } from "react";
import "../../styles/BookingFlow/thirdStepBooking.scss";
import BookingOverview from "./BookingOverview";

function ThirdStepBooking({
  selectedRoom,
  setBookingStep,
  bookingStep,
  totalPrice,
  userInfo,
  setUserInfo,
}) {
  const [selectedField, setSelectedField] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { fullname, email, phone } = userInfo;
    // Check if all fields have values
    const fieldsFilled =
      fullname.trim() !== "" &&
      email.trim().includes("@") &&
      phone.trim().length >= 6;
    setAllFieldsFilled(fieldsFilled);
  }, [userInfo]);

  return (
    <div className="wrapper-with-overview">
      <div className="step-wrapper">
        <h2>Guest Information</h2>
        <form className="guest-info-form">
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              onFocus={() => setSelectedField("fullname")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={userInfo.fullname}
            />
            <label
              className={`input-label ${
                (selectedField === "fullname" || userInfo.fullname) && "active"
              }`}
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
              onChange={handleInputChange}
              value={userInfo.email}
            />
            <label
              className={`input-label ${
                (selectedField === "email" || userInfo.email) && "active"
              }`}
            >
              Email
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="tel"
              name="phone"
              maxLength={10}
              pattern="[0-9]{10}"
              onFocus={() => setSelectedField("phone")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={userInfo.phone}
            />
            <label
              className={`input-label ${
                (selectedField === "phone" || userInfo.phone) && "active"
              }`}
            >
              Phone Number
            </label>
          </div>
        </form>
      </div>
      <div className="booking-footer">
        <button
          onClick={() => setBookingStep(bookingStep + 1)}
          disabled={!allFieldsFilled}
        >
          Continue
        </button>
      </div>
      <BookingOverview selectedRoom={selectedRoom} totalPrice={totalPrice} />
    </div>
  );
}

export default ThirdStepBooking;
