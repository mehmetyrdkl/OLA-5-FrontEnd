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
  fetchedUserInfo,
}) {
  useEffect(() => {
    // If fetchedUserInfo exists, update userInfo with its data
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo);
    }
  }, [fetchedUserInfo, setUserInfo]);

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
    const { fullName, email, phoneNumber } = userInfo;
    // Check if all fields have values
    const fieldsFilled =
      fullName.trim() !== "" &&
      email.trim().includes("@") &&
      phoneNumber.trim().length >= 6;
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
              name="fullName"
              onFocus={() => setSelectedField("fullName")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={userInfo.fullName}
            />
            <label
              className={`input-label ${
                (selectedField === "fullName" || userInfo.fullName) && "active"
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
              name="phoneNumber"
              maxLength={10}
              pattern="[0-9]{10}"
              onFocus={() => setSelectedField("phoneNumber")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={userInfo.phoneNumber}
            />
            <label
              className={`input-label ${
                (selectedField === "phoneNumber" || userInfo.phoneNumber) &&
                "active"
              }`}
            >
              Phone Number
            </label>
          </div>
        </form>
      </div>
      <div className="booking-footer">
        <button
          className={allFieldsFilled ? "active" : ""}
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
