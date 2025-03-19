import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useBookings } from "../hooks/useBookings";

export const BookingsPage = () => {
  const { data, error, isLoading } = useBookings();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const venueId = queryParams.get("venueId");

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-primary">
        <span>Loading...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-primary">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  // If there are no bookings
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100 p-6">
        <div className="w-full max-w-xl">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Bookings</h2>

          {/* Show the booking form */}
          <BookingForm selectedVenueId={venueId} />

          {/* No bookings message */}
          <div className="text-lg text-primary mt-6">No bookings found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-100 p-6">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Bookings</h2>

        {/* Show the booking form */}
        <BookingForm selectedVenueId={venueId} />

        {/* Previous Bookings Section */}
        <div className="previous-bookings mt-8">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Previous Bookings
          </h3>

          <div className="bookings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((booking) => (
              <div
                className="card card-bordered bg-base-100 shadow-xl w-full"
                key={booking._id}
              >
                <div className="card-body">
                  <h2 className="card-title text-primary">{booking.artist}</h2>
                  <p className="text-primary">
                    Booking Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
