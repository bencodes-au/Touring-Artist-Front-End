import React from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const AuthButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isAuthenticated = token && !isTokenExpired(token);

  const handleClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } else {
      navigate("/authentication");
    }
  };

  return (
    <button onClick={handleClick} className="auth-button">
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
};

export default AuthButton;
