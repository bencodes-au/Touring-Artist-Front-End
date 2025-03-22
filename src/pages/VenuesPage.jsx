import React from "react";
import { Link } from "react-router-dom";
import { useFilteredVenues } from "../hooks/useFilteredVenues";
import { FiChevronDown } from "react-icons/fi";

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
      {/* Filters */}
      <div className="flex gap-4 px-12 mt-12">
        {/* Genre Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            {selectedGenre || "All Genres"}
            <FiChevronDown className="text-lg" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setSelectedGenre("")}>All Genres</a>
            </li>
            {uniqueGenres.length > 0 ? (
              uniqueGenres.map((genre) => (
                <li key={genre}>
                  <a onClick={() => setSelectedGenre(genre)}>{genre}</a>
                </li>
              ))
            ) : (
              <li>
                <a className="text-gray-400">No genres available</a>
              </li>
            )}
          </ul>
        </div>

        {/* Location Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            {selectedLocation || "All Locations"}
            <FiChevronDown className="text-lg" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setSelectedLocation("")}>All Locations</a>
            </li>
            {uniqueLocations.length > 0 ? (
              uniqueLocations.map((location) => (
                <li key={location}>
                  <a onClick={() => setSelectedLocation(location)}>
                    {location}
                  </a>
                </li>
              ))
            ) : (
              <li>
                <a className="text-gray-400">No locations available</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Venue Cards */}
      <div className="flex flex-wrap gap-6 px-12 py-6 justify-start">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div
              key={venue._id}
              className="card card-dash bg-base-100 w-96 shadow-md"
            >
              <div className="card-body">
                <h2 className="card-title">{venue.name}</h2>
                <p>
                  <strong>Genre:</strong> {venue.genre}
                </p>
                <p>
                  <strong>Location:</strong> {venue.location}
                </p>
                <p>
                  <strong>Price:</strong> ${venue.price}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/bookings?venueId=${venue._id}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No venues found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};
