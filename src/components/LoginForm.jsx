import React, { useState } from "react";
import { useLoginUser } from "../hooks/useLoginUser";

export function LoginForm({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useLoginUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setErrorMessage(
            error.response?.data?.message || "An unexpected error occurred"
          );
        },
      }
    );
  };

  return (
    <div className="login-container flex justify-center items-center h-full">
      <form
        className="w-full max-w-md"
        onSubmit={handleSubmit}
        aria-labelledby="login-form"
      >
        <h2 id="login-form" className="sr-only">
          Login Form
        </h2>{" "}
        {}
        {/* Email Input Field */}
        <div className="form-group mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            aria-describedby="emailHelp"
          />
        </div>
        {/* Password Input Field */}
        <div className="form-group mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            aria-describedby="passwordHelp"
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>
      </form>

      {/* Display error message if login fails */}
      {errorMessage && (
        <div role="alert" className="text-red-500 text-center mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
