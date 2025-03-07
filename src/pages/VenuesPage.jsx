import React from "react";
import { useFilteredVenues } from "../hooks/useFilteredVenues";

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
    <div>
      <h2>Available Venues</h2>

      {/* Genre Dropdown */}
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

      {/* List of Venues */}
      <ul>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <li key={venue._id}>
              <strong>{venue.name}</strong>
              {/* <br /> */}
              <div>Genre: {venue.genre}</div>
              <div>Location: {venue.location}</div>
              <div>Address: {venue.address}</div>
              <div>Phone: {venue.phone}</div>
              <div>Price: ${venue.price}</div>
            </li>
          ))
        ) : (
          <li>No venues found matching your criteria.</li>
        )}
      </ul>
    </div>
  );
};
