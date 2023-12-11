import React, { useState, useEffect } from "react";
import "../../styles/BookingFlow/fourthStepBooking.scss";
import BookingOverview from "./BookingOverview";

function FourthStepBooking({
  selectedRoom,
  setBookingStep,
  bookingStep,
  totalPrice,
  fetchedUserInfo,
  rooms,
  setRooms,
  numberOfDays,
}) {
  useEffect(() => {
    // If fetchedUserInfo exists, update userInfo with its data
    if (fetchedUserInfo.fullName) {
      const updatedRooms = [...rooms];
      updatedRooms[0] = {
        ...updatedRooms[0],
        user_id: fetchedUserInfo._id,
        fullName: fetchedUserInfo.fullName,
        email: fetchedUserInfo.email,
        phoneNumber: fetchedUserInfo.phoneNumber,
      };
      setRooms(updatedRooms);
    }
  }, [fetchedUserInfo]);

  const [selectedField, setSelectedField] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const handleInputChange = (event, roomId) => {
    const { name, value } = event.target;

    setRooms((prevInfo) => {
      return prevInfo.map((room, i) => {
        if (room.id === roomId) {
          return { ...room, [name]: value };
        }
        return room;
      });
    });
  };
  useEffect(() => {
    const fieldsFilled = rooms.every((room) => {
      return (
        room.fullName.trim() !== "" &&
        room.email.trim().includes("@") &&
        room.phoneNumber.trim().length >= 6
      );
    });
    setAllFieldsFilled(fieldsFilled);
  }, [rooms]);

  return (
    <>
      <div className="wrapper-with-overview">
        <div className="step-wrapper">
          <h2>Guest Information</h2>
          {rooms.map((room, index) => (
            <form key={index} className="guest-info-form">
              <h3 className="mb-4 text-xs opacity-60">ROOM {index + 1}</h3>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullName"
                  onFocus={() => setSelectedField("fullName" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={(e) => handleInputChange(e, room.id)}
                  value={room.fullName}
                />
                <label
                  className={`input-label ${
                    (selectedField === "fullName" + room.id || room.fullName) &&
                    "active"
                  }`}
                >
                  Full Name
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  onFocus={() => setSelectedField("email" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={(e) => handleInputChange(e, room.id)}
                  value={room.email}
                />
                <label
                  className={`input-label ${
                    (selectedField === "email" + room.id || room.email) &&
                    "active"
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
                  onFocus={() => setSelectedField("phoneNumber" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={(e) => handleInputChange(e, room.id)}
                  value={room.phoneNumber}
                />
                <label
                  className={`input-label ${
                    (selectedField === "phoneNumber" + room.id ||
                      room.phoneNumber) &&
                    "active"
                  }`}
                >
                  Phone Number
                </label>
              </div>
            </form>
          ))}
        </div>

        <BookingOverview rooms={rooms} numberOfDays={numberOfDays} />
        <div className="booking-footer">
          <button
            className={allFieldsFilled ? "active" : ""}
            onClick={() => setBookingStep(bookingStep + 1)}
            disabled={!allFieldsFilled}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default FourthStepBooking;
