import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthButton from "./AuthButton";
import "../styles/navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <p>Touring Artist</p>
        </NavLink>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/venues" onClick={closeMenu}>
            Venues
          </NavLink>
          <NavLink to="/bookings" onClick={closeMenu}>
            Bookings
          </NavLink>
          {/* Authentication Button */}
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
