import Header from "./components/Header";
import Main from "./components/Main";
import Puzzle from "./components/Puzzle";
import TestLogin from "./components/TestLogin";
import TestSignup from "./components/TestSignup";

import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

function isUserLoggedIn() {
  if (
    localStorage.getItem("email") !== null &&
    localStorage.getItem("password") !== null &&
    localStorage.getItem("loggedIn") !== null &&
    localStorage.getItem("loggedIn") === true
  ) {
    return true;
  }
  return false;
}

const App = () => {
  let [loginState, setLoginState] = React.useState(isUserLoggedIn());

  let [flagToShowLogin, setFlagToShowLogin] = React.useState(false);

  const setNewFlagToShowLogin = (newState) => {
    //setLoginState({newState});
    console.log("setNewFlagToShowLogin called");
    setFlagToShowLogin(newState);
  };

  // Creating below function to set state
  // of this (parent) component.
  const setNewLoginState = (newState) => {
    //setLoginState({newState});
    setNewFlagToShowLogin(!newState);
    console.log("setNewLoginState called");
    setLoginState(newState);
  };

  if (flagToShowLogin) {
    return (
      <div>
        <Header loginState={loginState} setNewLoginState={setNewLoginState} />
        <TestLogin setNewLoginState={setNewLoginState} />
        <Footer />
      </div>
    );
  }

  if (loginState) {
    return (
      <div>
        <Header loginState={loginState} setNewLoginState={setNewLoginState} />
        <Puzzle />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header loginState={loginState} setNewLoginState={setNewLoginState} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/testlogin"
          element={<TestLogin setNewLoginState={setNewLoginState} />}
        />
        <Route
          path="/testsignup"
          element={<TestSignup setNewFlagToShowLogin={setNewFlagToShowLogin} />}
        />
        <Route path="/puzzle" element={<Puzzle />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
