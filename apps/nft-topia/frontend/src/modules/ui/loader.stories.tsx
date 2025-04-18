import { type Meta, type StoryObj } from "@storybook/react";
import { Loader } from "./loader";

const meta: Meta<typeof Loader> = {
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export default meta;
