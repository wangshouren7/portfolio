import { type Meta, type StoryObj } from "@storybook/react";
import { BorderBeam } from "./border-beam";

const meta: Meta<typeof BorderBeam> = {
  component: BorderBeam,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="relative h-64 w-64 rounded-xl border border-gray-200 bg-white">
        <div className="flex h-full items-center justify-center">Content</div>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof BorderBeam>;

export const Default: Story = {
  args: {
    size: 50,
    duration: 6,
    delay: 0,
    colorFrom: "#ffaa40",
    colorTo: "#9c40ff",
    reverse: false,
    initialOffset: 0,
  },
};

export const Reverse: Story = {
  args: {
    ...Default.args,
    reverse: true,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colorFrom: "#ff4040",
    colorTo: "#40ff40",
  },
};

export const FastSpeed: Story = {
  args: {
    ...Default.args,
    duration: 2,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 100,
  },
};

export const CustomBorderWidth: Story = {
  args: {
    ...Default.args,
    borderWidth: 3,
  },
};

export default meta;
