import React, { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RoutingTabs } from "../../context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Tab } from "./Tab";
import { TabList } from "../tablist";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const FullTestComponent = ({
  children,
  link,
}: {
  children?: ReactNode;
  link?: string;
}) => (
  <RoutingTabs>
    <TabList>
      <Tab label="tab1" link={link}>
        {children}
      </Tab>
    </TabList>
  </RoutingTabs>
);

const defaultTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent link="tab2">Howdy!</FullTestComponent>,
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
    expect(() => render(<Tab label="Howdy!" tabIndex={0} />)).toThrow(
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

    await screen.findByRole("tab");
    expect(screen.getByRole("tab")).toHaveAttribute("href");
  });

  it("should render an empty anchor when no link is provided", async () => {
    const router = createMemoryRouter(linklessTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tab");
    expect(screen.getByRole("tab")).toHaveAttribute("href", "/.");
  });

  it("should render the label when no children are provided", async () => {
    const router = createMemoryRouter(linklessTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("tab1");
    expect(screen.getByText("tab1")).toBeInTheDocument();
  });

  it("should navigate to the correct route when clicked", async () => {
    const router = createMemoryRouter(defaultTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tab");
    fireEvent.click(screen.getByRole("tab"));
    expect(router.state.location.pathname).toContain("tab2");
  });
});
