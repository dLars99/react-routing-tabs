import React from "react";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router-dom";
import { Preview, StoryFn } from "@storybook/react";
import { TabpanelSample } from "../src/stories/TabpanelSample";

const initialEntries = [
  {
    pathname: "/",
    state: { rrtId: "abc123" },
  },
];

const memoryRouter = (Story: StoryFn) =>
  createMemoryRouter(
    [
      {
        path: "/",
        element: <Story />,
        children: [
          {
            element: <Outlet />,
            children: [
              {
                path: "tab-1",
                element: <TabpanelSample panelNumber={1} />,
              },
              {
                path: "tab-2",
                element: <TabpanelSample panelNumber={2} />,
              },
              {
                path: "tab-3",
                element: <TabpanelSample panelNumber={3} />,
              },
            ],
          },
        ],
      },
    ],
    { initialEntries }
  );

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [(Story) => <RouterProvider router={memoryRouter(Story)} />],
};

export default preview;
