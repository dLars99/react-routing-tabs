import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tab, TabList } from "../components";
import { RoutingTabs } from "../context";

const meta = {
  title: "Tab List",
  component: TabList,
  parameters: {
    layout: "centered",
  },
  args: {
    selectionMethod: "automatic",
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    selectionMethod: {
      options: ["manual", "automatic"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RoutingTabs>
        <Story />
      </RoutingTabs>
    ),
  ],
} satisfies Meta<typeof TabList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <TabList {...args}>
      <Tab label="Thing 1" link="tab-1">
        Thing 1
      </Tab>
      <Tab label="Thing 2" link="tab-2">
        Thing 2
      </Tab>
      <Tab label="Thing 3" link="tab-3">
        Thing 3
      </Tab>
    </TabList>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <TabList {...args}>
      <Tab label="Thing 1" link="tab-1">
        Thing 1
      </Tab>
      <Tab label="Thing 2" link="tab-2">
        Thing 2
      </Tab>
      <Tab label="Thing 3" link="tab-3">
        Thing 3
      </Tab>
    </TabList>
  ),
};
