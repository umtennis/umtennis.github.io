import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import { EventContext } from '../components/contexts/EventContext';
import { UserContext } from '../components/contexts/UserContext';
import "./ClubSchedule.css"


//TODO: when adding show a loading symbol and prevent double click

const googleSheetURL = process.env.REACT_APP_API_KEY_CLUB_SCHEDULE
const maxParticipants = 18

// Set the appElement for accessibility
// Modal.setAppElement('#root');

const ClubSchedule = () => {
  const { user } = useContext(UserContext);
  const { events, addParticipant, isFetching } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleEventClick = (info) => {
    const clickedEvent = events.find(event => event.id === info.event.id);
    setSelectedEvent(clickedEvent);
    setModalIsOpen(true);
  };

  const handleParticipate = async () => {
    if (selectedEvent.number_of_participants < maxParticipants) {
      setLoading(true); // Start loading

      try {
        const response = await fetch(googleSheetURL, {
          redirect: "follow",
          method: 'POST',
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            eventId: selectedEvent.id,
            participantName: user.name, // Replace this with actual participant name
            eventDate: selectedEvent.start.split('T')[0], // Extract the date part from the start datetime
          }),
        });
        if (response.ok) {
          
          addParticipant(selectedEvent.id, user.name); // Replace with actual participant name

          alert('You have successfully registered for the event!');
        } else {
          alert(`Error: ${response.message}`);
        }

      } catch (error) {
        console.error("Error adding participant:", error);
        alert('Error! Possibly server limit reached. Try again tomorrow.');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      alert('Sorry, this event is full.');
    }
    setModalIsOpen(false);
  };

  if (isFetching) {
    return <div>Loading events...</div>; // Optional: Add a loading state
  }

  return (
    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="single-content-container">
            <h2>Club Schedule</h2>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              events={events.map(event => ({
                id: event.id,
                title: `${event.title} \n (Spots Available: ${maxParticipants - event.number_of_participants}/${maxParticipants})`,
                start: event.start,
                end: event.end,
                extendedProps: {
                  participants: event.participants
                }
              }))}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              eventClick={handleEventClick}
              editable={true}
              selectable={true}
              slotMinTime="09:00:00"
              slotMaxTime="24:00:00"
            />

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Event Registration"
              className="ReactModal__Content"
              overlayClassName="ReactModal__Overlay"
            >
              <h2>Register for Event</h2>
              <p>{selectedEvent?.title}</p>
              <p>{`Participants: ${selectedEvent?.number_of_participants}/${maxParticipants}`}</p>
              {loading ? (
                <div className="loading-spinner">Loading...</div>
              ) : (
                <>
                  <ul>
                    {
                      Array.isArray(selectedEvent?.participants) ? (
                        selectedEvent.participants.map((participant, index) => (
                          <li key={index}>{participant}</li>
                        ))
                      ) : (
                        selectedEvent?.participants
                          .split(', ')
                          .filter(Boolean) // Filter out empty strings
                          .map((participant, index) => (
                            <li key={index}>{participant}</li>
                          ))
                      )
                    }
                  </ul>
                  <button
                    onClick={handleParticipate}
                    disabled={loading || selectedEvent?.number_of_participants >= maxParticipants}
                    className="participate-button"
                  >
                    Participate
                  </button>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="event-close-button"
                  >
                    Close
                  </button>
                </>
              )}
            </Modal>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClubSchedule;
