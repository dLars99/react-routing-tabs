import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabpanel } from "../components";
import { RoutingTabs } from "../context";
import { Route, Routes } from "react-router-dom";

const meta = {
  title: "Tabpanel",
  component: Tabpanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RoutingTabs>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </RoutingTabs>
    ),
  ],
} satisfies Meta<typeof Tabpanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabpanel>
      <h1>Sample tab panel</h1>
      <p>The appropriate tab will route to this</p>
      <p>See devtools for additional accessibility attributes</p>
    </Tabpanel>
  ),
};
