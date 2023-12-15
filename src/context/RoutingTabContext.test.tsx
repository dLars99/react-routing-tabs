import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { RoutingTabs, useRoutingTabs } from "./RoutingTabContext";
import { enableFetchMocks } from "jest-fetch-mock";
import { TabList } from "../components/tablist";

enableFetchMocks();

const TestConsumer = () => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext)
    throw new Error("Consumer must be wrapped in RoutingTabs");

  const { changeTab, selectedTabIndex } = routingTabContext;

  return (
    <TabList>
      <p>Howdy!</p>
      <p>{selectedTabIndex}</p>
      <button onClick={() => changeTab(1)}>Increase tab</button>
    </TabList>
  );
};

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

const brokenConfig = [
  {
    spork: "1",
  },
  {
    name: "Tab 1",
    route: "tab-1",
  },
];

const TestConfigComponent = ({ config }: { config: any }): JSX.Element => {
  return (
    <RoutingTabs config={config}>
      <TestConsumer />
    </RoutingTabs>
  );
};

const configRoutes = [
  {
    path: "*",
    element: <TestConfigComponent config={config} />,
  },
];

const brokenConfigRoutes = [
  {
    path: "*",
    element: <TestConfigComponent config={brokenConfig} />,
  },
];

const complexData = [
  {
    name: "Mike",
    age: 26,
  },
  {
    name: "Mike",
    age: 32,
  },
  {
    name: "Ike",
    age: 47,
  },
];

const brokenComplexData = [
  {
    name: "Mike",
    age: 26,
  },
  {
    age: 32,
  },
];

const primitiveData = ["Item 1", "Item 2", "Item 3"];

const TestDataComponent = ({ data }: { data: any }): JSX.Element => {
  return (
    <RoutingTabs data={data} tabLabelKey="name">
      <TestConsumer />
    </RoutingTabs>
  );
};

const complexDataRoutes = [
  {
    path: "*",
    element: <TestDataComponent data={complexData} />,
  },
];

const primitiveDataRoutes = [
  {
    path: "*",
    element: <TestDataComponent data={primitiveData} />,
  },
];

const brokenDataRoutes = [
  {
    path: "*",
    element: <TestDataComponent data={brokenComplexData} />,
  },
];

const TestDefaultComponent = (): JSX.Element => {
  return (
    <RoutingTabs>
      <TestConsumer />
    </RoutingTabs>
  );
};

const defaultRoutes = [
  {
    path: "*",
    element: <TestDefaultComponent />,
  },
];

describe("RoutingTabs", () => {
  it("should render and display children", async () => {
    const router = createMemoryRouter(configRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("Howdy!");
    expect(screen.getByText("Howdy!")).toBeInTheDocument();
  });

  it("should pass tab info down to consumers", async () => {
    const router = createMemoryRouter(configRoutes, {
      initialEntries: ["/tab-0"],
    });
    render(<RouterProvider router={router} />);

    await screen.findByText("0");

    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    await screen.findByText("1");
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(router.state.location.pathname).toContain("tab-1");
  });
});

it("should render with a primitive data array", async () => {
  const router = createMemoryRouter(primitiveDataRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);

  await screen.findByText("Howdy!");
  expect(screen.getByText("Howdy!")).toBeInTheDocument();
});

it("should render with complex data and tabLabel", async () => {
  const router = createMemoryRouter(complexDataRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);

  await screen.findByText("Howdy!");
  expect(screen.getByText("Howdy!")).toBeInTheDocument();
});

it("should render with default props", async () => {
  const router = createMemoryRouter(defaultRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);

  await screen.findByText("Howdy!");
  expect(screen.getByText("Howdy!")).toBeInTheDocument();
});

it("should append to duplicate route keys", async () => {
  const router = createMemoryRouter(complexDataRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);

  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("1");
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(router.state.location.pathname).toContain("mike-1");
});

it("should reroute to first tab if no tab is in url", async () => {
  const router = createMemoryRouter(configRoutes, { initialEntries: ["/"] });
  render(<RouterProvider router={router} />);

  expect(router.state.location.pathname).toContain("tab-0");
});

it("should select the current tab from the url if one is provided", async () => {
  const router = createMemoryRouter(configRoutes, {
    initialEntries: ["/tab-1"],
  });
  render(<RouterProvider router={router} />);

  await screen.findByText("1");
  expect(screen.getByText("1")).toBeInTheDocument();
});

it("should throw an error if a config item is missing required properties", async () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const router = createMemoryRouter(brokenConfigRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);
  await screen.findByText("Missing required properties in RoutingTabs config");
  expect(
    screen.getByText("Missing required properties in RoutingTabs config")
  ).toBeInTheDocument();

  consoleSpy.mockRestore();
});

it("should throw an error if a data item is missing the tabLabelKey", async () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const router = createMemoryRouter(brokenDataRoutes, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);
  await screen.findByText(
    "RoutingTabs data item missing property named by tabLabelKey"
  );
  expect(
    screen.getByText(
      "RoutingTabs data item missing property named by tabLabelKey"
    )
  ).toBeInTheDocument();

  consoleSpy.mockRestore();
});
