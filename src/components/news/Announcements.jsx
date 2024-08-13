import React, { useState } from "react";
import { useNewsState, useNewsDispatch } from "../contexts/NewsContext";
import "./Announcements.css";

const Announcements = ({ isAdmin }) => {
  const dispatch = useNewsDispatch();
  // const [newsItems, setNewsItems] = useState([]);
  // const [loading, setLoading] = useState(true); // Add a loading state

  const { newsItems, loading } = useNewsState(); // Use global state for newsItems and loading
  

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: "", content: "" });
  const [deletingItem, setDeletingItem] = useState(null);

  const googleSheetURL =
    "https://script.google.com/macros/s/AKfycbxIn9vncR3YJuShlZttjV3R4i5KqxrxZOWG0ixLnuIhYR9hiAvvy2akQVQ9EofpKel7zA/exec";


  const handleSave = () => {
    if (editingItem) {
      dispatch({ type: "EDIT_NEWS", payload: editingItem });

      fetch(googleSheetURL, {
        method: "POST",
        body: JSON.stringify({ ...editingItem, action: "edit" }),
      }).catch((error) => console.error("Error saving news:", error));

      setEditingItem(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null); // Exit edit mode without saving changes
    setDeletingItem(null); // Exit edit mode without saving changes
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      dispatch({ type: "DELETE_NEWS", payload: deletingItem.id });

      fetch(googleSheetURL, {
        method: "POST",
        body: JSON.stringify({ id: deletingItem.id, action: "delete" }),
      }).catch((error) => console.error("Error deleting news:", error));

      setDeletingItem(null);
    }
  };

  const handleAdd = () => {
    const newId =
      newsItems.length > 0
        ? Math.max(...newsItems.map((item) => item.id)) + 1
        : 1;
  
    const currentDate = new Date().toLocaleDateString(); // Get the current date in a readable format
  
    const newNewsItem = { id: newId, ...newItem, date: currentDate };
  
    dispatch({ type: "ADD_NEWS", payload: newNewsItem });
  
    fetch(googleSheetURL, {
      method: "POST",
      body: JSON.stringify({ ...newNewsItem, action: "add" }),
    }).catch((error) => console.error("Error adding news:", error));
  
    setNewItem({ title: "", content: "" });
  };

  if (loading) {
    return <div>Loading news...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="news-container">
      <h2>Message Board</h2>
      
      {isAdmin && (
        <div className="news-item new-news-item">
          <h3>Add New Content</h3>
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={newItem.content}
            onChange={(e) =>
              setNewItem({ ...newItem, content: e.target.value })
            }
          />
          <button onClick={handleAdd} className="add-link-button">Add News</button>
        </div>
      )}

      {newsItems.map((item) => (
        <div key={item.id} className="news-item">
          {editingItem && editingItem.id === item.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
                placeholder="Title"
              />
              <textarea
                value={editingItem.content}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, content: e.target.value })
                }
                placeholder="Content"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p className="news-date">{new Date(item.date).toISOString().split('T')[0]}</p> {/* Display the date */}
              {isAdmin && !deletingItem && (
                <div className="news-actions new-news-item">
                  <button onClick={() => setEditingItem(item)} className="edit-button">Edit</button>
                  <button onClick={() => setDeletingItem(item)} className="delete-button">Delete</button>
                </div>
              )}
            </>
          )}
  
          {deletingItem && deletingItem.id === item.id && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this item?</p>
              <div className="delete-actions">
                <button onClick={handleDeleteConfirm} className="confirm-button">
                  Confirm
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}  

export default Announcements;
