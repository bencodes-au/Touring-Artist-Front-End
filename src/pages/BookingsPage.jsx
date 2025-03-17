import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useBookings } from "../hooks/useBookings";
import { isTokenExpired } from "../utils/auth";

export const BookingsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { data, error } = useBookings(userId, token);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const venueId = queryParams.get("venueId");

  console.log("Token retrieved in BookingsPage:", token);
  console.log("User ID retrieved in BookingsPage:", userId);
  console.log("Selected Venue ID:", venueId);

  // Redirect to AuthenticationPage if not logged in
  useEffect(() => {
    if (!token || !userId || isTokenExpired(token)) {
      console.log(
        "Redirecting to authentication page due to expired or missing token"
      );
      localStorage.removeItem("token");
      navigate("/authentication");
      return;
    }
  }, [token, userId, navigate]);
  console.log({ data, error });

  return (
    <div className="bookings">
      <h2>Bookings</h2>

      {/* If the user is logged in, show the booking form */}
      {token && userId && <BookingForm selectedVenueId={venueId} />}

      {/* Show error if there is one */}
      {error && <p>{error.message}</p>}

      {/* Show existing bookings if available */}
      {!!data && data.data.length > 0 ? (
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
