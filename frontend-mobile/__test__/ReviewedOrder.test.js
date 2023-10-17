import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ReviewedOrders from "../screen/ReviewedOrders";

const mockAxios = new MockAdapter(axios);

describe("ReviewedOrders Component", () => {
  beforeEach(() => {
    mockAxios.onGet(`http://${Ip}:8072/orderReview`).reply(200, [
      {
        _id: "652bff97d3d8ddb7c09c6caa",
        orderID: "652b54a2abd2f6bd23f68c6d",
        productList: [
          {
            isComplete: true,
            product: "Sand",
            price: 2000,
            qnty: 42,
            supplier: "6528eb3154ff334565b6d79d",
            _id: "652b54a2abd2f6bd23f68c6e",
          },
          {
            isComplete: false,
            product: "Iron bars",
            price: 1800,
            qnty: 75,
            supplier: "6528eb8654ff334565b6d7a5",
            _id: "652b54a2abd2f6bd23f68c6f",
          },
        ],
        review: "",
        deliveryList: [],
        site: "65279cf589fe12ad8121b6d0",
        placedDate: "2023-10-15",
        requiredDate: "02/10/2023",
        approvalStatus: false,
        status: "waiting",
        totalPrice: 219000,
        __v: 0,
      },
    ]);
  });

  it("renders the component", async () => {
    render(<ReviewedOrders />);

    await waitFor(() => {
      screen.getByText("Content you expect to see in your component");
    });

    expect(screen.getByText("Some Text")).toBeInTheDocument();
  });
});
