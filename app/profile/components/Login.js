"use client";
import { useState, useEffect } from "react";
import useMyContext from "../../MyContext";

function handleInputChange() {
  console.log("wow");
}

function Login({ loginInfo, setLoginInfo }) {
  const [selectedField, setSelectedField] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const value = useMyContext();

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

  function handleLoginValidation(e) {
    e.preventDefault();
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

      function closeLogin() {
        setErrorMessage("");
        value.setLoggedIn(true);
        setLoginInfo({
          email: "",
          password: "",
        });
      }
      setTimeout(closeLogin, 1500);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setErrorMessage("Invalid email or password. Try again");
    }
  }

  return (
    <section className="profile-login">
      <h1>Log In</h1>
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
              (selectedField === "password" || loginInfo.password) && "active"
            }`}
          >
            Password
          </label>
        </div>
        <div className="dropwdown-text">
          <ul>
            <li>Forgot your password?</li>
            <li className="line-through">Reset Password</li>
            <li className="error-message">{errorMessage}</li>
          </ul>
        </div>
        <button className="active" onClick={(e) => handleLoginValidation(e)}>
          Log in
        </button>
      </form>
    </section>
  );
}

export default Login;
