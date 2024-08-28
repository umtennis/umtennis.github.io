import React, { useState, useContext } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const LoginModal = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !phone) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    setLoading(true);
    const response = await login(email, phone);
    setLoading(false);
    handleClose();
    // console.log(response)

    if (response.success) {
      setShowSuccessMessage(true);
      // Close the modal after login attempt
    } else {
      setError("User email did not match any phone number. ");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>{error && <Alert variant="danger">{error}</Alert>}</>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
