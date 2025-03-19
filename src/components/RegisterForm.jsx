import React, { useState } from "react";
import { useRegisterUser } from "../hooks/useRegisterUser";

export function RegisterForm({ closeModal }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useRegisterUser();

  const handleSubmit = () => {
    mutation.mutate(
      { username, phone, email, password },
      {
        onSuccess: () => {
          // Close the modal upon successful registration
          closeModal(); // Close the modal when registration is successful
        },
        onError: (error) => {
          // Handle error case
          console.error(
            "Registration failed:",
            error.response?.data?.message || error.message
          );
        },
      }
    );
  };

  return (
    <div className="register-container">
      <form>
        <div className="register-form-control">
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
        </div>
        <div className="register-form-control">
          <label>Phone: </label>
          <input
            type="tel"
            placeholder="Enter your phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            value={phone}
          />
        </div>
        <div className="register-form-control">
          <label>Email: </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
        </div>
        <div className="register-form-control">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
