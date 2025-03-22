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
        </header>
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
        <div className="pt-2 flex justify-center w-full">
          {activeTab === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                className="btn btn-link"
                onClick={() => setActiveTab("register")}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="btn btn-link"
                onClick={() => setActiveTab("login")}
              >
                Log In
              </button>
            </p>
          )}
        </div>
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
