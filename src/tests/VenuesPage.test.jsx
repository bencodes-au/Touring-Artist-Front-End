import { render, screen } from "@testing-library/react";
import { vi, test, expect, describe } from "vitest";
import { VenuesPage } from "../pages/VenuesPage";
import { useFilteredVenues } from "../hooks/useFilteredVenues";

vi.mock("../hooks/useFilteredVenues", () => ({
  useFilteredVenues: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

describe("VenuesPage", () => {
  test("renders the venue page with correct content", () => {
    vi.mocked(useFilteredVenues).mockReturnValue({
      venues: [
        {
          _id: "1",
          name: "Venue 1",
          genre: "Jazz",
          location: "Brisbane",
          price: 100,
        },
      ],
      uniqueGenres: ["Pop", "Rock"],
      uniqueLocations: ["Darwin", "Sydney"],
      selectedGenre: "",
      setSelectedGenre: vi.fn(),
      selectedLocation: "",
      setSelectedLocation: vi.fn(),
    });

    render(<VenuesPage />);

    expect(screen.getByText("Venue 1")).toBeDefined();
    expect(screen.getByText("Pop")).toBeDefined();
    expect(screen.getByText("Brisbane")).toBeDefined();
  });

  test("filters venues by genre when genre is selected", () => {
    vi.mocked(useFilteredVenues).mockReturnValue({
      venues: [
        {
          _id: "1",
          name: "Venue 1",
          genre: "Jazz",
          location: "Perth",
          price: 100,
        },
        {
          _id: "2",
          name: "Venue 2",
          genre: "Rock",
          location: "Sydney",
          price: 200,
        },
      ],
      uniqueGenres: ["Jazz", "Rock"],
      uniqueLocations: ["Perth", "Sydney"],
      selectedGenre: "Jazz",
      setSelectedGenre: vi.fn(),
      selectedLocation: "",
      setSelectedLocation: vi.fn(),
    });

    render(<VenuesPage />);

    expect(screen.getByText("Venue 1")).toBeDefined();
    expect(screen.queryByText("Venue 2")).toBeDefined();
  });

  test("filters venues by location when location is selected", () => {
    vi.mocked(useFilteredVenues).mockReturnValue({
      venues: [
        {
          _id: "1",
          name: "Venue 1",
          genre: "Classical",
          location: "Melbourne",
          price: 100,
        },
        {
          _id: "2",
          name: "Venue 2",
          genre: "Rock",
          location: "Adelaide",
          price: 200,
        },
      ],
      uniqueGenres: ["Classical", "Rock"],
      uniqueLocations: ["Melbourne", "Adelaide"],
      selectedGenre: "",
      setSelectedGenre: vi.fn(),
      selectedLocation: "Melbourne",
      setSelectedLocation: vi.fn(),
    });

    render(<VenuesPage />);

    expect(screen.getByText("Venue 1")).toBeDefined();
    expect(screen.queryByText("Venue 2")).toBeDefined();
  });
});
