import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TabList } from "./TabList";
import "@testing-library/jest-dom";
import { RoutingTabs, RoutingTabsConfig } from "../../context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const FullTestComponent = <T,>({
  config,
  data,
  orientation,
  tabLabelKey,
}: {
  config?: RoutingTabsConfig[];
  data?: T[];
  orientation?: "horizontal" | "vertical";
  tabLabelKey?: keyof T;
}) => (
  // @ts-expect-error config should never be present and undefined
  <RoutingTabs config={config} data={data} tabLabelKey={tabLabelKey}>
    <TabList orientation={orientation}>
      <p>Howdy!</p>
    </TabList>
  </RoutingTabs>
);

const config = [
  {
    name: "Tab 0",
    route: "tab-0",
  },
  {
    name: "Tab 1",
    route: "tab-1",
  },
];

const data = [
  {
    name: "Tab 0",
    other: "Hey",
  },
  {
    name: "Tab 1",
    other: "Ya",
  },
];

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
const configTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent config={config} orientation="vertical" />,
  },
];
const dataTestRoutes = [
  {
    path: "*",
    element: <FullTestComponent data={data} tabLabelKey="name" />,
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

  it("should render a tablist", async () => {
    const router = createMemoryRouter(horizontalTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByRole("tablist");
    expect(screen.getByRole("tablist")).toBeInTheDocument();
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

  it("should autogenerate tabs from a config", async () => {
    const router = createMemoryRouter(configTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("Tab 1");
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("should autogenerate tabs from data", async () => {
    const router = createMemoryRouter(dataTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("Tab 1");
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("should navigate by keyboard", async () => {
    const router = createMemoryRouter(dataTestRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findAllByRole("tablist");
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    fireEvent.keyDown(screen.getByRole("tablist"), {
      key: "ArrowRight",
      code: "ArrowRight",
      charCode: 39,
    });
    await screen.findByText("Tab 1");
    expect(tabs[1]).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("tablist"), {
      key: "ArrowLeft",
      code: "ArrowLeft",
      charCode: 37,
    });
    await screen.findByText("Tab 0");
    expect(tabs[0]).toHaveFocus();
  });
});
