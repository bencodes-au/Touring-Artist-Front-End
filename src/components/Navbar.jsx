import { Link } from "react-router-dom";
import LoginIndicator from "./LoginIndicator"; // Import the LoginIndicator component

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
      <LoginIndicator /> {/* Show the login status */}
    </nav>
  );
}
