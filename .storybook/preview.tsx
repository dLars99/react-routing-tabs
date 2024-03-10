import React, { ReactElement } from "react";
import {
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
} from "react-router-dom";
import { Preview, StoryFn } from "@storybook/react";
import { Tabpanel1, Tabpanel2 } from "../src/stories/TabpanelSamples";

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
                element: <Tabpanel1 />,
              },
              {
                path: "tab-2",
                element: <Tabpanel2 />,
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
