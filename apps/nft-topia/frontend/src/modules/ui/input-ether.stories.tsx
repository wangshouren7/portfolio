import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { InputEther } from "./input-ether";

const meta: Meta<typeof InputEther> = {
  component: InputEther,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof InputEther>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export default meta;
