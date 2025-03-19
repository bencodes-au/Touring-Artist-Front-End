import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthButton from "./AuthButton";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
  };

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
              <FaTimes className="inline-block h-6 w-6" />
            ) : (
              <FaBars className="inline-block h-6 w-6" />
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
              role="tab"
            >
              Home
            </NavLink>
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                `tab ${isActive ? "tab-active" : ""}`
              }
              role="tab"
            >
              Venues
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `tab ${isActive ? "tab-active" : ""}`
              }
              role="tab"
            >
              Bookings
            </NavLink>
          </div>
        </div>

        {/* Authentication Button */}
        <div className="hidden lg:block">
          <AuthButton onLoginClick={openAuthModal} />
        </div>

        {/* Authentication Button on Mobile */}
        <div className="lg:hidden">
          <AuthButton onLoginClick={openAuthModal} />
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        closeModal={closeAuthModal}
        error={null}
      />
    </nav>
  );
}
