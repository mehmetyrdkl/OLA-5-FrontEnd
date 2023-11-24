import { useState, useEffect } from "react";
import "../../styles/signUpSidebar.scss";
import useMyContext from "@/app/MyContext";

function SignUpSidebar() {
  const value = useMyContext();
  const [selectedField, setSelectedField] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    fullname: "",
    email: "",
    zipcode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const {
      fullname,
      email,
      zipcode,
      phoneNumber,
      password,
      confirmPassword,
      gender,
      birthdate,
    } = signUpInfo;

    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    const hasBirthdayOccurred =
      currentDate.getMonth() > birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() >= birthDateObj.getDate());

    // If birthday hasn't occurred yet, decrement age
    if (!hasBirthdayOccurred) {
      age--;
    }

    // Check if the user is at least 18 years old
    const isAdult = age >= 18;

    const fieldsFilled =
      fullname.trim() !== "" &&
      email.trim().includes("@") &&
      zipcode.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      password.length >= 6 &&
      confirmPassword === password &&
      gender !== "" &&
      isAdult &&
      termsAgreed;
    setAllFieldsFilled(fieldsFilled);
  }, [signUpInfo, termsAgreed]);

  function handleCloseSignUpSidebar() {
    value.setSidebar(false);
  }

  async function signUp() {
    const data = {
      fullName: signUpInfo.fullname,
      email: signUpInfo.email,
      zipcode: signUpInfo.zipcode,
      phoneNumber: signUpInfo.phoneNumber,
      password: signUpInfo.password,
      gender: signUpInfo.gender,
      birthdate: signUpInfo.birthdate,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
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
      // value.setLoginToken(responseData);
      // Handle the response data as needed
      // console.log("Response data:", responseData);
      console.log("registered!");
      // Display checkmark
      // setLoginSuccess(true);
      // setLoggedIn(true);
      // hide dropdown-wrapper after 1.5s
      // function closeLogin() {
      //   value.setSidebar("");
      // }
      // setTimeout(closeLogin, 1500);
      value.setSidebar("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div
      className={
        value.sidebar === "signUp"
          ? "opened sidebar-container"
          : "sidebar-container"
      }
    >
      <div className="signup-sidebar-wrapper">
        <button className="close-sidebar" onClick={handleCloseSignUpSidebar}>
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
        <div className="signup-title">
          <h2>Sign up for Comwell Club</h2>
          <p>
            Become a member of Comwell Club for free and earn points everytime
            you stay with us. You&apos;ll also receive 25 points when you sign
            up.
          </p>
        </div>
        <form>
          {/* Fullname */}
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              onFocus={() => setSelectedField("fullname")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.fullname}
            />
            <label
              className={`input-label ${
                (selectedField === "fullname" || signUpInfo.fullname) &&
                "active"
              }`}
            >
              Full Name
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              onFocus={() => setSelectedField("email")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.email}
            />
            <label
              className={`input-label ${
                (selectedField === "email" || signUpInfo.email) && "active"
              }`}
            >
              Email
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              name="zipcode"
              onFocus={() => setSelectedField("zipcode")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.zipcode}
            />
            <label
              className={`input-label ${
                (selectedField === "zipcode" || signUpInfo.zipcode) && "active"
              }`}
            >
              Zip Code
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="tel"
              name="phoneNumber"
              onFocus={() => setSelectedField("phoneNumber")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.phoneNumber}
            />
            <label
              className={`input-label ${
                (selectedField === "phoneNumber" || signUpInfo.phoneNumber) &&
                "active"
              }`}
            >
              Phone
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              onFocus={() => setSelectedField("password")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.password}
            />
            <label
              className={`input-label ${
                (selectedField === "password" || signUpInfo.password) &&
                "active"
              }`}
            >
              Password
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              name="confirmPassword"
              onFocus={() => setSelectedField("confirmPassword")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.confirmPassword}
            />
            <label
              className={`input-label ${
                (selectedField === "confirmPassword" ||
                  signUpInfo.confirmPassword) &&
                "active"
              }`}
            >
              Confirm Password
            </label>
          </div>
          <div className="input-wrapper">
            <select
              name="gender"
              onChange={handleInputChange}
              value={signUpInfo.gender}
            >
              <option value="" className="hidden"></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label
              className={`input-label ${
                (selectedField === "gender" || signUpInfo.gender) && "active"
              }`}
            >
              Gender
            </label>
          </div>
          <div className="input-wrapper">
            <input
              type="date"
              name="birthdate"
              onFocus={() => setSelectedField("birthdate")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.birthdate}
            />
            <label className="input-label active">Birthdate</label>
          </div>
          <div className="terms-and-conditions">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={() => setTermsAgreed((prevState) => !prevState)}
            ></input>
            <label>Accept terms and conditions for Comwell Club</label>
          </div>
        </form>
        <div className="signup-select-container border-t border-gray-200">
          <button
            className={allFieldsFilled ? "active" : ""}
            disabled={!allFieldsFilled}
            onClick={() => signUp()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpSidebar;
