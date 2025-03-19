import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth"; // Helper to check if the token is expired

export const ProtectedRoute = ({ children, openAuthModal }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId || isTokenExpired(token)) {
      // If the token is missing or expired, redirect to home and trigger modal
      console.log("Redirecting to home page due to expired or missing token");
      localStorage.removeItem("token"); // Optional: clear the invalid token
      navigate("/"); // Redirect to home page
      openAuthModal(); // Open the authentication modal from the parent
    }
  }, [token, userId, navigate, openAuthModal]);

  // If authenticated, render protected content
  return <>{children}</>;
};
