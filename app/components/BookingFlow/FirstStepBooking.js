import React from "react";
import "../../styles/BookingFlow/firstStepBooking.scss";
import Image from "next/image";

function FirstStepBooking({
  selectedHotel,
  setSelectedRoom,
  setBookingStep,
  bookingStep,
  numberOfDays,
  setTotalPrice,
}) {
  function handleRoomSelection(room) {
    setBookingStep(bookingStep + 1);
    setSelectedRoom(room);
    setTotalPrice(room.price * numberOfDays);
  }

  return (
    <div className="step-wrapper step1">
      <h2>Choose Room</h2>
      <ul className="booking-rooms-packages">
        <li>Rooms</li>
        <li>Packages</li>
      </ul>
      <div className="booking-rooms-container">
        {selectedHotel.name &&
          selectedHotel.rooms.map((room) => (
            <div
              onClick={() => handleRoomSelection(room)}
              key={room._id}
              className="room-option-wrapper"
            >
              <div className="booking-room-image">
                <Image
                  src={room.roomImage}
                  alt={room.type}
                  width={374}
                  height={244}
                />
                <div className="booking-room-size">
                  {room.size} m<sup>2</sup>
                </div>
              </div>
              <div className="booking-room-details">
                <h3>{room.type}</h3>
                <p>{room.description.split(".")[0] + "."}</p>
                <ul className="facilities">
                  {room.facilities.map((fac, index) => {
                    if (index < 5) {
                      return <li key={index}>{fac}</li>;
                    } else if (index === 5) {
                      const remainingCount = room.facilities.length - 5;
                      return <li key={index}>+{remainingCount} more</li>;
                    }
                    return null;
                  })}
                </ul>
                <div className="room-price">
                  {(room.price * numberOfDays).toLocaleString("da-DK", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  kr.
                </div>
                {/* Add other room details you want to display */}
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FirstStepBooking;
