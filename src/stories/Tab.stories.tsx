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
  decorators: [
    (Story) => (
      <RoutingTabs>
        <Story />
      </RoutingTabs>
    ),
  ],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    label: "Hi",
    link: "tab-1",
    isNav: false,
  },
  render: ({ ...args }) => <Tab {...args} />,
};

export const NavLink: Story = {
  args: {
    label: "Hi",
    link: "tab-1",
    isNav: true,
  },
  render: ({ ...args }) => <Tab {...args} />,
};

export const WithChildren: Story = {
  args: {
    label: "Hi",
    link: "tab-1",
  },
  render: ({ ...args }) => (
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
  ),
};
