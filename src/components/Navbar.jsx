import { Link } from "react-router-dom";

export function Navbar(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/venues">Venues</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
          <Link to="/authentication">Authentication</Link>
        </li>
      </ul>
    </nav>
  );
}
