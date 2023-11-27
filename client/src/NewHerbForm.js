import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function NewHerbForm({ updateHerbs }) {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user makes changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/herbs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(r => {
        if (r.ok) {
            r.json().then(newHerb => {
                // console.log("new herb", newHerb)
                // console.log("type of prop updateHerbs",typeof updateHerbs);
                updateHerbs(newHerb);
                // Redirect to the herbs list after successful creation
                navigate('/herbs');
                })
        } else {
            r.json().then((error) => setError(error.errors));
        }
      })
      .catch(error => {
        console.error('Error creating herb:', error);
        setError('Error creating herb. Please try again.'); // Set an error message
      });
  };

  return (
    <div>
      <h1>New Herb Form</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Herb</button>
      </form>
    </div>
  );
}
