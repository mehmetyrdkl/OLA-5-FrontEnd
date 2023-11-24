import { useState, useEffect } from "react";
import "../../styles/bookingSidebar.scss";
import FirstStepBooking from "../BookingFlow/FirstStepBooking";
import SecondStepBooking from "../BookingFlow/SecondStepBooking";
import ThirdStepBooking from "../BookingFlow/ThirdStepBooking";
import FourthStepBooking from "../BookingFlow/FourthStepBooking";
import FinalStepBooking from "../BookingFlow/FinalStepBooking";
import useMyContext from "../../MyContext";

function BookingSidebar({
  sidebar,
  setSidebar,
  bookingDates,
  numberOfGuests,
  selectedHotel,
}) {
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    function updateNumberOfDays() {
      const checkInDate = new Date(bookingDates.check_in);
      const checkOutDate = new Date(bookingDates.check_out);
      const timeDifference = checkOutDate - checkInDate;

      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (days === 0) {
        setNumberOfDays(days + 1);
      } else {
        setNumberOfDays(days);
      }
    }

    updateNumberOfDays();
  }, [bookingDates, setNumberOfDays]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState({});
  const value = useMyContext();
  const [bookingStep, setBookingStep] = useState(0);
  const handleCloseBookingSidebar = () => {
    if (bookingStep === 0) {
      value.setSidebar(false);
      setTotalPrice(0);
    } else {
      setBookingStep(bookingStep - 1);
    }
  };
  function formatShortDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
    });
  }

  useEffect(() => {
    async function prefill() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle the case when token is not available
          return;
        }

        const response = await fetch(
          `http://localhost:8080/auth/${localStorage.getItem("user_id")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Handle different types of errors (e.g., unauthorized access)
          if (response.status === 401) {
            // Handle unauthorized access
            // Maybe clear the token and redirect to login
            localStorage.removeItem("token");
          }
          throw new Error("Network response was not ok.");
        }

        const responseData = await response.json();
        setFetchedUserInfo(responseData);
        // Handle the response data as needed
        // console.log("Response data:", responseData.fullName);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    prefill();
  }, []); // Add localStorage.getItem("token") to the dependency array

  const [fetchedUserInfo, setFetchedUserInfo] = useState({});

  const [userInfo, setUserInfo] = useState({
    _id: "1234567890",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  return (
    <div
      className={
        value.sidebar === "booking"
          ? "opened booking-sidebar-container"
          : "booking-sidebar-container"
      }
    >
      <div className="booking-sidebar-wrapper">
        <div className={bookingStep === 4 ? "hidden" : "header-booking"}>
          <div className="close-booking" onClick={handleCloseBookingSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div className="date-booking">
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
            <div className="check-in-out">
              <span>
                {formatShortDate(bookingDates.check_in)} -{" "}
                {formatShortDate(bookingDates.check_out)}
              </span>
            </div>
          </div>
          <div className="room-person-booking">
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
            <span>
              1 Room,{" "}
              {numberOfGuests > 1
                ? numberOfGuests + " Persons"
                : numberOfGuests + " Person"}
            </span>
          </div>
          <div className="location-booking">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span>{selectedHotel.location}</span>
          </div>
          <div className="total-price">
            {totalPrice.toLocaleString("da-DK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            kr.
          </div>
        </div>
        {/* Choose room */}
        {bookingStep === 0 && (
          <FirstStepBooking
            selectedHotel={selectedHotel}
            setSelectedRoom={setSelectedRoom}
            setBookingStep={setBookingStep}
            bookingStep={bookingStep}
            numberOfDays={numberOfDays}
            setTotalPrice={setTotalPrice}
          />
        )}
        {/* Room details */}
        {bookingStep === 1 && (
          <SecondStepBooking
            selectedRoom={selectedRoom}
            setBookingStep={setBookingStep}
            bookingStep={bookingStep}
            totalPrice={totalPrice}
          />
        )}
        {/* Guest information */}
        {bookingStep === 2 && (
          <ThirdStepBooking
            selectedRoom={selectedRoom}
            setBookingStep={setBookingStep}
            bookingStep={bookingStep}
            totalPrice={totalPrice}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            fetchedUserInfo={fetchedUserInfo}
          />
        )}
        {/* Guest payment */}
        {bookingStep === 3 && (
          <FourthStepBooking
            selectedRoom={selectedRoom}
            setBookingStep={setBookingStep}
            bookingStep={bookingStep}
            selectedHotel={selectedHotel}
            bookingDates={bookingDates}
            totalPrice={totalPrice}
            userInfo={userInfo}
          />
        )}
        {/* Booking success */}
        {bookingStep === 4 && (
          <FinalStepBooking
            selectedRoom={selectedRoom}
            totalPrice={totalPrice}
            bookingDates={bookingDates}
            numberOfGuests={numberOfGuests}
            selectedHotel={selectedHotel}
            setBookingStep={setBookingStep}
            bookingStep={bookingStep}
          />
        )}
        {/* footer bar */}
        {/* {bookingStep > 0 && (
          <button onClick={() => setBookingStep(bookingStep - 1)}>
            Previous
          </button>
        )}
        {bookingStep < 4 && (
          <button onClick={() => setBookingStep(bookingStep + 1)}>Next</button>
        )} */}
      </div>
    </div>
  );
}

export default BookingSidebar;
