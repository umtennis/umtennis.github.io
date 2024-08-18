import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const SignupModal = ({ show, handleClose, handleSignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("3");
  const [status, setStatus] = useState("student");
  const [topSize, setTopSize] = useState("men-s");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState("");

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
      !status ||
      !topSize
    ) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    const name = `${firstName} ${lastName}`;

    // POST request to your Google Apps Script
    const response = await handleSignup({
      name,
      email,
      phone,
      rating,
      status,
      topSize,
    });

    if (response.success) {
      setSignupSuccess(true);
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {signupSuccess ? "Signup Successful" : "Account Signup"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {signupSuccess ? (
          <p>
            Successfully added account. Please make sure to send club fees to{" "}
            <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a> and pay
            Rec fees{" "}
            <a
              href="YOUR_REC_FEES_LINK"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . Your account will be processed as soon as the fees are received.
          </p>
        ) : (
          <>
            <p>
              Please sign up an account for booking events on this site. For
              simplicity, we will use email as the account username and a phone
              number as the password. If you have not participated in a new
              member tryout, please reach out to{" "}
              <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a> before
              signing up. For club requirements, see{" "}
              <a
                href="YOUR_REQUIREMENTS_LINK"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
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
              <Form.Group controlId="formTopSize" className="mt-3">
                <Form.Label>Top Size</Form.Label>
                <Form.Select
                  value={topSize}
                  onChange={(e) => setTopSize(e.target.value)}
                >
                  <option value="men-s">Men-S</option>
                  <option value="men-m">Men-M</option>
                  <option value="men-l">Men-L</option>
                  <option value="men-xl">Men-XL</option>
                  <option value="women-s">Women-S</option>
                  <option value="women-m">Women-M</option>
                  <option value="women-l">Women-L</option>
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

export default SignupModal;
