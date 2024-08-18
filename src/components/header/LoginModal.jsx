import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

const LoginModal = ({ show, handleClose }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    await login(email, phone);
    handleClose(); // Close the modal after login attempt
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
