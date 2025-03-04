import { useMutation } from "@tanstack/react-query";
import api from "./api";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload) => {
      return api.post("/users/register", payload);
    },
  });
}
