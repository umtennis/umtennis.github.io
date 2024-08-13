import React, { useState, useEffect } from 'react';
import './News.css';

const News = ({ isAdmin }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', content: '' });

  const googleSheetURL = 'https://script.google.com/macros/s/AKfycbx_SN4HFD5uPJmkmBPGUDzTTtF6J0lVocCuk5BEf9jfrs0OXjEcjO3Nr7VUhqQzYDkh7A/exec';

  // Fetch news data when the component mounts
  useEffect(() => {
    fetch(googleSheetURL)
      .then((response) => response.json())
      .then((data) => {
        setNewsItems(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSave = () => {
    fetch(googleSheetURL, {
      method: 'POST',
      body: JSON.stringify({ ...editingItem, action: 'edit' }),
    })
      .then(() => {
        setNewsItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingItem.id ? editingItem : item
          )
        );
        setEditingItem(null);
      })
      .catch((error) => console.error('Error saving news:', error));
  };

  const handleDelete = (id) => {
    fetch(googleSheetURL, {
      method: 'POST',
      body: JSON.stringify({ id, action: 'delete' }),
    })
      .then(() => {
        setNewsItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting news:', error));
  };

  const handleAdd = () => {
    const newId = newsItems.length > 0 ? Math.max(...newsItems.map(item => item.id)) + 1 : 1;
    const newNewsItem = { id: newId, ...newItem };

    fetch(googleSheetURL, {
      method: 'POST',
      body: JSON.stringify({ ...newNewsItem, action: 'add' }),
    })
      .then(() => {
        setNewsItems((prevItems) => [...prevItems, newNewsItem]);
        setNewItem({ title: '', content: '' });
      })
      .catch((error) => console.error('Error adding news:', error));
  };

  if (loading) {
    return <div>Loading news...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="news-container">
      <h2>Latest News</h2>
      {newsItems.map((item) => (
        <div key={item.id} className="news-item">
          {editingItem && editingItem.id === item.id ? (
            <>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
              />
              <textarea
                value={editingItem.content}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, content: e.target.value })
                }
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              {isAdmin && (
                <div className="news-actions">
                  <button onClick={() => setEditingItem(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {isAdmin && (
        <div className="news-item new-news-item">
          <h3>Add New News</h3>
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) =>
              setNewItem({ ...newItem, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            value={newItem.content}
            onChange={(e) =>
              setNewItem({ ...newItem, content: e.target.value })
            }
          />
          <button onClick={handleAdd}>Add News</button>
        </div>
      )}
    </div>
  );
};

export default News;
