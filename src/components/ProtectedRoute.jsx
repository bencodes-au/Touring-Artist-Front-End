import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

export const ProtectedRoute = ({ children, openAuthModal }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/");
      openAuthModal();
    }
  }, [token, userId, navigate, openAuthModal]);

  return <>{children}</>;
};
