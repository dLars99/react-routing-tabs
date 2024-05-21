import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RoutingTabs } from "../context";
import { Tab, TabList, TabPanelWindow } from "../components";

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
        <Tab name="Tab 1" route="tab-1" />

        <Tab name="Tab 2" route="tab-2" />
      </TabList>

      <TabPanelWindow />
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

      <TabPanelWindow />
    </RoutingTabs>
  ),
};

const data = [
  {
    id: 1,
    name: "Tab 1",
    description: "First tab",
  },
  {
    id: 2,
    name: "Tab 2",
    description: "Second tab",
  },
];
export const Data: Story = {
  args: {
    data: data,
    // @ts-expect-error - 'Partial' on Storybook args disrupts data props type detection
    tabLabelKey: "name",
  },
  render: ({ ...args }) => (
    <RoutingTabs {...args}>
      <TabList />

      <TabPanelWindow />
    </RoutingTabs>
  ),
};
