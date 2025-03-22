import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useVenues = () => {
  return useQuery({
    queryKey: ["venues"],
    queryFn: () => api.get("/venues"),
  });
};
