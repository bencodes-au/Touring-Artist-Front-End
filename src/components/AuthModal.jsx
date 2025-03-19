import React, { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AuthModal({ isOpen, closeModal, error }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <dialog
      id="auth_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <div className="modal-box">
        {/* Modal Header */}
        <header>
          <h2
            id="auth-modal-title"
            className="font-bold text-lg text-center"
            aria-live="polite"
          >
            Welcome to Touring Artist!
          </h2>
          <p
            id="auth-modal-description"
            className="py-2 text-center"
            aria-live="polite"
          >
            Please log in or register to manage bookings and explore venues.
          </p>
        </header>

        {/* Tabs for Login and Register */}
        <nav>
          <div
            className="tabs tabs-boxed flex justify-center"
            aria-label="Login and Register tabs"
          >
            <button
              className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("login")}
              aria-selected={activeTab === "login"}
              aria-controls="login-form"
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === "register" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("register")}
              aria-selected={activeTab === "register"}
              aria-controls="register-form"
            >
              Register
            </button>
          </div>
        </nav>

        {/* Load the appropriate Form */}
        <main>
          <div className="mt-4">
            {activeTab === "login" ? (
              <LoginForm closeModal={closeModal} />
            ) : (
              <RegisterForm closeModal={closeModal} />
            )}
          </div>
        </main>

        {/* Show Error Message */}
        {error && (
          <section aria-live="assertive">
            <p className="text-red-500 text-center mt-2">{error}</p>
          </section>
        )}

        {/* Close Button */}
        <footer>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
