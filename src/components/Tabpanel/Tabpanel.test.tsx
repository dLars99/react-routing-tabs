import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tabpanel } from "./Tabpanel";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { RoutingTabs } from "../../context";
import { enableFetchMocks } from "jest-fetch-mock";
import { TabPanelWindow } from "../TabPanelWindow";

enableFetchMocks();

const TestComponent = () => (
  <RoutingTabs>
    <TabPanelWindow>
      <Tabpanel>
        <h1>Test Tabpanel</h1>
        <p>Howdy!</p>
        <p>This is for testing purposes</p>
      </Tabpanel>
    </TabPanelWindow>
  </RoutingTabs>
);

const initialEntries = [
  {
    pathname: "/",
    state: { rrtId: "abc123" },
  },
];

const routes = [
  {
    path: "*",
    element: <TestComponent />,
  },
];

describe("Tabpanel", () => {
  it("should render and display children", async () => {
    const router = createMemoryRouter(routes, { initialEntries });
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should render accessibility attributes", async () => {
    const router = createMemoryRouter(routes, { initialEntries });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tabpanel");
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "id",
      "rrtPanel-abc123"
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      "rrtTab-abc123"
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute("tabindex", "0");
  });

  it("should throw an error if not wrapped in context", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<Tabpanel />)).toThrow(
      "Tabpanel must be wrapped in a RoutingTabs component"
    );
    consoleSpy.mockRestore();
  });

  it("should warn in the console if id is not found", async () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    const rrtIdError =
      "Unable to get panel id from router state. This may affect the accessibility of this page. To fix this, make sure your Tabs and Tabpanel are inside a react-router-dom Router component.";

    expect(consoleSpy).toHaveBeenCalledWith(rrtIdError);
    consoleSpy.mockRestore();
  });
});
