import { type Meta, type StoryObj } from "@storybook/react";
import { type Upload } from "./upload";
import { Button, toast } from "@pfl-wsr/ui";

const meta: Meta<typeof Upload> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Button>;

export const ContractConfirming: Story = {
  args: {
    children: "Click me",
    onClick: () => {
      toast.loading(
        <div>
          Transaction is being sent, please wait
          <a
            className="ml-1 link"
            href={"https://www.google.com"}
            rel="noreferrer"
            target="_blank"
          >
            confirming
          </a>
          ...
        </div>,
      );
    },
  },
};

export default meta;
