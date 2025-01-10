import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import Login from "./Login";

jest.mock("../../apis/Api");

describe("Login Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should show error message on failed login", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const mockResponse = {
      data: {
        success: false,
        message: "Password is incorrect",
      },
    };

    loginUserApi.mockResolvedValue(mockResponse);
    toast.error = jest.fn();

    const email = screen.getByPlaceholderText("Email Address");
    const password = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login Now");

    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUserApi).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "test123",
      });
      expect(toast.error).toHaveBeenCalledWith("Password is incorrect");
    });
  });

  it("Should navigate to registration page on clicking create account", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const createAccountButton = screen.getByText("Create Account");

    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/register');
    });
  });

  it("Should navigate to forgot password page on clicking forgot password", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotPasswordButton = screen.getByText("Forgot Password?");

    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/forgot_password');
    });
  });

  it("Should show email validation error message on invalid email", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const email = screen.getByPlaceholderText("Email Address");
    const password = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login Now");

    fireEvent.change(email, { target: { value: "invalidemail" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Email is empty or invalid")).toBeInTheDocument();
    });
  });
});
