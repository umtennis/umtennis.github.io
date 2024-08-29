import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CompTeamModal = ({ show, handleClose, handleSignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolYear, setSchoolYear] = useState("1");
  const [experience, setExperience] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState("");

  const googleSheetURL = process.env.REACT_APP_API_COMP_TEAM_SIGNUP

  const handleSubmit = async () => {
    // Clear previous errors
    setError("");

    // Validate all fields
    if (!firstName || !lastName || !email || !phone || !schoolYear|| !experience) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    const name = `${firstName} ${lastName}`;

    const response = await fetch(googleSheetURL, {
      // redirect: "follow",
      method: 'POST',
      // headers: {
      //   "Content-Type": "text/plain;charset=utf-8",
      // },
      body: JSON.stringify({
        name,
        email,
        phone,
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
            Successfully signed up for team tryouts. We will contact you soon.
          </p>
        ) : (
          <>
            <p>
              Note: Please indicate your previous tournament experience and
              result. All team players should have a minimum of 2 years of
              competitive tournament experience.
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <Form.Control
                  as="textarea"
                  placeholder="Briefly describe your previous competitive experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
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
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
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
