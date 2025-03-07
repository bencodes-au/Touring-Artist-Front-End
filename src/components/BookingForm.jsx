import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    artist: "",
    paidUpfront: false,
  });
  const [error, setError] = useState(""); // Error state to display error message
  const [venues, setVenues] = useState([]); // State to store venues

  // Fetch venues from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/venues") // Replace with the correct URL for fetching venues
      .then((response) => {
        setVenues(response.data); // Update venues state
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }, []); // Empty dependency array to run only once

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the booking request to the backend
    axios
      .post("http://localhost:3000/bookings", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Booking created successfully:", response.data);
        // Reset the form after successful booking
        setFormData({
          venue: "",
          date: "",
          artist: "",
          paidUpfront: false,
        });
        setError(""); // Reset any previous error
      })
      .catch((error) => {
        // Check if the error response contains a message from the backend
        if (error.response && error.response.data.error) {
          setError(error.response.data.error); // Display the specific error message
        } else {
          console.error("Error making booking:", error);
          setError("Failed to create booking. Please try again."); // Fallback error message
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Venue:
            <select
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            >
              <option value="">Select Venue</option>
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <option key={venue._id} value={venue._id}>
                    {venue.name}
                  </option>
                ))
              ) : (
                <option disabled>No venues available</option>
              )}
            </select>
          </label>
        </div>

        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Artist:
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Paid Upfront:
            <input
              type="checkbox"
              name="paidUpfront"
              checked={formData.paidUpfront}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  paidUpfront: event.target.checked,
                })
              }
            />
          </label>
        </div>

        {/* Show the error message if there's one */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
