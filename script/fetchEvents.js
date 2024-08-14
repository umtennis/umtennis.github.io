const axios = require('axios');
const fs = require('fs');

// Replace with your API link
const apiUrl = process.env.REACT_APP_CLUB_SCHEDULE_API_KEY; // Assuming the link returns JSON


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
