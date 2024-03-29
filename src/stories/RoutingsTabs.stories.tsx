import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RoutingTabs } from "../context";
import { Tab, TabList } from "../components";

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

export const Default: Story = {
  render: () => (
    <RoutingTabs>
      <TabList>
        <Tab label="Tab" />
      </TabList>
    </RoutingTabs>
  ),
};

const config = [
  {
    name: "Tab 1",
    route: "first",
  },
  {
    name: "Tab 2",
    route: "second",
  },
];
export const Config: Story = {
  args: {
    config,
  },
  render: ({ ...args }) => (
    <RoutingTabs {...args}>
      <TabList />
    </RoutingTabs>
  ),
};

const data = [
  {
    name: "Tab 1",
    description: "First tab",
  },
  {
    name: "Tab 2",
    description: "Second tab",
  },
];
export const Data: Story = {
  args: {
    data: data,
    tabLabelKey: "name",
  },
  render: ({ ...args }) => (
    <RoutingTabs {...args}>
      <TabList />
    </RoutingTabs>
  ),
};
