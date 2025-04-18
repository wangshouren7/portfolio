import type { Meta, StoryObj } from "@storybook/react";
import { CirclesLoader } from "./circles-loader";

const meta: Meta<typeof CirclesLoader> = {
  component: CirclesLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof CirclesLoader>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: "mt-4",
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: { backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" },
  },
};

export default meta;
