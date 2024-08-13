import React, { useState } from 'react';
import './NewMemberSignup.css';

const NewMemberSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Student',
    level: '1.0-2.5',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxJiePI0Ma0M0mWoz0KDSlF4wvVhQNhE1lJ-ElYwFdzW3lBCEen6E5O-IrNbn1rRYom/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.result === 'success') {
        setMessage('Thank you for signing up!');
        setFormData({ name: '', email: '', level: '3.0' });
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('There was an error submitting the form.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="program-signup-container">
      <h2>New Member Signup</h2>
      <p>Please sign up below and we will contact you for a free tryout session!</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="UM Student">Student</option>
            <option value="UM Alumni">Alumni</option>
            <option value="UM Staff">Staff</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="level">Select Self-Rating (<a href="https://www.tenniscanada.com/wp-content/uploads/2015/12/Self-Rating-Guide-English.pdf">view guide</a>):</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="1.0-2.5">1.0-2.5</option>
            <option value="3.0-4.0">3.0-4.0</option>
            <option value="4.5+">4.5+</option>
            <option value="Competitive(Students Only)">Competitive</option>
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewMemberSignup;
