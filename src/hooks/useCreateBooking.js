import api from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      const token = localStorage.getItem("token");
      return api.post("/bookings", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Bookings", variables.userId],
      });
    },
  });
};
