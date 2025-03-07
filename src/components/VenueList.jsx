import { useVenues } from "../hooks/useVenues";

const VenueList = () => {
  const { data: venues = [], error } = useVenues();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Available Venues</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue._id}>
            <strong>{venue.name}</strong>
            <div>Genre: {venue.genre}</div>
            <div>Location: {venue.location}</div>
            <div>Address: {venue.address}</div>
            <div>Phone: {venue.phone}</div>
            <div>Price: ${venue.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
