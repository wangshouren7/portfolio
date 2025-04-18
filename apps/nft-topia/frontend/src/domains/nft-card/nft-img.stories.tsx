import { type Meta, type StoryObj } from "@storybook/react";
import { NftImg } from "./nft-img";

const meta: Meta<typeof NftImg> = {
  component: NftImg,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-[300px]",
  },
};

type Story = StoryObj<typeof NftImg>;

export const Default: Story = {
  args: {
    imgProps: {
      src: "https://picsum.photos/225/240",
      alt: "example",
    },
  },
};

export const WithChildren: Story = {
  args: {
    imgProps: {
      src: "https://picsum.photos/225/240",
      alt: "with children",
    },
    children: (
      <div className="mt-4 text-center text-sm font-bold">with children</div>
    ),
  },
};
export default meta;
