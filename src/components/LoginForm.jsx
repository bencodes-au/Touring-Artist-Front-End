import React, { useState } from "react";
import { useLoginUser } from "../hooks/useLoginUser";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLoginUser();

  function handleSubmit() {
    mutation.mutate({ email, password });
  }

  return (
    <div className="login-container">
      <form>
        <div className="login-form-control">
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
        <div className="login-form-control">
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
          Login
        </button>
      </form>
    </div>
  );
}
