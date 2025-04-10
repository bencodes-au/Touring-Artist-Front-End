import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useBookings } from "../hooks/useBookings";

export const BookingsPage = () => {
  const { data, error, isLoading } = useBookings();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const venueId = queryParams.get("venueId");

  if (isLoading) {
    return (
      <main className="flex justify-center items-center text-primary">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center text-primary">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center bg-base-100 p-6">
      <div className="py-12 w-full max-w-xl">
        <h1 className="text-3xl font-semibold mb-6 text-primary">Bookings</h1>

        {/* Booking Form */}
        <section aria-labelledby="booking-form">
          <h2 id="booking-form" className="sr-only">
            Booking Form
          </h2>
          <BookingForm selectedVenueId={venueId} />
        </section>

        {/* If No Bookings */}
        {(!data || data.length === 0) && (
          <section className="text-lg text-primary mt-6">
            <p>No bookings found.</p>
          </section>
        )}

        {/* Previous Bookings Section */}
        {data?.length > 0 && (
          <section className="mt-8" aria-labelledby="previous-bookings">
            <h2
              id="previous-bookings"
              className="text-2xl font-bold mb-4 text-primary"
            >
              Previous Bookings
            </h2>

            <ul className="flex flex-wrap gap-6 justify-center">
              {data.map((booking) => (
                <li key={booking._id}>
                  <article className="card card-bordered bg-base-100 shadow-xl w-full min-w-lg">
                    <div className="card-body">
                      <h3 className="card-title text-primary">
                        {booking.artist}
                      </h3>
                      <p className="text-primary">
                        Booking Date:{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};
