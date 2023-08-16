import React, { FC, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { RoutingTabs, useRoutingTabs } from "./RoutingTabContext";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const TestConsumer = () => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext)
    throw new Error("Consumer must be wrapped in RoutingTabs");

  const { changeTab, selectedTabIndex } = routingTabContext;

  return (
    <div>
      <p>Howdy!</p>
      <p>{selectedTabIndex}</p>
      <button onClick={() => changeTab(1)}>Increase tab</button>
    </div>
  );
};

const TestComponent = (): JSX.Element => {
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
  return (
    <RoutingTabs config={config}>
      <TestConsumer />
    </RoutingTabs>
  );
};

const routes = [
  {
    path: "*",
    element: <TestComponent />,
  },
];

describe("RoutingTabs", () => {
  it("should render and display children", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/tab-0"] });
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should pass tab info down to consumers", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/tab-0"] });
    render(<RouterProvider router={router} />);

    await screen.findByText("0");
    await screen.findByRole("button");

    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    await screen.findByText("1");
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
