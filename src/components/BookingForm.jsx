import React, { useState, useEffect } from "react";
import api from "../hooks/api";

const BookingForm = ({ selectedVenueId }) => {
  const [formData, setFormData] = useState({
    venue: selectedVenueId || "",
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

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      setError("You must be logged in to make a booking.");
      return;
    }

    const dataWithUserId = { ...formData, userId };

    api
      .post("/bookings", dataWithUserId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFormData({
          venue: "",
          date: "",
          artist: "",
          paidUpfront: false,
        });
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to create booking. Please try again.");
        }
      });
  };

  useEffect(() => {
    if (selectedVenueId) {
      setFormData((prevState) => ({
        ...prevState,
        venue: selectedVenueId,
      }));
    }
  }, [selectedVenueId]);

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
