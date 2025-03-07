import { useState, useEffect } from "react";
import axios from "axios";

export const useFilteredVenues = () => {
  const [venues, setVenues] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/venues") // Ensure this matches your backend URL
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        if (Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          console.error("Error: API response is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  // Extract unique genres and locations from the fetched venues
  const uniqueGenres = [
    ...new Set(venues.map((venue) => venue.genre).filter(Boolean)),
  ];
  const uniqueLocations = [
    ...new Set(venues.map((venue) => venue.location).filter(Boolean)),
  ];

  // Apply filtering based on user selection
  const filteredVenues = venues.filter(
    (venue) =>
      (selectedGenre ? venue.genre === selectedGenre : true) &&
      (selectedLocation ? venue.location === selectedLocation : true)
  );

  return {
    venues: filteredVenues,
    uniqueGenres,
    uniqueLocations,
    selectedGenre,
    setSelectedGenre,
    selectedLocation,
    setSelectedLocation,
  };
};
