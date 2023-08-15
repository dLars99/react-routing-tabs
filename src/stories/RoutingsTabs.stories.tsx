import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RoutingTabs } from "../context";
import { Tab } from "../components";

const meta = {
  title: "Routing Tabs",
  component: RoutingTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RoutingTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <RoutingTabs>
      <Tab />
    </RoutingTabs>
  ),
};
