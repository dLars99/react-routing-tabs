import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RoutingTabs } from "../context";
import { Tab, TabList, TabPanelWindow } from "../components";
import { useLocation } from "react-router-dom";

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
        <Tab label="Tab 1" link="tab-1" />

        <Tab label="Tab 2" link="tab-2" />
      </TabList>

      <TabPanelWindow isOutlet />
    </RoutingTabs>
  ),
};

const config = [
  {
    name: "Tab 1",
    route: "tab-1",
  },
  {
    name: "Tab 2",
    route: "tab-2",
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
