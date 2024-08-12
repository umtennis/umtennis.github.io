import React, { Component } from "react";
import Header from "../components/header/Header.jsx";
import LandingPage from "../components/landingPage/LandingPage.jsx";
import useAppData from "../hooks/useAppData.js";

const Home = (props) => {
  const { state } = useAppData();
  return (
    <div className="App">
    <Header 
      isLoggedIn={state.isLoggedIn}
      user={state.user}
    />
    <LandingPage />
  </div>
  );
};

export default Home;