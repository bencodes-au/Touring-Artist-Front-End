import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useBookings = (userId, token) => {
  const endpoint = `bookings/user/${userId}`;
  const auth = `Bearer ${token}`;
  const query = () =>
    api.get(endpoint, {
      headers: {
        Authorization: auth,
      },
    });
  return useQuery({
    queryKey: ["Bookings", userId],
    queryFn: query,
    enabled: !!userId && !!token,
  });
};
