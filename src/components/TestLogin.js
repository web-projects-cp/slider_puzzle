import { NavLink } from "react-router-dom";

import "../styles/index.css";
import Header from "./Header";

const TestLogin = (props) => {
  function sendEmail1(e) {
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
    console.log(email);
    console.log(password);
    if (
      email === window.localStorage.getItem("email") &&
      password === window.localStorage.getItem("password")
    ) {
      window.localStorage.setItem("loggedIn", true);
      props.setNewLoginState(true);
    } else {
      alert("Enter correct Email and password.");
      document.getElementById("email1").placeholder = "Email";
      document.getElementById("password1").placeholder = "Password";
    }
  }

  return (
    <div className="login">
      <div className="login__wrapper">
        <h3>Sign In</h3>

        <form className="login__form" onSubmit={sendEmail1}>
          <div className="login__input-topics">
            <label htmlFor="email"> E-mail :</label>
            <input type="email" name="email" id="email1" placeholder="Email" />
          </div>

          <div className="login__input-topics">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password1"
              placeholder="password"
            />
          </div>
          <div className="login__btn-save-wrapper">
            <button className="login__btn-login">Sign In</button>
            <div className="login__divider">
              <hr className="login__divider-line-before"></hr>
              <p>Or</p>
            </div>
            <p style={{ paddingTop: "10px" }}>
              Don't have an account yet?{" "}
              <NavLink to="/testsignup">Sign Up</NavLink> here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestLogin;
