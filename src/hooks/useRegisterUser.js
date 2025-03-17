import { useMutation } from "@tanstack/react-query";
import api from "./api";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const registerResponse = await api.post("/users/register", payload);

        if (registerResponse.data) {
          const loginPayload = {
            email: payload.email,
            password: payload.password,
          };
          const loginResponse = await api.post("/users/login", loginPayload);

          if (loginResponse.data.token) {
            localStorage.setItem("token", loginResponse.data.token);
            localStorage.setItem("userId", loginResponse.data.user_id);
            localStorage.setItem(
              "user",
              JSON.stringify(loginResponse.data.user)
            );
          } else {
            throw new Error("Login failed: No token found in response");
          }

          return loginResponse.data;
        } else {
          throw new Error("Registration failed: No response data");
        }
      } catch (error) {
        console.error("Registration/Login error:", error);
        throw error;
      }
    },
  });
}
