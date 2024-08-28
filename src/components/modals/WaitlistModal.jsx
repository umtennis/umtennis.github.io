import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const WaitlistModal = ({ show, handleClose, handleSignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("3");
  const [status, setStatus] = useState("student");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState("");

  const googleSheetURL = process.env.REACT_APP_API_KEY_NEW_MEMBER_WAITLIST;


  const handleSubmit = async () => {
    // Clear previous errors
    setError("");

    // Validate all fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !rating ||
      !status 
    ) {
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
        rating,
        status,
      }),
    });

    console.log(response)

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
          {signupSuccess ? "Signup Successful" : "Waitlist Signup"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {signupSuccess ? (
          <p>
            Successfully signup to the waitlist!
          </p>
        ) : (
          <>
             <p>
              Please fill out the following information to be added to the waitlist. Once a spot becomes available we will notify you for a free tryout session.
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
              <Form.Group controlId="formRating" className="mt-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>
                  <option value="5.0">5.0+</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formStatus" className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                  <option value="staff">Staff</option>
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

export default WaitlistModal;
