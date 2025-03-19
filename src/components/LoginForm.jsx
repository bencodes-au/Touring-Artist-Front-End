import React, { useState } from "react";
import { useLoginUser } from "../hooks/useLoginUser"; // assuming you are using a custom hook

export function LoginForm({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store error message
  const mutation = useLoginUser();

  const handleSubmit = () => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          closeModal(); // Close the modal when login is successful
        },
        onError: (error) => {
          console.error("Login failed:", error);
          // Set error message to be shown in the UI
          setErrorMessage(
            error.response?.data?.message || "An unexpected error occurred"
          );
        },
      }
    );
  };

  return (
    <div className="login-container">
      <form>
        <div className="login-form-control">
          <label>Email: </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className="login-form-control">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          Login
        </button>
      </form>

      {/* Display error message if login fails */}
      {errorMessage && (
        <p className="text-red-500 text-center mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
