import "../styles/index.css";

import { NavLink } from "react-router-dom";

const Header = (props) => {
  let uname = window.localStorage.getItem("name");

  const signout = () => {
    window.localStorage.setItem("loggedIn", false);
    props.setNewLoginState(false);
  };

  if (props.loginState) {
    return (
      <header>
        <div className="header-wrapper">
          <div className="header-btn">
            <div>
              <h1>GAME</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="username-navlink">{uname}</p>
              <button
                onClick={() => {
                  signout();
                }}
                className="signout-navlink"
                style={{ color: "white" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="header-wrapper">
        <div className="header-btn">
          <div>
            <NavLink to="/" className="logo">
              GAME
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/testlogin"
              className="signinup-navlink"
              style={{ color: "white" }}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/testsignup"
              className="signinup-navlink"
              style={{ color: "white" }}
            >
              Signup
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
