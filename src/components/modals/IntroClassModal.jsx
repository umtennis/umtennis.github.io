import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CompTeamModal = ({ show, handleClose, handleSignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolYear, setSchoolYear] = useState("1");
  const [experience, setExperience] = useState("beginner");
  const [signupSuccess, setSignupSuccess] = useState(false);
  // const [sessionDate, setSessionDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



  const googleSheetURL = process.env.REACT_APP_API_STUDENT_INTRO;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Clear previous errors
    setError("");

    // Validate all fields
    if (!firstName || !lastName || !email || !schoolYear || !experience) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    const name = `${firstName} ${lastName}`;

    const response = await fetch(googleSheetURL, {
      // redirect: "follow",
      method: "POST",
      // headers: {
      //   "Content-Type": "text/plain;charset=utf-8",
      // },
      body: JSON.stringify({
        name,
        email,
        schoolYear,
        experience,
      }),
    });

    if (response.ok) {
      setSignupSuccess(true);
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {signupSuccess ? "Signup Successful" : "UM Competitive Team Tryouts"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {signupSuccess ? (
          <p>
            Successfully signed up! Keep an eye on our email for confirmation!
          </p>
        ) : (
          <>
            <p>
              Only current UM students are eligible for this program. Each
              student can attend one free class. Classes run on Thursdays from 6
              PM to 7 PM at the UM Outdoor Courts. We will email you the week of
              your class, based on availability.
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formLastName" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>UM Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your @myumanitoba.ca email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formYear" className="mt-3">
                <Form.Label>Current School Year</Form.Label>
                <Form.Select
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                >
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th+">4th+</option>
                  <option value="Grad">Grad</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formExperience" className="mt-3">
                <Form.Label>Experience</Form.Label>
                <Form.Select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {signupSuccess ? (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        ) : (
          <>
            {(isSubmitting ? (
            <Button variant="secondary" disabled>
              Submitting...
            </Button>
            ):
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
            )}

            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CompTeamModal;
