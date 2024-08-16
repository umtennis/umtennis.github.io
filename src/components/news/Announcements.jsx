import React, { useState } from "react";
import { useNewsState, useNewsDispatch } from "../contexts/NewsContext";
import "./Announcements.css";

//TODO: handleSave and handleAdd can be reduced, much repeated

const Announcements = ({ isAdmin }) => {
  const dispatch = useNewsDispatch();
  // const [newsItems, setNewsItems] = useState([]);
  // const [loading, setLoading] = useState(true); // Add a loading state

  const { newsItems, loading } = useNewsState(); // Use global state for newsItems and loading

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: "", content: "" });
  const [deletingItem, setDeletingItem] = useState(null);

  const googleSheetURL = process.env.REACT_APP_API_KEY_ANNOUNCEMENT;

  const handleSave = async () => {
    if (editingItem) {
      try {
        dispatch({ type: "EDIT_NEWS", payload: editingItem });

        const response = await fetch(googleSheetURL, {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({ ...editingItem, action: "edit" }),
        });

        if (response.ok) {
          alert("You have successfully saved a new announcement!");
        } else {
          alert(
            `Could not connect...(server limit reached). Try again tomorrow.`
          );
        }
      } catch (error) {
        console.error("Error adding link:", error);
        alert("Error! Possibly server limit reached. Try again tomorrow.");
      }

      setEditingItem(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null); // Exit edit mode without saving changes
    setDeletingItem(null); // Exit edit mode without saving changes
  };

  const handleDeleteConfirm = async () => {
    if (deletingItem) {
      try {
        dispatch({ type: "DELETE_NEWS", payload: deletingItem.id });

        const response = fetch(googleSheetURL, {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({ id: deletingItem.id, action: "delete" }),
        });
        if (response.ok) {
          alert("You have successfully deleted a new announcement!");
        } else {
          alert(
            `Could not connect...(server limit reached). Try again tomorrow.`
          );
        }
      } catch (error) {
        console.error("Error adding link:", error);
        alert("Error! Possibly server limit reached. Try again tomorrow.");
      }
      setDeletingItem(null);
    }
  };

  const handleAdd = async () => {
    try {
      const newId =
        newsItems.length > 0
          ? Math.max(...newsItems.map((item) => item.id)) + 1
          : 1;

      const currentDate = new Date().toLocaleDateString(); // Get the current date in a readable format

      const newNewsItem = { id: newId, ...newItem, date: currentDate };

      dispatch({ type: "ADD_NEWS", payload: newNewsItem });

      const response = await fetch(googleSheetURL, {
        method: "POST",
        body: JSON.stringify({ ...newNewsItem, action: "add" }),
      });

      if (response.ok) {
        alert("You have successfully added a new announcement!");
      } else {
        alert(
          `Could not connect...(server limit reached). Try again tomorrow.`
        );
      }
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Error! Possibly server limit reached. Try again tomorrow.");
    }

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
          <button onClick={handleAdd} className="add-link-button">
            Add News
          </button>
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
              <p className="news-date">
                {new Date(item.date).toISOString().split("T")[0]}
              </p>{" "}
              {/* Display the date */}
              {isAdmin && !deletingItem && (
                <div className="news-actions new-news-item">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingItem(item)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}

          {deletingItem && deletingItem.id === item.id && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this item?</p>
              <div className="delete-actions">
                <button
                  onClick={handleDeleteConfirm}
                  className="confirm-button"
                >
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
};

export default Announcements;
