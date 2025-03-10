import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.log("Token retrieved in BookingsPage:", token);
  console.log("User ID retrieved in BookingsPage:", userId);

  // Redirect to AuthenticationPage if not logged in
  useEffect(() => {
    if (!token || !userId) {
      console.log(
        "Redirecting to authentication page due to missing token or userId"
      );
      navigate("/authentication");
      return;
    }
  }, [token, userId, navigate]);

  // Fetch bookings only if logged in
  useEffect(() => {
    if (token && userId) {
      axios
        .get(`http://localhost:3000/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error.response || error);
          setError("Failed to load bookings.");
        });
    }
  }, [token, userId, navigate]);

  return (
    <div>
      <h2>Bookings</h2>

      {/* If the user is logged in, show the booking form */}
      {token && userId && <BookingForm />}

      {/* Show error if there is one */}
      {error && <p>{error}</p>}

      {/* Show existing bookings if available */}
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.artist} - {booking.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};
