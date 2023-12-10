"use client";
import { useState, useEffect } from "react";
import "../../styles/roomsSidebar.scss";
import useMyContext from "../../MyContext";

function RoomsSidebar({
  sidebar,
  setSidebar,
  setNumberOfGuests,
  setRooms,
  rooms,
}) {
  const value = useMyContext();
  const handleCloseRoomSidebar = () => {
    value.setSidebar(false);
  };
  const handleGuestNumber = () => {
    handleCloseRoomSidebar();
  };

  const addRoom = () => {
    const lastRoom = rooms[rooms.length - 1];
    const newRoomId = lastRoom ? lastRoom.id + 1 : 1;
    const newRoom = { id: newRoomId, numberOfGuests: 1, roomPrice: 0 };
    setRooms([...rooms, newRoom]); //[{ id: 1 },{ id: 2 }]
  };

  const removeRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
  };

  const handleGuest = (roomId, operation) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        if (operation === "add" && room.numberOfGuests < 5) {
          return { ...room, numberOfGuests: room.numberOfGuests + 1 };
        } else if (operation === "remove" && room.numberOfGuests > 1) {
          return { ...room, numberOfGuests: room.numberOfGuests - 1 };
        }
      }
      return room;
    });

    setRooms(updatedRooms);
  };

  return (
    <div
      className={
        value.sidebar === "rooms"
          ? "opened rooms-sidebar-container"
          : "rooms-sidebar-container"
      }
    >
      <div className="rooms-sidebar-wrapper">
        <button className="close-sidebar" onClick={handleCloseRoomSidebar}>
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
        <h2>Guests & Rooms</h2>
        {rooms.map((room, index) => {
          return (
            <div key={room.id} className="room">
              <div>
                <span className="room-title">ROOM {index + 1} </span>
              </div>
              <div className="nrAdults">
                <div>
                  <span>Adults</span>
                  <button
                    onClick={() => removeRoom(room.id)}
                    className={rooms.length === 1 ? "hidden" : ""}
                  >
                    Remove room
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleGuest(room.id, "remove")}
                    disabled={room.numberOfGuests === 1}
                    className={
                      room.numberOfGuests === 1
                        ? "decrementAdults disabled"
                        : "decrementAdults"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={room.numberOfGuests}
                  ></input>
                  <button
                    onClick={() => handleGuest(room.id, "add")}
                    className={
                      room.numberOfGuests === 4
                        ? "incrementAdults disabled"
                        : "incrementAdults"
                    }
                    disabled={room.numberOfGuests === 4}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="room-increment">
          <button onClick={addRoom} disabled={rooms.length === 4}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>{" "}
            Add room
          </button>
        </div>
        <div className="rooms-select-container border-t border-gray-200">
          <button
            onClick={handleGuestNumber}
            className="active rooms-select select"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
export default RoomsSidebar;
