import type { Meta } from "@storybook/react";
import { NftCardDetail } from "./nft-card-detail";
import { type INft } from "../contracts/types";

const meta: Meta<typeof NftCardDetail> = {
  component: NftCardDetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const mockNft: INft = {
  name: "NFT Name",
  file: "https://picsum.photos/300/320",
  description:
    "This is a sample NFT card detail, which is used for testing. This is a sample NFT card detail, which is used for testing. This is a sample NFT card detail, which is used for testing. This is a sample NFT card detail, which is used for testing. ",
  price: 0.5,
  tokenId: BigInt(1),
  owner: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  seller: "0x0987654321098765432109876543210987654321" as `0x${string}`,
  sold: false,
  tokenURI: "https://example.com/token/1",
};

export const Default = () => <NftCardDetail nft={mockNft} />;
export default meta;
