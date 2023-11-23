import React from "react";
import "../../styles/BookingFlow/overview.scss";
import Image from "next/image";

function BookingOverview({ selectedRoom, totalPrice }) {
  const formattedPrice = totalPrice.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="booking-overview-wrapper">
      <h2>Overview</h2>
      <div className="booking-selections-wrapper">
        <span>room 1</span>
        <div className="overview-selected-room">
          <Image
            src={selectedRoom.roomImage}
            alt={selectedRoom.type}
            width={64}
            height={64}
            className="rounded"
          />
          <div>{selectedRoom.type}</div>
          <div>{formattedPrice} kr.</div>
        </div>
        <div className="overview-total-price py-5 border-y border-gray-200 flex justify-between items-center w-full">
          <p>Total</p>
          <p>{formattedPrice} kr.</p>
        </div>
      </div>
    </div>
  );
}

export default BookingOverview;
