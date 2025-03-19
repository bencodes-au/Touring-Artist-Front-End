import React, { useState } from "react";
import { useRegisterUser } from "../hooks/useRegisterUser";

export function RegisterForm({ closeModal }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useRegisterUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate(
      { username, phone, email, password },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          console.error(
            "Registration failed:",
            error.response?.data?.message || error.message
          );
        },
      }
    );
  };

  return (
    <div className="register-container flex justify-center items-center h-full">
      <form
        className="w-full max-w-md"
        onSubmit={handleSubmit}
        aria-labelledby="register-heading"
      >
        <h2 id="register-heading" className="text-xl font-bold mb-4">
          Register
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input input-bordered w-full"
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="input input-bordered w-full"
            placeholder="Enter your phone"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
