import React, { useState, useContext } from "react";
import { UserContext } from '../contexts/UserContext';
import { Modal, Button, Form, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";

const SignUpModal = ({ show, handleClose, handleSignup }) => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("3");
  const [status, setStatus] = useState("student");
  const [topSize, setTopSize] = useState("men-s");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Show tooltip if non-numeric characters are typed
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setShowTooltip(false); // Hide tooltip
    } else {
      setShowTooltip(true); // Show tooltip
    }
  };

  const handleSubmit = async () => {
    // Disable the submit button
    setIsSubmitting(true);

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
      !topSize ||
      !code
    ) {
      setError("All fields are required. Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    const name = `${firstName} ${lastName}`;

    const newUser = {
      name,
      email,
      phone,
      rating,
      status,
      topSize,
      code,
    };
    
    // POST request to your Google Apps Script
    const response = await handleSignup(newUser);

    console.log(response);
    if (response.success) {
      setUser(newUser);
      setSignupSuccess(true);
    } else {
      setError(response.message);
      setIsSubmitting(false); // Re-enable the submit button if there's an error
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
              href="https://sportandrec.umanitoba.ca/UOFM/public/category/browse/WINTERCLUBS"
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
              Note: You will need a registration code to sign up. For all new
              members, please reach out to{" "}
              <a href="mailto:umtennis@gmail.com">umtennis@gmail.com</a>.
            </p>

            <p>
              Once registered, please remember to make your payments for the
              club fee and the rec fee. You will be able to login using your
              email and phone number to book for sessions under Club Schedules
              page.
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
                <OverlayTrigger
                  placement="right"
                  show={showTooltip}
                  overlay={<Tooltip id="tooltip-phone">Enter numbers only</Tooltip>}
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
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
                  <option value="women-xl">Women-L</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formCode" className="mt-3">
                <Form.Label>Registration Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter registration code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
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

export default SignUpModal;
