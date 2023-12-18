import React, { useEffect, useState } from "react";
import "../../styles/BookingFlow/fourthStepBooking.scss";
import BookingOverview from "./BookingOverview";
import useMyContext from "../../MyContext";

function FourthStepBooking({
  setBookingStep,
  bookingStep,
  rooms,
  setRooms,
  numberOfDays,
  setFourthStepContinueClicked,
  fourthStepContinueClicked,
}) {
  const value = useMyContext();
  useEffect(() => {
    // If fetchedUserInfo exists, update userInfo with its data
    if (value.fetchedUserInfo.fullName) {
      const updatedRooms = [...rooms];
      updatedRooms[0] = {
        ...updatedRooms[0],
        user_id: value.fetchedUserInfo._id,
        fullName: value.fetchedUserInfo.fullName,
        email: value.fetchedUserInfo.email,
        phoneNumber: value.fetchedUserInfo.phoneNumber,
      };
      setRooms(updatedRooms);
    }
  }, [value.fetchedUserInfo]);

  const [selectedField, setSelectedField] = useState(null);
  const [invalidInputs, setInvalidInputs] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /[0-9]{8}/;

  // Add input values to rooms
  const handleInputChange = (event, roomId) => {
    const { name, value } = event.target;

    setRooms((prevInfo) => {
      return prevInfo.map((room) => {
        if (room.id === roomId) {
          return { ...room, [name]: value };
        }
        return room;
      });
    });
  };

  function validate() {
    setFourthStepContinueClicked(true);

    if (areAllInputsValid()) {
      setBookingStep(bookingStep + 1);
    }
  }

  function checkValidation(field, value) {
    if (field === "fullName") {
      return value.trim().includes(" ");
    } else if (field === "email") {
      return emailRegex.test(value.trim());
    } else if (field === "phoneNumber") {
      return numberRegex.test(value.trim());
    }
  }

  const fieldsToValidate = ["fullName", "email", "phoneNumber"];
  function areAllInputsValid() {
    let isValid = true;
    rooms.forEach((room) => {
      fieldsToValidate.forEach((field) => {
        if (!checkValidation(field, room[field])) {
          isValid = false;
        }
      });
    });
    return isValid;
  }

  return (
    <>
      <div className="wrapper-with-overview heading-margin">
        <div className="step-wrapper">
          <h2>Guest Information</h2>
          {rooms.map((room, index) => (
            <form key={index} className="guest-info-form">
              <h3 className="mb-4 text-xs opacity-60">ROOM {index + 1}</h3>
              {/* FULL NAME */}
              <div className="input-wrapper">
                <input
                  className={
                    fourthStepContinueClicked &&
                    !checkValidation("fullName", room.fullName)
                      ? "input-error"
                      : ""
                  }
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
                  } ${
                    fourthStepContinueClicked &&
                    !checkValidation("fullName", room.fullName)
                      ? "input-label-error"
                      : ""
                  }`}
                >
                  Full Name
                </label>
                <div
                  className={`error-message
                    ${
                      fourthStepContinueClicked &&
                      !checkValidation("fullName", room.fullName)
                        ? ""
                        : "hidden"
                    }`}
                >
                  *Make sure to fill in your full name
                </div>
              </div>
              {/* EMAIL */}
              <div className="input-wrapper">
                <input
                  className={
                    fourthStepContinueClicked &&
                    !checkValidation("email", room.email)
                      ? "input-error"
                      : ""
                  }
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
                  } ${
                    fourthStepContinueClicked &&
                    !checkValidation("email", room.email)
                      ? "input-label-error"
                      : ""
                  }`}
                >
                  Email
                </label>
                <div
                  className={`error-message
                    ${
                      fourthStepContinueClicked &&
                      !checkValidation("email", room.email)
                        ? ""
                        : "hidden"
                    }`}
                >
                  *Please use a valid email address
                </div>
              </div>
              {/* PHONENUMBER */}
              <div className="input-wrapper">
                <input
                  className={
                    fourthStepContinueClicked &&
                    !checkValidation("phoneNumber", room.phoneNumber)
                      ? "input-error"
                      : ""
                  }
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
                  } ${
                    fourthStepContinueClicked &&
                    !checkValidation("phoneNumber", room.phoneNumber)
                      ? "input-label-error"
                      : ""
                  }`}
                >
                  Phone number
                </label>
                <div
                  className={`error-message
                    ${
                      fourthStepContinueClicked &&
                      !checkValidation("phoneNumber", room.phoneNumber)
                        ? ""
                        : "hidden"
                    }`}
                >
                  *Please use a valid phone number
                </div>
              </div>
            </form>
          ))}
        </div>
        <BookingOverview rooms={rooms} numberOfDays={numberOfDays} />
        <div className="booking-footer">
          <button className="active" onClick={validate}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default FourthStepBooking;
