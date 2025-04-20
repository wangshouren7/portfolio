import type { Meta, StoryObj } from "@storybook/react";
import { CreateForm } from "./form";

const meta: Meta<typeof CreateForm> = {
  component: CreateForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof CreateForm>;

export const Default: Story = {
  args: {},
};
export default meta;
