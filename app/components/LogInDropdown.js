import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/loginDropdown.scss";
import useMyContext from "../MyContext";
import { redirect } from "next/dist/server/api-utils";

function LogInDropdown() {
  const [selectedField, setSelectedField] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [listenersActive, setListenersActive] = useState(true);
  const value = useMyContext();
  const dropdownRef = useRef(null); // Reference to the parent div

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { email, password } = loginInfo;
    const fieldsFilled =
      email.trim().includes("@") && password.trim().length >= 6;
    setAllFieldsFilled(fieldsFilled);
  }, [loginInfo]);

  useEffect(() => {
    if (value.sidebar === "login") {
      setListenersActive(true);
    } else {
      setListenersActive(false);
    }
  }, [value.sidebar]);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        listenersActive
      ) {
        value.setSidebar("");
      }
    },
    [value, listenersActive]
  );

  useEffect(() => {
    if (listenersActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, listenersActive]);

  function handleLoginValidation() {
    if (!emailRegex.test(loginInfo.email)) {
      setErrorMessage("Please use a valid email address");
    } else if (!loginInfo.password) {
      setErrorMessage("You need to fill in a password");
    } else if (loginInfo.password.length < 6) {
      setErrorMessage("Invalid email or password. Try again");
    } else {
      login();
    }
  }

  async function login() {
    const data = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      value.setLoginToken(responseData.access_token);
      value.setFullName(responseData.fullName);
      const token = responseData.access_token;
      const userID = responseData.user_id;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userID);

      setLoginSuccess(true);

      function closeLogin() {
        setErrorMessage("");
        value.setLoggedIn(true);
      }
      setTimeout(closeLogin, 1500);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setErrorMessage("Invalid email or password. Try again");
    }
  }

  function openSignUp() {
    if (!value.loggedIn) {
      setListenersActive(false);
      value.setSidebar("signUp");
    }
  }

  function signOut() {
    value.setLoggedIn(false);
    setLoginSuccess(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setLoginInfo({
      email: "",
      password: "",
    });
    value.setFetchedUserInfo({});
    value.setFullName("");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    if (token) {
      checkLogin();
    }
    async function checkLogin() {
      try {
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
          if (response.status === 401) {
            localStorage.removeItem("token");
          }

          throw new Error("Network response was not ok.");
        } else {
          const responseData = await response.json();
          // call another fetch request
          value.setFullName(responseData.fullName);
          value.setLoggedIn(true);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  }, []);

  return (
    <div
      className={
        value.sidebar === "login"
          ? "opened dropdown-wrapper"
          : "dropdown-wrapper"
      }
    >
      <div className="dropdown-container" ref={dropdownRef}>
        {!value.loggedIn ? (
          <div>
            <form>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  onFocus={() => setSelectedField("email")}
                  onBlur={() => setSelectedField(null)}
                  onChange={handleInputChange}
                  value={loginInfo.email}
                ></input>
                <label
                  htmlFor="email"
                  className={`input-label ${
                    (selectedField === "email" || loginInfo.email) && "active"
                  }`}
                >
                  Email
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  onFocus={() => setSelectedField("password")}
                  onBlur={() => setSelectedField(null)}
                  onChange={handleInputChange}
                  value={loginInfo.password}
                ></input>
                <label
                  htmlFor="password"
                  className={`input-label ${
                    (selectedField === "password" || loginInfo.password) &&
                    "active"
                  }`}
                >
                  Password
                </label>
              </div>
            </form>
            <div className="dropwdown-text">
              <ul>
                <li>Forgot your password?</li>
                <li className="line-through">Reset Password</li>
                <li className="error-message">{errorMessage}</li>
                <li>Don&apos;t have an account?</li>
                <li
                  className={
                    value.loggedIn ? "signup-link inactive" : "signup-link"
                  }
                  onClick={() => openSignUp()}
                >
                  Sign up for Comwell Club
                </li>
              </ul>
            </div>
            <div className="login-wrapper">
              <button
                className="active"
                onClick={() => handleLoginValidation()}
              >
                Log in
              </button>
            </div>
            <div
              className={
                loginSuccess
                  ? "logged-in-checkmark success-login"
                  : "logged-in-checkmark"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                fill="black"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="logged-in-container">
            <ul>
              <li>
                <a href="/profile">Comwell Club</a>
              </li>
              <li className="line-through">Frequently Asked QUestions</li>
              <li className="border-b border-gray-200 pb-4 line-through">
                Club Offers
              </li>
              <li className="line-through">Notifications</li>
              <li className="border-b border-gray-200 pb-4 line-through">
                Profile Settings
              </li>
            </ul>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogInDropdown;
