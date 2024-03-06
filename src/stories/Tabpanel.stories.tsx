import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabpanel } from "../components";
import { RoutingTabs } from "../context";

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
        <Story />
      </RoutingTabs>
    ),
  ],
} satisfies Meta<typeof Tabpanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabpanel style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Sample tab panel</h1>
      <p>The appropriate tab will route to this</p>
      <p>See devtools for additional accessibility attributes</p>
    </Tabpanel>
  ),
};
