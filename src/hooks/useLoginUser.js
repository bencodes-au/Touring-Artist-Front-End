import { useMutation } from "@tanstack/react-query";
import api from "./api";

export function useLoginUser() {
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/users/login", payload);
        console.log("Login response:", response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user_id);
        } else {
          throw new Error("Token or User ID not found in response");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  });
}
