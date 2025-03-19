import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthButton from "./AuthButton";
import "../styles/navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md relative">
      <div className="navbar-container flex justify-between items-center p-4">
        {/* Logo */}
        <NavLink to="/" className="logo text-xl font-bold">
          Touring Artist
        </NavLink>
        {/* Hamburger Menu (Mobile) */}
        <div className="lg:hidden">
          <button className="btn btn-ghost text-xl" onClick={toggleMenu}>
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {/* Navigation Tabs (Dropdown on Mobile) */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row absolute lg:static top-full left-0 w-full bg-base-100 shadow-lg lg:shadow-none z-50`}
        >
          <div
            role="tablist"
            className="tabs tabs-boxed flex flex-col lg:flex-row gap-2 p-2"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `tab ${isActive ? "tab-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
              role="tab"
            >
              Home
            </NavLink>
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                `tab ${isActive ? "tab-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
              role="tab"
            >
              Venues
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `tab ${isActive ? "tab-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
              role="tab"
            >
              Bookings
            </NavLink>
          </div>
        </div>
        {/* Authentication Button */}
        <div className="hidden lg:block">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
