import React from "react";
import { useNavigate } from "react-router-dom";
import micImage from "../assets/stage.png";

export function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/venues");
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${micImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-100"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Touring Artist</h1>
          <p className="mb-5 text-lg text-white">
            Touring Artists was created by artists, for artists, with the goal
            of making a simple and stress-free alternative for booking
            performers across Australia.
          </p>
          <p className="mb-5 text-lg text-white">
            We understand the challenges of securing the right venue, which is
            why we've built a platform that connects artists with top venues in
            Australia's major cities.
          </p>
          <p className="mb-5 text-lg text-white">
            Whether you're an emerging act or an established artist, Touring
            Artist is here to help you find the perfect stage for your next
            show.
          </p>
          <button className="btn btn-primary" onClick={handleButtonClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
