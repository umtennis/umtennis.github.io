import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const ManageAccountModal = ({ show, handleClose, handleUpdate }) => {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [newPhone, setNewPhone] = useState(user?.phone || "");
  const [rating, setRating] = useState(user?.rating || "3");
  const [status, setStatus] = useState(user?.status || "student");
  const [topSize, setTopSize] = useState(user?.topSize || "men-s");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNewEmail(user.email);
      setPhone(user.phone);
      setNewPhone(user.phone);
      setRating(user.rating);
      setStatus(user.status);
      setTopSize(user.topSize);
    }
  }, [user, show]);

  const handleSubmit = async () => {
    // Validate fields
    if (!name || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    setIsUpdating(true); // Start updating, disable the button and change text

    const updatedUser = {
      name,
      email,
      phone,
      rating,
      status,
      topSize,
      newEmail,
      newPhone,
      action: "update",
    };

    const response = await handleUpdate(updatedUser);

    if (response.success) {
      setSuccess(true);
      setError("");
      user.email = response.user.email;
      setUser(response.user); // Update the user context with the
    } else {
      setError("Update failed. Please try again.");
    }

    setIsUpdating(false); // Stop updating, enable the button and change text back
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Show tooltip if non-numeric characters are typed
    if (/^\d*$/.test(value)) {
      setNewPhone(value);
      setShowTooltip(false); // Hide tooltip
    } else {
      setShowTooltip(true); // Show tooltip
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <Alert variant="success">
            Your account has been updated successfully!
          </Alert>
        ) : (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <OverlayTrigger
                  placement="right"
                  show={showTooltip}
                  overlay={
                    <Tooltip id="tooltip-phone">Enter numbers only</Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={newPhone}
                    onChange={handlePhoneChange}
                    pattern="\d*"
                    inputMode="numeric"
                  />
                </OverlayTrigger>
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
                  <option value="5">5.0+</option>
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
                  <option value="women-xl">Women-L</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!success && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageAccountModal;
