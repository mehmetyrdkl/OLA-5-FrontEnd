"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../../styles/hotelsSidebar.scss";
import useMyContext from "../../MyContext";

function HotelsSidebar({ setSelectedHotel }) {
  const value = useMyContext();
  const [hotelData, setHotelData] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [chosenHotel, setChosenHotel] = useState("");
  const regions = ["All", "Zealand", "Funen", "Jutland"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels");
        if (response.ok) {
          const jsonData = await response.json();
          setHotelData(jsonData);
          console.log(jsonData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (index, region) => {
    setActiveButton(index);
    setSelectedRegion(region === "All" ? "All" : regions[index]);
  };

  const handleSelectHotel = () => {
    setSelectedHotel(hotelData.find((hotel) => hotel.name === chosenHotel));
    handleCloseSidebar();
  };

  const filteredHotels =
    selectedRegion === "All"
      ? hotelData
      : hotelData.filter((hotel) => hotel.region === selectedRegion);

  const handleCloseSidebar = () => {
    value.setSidebar(false);
  };

  return (
    <div
      className={
        value.sidebar === "hotel"
          ? "opened sidebar-container"
          : "sidebar-container"
      }
    >
      <div className="hotels-sidebar-wrapper">
        <button className="close-sidebar" onClick={handleCloseSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <h2>Hotels</h2>
        <ul className="regions-container border-b border-gray-200">
          {regions.map((region, index) => (
            <li
              onClick={() => handleFilter(index)}
              className={activeButton === index ? "active-filter" : ""}
              key={index}
            >
              {region}
            </li>
          ))}
        </ul>
        <ul className="hotels-container">
          {filteredHotels.map((hotel) => (
            <li key={hotel._id}>
              <button
                onClick={() => setChosenHotel(hotel.name)}
                className={chosenHotel === hotel.name ? "selected" : ""}
              >
                <div>
                  <Image
                    src={hotel.hotelImage}
                    alt={hotel.name}
                    width="100"
                    height="100"
                  />
                </div>
                <div>
                  <span>{hotel.name}</span>
                  <span>{hotel.location}</span>
                </div>
                <div className={chosenHotel === hotel.name ? "chosen" : ""}>
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
            </li>
          ))}
        </ul>
        <div className="hotel-select-container border-t border-gray-200">
          <button
            onClick={handleSelectHotel}
            className={
              chosenHotel !== ""
                ? "active hotel-select search"
                : "hotel-select search"
            }
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
export default HotelsSidebar;
