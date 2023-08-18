import type { Meta, StoryObj } from "@storybook/react";

import { TabList } from "../components";

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

export const Nav: Story = {};
