import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const EventRegistrationModal = ({
  show,
  handleClose,
  selectedEvent,
  handleParticipate,
  handleCancelParticipation,
  user
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Normalize participants to an array
  const participants = Array.isArray(selectedEvent?.participants)
    ? selectedEvent.participants
    : selectedEvent.participants.split(", ").filter(Boolean);

   // Check if the current user is in the participants list
   const isUserParticipant = selectedEvent?.participants.includes(user.name);

  const onParticipate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await handleParticipate();

      if (response.success) {
        setShowSuccessMessage(true);
        // Show the success message for 2 seconds, then update the view
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const onCancelParticipation = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await handleCancelParticipation();

      if (response.success) {
        // setSuccess(true);
        setShowSuccessMessage(true);

        // Show the success message for 2 seconds, then update the view
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      } else {
        setError('Cancellation failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during cancellation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register for Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{selectedEvent.title}</h5>
        <p>Date: {selectedEvent.start.split("T")[0]}</p>        
        <p>
          Current Participants({selectedEvent.number_of_participants}): 
        </p>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        {showSuccessMessage ? (
          <Alert variant="success">
            You have successfully registered for the event!
          </Alert>
        ) : (
          <>{error && <Alert variant="danger">{error}</Alert>}</>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!showSuccessMessage && (
          <>
            {isUserParticipant ? (
              <Button
                variant="danger"
                onClick={onCancelParticipation}
                disabled={loading}
              >
                {loading ? 'Cancelling...' : 'Cancel Participation'}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onParticipate}
                disabled={loading || participants.length >= selectedEvent?.maxParticipants}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            )}
          </>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default EventRegistrationModal;
