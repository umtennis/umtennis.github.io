import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchEvents = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_KEY_CLUB_SCHEDULE);
      const data = await response.json();

      const mappedEvents = data.events
        .filter(event => event.id) // Ignore entries without an id
        .map(event => ({
          id: event.id,
          title: event.name,
          start: event.start_time ? `${event.date}T${event.start_time}` : event.date,
          end: event.end_time ? `${event.date}T${event.end_time}` : event.date,
          participants: event.participants || [],
          number_of_participants: event.number_of_participants || 0,
          notes: event.notes || '',
          maxParticipants: event.maxParticipants
        }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on startup
  }, []);

  const addParticipant = (eventId, participantName) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        // Determine the correct way to add the participant based on the current data type
        let updatedParticipants;
  
        if (typeof event.participants === 'string') {
          // If participants is a string, append the new participant
          updatedParticipants = event.participants
            ? `${event.participants}, ${participantName}`
            : participantName;
        } else if (Array.isArray(event.participants)) {
          // If participants is an array, join it into a string after adding the new participant
          updatedParticipants = [...event.participants, participantName].join(', ');
        } else {
          // If participants is undefined or null, initialize it as a string
          updatedParticipants = participantName;
        }
  
        return {
          ...event,
          number_of_participants: event.number_of_participants + 1,
          participants: updatedParticipants
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const removeParticipant = (updatedEvent) => {
    const updatedEvents = events.map(event => {
      if (event.id === updatedEvent.id) {
        event = updatedEvent
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <EventContext.Provider value={{ events, addParticipant, removeParticipant, fetchEvents, isFetching }}>
      {children}
    </EventContext.Provider>
  );
};
