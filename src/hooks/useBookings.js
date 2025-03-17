import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useBookings = (userId, token) => {
  const endpoint = `bookings/user/${userId}`;
  const auth = `Bearer ${token}`;

  const query = async () => {
    try {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: auth,
        },
      });

      if (Array.isArray(response.data) && response.data.length === 0) {
        return { noBookings: true };
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);

      if (error.response?.status === 500) {
        return { error: "An error occurred while fetching your bookings." };
      }

      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching bookings."
      );
    }
  };

  return useQuery({
    queryKey: ["Bookings", userId],
    queryFn: query,
    enabled: !!userId && !!token,
    onError: (error) => {
      console.error("Error fetching bookings in query:", error.message);
    },
  });
};
