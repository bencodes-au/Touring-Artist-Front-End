import React from "react";
import { RegisterForm } from "../components/RegisterForm";

export function AuthenticationPage() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="">
          <label>Email: </label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="">
          <label>Password: </label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <RegisterForm />
    </div>
  );
}
