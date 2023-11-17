import React from "react";
import "../styles/header.scss";

function LogInDropdown() {
  return (
    <div className="title-wrapper">
      <div>Profile</div>
      <div>
        <svg
          data-v-636226b5=""
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          className="w-5 lg:w-4"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.334.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM6.743 2.909a2.25 2.25 0 1 1 3.181 3.182 2.25 2.25 0 0 1-3.181-3.182Zm.09 5.841a3.75 3.75 0 0 0-3.75 3.75v2.75h10.501V12.5a3.75 3.75 0 0 0-3.75-3.75h-3Zm5.25 5V12.5a2.249 2.249 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25v1.25h7.5Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default LogInDropdown;
