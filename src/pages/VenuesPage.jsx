import React from "react";
import { Link } from "react-router-dom";
import { useFilteredVenues } from "../hooks/useFilteredVenues";
import "../styles/venues.css";

export const VenuesPage = () => {
  const {
    venues,
    uniqueGenres,
    uniqueLocations,
    selectedGenre,
    setSelectedGenre,
    selectedLocation,
    setSelectedLocation,
  } = useFilteredVenues();

  return (
    <div className="venue-blurb">
      <h2>Available Venues</h2>
      <p>Find and book highly rated studios, music venues, bars and more.</p>

      {/* Genre Dropdown */}
      <div className="filter">
        <label htmlFor="genre">Select Genre: </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(event) => {
            console.log("Selected Genre:", event.target.value);
            setSelectedGenre(event.target.value);
          }}
        >
          <option value="">All Genres</option>
          {uniqueGenres.length > 0 ? (
            uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))
          ) : (
            <option disabled>No genres available</option>
          )}
        </select>
      </div>
      <div className="filter">
        {/* Location Dropdown */}
        <label htmlFor="location">Select Location: </label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(event) => {
            console.log("Selected Location:", event.target.value);
            setSelectedLocation(event.target.value);
          }}
        >
          <option value="">All Locations</option>
          {uniqueLocations.length > 0 ? (
            uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))
          ) : (
            <option disabled>No locations available</option>
          )}
        </select>
      </div>

      <div className="venue-grid">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <Link
              key={venue._id}
              to={`/bookings?venueId=${venue._id}`}
              className="venue-card"
            >
              <h3>{venue.name}</h3>
              <p>
                <strong>Genre:</strong> {venue.genre}
              </p>
              <p>
                <strong>Location:</strong> {venue.location}
              </p>
              <p>
                <strong>Price:</strong> ${venue.price}
              </p>
            </Link>
          ))
        ) : (
          <p>No venues found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};
