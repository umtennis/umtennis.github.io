import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import { EventContext } from '../components/contexts/EventContext';
import { UserContext } from '../components/contexts/UserContext';
import EventRegistrationModal from '../components/modals/EventRegistrationModal'; // Import the modal
import "./ClubSchedule.css"

const googleSheetURL = process.env.REACT_APP_API_KEY_CLUB_SCHEDULE;
const maxParticipants = 18;

const ClubSchedule = () => {
  const { user } = useContext(UserContext);
  const { events, addParticipant, removeParticipant, isFetching } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [success, setSuccess] = useState(false);

  const handleEventClick = (info) => {
    const clickedEvent = events.find(event => event.id === info.event.id);
    clickedEvent.maxParticipants = maxParticipants
    setSelectedEvent(clickedEvent);
    setModalIsOpen(true);
  };


  const handleParticipate = async () => {
    if (selectedEvent.number_of_participants < maxParticipants) {
      // try {
        const response = await fetch(googleSheetURL, {
          // redirect: "follow",
          method: 'POST',
          // headers: {
          //   "Content-Type": "text/plain;charset=utf-8",
          // },
          body: JSON.stringify({
            eventId: selectedEvent.id,
            participantName: user.name,
            eventDate: selectedEvent.start.split('T')[0],
            action: "add"
          }),
          
        });
        console.log(response);

        if (response.status === 200) {
          const updatedParticipants = selectedEvent.participants + ', ' + user.name;

          const updatedEvent = {
            ...selectedEvent,
            participants: updatedParticipants,
            number_of_participants: selectedEvent.number_of_participants + 1,
          };

          setSelectedEvent(updatedEvent);
          addParticipant(selectedEvent.id, user.name);
          // setSuccess(true);
          return { success: true };
        } else {
          return { success: false, message: `Error: ${response.statusText}` };
        }
      // } catch (error) {
      //   console.error("Error adding participant:", error);
      //   return { success: false, message: 'Error! Possibly server limit reached. Try again tomorrow.' };
      // }
    } else {
      return { success: false, message: 'Sorry, this event is full.' };
    }
  };


  const handleCancelParticipation = async () => {
    try {
      const response = await fetch(googleSheetURL, {
        // redirect: "follow",
        method: 'POST',
        // headers: {
        //   "Content-Type": "text/plain;charset=utf-8",
        // },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          participantName: user.name,
          eventDate: selectedEvent.start.split('T')[0],
          action: "remove"
        }),
        
      });
      console.log(response);

      if (response.status === 200) {
        let participantsArray = selectedEvent.participants.split(', ');
        // console.log(selectedEvent.participants);
        let updatedParticipants = participantsArray.filter(name => name !== user.name)
        updatedParticipants = updatedParticipants.join(', ')

        // console.log(updatedParticipants);

        const updatedEvent = {
          ...selectedEvent,
          participants: updatedParticipants,
          number_of_participants: selectedEvent.number_of_participants - 1,
        };

        setSelectedEvent(updatedEvent);
        removeParticipant(updatedEvent);

        return { success: true };
      } else {
        return { success: false, message: `Error: ${response.statusText}` };
      }
    } catch (error) {
      console.error("Error canceling participation:", error);
      return { success: false, message: 'Error! Please try again later.' };
    }
  };



  // if (isFetching) {
  //   return <div>Loading events...</div>;
  // }

  return (
    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="single-content-container">
            {isFetching ? (<h2>Loading Events</h2>) : <h2>Club Schedule</h2>}
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
            {selectedEvent && <EventRegistrationModal
              show={modalIsOpen}
              handleClose={() => setModalIsOpen(false)}
              selectedEvent={selectedEvent}
              handleParticipate={handleParticipate}
              handleCancelParticipation={handleCancelParticipation}
              user={user}
            />}


          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClubSchedule;
