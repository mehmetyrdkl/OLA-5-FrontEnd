import React from "react";
import "../../styles/BookingFlow/firstStepBooking.scss";
import Image from "next/image";

function FirstStepBooking({ selectedHotel }) {
  console.log(selectedHotel);
  return (
    <div className="step-wrapper">
      <h2>Choose Room</h2>
      <ul className="booking-rooms-packages">
        <li>Rooms</li>
        <li>Packages</li>
      </ul>
      <div className="booking-rooms-container">
        {selectedHotel.name &&
          selectedHotel.rooms.map((room) => (
            <div key={room._id} className="room-option-wrapper">
              <div className="booking-room-image">
                <img src={room.roomImage} alt={room.type} />
                <div className="booking-room-size">{room.size}</div>
              </div>
              <div className="booking-room-details">
                <h3>{room.type}</h3>
                {/* Add other room details you want to display */}
              </div>
            </div>
          ))}
        <div>Wow</div>
      </div>
    </div>
  );
}

export default FirstStepBooking;
