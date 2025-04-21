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

const TestSignup = (props) => {
  const api = "N0eDUmyGrMEVZZsei";
  const emailServer = "gmail";
  const templateId = "poonkodi";

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
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { username, email, password, repeatPassword } =
    newUser;

  const [entered, setEntered] = useState({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
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
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    };
    if (entered.username && !validator.isAlphanumeric(username)) {
      errors.username = "username should include only letters and numbers";
    }
    if (
      entered.username &&
      !validator.isLength(username, { min: 6, max: 30 })
    ) {
      errors.username = "username name be between 6 and 30 characters";
    }
    if (entered.email && !validator.isEmail(email)) {
      errors.email = "email should be a valid email format";
    }
    if (entered.password && !password.match(passwordValidator)) {
      errors.password =
        "Password must be at least 8 characters long, include an uppercase character, a lowercase character, a number and a special character";
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = "passwords do not match";
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
          <label htmlFor="firstname">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="user name"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.username && (
          <div>
            <p className="feedback-message">{errors.username}</p>
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
          {
          errors.email ||
          errors.username ||
          errors.password ||
          errors.repeatPassword ? (
            <button className="add-user__btn-add--disabled" disabled>
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

export default TestSignup;
