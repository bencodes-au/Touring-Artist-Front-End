import React from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AuthenticationPage() {
  return (
    <div className="authentication-container">
      <h2>Login</h2>

      {/* Render the LoginForm component */}
      <LoginForm />

      <h2>Register</h2>

      {/* Render the RegisterForm component */}
      <RegisterForm />
    </div>
  );
}
