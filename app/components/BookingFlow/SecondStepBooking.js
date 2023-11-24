import React from "react";
import "../../styles/BookingFlow/secondStepBooking.scss";
import Image from "next/image";

function SecondStepBooking({
  selectedRoom,
  setBookingStep,
  bookingStep,
  totalPrice,
}) {
  const formattedPrice = totalPrice.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className="flex gap-4 items-center justify-center pointer-events-none">
        <div>
          <Image
            src={selectedRoom.roomImage}
            alt={selectedRoom.type}
            width={500}
            height={200}
            className="rounded-xl"
          />
        </div>
        <div>
          <Image
            src={selectedRoom.roomImage2}
            alt={selectedRoom.type}
            width={500}
            height={200}
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="step-wrapper">
        <div className="selected-room">
          <div className="selected-room-title">
            <h2>{selectedRoom.type}</h2>
            <span className="whitespace-pre rounded-full px-2.5 py-1.5 text-white">
              {selectedRoom.size} m<sup>2</sup>
            </span>
          </div>
          <div className="selected-room-description">
            <h4>Facilities</h4>
            {selectedRoom.facilities && (
              <ul className="selected-room-facilities-list">
                {selectedRoom.facilities.map((facility, index) => (
                  <li key={index} className="selected-room-facility-item">
                    <span className="selected-room-facility-separator"></span>
                    {facility}
                  </li>
                ))}
              </ul>
            )}
            <h4>Description</h4>
            <p>{selectedRoom.description}</p>
          </div>
        </div>
      </div>
      <div className="booking-footer">
        <div>{formattedPrice} kr.</div>
        <button
          className="active"
          onClick={() => setBookingStep(bookingStep + 1)}
        >
          Select{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default SecondStepBooking;
