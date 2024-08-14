const axios = require('axios');
const fs = require('fs');

// Replace with your API link
const apiUrl = 'https://api.reachcm.com/calendar/export/web/group/expanded/1101/?start_date=2024-8-13&end_date=2025-2-28&authorization=Ki4qTk0IG5HHELe5M9ZiuIgIBkGzhQ2x9ImMw%2BiuYiIyX6z6PMmIWs6%2BItj1WRCZeLYkfaLHpTLX0k%20oKD%2FCMYaQ0DOMGPXIlDo6jx2hXp5TzKapsTvqRMh5rHj3Ynfj6UVgwRMdMs8s26Y9uSFChxiX9i%2Fnv7Iu3F388PgNyUMc4rK%20%2BmZYNQCWxOVokxAya3sdQJwpAKAAkXlnNvGDQzEbyEDCY0IoGAqIZjDfigwQgZ%2F2%2FsQ7Gk5SYDZ7KyD9nPX341Y20%20nZlcZLZcWfRgwsyhg2wlXOKuAs0YswPfAsseCT3wWZSYZFm097yAy%2B%2FdLPSSBgXgauwN41iJQCI%2FLzXW736I9RzIHjmO%20Ywxqy4ITC6z0%3D&timezone=America/Winnipeg'; // Assuming the link returns JSON


// Function to fetch JSON and extract specific event data for "Tennis Club"
async function fetchAndExtractEventData() {
  try {
      // Fetch JSON data from the API
      const response = await axios.get(apiUrl);
      const jsonData = response.data;

      // Log the fetched JSON data
      console.log('Fetched JSON Data:', jsonData);

      // Find the calendar where the name is "Tennis Club"
      const tennisClub = jsonData.calendars.find(calendar => calendar.name === 'Tennis Club');

      if (tennisClub) {
          // Extract specific fields from events of the "Tennis Club"
          const cleanedEvents = tennisClub.events.map(event => ({
              id: event.id,
              name: event.metadata.name,
              start_date: event.start_date,
              end_date: event.end_date
          }));

          // Log the cleaned event data to the console
          // console.log('Cleaned Events for Tennis Club:', cleanedEvents);

          // Optionally, save the cleaned event data to a file
          fs.writeFileSync('cleaned_tennis_club_events.json', JSON.stringify(cleanedEvents, null, 4));

      } else {
          console.log('Tennis Club not found in the data.');
      }

  } catch (error) {
      console.error('Error fetching or processing JSON:', error);
  }
}

// Call the function
fetchAndExtractEventData();
