import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tab } from "../components";
import { RoutingTabs } from "../context";

const meta = {
  title: "Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoLink: Story = {
  args: {
    label: "Hi",
    tabIndex: 0,
  },
  render: ({ ...args }) => (
    <RoutingTabs>
      <Tab {...args} />
    </RoutingTabs>
  ),
};

export const Link: Story = {
  args: {
    label: "Hi",
    link: "./",
    isNav: false,
    tabIndex: 0,
  },
  render: ({ ...args }) => (
    <RoutingTabs>
      <Tab {...args} />
    </RoutingTabs>
  ),
};

export const NavLink: Story = {
  args: {
    label: "Hi",
    link: "./",
    isNav: true,
    tabIndex: 0,
  },
  render: ({ ...args }) => (
    <RoutingTabs>
      <Tab {...args} />
    </RoutingTabs>
  ),
};
