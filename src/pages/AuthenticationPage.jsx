import React, { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AuthenticationPage() {
  // State to track which tab is active (Login or Register)
  const [activeTab, setActiveTab] = useState("login");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-col">
        {" "}
        {/* Ensure vertical layout */}
        {/* Authentication Card Section (Login/Register) */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
          <div className="card-body">
            {/* Welcome Message */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">
                Welcome to Touring Artist!
              </h2>
              <p className="py-2">
                Please log in or register to manage your bookings and explore
                amazing venues.
              </p>
            </div>

            {/* Tabs for Login and Register */}
            <div className="tabs tabs-boxed">
              <a
                className={`tab tab-lifted ${
                  activeTab === "login" ? "tab-active" : ""
                }`}
                onClick={() => handleTabClick("login")}
              >
                Login
              </a>
              <a
                className={`tab tab-lifted ${
                  activeTab === "register" ? "tab-active" : ""
                }`}
                onClick={() => handleTabClick("register")}
              >
                Register
              </a>
            </div>

            {/* Conditional Rendering of LoginForm or RegisterForm */}
            {activeTab === "login" ? (
              <div className="mt-4">
                <LoginForm />
              </div>
            ) : (
              <div className="mt-4">
                <RegisterForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
