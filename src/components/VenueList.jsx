import { useVenues } from "../hooks/useVenues";

const VenueList = () => {
  const { data: venues = [], error } = useVenues();

  if (error) {
    return <p role="alert">Error: {error.message}</p>;
  }

  return (
    <section aria-labelledby="venues-heading">
      <h2 id="venues-heading">Available Venues</h2>

      {venues.length === 0 ? (
        <p>No venues available at the moment.</p>
      ) : (
        <ul>
          {venues.map((venue) => (
            <li key={venue._id}>
              <article aria-labelledby={`venue-${venue._id}`}>
                <h3 id={`venue-${venue._id}`}>{venue.name}</h3>

                <dl>
                  <div>
                    <dt>Genre:</dt>
                    <dd>{venue.genre}</dd>
                  </div>
                  <div>
                    <dt>Location:</dt>
                    <dd>{venue.location}</dd>
                  </div>
                  <div>
                    <dt>Address:</dt>
                    <dd>{venue.address}</dd>
                  </div>
                  <div>
                    <dt>Phone:</dt>
                    <dd>{venue.phone}</dd>
                  </div>
                  <div>
                    <dt>Price:</dt>
                    <dd>${venue.price}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default VenueList;
