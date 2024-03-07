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

export const Link: Story = {
  args: {
    label: "Hi",
    link: "hi",
    isNav: false,
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
    link: "hi",
    isNav: true,
  },
  render: ({ ...args }) => (
    <RoutingTabs>
      <Tab {...args} />
    </RoutingTabs>
  ),
};

export const WithChildren: Story = {
  args: {
    label: "Hi",
    link: "hi",
  },
  render: ({ ...args }) => (
    <RoutingTabs>
      <Tab {...args}>
        <div style={{ alignItems: "center", display: "flex", gap: "1rem" }}>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "blue",
              height: "2rem",
              width: "2rem",
            }}
          />
          <h3>This is custom content</h3>
        </div>
      </Tab>
    </RoutingTabs>
  ),
};
