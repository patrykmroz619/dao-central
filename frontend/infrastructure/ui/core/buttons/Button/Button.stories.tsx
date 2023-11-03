import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "ui/core/Button",
  component: Button,
  argTypes: {
    isLoading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    isLoading: true,
  },
};
