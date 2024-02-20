import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TabPanelWindow } from "./TabPanelWindow";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <TabPanelWindow isOutlet />,
    children: [
      {
        path: "test",
        element: <div>Howdy!</div>,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/test"],
});

describe("TabPanelWindow", () => {
  it("should render and display children", async () => {
    render(
      <TabPanelWindow>
        <h1>Howdy!</h1>
      </TabPanelWindow>
    );

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should function as an Outlet when isOutlet is true", async () => {
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });
});
