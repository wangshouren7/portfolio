import type { Meta, StoryObj } from "@storybook/react";
import { NftCard } from "./nft-card";

const meta: Meta<typeof NftCard> = {
  component: NftCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-[300px]",
  },
};

type Story = StoryObj<typeof NftCard>;

const nft = {
  owner: "0x1234567890123456789012345678901234567890",
  seller: "0x0987654321098765432109876543210987654321",
  sold: false,
  tokenURI: "https://example.com/token/1",
  tokenId: 1n,
  name: "示示例示例示例示例示例示例示例示例示例示例示例示例例 NFT",
  description: "这是一个示例 NFT 卡片",
  file: "https://picsum.photos/225/240",
  price: 0.001,
} as const;

export const Default: Story = {
  render: () => <NftCard className="w-[300px]" nft={nft} />,
};
export default meta;
