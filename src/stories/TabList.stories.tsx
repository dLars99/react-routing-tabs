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
  tags: ["autodocs"],
} satisfies Meta<typeof TabList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Nav: Story = {
  render: () => (
    <RoutingTabs>
      <TabList tabIndex={0}>
        <li>Thing 1</li>
        <li>Thing 2</li>
        <li>Thing 3</li>
      </TabList>
    </RoutingTabs>
  ),
};
