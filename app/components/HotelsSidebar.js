"use client";
import { useState, useEffect } from "react";
import "../styles/hotelsSidebar.scss";

function HotelsSidebar() {
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels"); // Replace with your API endpoint
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

  return (
    <div>
      <h1>List of Hotels:</h1>
      <div>
        {hotelData.map((hotel) => (
          <div key={hotel._id}>
            <p>{hotel.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HotelsSidebar;
