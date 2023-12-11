import React from "react";
import "../../styles/BookingFlow/thirdStepBooking.scss";

function ThirdStepBooking({
  setAddons,
  addons,
  setBookingStep,
  bookingStep,
  numberOfDays,
  setTotalPrice,
  totalPrice,
  rooms,
  setRooms,
  roomBookingStep,
  setRoomBookingStep,
  setRoomPackage,
  roomPackage,
  setSelectedRoom,
  selectedRoom,
}) {
  function addItem(newItem, price) {
    const updatedItems = [...addons, newItem];
    setAddons(updatedItems);
    setTotalPrice(totalPrice + price);
  }
  function removeItem(itemToRemove, price) {
    const updatedItems = addons.filter((item) => item !== itemToRemove);
    setAddons(updatedItems);
    setTotalPrice(totalPrice - price);
  }

  function handleAddons(item, price) {
    if (addons.includes(item)) {
      removeItem(item, price);
    } else {
      addItem(item, price);
    }
  }

  function formattedPrice(price) {
    return price.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  function handleSteps() {
    // save packages and addons to another state
    const updatedRooms = [...rooms];
    updatedRooms[roomBookingStep - 1] = {
      ...updatedRooms[roomBookingStep - 1],
      package: roomPackage,
      addons: addons,
      roomType: selectedRoom,
      roomPrice: totalPrice,
      fullName: "",
      email: "",
      phoneNumber: "",
    };
    setRooms(updatedRooms);
    // reset states for selectedRoom, totalPrice, roompackage, addons
    setTotalPrice(0);
    setAddons([]);
    setSelectedRoom({});
    setRoomPackage(1);
    // set packages to an empty string
    // set addons to an empty array
    if (roomBookingStep === rooms.length) {
      setBookingStep(bookingStep + 1);
    } else {
      setRoomBookingStep(roomBookingStep + 1);
      setBookingStep(0);
    }
  }

  return (
    <>
      <div className="step-wrapper h-full">
        <div className="addons-wrapper">
          <h2>Select addons</h2>
          <div className="addons">
            <button
              className={addons.includes("Babycot") ? "selected" : ""}
              onClick={() => handleAddons("Babycot", 150 * numberOfDays)}
            >
              <div className="addon-head-par">
                <span className="addon-heading">Babycot</span>
                <span className="addon-paragraph">Babycot per night</span>
              </div>
              <span className="addon-price">
                {formattedPrice(150 * numberOfDays)} kr.
              </span>
              <div
                className={
                  addons.includes("Babycot") ? "checkmark chosen" : "checkmark"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
            </button>
            <button
              className={addons.includes("Early check-in") ? "selected" : ""}
              onClick={() => handleAddons("Early check-in", 200)}
            >
              <div className="addon-head-par">
                <span className="addon-heading">Early check-in</span>
                <span className="addon-paragraph">
                  Check in 2 hours earlier
                </span>
              </div>
              <span className="addon-price">200,00 kr.</span>
              <div
                className={
                  addons.includes("Early check-in")
                    ? "checkmark chosen"
                    : "checkmark"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
            </button>
            <button
              className={addons.includes("Late departure") ? "selected" : ""}
              onClick={() => handleAddons("Late departure", 200)}
            >
              <div className="addon-head-par">
                <span className="addon-heading">Late departure</span>
                <span className="addon-paragraph">Check out at 12am</span>
              </div>
              <span className="addon-price">200,00 kr.</span>
              <div
                className={
                  addons.includes("Late departure")
                    ? "checkmark chosen"
                    : "checkmark"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="booking-footer">
        <button className="active" onClick={handleSteps}>
          {addons.length !== 0 ? "Next" : "Continue without addons"}
        </button>
      </div>
    </>
  );
}

export default ThirdStepBooking;
