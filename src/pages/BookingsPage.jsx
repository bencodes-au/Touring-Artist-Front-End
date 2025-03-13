import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useBookings } from "../hooks/useBookings";

export const BookingsPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.log("Token retrieved in BookingsPage:", token);
  console.log("User ID retrieved in BookingsPage:", userId);

  const { data, error } = useBookings(userId, token);

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

  return (
    <div>
      <h2>Bookings</h2>

      {/* If the user is logged in, show the booking form */}
      {token && userId && <BookingForm />}

      {/* Show error if there is one */}
      {error && <p>{error.message}</p>}

      {/* Show existing bookings if available */}
      {data.data && data.data.length > 0 ? (
        <ul>
          {data.data.map((booking) => (
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
