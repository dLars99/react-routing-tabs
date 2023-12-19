import React from "react";
import { render, screen } from "@testing-library/react";
import { TabList } from "./TabList";
import "@testing-library/jest-dom";
import { RoutingTabs } from "../../context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const FullTestComponent = ({
  orientation,
}: {
  orientation?: "horizontal" | "vertical";
}) => (
  <RoutingTabs>
    <TabList orientation={orientation}>
      <p>Howdy!</p>
    </TabList>
  </RoutingTabs>
);

const defaultTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent />,
  },
];
const horizontalTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent orientation="horizontal" />,
  },
];
const verticalTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent orientation="vertical" />,
  },
];

describe("TabList", () => {
  it("should throw an error if not wrapped in context", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <TabList>
          <p>Howdy!</p>
        </TabList>
      )
    ).toThrow("TabList should be wrapped in a RoutingTabs component");
    consoleSpy.mockRestore();
  });

  it("should render and display children", async () => {
    const router = createMemoryRouter(defaultTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should render horizontally when indicated", async () => {
    const router = createMemoryRouter(horizontalTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tablist");
    expect(screen.getByRole("tablist")).toHaveClass("tablist__horizontal");
  });

  it("should render vertically when indicated", async () => {
    const router = createMemoryRouter(verticalTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tablist");
    expect(screen.getByRole("tablist")).toHaveClass("tablist__vertical");
  });

  // TODO: keyboard testing
});
