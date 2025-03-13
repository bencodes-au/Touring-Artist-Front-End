import { useQuery } from "@tanstack/react-query";
import api from "./api";

const fetchVenues = async () => {
  const response = await api.get("/venues");
  if (!response.ok) throw new Error("Failed to fetch venues");

  const data = await response.json();
  console.log("Fetched Venues:", data);
  return data;
};
export const useVenues = () => {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
  });
};
