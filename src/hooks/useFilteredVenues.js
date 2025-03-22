import { useState, useEffect } from "react";
import api from "./api";

export const useFilteredVenues = () => {
  const [venues, setVenues] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    api
      .get("/venues")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          console.error("Error: API response is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  const uniqueGenres = [
    ...new Set(venues.map((venue) => venue.genre).filter(Boolean)),
  ];
  const uniqueLocations = [
    ...new Set(venues.map((venue) => venue.location).filter(Boolean)),
  ];

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
