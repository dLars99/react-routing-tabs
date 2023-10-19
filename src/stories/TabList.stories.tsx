import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TabList } from "../components";
import { RoutingTabs } from "../context";

const meta = {
  title: "Tab List",
  component: TabList,
  parameters: {
    layout: "centered",
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
      <li>Thing 1</li>
      <li>Thing 2</li>
      <li>Thing 3</li>
    </TabList>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <TabList {...args}>
      <li>Thing 1</li>
      <li>Thing 2</li>
      <li>Thing 3</li>
    </TabList>
  ),
};
