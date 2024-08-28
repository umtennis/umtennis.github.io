import React, { useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const EventRegistrationModal = ({
  show,
  handleClose,
  selectedEvent,
  handleParticipate,
  handleCancelParticipation,
  handleUpdateEvent,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedTitle, setEditedTitle] = useState(selectedEvent.title);
  const [editedNotes, setEditedNotes] = useState(selectedEvent.notes || "");
  const [editedMaxParticipants, setEditedMaxParticipants] = useState(selectedEvent.maxParticipants);


  // Normalize participants to an array
  const participants = Array.isArray(selectedEvent?.participants)
    ? selectedEvent.participants
    : selectedEvent.participants.split(", ").filter(Boolean);

  // // Check if the current user is in the participants list
  // const isUserParticipant = selectedEvent?.participants.includes(user?.name);

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
    setError("");

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
        setError("Cancellation failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during cancellation.");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () =>{
    setIsEditing(false);
    setError("")
    handleClose();
  }

  const onEditClick = () => {
    setIsEditing(true);
  };
  const onEditSave = async () => {
    setIsSaving(true);
    

    const updatedEvent = {
      ...selectedEvent,
      name: editedTitle,
      notes: editedNotes,
      maxParticipants: editedMaxParticipants,
    };
    
    console.log(updatedEvent)

    try {
      const response = await handleUpdateEvent(updatedEvent);

      if (response.success) {
        // setSuccess(true);
        setShowSuccessMessage(true);

        // Show the success message for 2 seconds, then update the view
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      } else {
        setError("Edit failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during updating.");
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }

  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register for Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isEditing ? (
        <>
          <Form.Group controlId="eventTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="eventNotes" className="mt-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="eventMaxParticipants" className="mt-3">
            <Form.Label>Max Participants</Form.Label>
            <Form.Control
              type="number"
              value={editedMaxParticipants}
              onChange={(e) => setEditedMaxParticipants(e.target.value)}
            />
          </Form.Group>
        </>
      ) : (
        <>
          <h5>{selectedEvent.title}</h5>
          <p>Date: {selectedEvent.start.split("T")[0]}
          {selectedEvent.notes && <p>Notes: {selectedEvent.notes}</p>}
          </p>
          <p>Max Participants: {selectedEvent.maxParticipants} <br/>Current: {selectedEvent.number_of_participants}</p>
        </>
      )}
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
    <Modal.Footer className="d-flex justify-content-between">
      {user?.isAdmin && (
        <div>
          {isEditing ? (isSaving ? (
            <Button variant="secondary" disabled>
              Sending...
            </Button>
          ): <Button variant="primary" onClick={onEditSave}>
          Save
        </Button>) : (
            <Button variant="primary" onClick={onEditClick}>
              Edit
            </Button>
          )}
        </div>
      )}
      <div>
        {/* {!showSuccessMessage && ( */}
          <>
            {user && (
              <>
                {participants.includes(user.name) ? (
                  <Button
                    variant="danger"
                    onClick={onCancelParticipation}
                    disabled={loading}
                    className="me-2"
                  >
                    {loading ? "Cancelling..." : "Cancel Participation"}
                  </Button>
                ) : (user.booking > 0 ? <Button
                  variant="primary"
                  onClick={onParticipate}
                  disabled={
                    loading ||
                    participants.length >= selectedEvent?.maxParticipants
                  }
                  className="me-2"
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                : <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-disabled">Max booking reached for the week</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button
                    variant="primary"
                    disabled
                    className="me-2"
                    style={{ pointerEvents: "none" }}
                  >
                    Register
                  </Button>
                </span>
              </OverlayTrigger>)}
              </>
            )}
            {!user && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-disabled">Please log in first</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button
                    variant="primary"
                    disabled
                    className="me-2"
                    style={{ pointerEvents: "none" }}
                  >
                    Register
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </>
        {/* )} */}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal.Footer>
    </Modal>
  );
};

export default EventRegistrationModal;
