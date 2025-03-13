import React, { useState, useEffect } from "react";
import api from "../hooks/api";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    artist: "",
    paidUpfront: false,
  });
  const [error, setError] = useState("");
  const [venues, setVenues] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch venues from the backend
  useEffect(() => {
    api
      .get("/venues")
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("Token:", token);
    console.log("User ID:", userId);

    if (!token) {
      setError("You must be logged in to make a booking.");
      return;
    }

    console.log("Form Data before sending:", formData);

    const dataWithUserId = { ...formData, userId };
    console.log("Data being sent with userId:", dataWithUserId);

    // Send the booking request to the backend
    api
      .post("/bookings", dataWithUserId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        setError("");
      })
      .catch((error) => {
        // Check if the error response contains a message from the backend
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          console.error("Error making booking:", error);
          setError("Failed to create booking. Please try again.");
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
