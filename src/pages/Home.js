import React from "react";
import Header from "../components/header/Header.jsx";
import LandingPage from "../components/landingPage/LandingPage.jsx";
import useAppData from "../hooks/useAppData.js";
import News from "../components/news/News.jsx";
import './Home.css'; // Import the CSS file

const Home = (props) => {
  const { state } = useAppData();
  const isAdmin = false;

  return (
    <div className="App">
      <Header 
        isLoggedIn={state.isLoggedIn}
        user={state.user}
      />      
      <div className="home-container">
        <News isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Home;

