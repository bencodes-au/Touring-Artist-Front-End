import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test, expect, describe, afterEach } from "vitest";
import { AuthButton } from "../components/AuthButton";

vi.mock("../utils/auth", async () => {
  const authModule = await import("../utils/auth");
  return {
    ...authModule,
    isTokenExpired: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("AuthButton", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("renders 'Log In' when not authenticated", () => {
    render(<AuthButton onLoginClick={() => {}} />);
    const loginButton = screen.queryByRole("button", { name: /log in/i });
    expect(loginButton).toBeTruthy();
  });

  test("renders 'Log Out' when authenticated", async () => {
    localStorage.setItem("token", "valid-token");

    const { isTokenExpired } = await import("../utils/auth");
    isTokenExpired.mockReturnValue(false);

    render(<AuthButton onLoginClick={() => {}} />);
    const logoutButton = screen.queryByRole("button", { name: /log out/i });
    expect(logoutButton).toBeTruthy();
  });

  test("calls onLoginClick when not authenticated", () => {
    const onLoginClick = vi.fn();
    render(<AuthButton onLoginClick={onLoginClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  test("logs out and navigates when authenticated", async () => {
    localStorage.setItem("token", "valid-token");
    localStorage.setItem("userId", "123");

    const { isTokenExpired } = await import("../utils/auth");
    isTokenExpired.mockReturnValue(false);

    const { useNavigate } = await import("react-router-dom");
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<AuthButton onLoginClick={() => {}} />);

    fireEvent.click(screen.getByRole("button"));

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
