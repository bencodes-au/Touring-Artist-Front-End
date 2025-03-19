import React, { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AuthModal({ isOpen, closeModal, error }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <dialog id="auth_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="font-bold text-lg text-center">
          Welcome to Touring Artist!
        </h2>
        <p className="py-2 text-center">
          Please log in or register to manage bookings and explore venues.
        </p>

        {/* Tabs for Login and Register */}
        <div className="tabs tabs-boxed flex justify-center">
          <button
            className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "register" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Conditional Rendering of Forms */}
        <div className="mt-4">
          {activeTab === "login" ? (
            <LoginForm closeModal={closeModal} />
          ) : (
            <RegisterForm closeModal={closeModal} />
          )}
        </div>

        {/* Show Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Modal Actions */}
        <div className="modal-action">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
