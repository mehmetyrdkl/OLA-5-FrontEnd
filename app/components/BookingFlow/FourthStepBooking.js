import React from "react";
import "../../styles/BookingFlow/fourthStepBooking.scss";
import BookingOverview from "./BookingOverview";

function FourthStepBooking({ selectedRoom, selectedHotel, bookingDates }) {
  function formatShortDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className="step-wrapper">
      <div className="fourth-step-overview">
        <div className="hotel-info">
          <div className="hotel-info-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-building"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
              />
              <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
            </svg>
          </div>
          <div>
            <h2>{selectedHotel.name}</h2>
            <ul>
              <li>{selectedHotel.hotelAddress}</li>
              <li>
                {selectedHotel.hotelPostcode} {selectedHotel.hotelCity}
              </li>
              <li>{selectedHotel.hotelCountry}</li>
            </ul>
          </div>
        </div>
        <div className="guest-info">
          <div class="guest-info-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          </div>
          <div>
            <h2>Guest info</h2>
            <ul>
              <li>Fullname</li>
              <li>email</li>
              <li>phonenumber</li>
            </ul>
          </div>
        </div>
        <div className="date-info">
          <div className="date-info-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-[16px] w-[16px]"
            >
              <path
                fill="#161616"
                d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"
              ></path>
            </svg>
          </div>
          <div>
            <h2>Date</h2>
            <div>
              {formatShortDate(bookingDates.check_in)} -{" "}
              {formatShortDate(bookingDates.check_out)}
            </div>
          </div>
        </div>
      </div>
      <div className="payment-terms">
        <ul>
          <li>
            To guarantee your booking we will ask for your credit card
            information
          </li>
          <li>
            At reservation time we reserve the up to dkk. 500,- on your card
          </li>
          <li>
            You will only be charged, if you do not show up for your booking at
            the hotel
          </li>
          <li>
            You will not get charged unless otherwise stated. You will pay for
            your stay at the hotel
          </li>
        </ul>
      </div>
      <div className="payment-method">
        <button className="card">
          <span>Pay with card</span>
          <span className="check"></span>
        </button>
        <button className="mobilepay">
          <span>Pay with MobilePay</span>
          <span className="check"></span>
        </button>
        <div className="terms-and-conditions">
          <input type="check"></input>
          <label>I accept Comwell&apos;s terms and conditions</label>
        </div>
      </div>
      <div className="booking-footer">
        <button>Pay</button>
      </div>
      <BookingOverview selectedRoom={selectedRoom} />
    </div>
  );
}

export default FourthStepBooking;
