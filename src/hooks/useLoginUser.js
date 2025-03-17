import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "./api";

export function useLoginUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        console.log("Login Payload:", payload);

        const response = await api.post("/users/login", payload);
        console.log("Login response:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user_id);
          navigate("/");
        } else {
          throw new Error("Token or User ID not found in response");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      }
    },
  });
}
