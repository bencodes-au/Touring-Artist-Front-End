import React, { useState, useEffect } from "react";
import { isTokenExpired } from "../utils/auth";
import { useVenues } from "../hooks/useVenues";
import { useCreateBooking } from "../hooks/useCreateBooking";

const BookingForm = ({ selectedVenueId }) => {
  const [formData, setFormData] = useState({
    venue: selectedVenueId || "",
    date: "",
    artist: "",
    paidUpfront: false,
  });
  const [error, setError] = useState("");
  const { data: venues, isPending } = useVenues();
  const request = useCreateBooking();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || isTokenExpired(token)) {
      setError("You must be logged in to make a booking.");
      localStorage.removeItem("token");
      return;
    }

    const dataWithUserId = { ...formData, userId };

    request.mutate(dataWithUserId, {
      onSuccess: () => {
        setFormData({
          venue: "",
          date: "",
          artist: "",
          paidUpfront: false,
        });
        setError("");
      },
      onError: () => {
        if (error.response && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to create booking. Please try again.");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-lg text-black">
          Venue:
          <select
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="select select-bordered w-full mt-2"
          >
            <option value="">Select Venue</option>
            {!isPending && venues.data.length > 0 ? (
              venues.data.map((venue) => (
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
        <label className="block mb-2 text-lg black">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-lg text-black">
          Artist:
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            className="input input-bordered w-full mt-2"
            placeholder="Enter artist name"
          />
        </label>
      </div>

      <div>
        <label className="flex items-center text-black">
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
            className="checkbox ml-2"
          />
        </label>
      </div>

      {/* Show the error message if there's one */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="btn btn-primary w-full mt-4">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
