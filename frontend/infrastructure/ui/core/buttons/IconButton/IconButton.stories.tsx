import { Meta, StoryObj } from "@storybook/react";

import { Anchor } from "react-feather";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "ui/core/IconButton",
  component: IconButton,
  argTypes: {
    isLoading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: "Icon button",
    isLoading: false,
    Icon: Anchor,
  },
};

export const Loading: Story = {
  args: {
    children: "Icon button",
    isLoading: true,
    Icon: Anchor,
  },
};
