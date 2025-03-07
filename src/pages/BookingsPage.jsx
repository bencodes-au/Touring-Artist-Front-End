import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "../components/BookingForm";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch existing bookings
  useEffect(() => {
    axios
      .get("http://localhost:3000/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div>
      <h2>Make a Booking</h2>
      <BookingForm /> {/* User inputs booking details here */}
    </div>
  );
};
