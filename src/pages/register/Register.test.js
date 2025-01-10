
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";
import Register from "./Register"; // Component to test

// Mocking the API
jest.mock("../../apis/Api");

describe("Register Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  

  it("Should show success message on successful registration", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const mockResponse = {
      data: {
        success: true,
        message: "Registration successful!",
      },
    };

    registerUserApi.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    const firstName = screen.getByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email Address");
    const phone = screen.getByPlaceholderText("Phone Number");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");
    const signUpButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.change(firstName, { target: { value: "Test1" } });
    fireEvent.change(lastName, { target: { value: "User" } });
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        firstName: "Test1",
        lastName: "User",
        email: "test@gmail.com",
        phone: "1234567890",
        password: "test123",
      });
      expect(toast.success).toHaveBeenCalledWith("Registration successful!");
    });
  });

  it("Should show error message on failed registration", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const mockResponse = {
      response: {
        data: {
          message: "Email already exists",
        },
      },
    };

    registerUserApi.mockRejectedValue(mockResponse);
    toast.error = jest.fn();

    const firstName = screen.getByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email Address");
    const phone = screen.getByPlaceholderText("Phone Number");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");
    const signUpButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.change(firstName, { target: { value: "Test1" } });
    fireEvent.change(lastName, { target: { value: "User" } });
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.change(confirmPassword, { target: { value: "test123" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        firstName: "Test1",
        lastName: "User",
        email: "test@gmail.com",
        phone: "1234567890",
        password: "test123",
      });
      expect(toast.error).toHaveBeenCalledWith("An error occurred. Please try again.");
    });
  });
});
