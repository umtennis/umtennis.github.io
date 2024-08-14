const axios = require('axios');
const fs = require('fs');

// Replace with your API link
const apiUrl = 'https://api.reachcm.com/calendar/export/web/group/expanded/1101/?start_date=2024-8-13&end_date=2025-2-28&authorization=Ki4qTk0IG5HHELe5M9ZiuIgIBkGzhQ2x9ImMw%2BiuYiIyX6z6PMmIWs6%2BItj1WRCZeLYkfaLHpTLX0k%20oKD%2FCMYaQ0DOMGPXIlDo6jx2hXp5TzKapsTvqRMh5rHj3Ynfj6UVgwRMdMs8s26Y9uSFChxiX9i%2Fnv7Iu3F388PgNyUMc4rK%20%2BmZYNQCWxOVokxAya3sdQJwpAKAAkXlnNvGDQzEbyEDCY0IoGAqIZjDfigwQgZ%2F2%2FsQ7Gk5SYDZ7KyD9nPX341Y20%20nZlcZLZcWfRgwsyhg2wlXOKuAs0YswPfAsseCT3wWZSYZFm097yAy%2B%2FdLPSSBgXgauwN41iJQCI%2FLzXW736I9RzIHjmO%20Ywxqy4ITC6z0%3D&timezone=America/Winnipeg';


// Function to fetch JSON and process it
async function fetchAndProcessJSON() {
    try {
        // Fetch JSON data from the API
        const response = await axios.get(apiUrl);
        const jsonData = response.data;

        // Log the JSON data
        console.log('Fetched JSON Data:', jsonData);

        // Save the JSON data to a file
        fs.writeFileSync('schedule.json', JSON.stringify(jsonData, null, 4));

        // You can further process the JSON data as needed
        // For example, extract specific information or manipulate the data

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// Call the function
fetchAndProcessJSON();
