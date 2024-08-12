import React from "react";
import Header from "../components/header/Header.jsx";
import LandingPage from "../components/landingPage/LandingPage.jsx";
import LoginForm from "../components/login/LoginForm.js"
import useAppData from "../hooks/useAppData.js";

const Login = () => {

  const { state } = useAppData();
  return (
    <div className="App">
      <Header
        isLoggedIn={state.isLoggedIn}
        user={state.user}
      />
      <LoginForm />
    </div>

  );
};

export default Login;