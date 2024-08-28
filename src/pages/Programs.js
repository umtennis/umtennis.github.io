import React, { useState } from "react";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Button from 'react-bootstrap/Button';
import CompTeamModal from "../components/modals/CompTeamModal.jsx";
import WaitlistModal from "../components/modals/WaitlistModal.jsx";
import "./Programs.css";



const Programs = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [compTeamModalIsOpen, setCompTeamModalIsOpen] = useState(false);
  const [waitlistModalIsOpen, setWaitlistModalIsOpen] = useState(false);

  const handleProgramClick = (program) => {
    if (program === 'compTeam') {
      setCompTeamModalIsOpen(true)

    } else if (program === 'waitList') {
      setWaitlistModalIsOpen(true)
    }
  }


  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="single-content-container">
            <h2>Programs</h2>
            <div className="programs-grid">
              {/* General Membership Section */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("generalMembership")} className="program-title">
                  General Membership
                </h3>
                {expandedSection === "generalMembership" && (
                  <div className="program-description">
                    <ul>
                      <li>
                        Fall/Winter spots are prioritized for returning members. Remaining spots go to UM students first, then open to UM alumni and staff.
                      </li>
                      <li>
                        A minimum 3.0 rating is required, following the: <a href="https://www.tenniscanada.com/wp-content/uploads/2015/12/Self-Rating-Guide-English.pdf" target="_blank" rel="noopener noreferrer">Self-Rating Guide</a>.
                      </li>
                      <li>
                        Indoor sessions are limited to 18 players (6 per court), with play based on similar skill levels.
                      </li>
                      <li>
                        Tennis balls are provided; players must bring their own racquet and appropriate sportswear.
                      </li>
                      <li>
                        Club events and practice clinics will be made available to members through out the season.
                      </li>
                      <li>
                        Club fees: $100/year for alumni and staff, $30/year for students. Payable via E-Transfer to umtennis@gmail.com.
                      </li>
                      <li>
                        Rec fees: $80/term for alumni and staff, $60/term for students. Payable at Rec Services at Active Living Center or online <a href="https://sportandrec.umanitoba.ca/UOFM/public/category/browse/WINTERCLUBS" target="_blank" rel="noopener noreferrer">here</a>.
                      </li>
                      <li>
                        If interested, please fill out the waitlist below. We will contact you as soon as we can.
                      </li>
                    </ul>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleProgramClick('waitList')} >
                      New Member Waitlist
                    </Button>
                    {waitlistModalIsOpen &&
                      <WaitlistModal show={waitlistModalIsOpen} handleClose={() => setWaitlistModalIsOpen(false)}
                      />
                    }
                  </div>
                )}
              </div>

              {/* Competitive Student Team Section */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("competitiveTeam")} className="program-title">
                  Competitive Student Team
                </h3>
                {expandedSection === "competitiveTeam" && (
                  <div className="program-description">
                    <p>
                      We offer a 12-member men's and women's student of UofM team. Tryouts are held at the beginning of each season (around September). A traveling team of 6-8 players from each team will compete in other provinces. For more information, please email <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a>.
                    </p>
                    <Button
                      variant="outline-primary">
                      Current Team Roster
                    </Button>{' '}
                    <Button
                      variant="outline-primary"
                      onClick={() => handleProgramClick('compTeam')}>
                      Team Tryout Signup
                    </Button>
                    {compTeamModalIsOpen &&
                      <CompTeamModal show={compTeamModalIsOpen} handleClose={() => setCompTeamModalIsOpen(false)}
                      />
                    }
                  </div>
                )}

              </div>

              {/* Socials Night */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("socialsNight")} className="program-title">
                  Members Socials Night
                </h3>
                {expandedSection === "socialsNight" && (
                  <div className="program-description">
                    <p>
                      New this season, we plan to orgnaize social nights for general members in the forms of doubles nights, triple threat clinic and ladders program. Stay tuned as new events will be added to Club Schedule page.
                    </p>
                  </div>
                )}
              </div>

              {/* Group Lessons Section */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("groupLessons")} className="program-title">
                  Group Lessons
                </h3>
                {expandedSection === "groupLessons" && (
                  <div className="program-description">
                    <p>
                      If you're interested in group lessons, please email <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a> for more information.
                    </p>
                  </div>
                )}
              </div>

              {/* Private Lessons Section */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("privateLessons")} className="program-title">
                  Private Lessons
                </h3>
                {expandedSection === "privateLessons" && (
                  <div className="program-description">
                    <p>
                      For those interested in private lessons, please email <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a> for more information.
                    </p>
                  </div>
                )}
              </div>

              {/* Tennis Racquet Restringing */}
              <div className="program-card">
                <h3 onClick={() => toggleSection("restringing")} className="program-title">
                  Tennis Racquet Restringing
                </h3>
                {expandedSection === "restringing" && (
                  <div className="program-description">
                    <p>
                      For tennis racequet restringing service, please email Jesse <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programs;
