import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios"; // Import axios
import MockAdapter from "axios-mock-adapter"; // Import axios-mock-adapter
import Requests from "./Requests";

// Mock axios for API requests
jest.mock("axios");

describe("Requests Component", () => {
  test("renders without crashing", () => {
    render(<Requests />);
  });

  test("displays order status", () => {
    const orders = [
      {
        _id: "1",
        totalPrice: 100,
        status: "waiting",
        site: { allocatedBudget: 500 },
        description: "Order 1 Description",
      },
      {
        _id: "2",
        totalPrice: 200,
        status: "declined",
        site: { allocatedBudget: 300 },
        description: "Order 2 Description",
      },
    ];

    render(<Requests />);

    // Mock the response from the axios call
    axios.get.mockResolvedValue({ data: orders });

    // Check if the status tags are displayed
    const waitingStatusTag = screen.getByText("waiting");
    const declinedStatusTag = screen.getByText("declined");

    expect(waitingStatusTag).toBeInTheDocument();
    expect(declinedStatusTag).toBeInTheDocument();
  });

  test("can open and close modal", () => {
    const { getByText, queryByText } = render(<Requests />);
    const approveButton = getByText("Approve");

    // Click the "Approve" button to open the modal
    fireEvent.click(approveButton);

    const saveButton = screen.getByText("Save Data");
    expect(saveButton).toBeInTheDocument();

    // Click the "Close" button in the modal to close it
    const closeButton = getByText("Close");
    fireEvent.click(closeButton);

    // Check if the modal is closed
    const closedModal = queryByText("Save Data");
    expect(closedModal).toBeNull();
  });

  // You can write more test cases as needed
});
