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
      <Tab name="Thing 1" route="tab-1">
        Thing 1
      </Tab>
      <Tab name="Thing 2" route="tab-2">
        Thing 2
      </Tab>
      <Tab name="Thing 3" route="tab-3">
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
      <Tab name="Thing 1" route="tab-1">
        Thing 1
      </Tab>
      <Tab name="Thing 2" route="tab-2">
        Thing 2
      </Tab>
      <Tab name="Thing 3" route="tab-3">
        Thing 3
      </Tab>
    </TabList>
  ),
};
