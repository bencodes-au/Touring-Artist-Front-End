import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const AuthButton = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isAuthenticated = token && !isTokenExpired(token);

  const handleClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      navigate("/");
    } else {
      onLoginClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-ghost hover:text-primary focus:text-primary transition-all"
    >
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
};

export default AuthButton;
