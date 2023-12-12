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
            <span className="uppercase !text-xs font-semibold opacity-50">
              room {index + 1}
            </span>
            <div className="overview-selected-room">
              <Image
                src={room.roomType.roomImage2}
                alt={room.roomType.type}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <div>{room.roomType.type}</div>
                <div className="opacity-50 text-sm leading-4 pt-1">
                  {packageTitles[room.package - 1]}
                </div>
              </div>
              <div className="roomPrice flex justify-between">
                {formattedPrice(room.roomPrice)} <p className="pl-1">kr.</p>
              </div>
            </div>
          </div>

          <ul className="mb-7">
            {room.addons.map((addon, index) => (
              <li key={index} className="flex justify-between ">
                <span className="!font-semibold !opacity-100">{addon}</span>
                <span className="!font-semibold !opacity-100">
                  {addon === "Babycot" ? 150 * numberOfDays : 200} kr.
                </span>
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
