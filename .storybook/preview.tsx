import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Preview } from "@storybook/react";

const initialRoute = {
  pathname: "/",
  state: { rrtId: "abc123" },
};

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
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[initialRoute]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
