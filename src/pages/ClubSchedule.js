import React, { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import "./ClubSchedule.css"

const ClubSchedule = () => {
  const [events, setEvents] = useState([]);

  const umWebSchedule = "https://api.reachcm.com/calendar/export/web/group/expanded/1101/?start_date=2024-7-1&end_date=2025-2-28&authorization=Ki4qTk0IG5HHELe5M9ZiuIgIBkGzhQ2x9ImMw%2BiuYiIyX6z6PMmIWs6%2BItj1WRCZeLYkfaLHpTLX0k%20oKD%2FCMYaQ0DOMGPXIlDo6jx2hXp5TzKapsTvqRMh5rHj3Ynfj6UVgwRMdMs8s26Y9uSFChxiX9i%2Fnv7Iu3F388PgNyUMc4rK%20%2BmZYNQCWxOVokxAya3sdQJwpAKAAkXlnNvGDQzEbyEDCY0IoGAqIZjDfigwQgZ%2F2%2FsQ7Gk5SYDZ7KyD9nPX341Y20%20nZlcZLZcWfRgwsyhg2wlXOKuAs0YswPfAsseCT3wWZSYZFm097yAy%2B%2FdLPSSBgXgauwN41iJQCI%2FLzXW736I9RzIHjmO%20Ywxqy4ITC6z0%3D&timezone=America/Winnipeg";

  useEffect(() => {
    const fetchXMLData = async () => {
      try {
        const response = await fetch(umWebSchedule);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // Assuming the XML structure is something like <events><event>...</event></events>
        const eventElements = xmlDoc.getElementsByTagName("event");
        const eventList = [];

        for (let i = 0; i < eventElements.length; i++) {
          const eventElement = eventElements[i];
          const title = eventElement.getElementsByTagName("title")[0].textContent;
          const date = eventElement.getElementsByTagName("date")[0].textContent;
          const location = eventElement.getElementsByTagName("location")[0].textContent;

          eventList.push({
            title,
            date,
            location
          });
        }

        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching or parsing XML:", error);
      }
    };

    fetchXMLData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="club-schedule-container">
            <h2>Club Schedule</h2>
            {events.length > 0 ? (
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <h3>{event.title}</h3>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Location: {event.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSchedule;
