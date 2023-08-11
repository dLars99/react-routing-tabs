import type { Meta, StoryObj } from "@storybook/react";

import { Tab } from "../components";

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

export const Nav: Story = {
  args: {
    isNav: true,
  },
};
