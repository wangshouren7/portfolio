import { type Meta, type StoryObj } from "@storybook/react";
import { Upload } from "./upload";
import { slg } from "./storybook";

const meta: Meta<typeof Upload> = {
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    multiple: false,
    onDrop: (files) => {
      slg.log("Dropped files:", files);
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export default meta;
