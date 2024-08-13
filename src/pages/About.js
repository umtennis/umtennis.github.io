import React from "react";
import Header from "../components/header/Header.jsx";
import execMembers from "../assets/exec_members_2024.jpg";
import generalMembers from "../assets/general_members_2024.jpg";
import "./About.css"; // Import the CSS for styling

const About = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="content-container">
          <h1>About Us</h1>
          <p>
            The University of Manitoba Tennis Club (UMTC) welcomes both leisure and competitive players who meet our minimum skill level requirement, as outlined in the Tennis Canada Self-Rating Guide (<a href="https://www.tenniscanada.com/wp-content/uploads/2015/12/Self-Rating-Guide-English.pdf" target="_blank" rel="noopener noreferrer">View here</a>).
          </p><p>
            Tryouts are held at the beginning of each term to ensuring a great experience for all.
          </p>
          <p>
            For more information, contact us at <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a>.
          </p>

          <h2>Executive Members 2024</h2>
          <div className="exec-members-container">
            <div className="exec-members-info">
              <p>Meet our dedicated executive team for the 2024 season:</p>
              <ul>
                <li>Craig Hillier</li>
                <li>Mario Bayueno</li>
                <li>Jesse Shen</li>
                <li>Tony Weekes</li>
              </ul>
            </div>
            <div className="exec-members-image">
              <img
                src={execMembers}
                alt="Executive Members 2024"
              />
            </div>
          </div>

          <h2>General Members 2024</h2>
          <p>
            Our general members are the heart of our club. Together, we make UMTC
            a place where everyone can enjoy the sport of tennis.
          </p>

          <img
            src={generalMembers}
            alt="General Members 2024"
            style={{ maxWidth: "100%", height: "auto", margin: "20px 0" }}
          />

          <h2>Contact Us</h2>
          <p>
            For more information, feel free to reach out to us at{" "}
            <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;