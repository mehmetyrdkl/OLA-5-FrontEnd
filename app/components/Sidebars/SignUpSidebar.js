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
  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    email: false,
    zipcode: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
    gender: false,
    birthdate: false,
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [name]: value,
    }));
    setEmailInUse(false);
  };

  function handleCloseSignUpSidebar() {
    value.setSidebar(false);
  }

  const zipcodeRegex = /\d{4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /[0-9]{8}/;

  function checkBirthdate(birthdate) {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const isAdult = age >= 18;
    const hasBirthdayOccurred =
      currentDate.getMonth() > birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() >= birthDateObj.getDate());

    if (!hasBirthdayOccurred) {
      age--;
    }
    return isAdult;
  }

  async function signUp() {
    setSignupClicked(true);

    let hasErrors = false;
    const errors = { ...inputErrors };

    if (
      signUpInfo.fullname.trim() === "" ||
      !signUpInfo.fullname.includes(" ")
    ) {
      errors.fullname = true;
      hasErrors = true;
    } else {
      errors.fullname = false;
    }
    if (!emailRegex.test(signUpInfo.email.trim())) {
      errors.email = true;
      hasErrors = true;
    } else if (emailInUse) {
      errors.email = true;
      hasErrors = true;
    } else {
      errors.email = false;
    }
    if (
      !zipcodeRegex.test(signUpInfo.zipcode.trim()) ||
      signUpInfo.zipcode === ""
    ) {
      errors.zipcode = true;
      hasErrors = true;
    } else {
      errors.zipcode = false;
    }
    if (
      !numberRegex.test(signUpInfo.phoneNumber.trim()) ||
      signUpInfo.phoneNumber === ""
    ) {
      errors.phoneNumber = true;
      hasErrors = true;
    } else {
      errors.phoneNumber = false;
    }
    if (signUpInfo.password.length < 8) {
      errors.password = true;
      hasErrors = true;
    } else {
      errors.password = false;
    }
    if (signUpInfo.confirmPassword !== signUpInfo.password) {
      errors.confirmPassword = true;
      hasErrors = true;
    } else {
      errors.confirmPassword = false;
    }
    if (signUpInfo.gender === "") {
      errors.gender = true;
      hasErrors = true;
    } else {
      errors.gender = false;
    }
    if (!checkBirthdate(signUpInfo.birthdate) || signUpInfo.birthdate === "") {
      errors.birthdate = true;
      hasErrors = true;
    } else {
      errors.birthdate = false;
    }

    if (hasErrors || !termsAgreed) {
      console.log(hasErrors);
      setInputErrors(errors);
    } else {
      console.log("trying to register");
      setInputErrors(errors);

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
          if (response.status === 409) {
            throw new Error(
              "Conflict: There was a conflict with the current state of the resource.",
              setEmailInUse(true)
            );
          } else {
            throw new Error("Network response was not ok.");
          }
        }

        const responseData = await response.json();

        console.log("registered!");
        value.setSidebar("");
        login();
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  }

  async function login() {
    const data = {
      email: signUpInfo.email,
      password: signUpInfo.password,
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
      const token = responseData.access_token;
      const userID = responseData.user_id;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userID);

      console.log("Response data:", responseData);
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
              className={
                signupClicked && inputErrors.fullname ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.fullname ? "input-label-error" : ""
              }`}
            >
              Full Name
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.fullname ? "" : "hidden"
              }`}
            >
              *Make sure to fill in your full name
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.email ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.email ? "input-label-error" : ""
              }`}
            >
              Email
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.email ? "" : "hidden"
              }`}
            >
              {emailInUse
                ? "*Email is already in use"
                : "*Please use a valid email address"}
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.zipcode ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.zipcode ? "input-label-error" : ""
              }`}
            >
              Zip Code
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.zipcode ? "" : "hidden"
              }`}
            >
              *Please use a valid zipcode
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.phoneNumber ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.phoneNumber
                  ? "input-label-error"
                  : ""
              }`}
            >
              Phone
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.phoneNumber ? "" : "hidden"
              }`}
            >
              *Please use a valid phone number
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.password ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.password ? "input-label-error" : ""
              }`}
            >
              Password
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.password ? "" : "hidden"
              }`}
            >
              *Password must be at least 8 characters
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.confirmPassword
                  ? "input-error"
                  : ""
              }
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
              } ${
                signupClicked && inputErrors.confirmPassword
                  ? "input-label-error"
                  : ""
              }`}
            >
              Confirm Password
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.confirmPassword ? "" : "hidden"
              }`}
            >
              *Passwords must match
            </div>
          </div>
          <div className="input-wrapper">
            <select
              className={
                signupClicked && inputErrors.gender ? "input-error" : ""
              }
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
              } ${
                signupClicked && inputErrors.gender ? "input-label-error" : ""
              }`}
            >
              Gender
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.gender ? "" : "hidden"
              }`}
            >
              *Please select a gender
            </div>
          </div>
          <div className="input-wrapper">
            <input
              className={
                signupClicked && inputErrors.birthdate ? "input-error" : ""
              }
              type="date"
              name="birthdate"
              onFocus={() => setSelectedField("birthdate")}
              onBlur={() => setSelectedField(null)}
              onChange={handleInputChange}
              value={signUpInfo.birthdate}
            />
            <label
              className={`input-label active ${
                signupClicked && inputErrors.birthdate
                  ? "input-label-error"
                  : ""
              }`}
            >
              Birthdate
            </label>
            <div
              className={`error-message ${
                signupClicked && inputErrors.birthdate ? "" : "hidden"
              }`}
            >
              *You must be at least 18 to sign up for Comwell Club
            </div>
          </div>
          <div className="terms-and-conditions mb-2">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={() => setTermsAgreed((prevState) => !prevState)}
            ></input>
            <label>Accept terms and conditions for Comwell Club</label>
          </div>
          <div
            className={`error-message ${
              signupClicked && !termsAgreed ? "" : "hidden"
            }`}
          >
            *You must accept Comwell&apos;s terms and conditions to sign up
          </div>
        </form>
        <div className="signup-select-container border-t border-gray-200">
          <button className="active" onClick={signUp}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpSidebar;
