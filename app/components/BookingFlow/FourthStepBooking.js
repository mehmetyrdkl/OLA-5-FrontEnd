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

  const [inputValidity, setInputValidity] = useState(
    rooms.map(() => ({ fullName: true, email: true, phoneNumber: true }))
  );
  // useEffect(() => {
  //   // Generate initial inputValidity state based on the number of rooms
  //   setInputValidity(
  //     rooms.map(() => ({ fullName: true, email: true, phoneNumber: true }))
  //   );
  // }, [rooms]); // Update inputValidity whenever rooms change

  // ~~~~~~~~~

  const handleInputChange = (roomId) => (event) => {
    const { name, value } = event.target;

    // Update the local data temporarily
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return { ...room, [name]: value };
      }
      return room;
    });

    // const updatedValidity = inputValidity.map((validity, index) => {
    //   if (updatedRooms[index].id === roomId) {
    //     return {
    //       ...validity,
    //       [name]:
    //         (name === "fullName" && value.trim() !== "") ||
    //         (name === "email" && value.trim() !== "") ||
    //         (name === "phoneNumber" && value.trim() !== ""),
    //     };
    //   }
    //   return validity;
    // });

    setRooms(updatedRooms);
    // setInputValidity(updatedValidity);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const numberRegex = /[0-9]{8}/;

  const checkValidation = () => {
    const updatedValidity = rooms.map((room) => ({
      fullName: room.fullName.trim().includes(" "),
      email: emailRegex.test(room.email.trim()),
      phoneNumber: numberRegex.test(room.phoneNumber.trim()),
    }));
    setInputValidity(updatedValidity);

    const allInputsValid = inputValidity.every((validity) =>
      Object.values(validity).every((value) => value === true)
    );
    if (allInputsValid) {
      setBookingStep(bookingStep + 1);
    }
  };

  // function checkValidation() {
  //   // on submit
  //   // change border color to red
  //   // change label to to red
  //   // display a red error text underneath each input
  //   // on focus
  //   // change label back to black
  //   // if() {
  //   //   setBookingStep(bookingStep + 1)
  //   // }
  // }

  // function handleBlur(e) {
  //   // if the value is ""
  //   if (e.target.value === "") {
  //     setSelectedField(null);
  //   } else {
  //     // if field is still invalid, turn back to red
  //   }
  // }

  // function handleFocus(e, fullNameRoomId) {
  //   // if focused after being red, change to black
  //   setSelectedField(fullNameRoomId);
  // }

  return (
    <>
      <div className="wrapper-with-overview heading-margin">
        <div className="step-wrapper">
          <h2>Guest Information</h2>
          {rooms.map((room, index) => (
            <form key={index} className="guest-info-form">
              <h3 className="mb-4 text-xs opacity-60">ROOM {index + 1}</h3>
              <div className="input-wrapper">
                <input
                  className={inputValidity[index].fullName ? "" : "input-error"}
                  type="text"
                  name="fullName"
                  onFocus={() => setSelectedField("fullName" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={handleInputChange(room.id)}
                  value={room.fullName}
                />
                <label
                  className={`input-label ${
                    (selectedField === "fullName" + room.id || room.fullName) &&
                    "active"
                  } ${
                    inputValidity[index].fullName ? "" : "input-label-error"
                  }`}
                >
                  Full Name
                </label>
                <div
                  className={
                    inputValidity[index].fullName ? "hidden" : "error-message"
                  }
                >
                  Make sure to fill in your full name
                </div>
              </div>
              <div className="input-wrapper">
                <input
                  className={inputValidity[index].email ? "" : "input-error"}
                  type="email"
                  name="email"
                  onFocus={() => setSelectedField("email" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={handleInputChange(room.id)}
                  value={room.email}
                />
                <label
                  className={`input-label ${
                    (selectedField === "email" + room.id || room.email) &&
                    "active"
                  } ${inputValidity[index].email ? "" : "input-label-error"}`}
                >
                  Email
                </label>
                <div
                  className={
                    inputValidity[index].email ? "hidden" : "error-message"
                  }
                >
                  Please use a valid email address
                </div>
              </div>
              <div className="input-wrapper">
                <input
                  className={
                    inputValidity[index].phoneNumber ? "" : "input-error"
                  }
                  type="tel"
                  name="phoneNumber"
                  maxLength={10}
                  onFocus={() => setSelectedField("phoneNumber" + room.id)}
                  onBlur={() => setSelectedField(null)}
                  onChange={handleInputChange(room.id)}
                  value={room.phoneNumber}
                />
                <label
                  className={`input-label ${
                    (selectedField === "phoneNumber" + room.id ||
                      room.phoneNumber) &&
                    "active"
                  } ${
                    inputValidity[index].phoneNumber ? "" : "input-label-error"
                  }`}
                >
                  Phone Number
                </label>
                <div
                  className={
                    inputValidity[index].phoneNumber
                      ? "hidden"
                      : "error-message"
                  }
                >
                  Please use a valid phone number
                </div>
              </div>
            </form>
          ))}
        </div>

        <BookingOverview rooms={rooms} numberOfDays={numberOfDays} />
        <div className="booking-footer">
          <button className="active" onClick={checkValidation}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default FourthStepBooking;
