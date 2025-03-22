import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi, describe } from "vitest";
import { AuthModal } from "../components/AuthModal";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: vi.fn(),
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
});

describe("auth modal tests", () => {
  test("close button works", async () => {
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} closeModal={() => onClose()} />);
    await userEvent.click(screen.getByText("Close"));
    expect(onClose).toBeCalledTimes(1);
  });

  test("login form is displayed when modal is open", () => {
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} closeModal={() => onClose()} />);

    const formTitle = screen.getAllByText("Login");
    expect(formTitle).toHaveLength(2);
  });

  test("sign-up link is available and functional", async () => {
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} closeModal={() => onClose()} />);

    const signUpLink = screen.getByText("Sign Up");
    expect(signUpLink).toBeDefined();

    await userEvent.click(signUpLink);

    const _signUpLink = screen.queryByText("Sign Up");
    const _formTitle = screen.queryByText("Login");

    expect(_formTitle).toBeNull();
    expect(_signUpLink).toBeNull();
  });

  test("register form appears after clicking sign-up", async () => {
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} closeModal={() => onClose()} />);

    const signUpLink = screen.getByText("Sign Up");
    await userEvent.click(signUpLink);

    const loginLink = screen.getByText("Log In");
    expect(loginLink).toBeDefined();

    const registerForm = screen.getAllByText("Register");
    expect(registerForm).toHaveLength(2);
  });
});
