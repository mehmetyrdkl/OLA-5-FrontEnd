import React from "react";
import "../../styles/BookingFlow/overview.scss";
import Image from "next/image";

function BookingOverview({ rooms, numberOfDays }) {
  function formattedPrice(price) {
    return price.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const packageTitles = [
    "Overnight stay with breakfast",
    "Blissful break",
    "Spadelight at two Comwell-hotels",
  ];

  return (
    <div className="booking-overview-wrapper">
      <h2>Overview</h2>
      {rooms.map((room, index) => (
        <div key={index} className="booking-selections-wrapper">
          <div>
            <span>room {index + 1}</span>
            <div className="overview-selected-room">
              <Image
                src={room.roomType.roomImage}
                alt={room.roomType.type}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <div>{room.roomType.type}</div>
                <div>{packageTitles[room.package - 1]}</div>
              </div>
              <div className="roomPrice">
                {formattedPrice(room.roomPrice)} kr.
              </div>
            </div>
          </div>
          <ul>
            {room.addons.map((addon, index) => (
              <li key={index}>
                <span>{addon}</span>
                <span>{addon === "Babycot" ? 150 * numberOfDays : 200}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="overview-total-price py-5 border-y border-gray-200 flex justify-between items-center w-full">
        <p>Total</p>
        <p>
          {formattedPrice(
            rooms.reduce((total, room) => total + room.roomPrice, 0)
          )}{" "}
          kr.
        </p>
      </div>
    </div>
  );
}

export default BookingOverview;
