import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RoutingTabs } from "../../context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Tab } from "./Tab";
import { TabList } from "../tablist";

const FullTestComponent = ({ link }: { link?: string }) => (
  <RoutingTabs>
    <TabList>
      <Tab label="tab1" link={link}>
        Howdy!
      </Tab>
    </TabList>
  </RoutingTabs>
);

const defaultTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent link="tab2" />,
  },
];

const linklessTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent />,
  },
];

describe("Tab", () => {
  it("should throw an error if not wrapped in context", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<Tab label="Howdy!" />)).toThrow(
      "Tab must be wrapped in a RoutingTabs component"
    );
    consoleSpy.mockRestore();
  });

  it("should render a tab", async () => {
    const router = createMemoryRouter(defaultTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tab");
    expect(screen.getByRole("tab")).toBeInTheDocument();
  });

  it("should render children", async () => {
    const router = createMemoryRouter(defaultTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should render a link when a link is provided", async () => {
    const router = createMemoryRouter(defaultTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("link");
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should render a button when no link is provided", async () => {
    const router = createMemoryRouter(linklessTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("button");
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
