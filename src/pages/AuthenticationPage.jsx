import React from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AuthenticationPage() {
  return (
    <div className="authentication-container">
      <h1>Login</h1>

      {/* Render the LoginForm component */}
      <LoginForm />

      <h1>Register</h1>

      {/* Render the RegisterForm component */}
      <RegisterForm />
    </div>
  );
}
