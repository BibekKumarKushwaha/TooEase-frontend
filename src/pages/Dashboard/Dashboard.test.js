import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { productPagination, productCount } from "../../apis/Api";

// Mock API functions
jest.mock("../../apis/Api");

const mockProducts = {
  data: {
    products: [
      { _id: "1", name: "Test Product", price: 100, productDescription: "Description" },
    ],
  },
};

const mockProductCount = {
  data: {
    productCount: 20,
  },
};

describe("Dashboard Component Tests", () => {
  beforeEach(() => {
    productPagination.mockResolvedValue(mockProducts);
    productCount.mockResolvedValue(mockProductCount);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle search functionality", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Search products..."), { target: { value: "Test Product" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(productPagination).toHaveBeenCalledWith(1, 10, "Test Product", "asc");
    });
  });

  it("should handle sorting functionality", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Price: High to Low"));

    await waitFor(() => {
      expect(productPagination).toHaveBeenCalledWith(1, 10, "", "desc");
    });
  });

  it("should handle pagination functionality", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for pagination buttons to be rendered
    await waitFor(() => {
      // Query for pagination buttons by specific role or class
      const paginationButtons = screen.getAllByRole("button", { name: /Next/i }).filter(
        (btn) => btn.className.includes("page-link")
      );
      expect(paginationButtons).toHaveLength(1); // Ensure there's exactly one pagination "Next" button
    });

    // Get the pagination "Next" button
    const nextButton = screen.getAllByRole("button", { name: /Next/i }).find(
      (btn) => btn.className.includes("page-link")
    );

    // Simulate clicking the "Next" button
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(productPagination).toHaveBeenCalledWith(2, 10, "", "asc");
    });
  });
});
