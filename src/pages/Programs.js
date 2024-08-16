import React, { useState } from "react";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import useAppData from "../hooks/useAppData.js";
import NewMemberSignup from "../components/programs/NewMemberSignup";
// import LessonsForm from "../components/LessonsForm";
import "./Programs.css";

const Programs = (props) => {
  const { state } = useAppData();
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'newMember':
        return <NewMemberSignup />;
      case 'lessons':
        return <NewMemberSignup />;
      default:
        return null;
    }
  };

  return (


    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="single-content-container">

            <h2>Programs</h2>
            <div className="buttons-container">
              <button onClick={() => setSelectedForm('newMember')} className="program-button">
                New Member
              </button>
              <button onClick={() => setSelectedForm('lessons')} className="program-button">
                Lessons
              </button>
            </div>
            <div className="form-container">
              {renderForm()}
            </div>






          </div>
        </div>
      </div>
      <Footer /> 
    </div>

  );
};
export default Programs;