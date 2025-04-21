import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";

import emailjs from "emailjs-com";

//registration
const nameValidator = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const emailValidator = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/gi;
const passwordValidator =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";

const inputStyleErr = {
  border: "2px solid red",
};
const inputStyle = {
  border: ".6px solid green",
};

const Userdetails = (props) => {
  const api = "mC5i8GpPkInJAdISB";
  const emailServer = "gmail";
  const templateId = "poonkodi";
  const [name, setName] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(emailServer, templateId, e.target, api).then(
      (result) => {
        alert("Email verification mail sent successfully");
        console.log(result.text);
        window.localStorage.setItem("name", username);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
        props.setNewFlagToShowLogin(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
    e.target.reset();
  }

  const [newUser, setNewUser] = useState({
    userPicture: "",
    dateOfBirth: "",
    userAddress: "",
    userPhoneNo: "",
  });
  const { userPicture, dateOfBirth, userAddress, userPhoneNo } =
    newUser;

  const [entered, setEntered] = useState({
    userPicture: false,
    dateOfBirth: false,
    userAddress: false,
    userPhoneNo: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      var x = document.getElementById("saveMsg");
      x.innerHTML = "Saved Successfully.";
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setEntered({
      ...entered,
      [name]: true,
    });
  };

  const validate = () => {
    const errors = {
      userPicture: "",
      dateOfBirth: "",
      userAddress: "",
      userPhoneNo: "",
    };
    if (entered.userAddress && !validator.isAlpha(userAddress)) {
      errors.userAddress = "User address should include only letters";
    }
    if (
      entered.userAddress &&
      !validator.isLength(userAddress, { min: 6, max: 30 })
    ) {
      errors.userAddress = "First name be between 6 and 30 characters";
    }
    return errors;
  };

  const errors = validate();

  return (
    <div className="register-form__container">
      <form onSubmit={sendEmail} className="register-form">
        <h4 className="register-form__header">Sign Up</h4>
        {/* <p className="verification-err">{errorMsg}</p> */}
        <div className="register-form__input-topics">
          <label htmlFor="userpicture">User Picture:</label>
          <input
            type="text"
            name="userpicture"
            value={userpicture}
            placeholder="user picture"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.userpicture && (
          <div>
            <p className="feedback-message">{errors.userpicture}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="email"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && (
          <div>
            <p className="feedback-message">{errors.email}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && (
          <div>
            <p className="feedback-message">{errors.password}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="repeat password">Repeat password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            placeholder="repeat password"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            style={password !== repeatPassword ? inputStyleErr : inputStyle}
          />
        </div>
        {errors.repeatPassword && (
          <div>
            <p className="feedback-message">{errors.repeatPassword}</p>
          </div>
        )}

        <div className="btn-save__wrapper">
          {errors.firstname ||
          errors.lastname ||
          errors.email ||
          errors.username ||
          errors.password ||
          errors.repeatPassword ? (
            <button className="add-book__btn-add--disabled" disabled>
              Submit
            </button>
          ) : (
            <button className="btn-register">Sign Up</button>
          )}
        </div>
        <p style={{ paddingTop: "10px" }}>
          Have an account already? <NavLink to="/testlogin">Sign In</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Userdetails;
