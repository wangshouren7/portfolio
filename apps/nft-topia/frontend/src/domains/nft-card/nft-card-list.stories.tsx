import type { Meta, StoryObj } from "@storybook/react";
import { NFTCardList } from "./nft-card-list";
import { range } from "lodash-es";
import { type INft } from "../contracts/types";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof NFTCardList> = {
  title: "Domains/NFTCardList",
  component: NFTCardList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-[80vw]",
  },
};

type Story = StoryObj<typeof NFTCardList>;

const nfts = range(10).map(
  () =>
    ({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraphs({ min: 1, max: 3 }),
      file: faker.image.url({ width: 300, height: 320 }),
      price: faker.number.int({ min: 1, max: 100 }),
      owner: faker.number.hex(42),
      seller: faker.number.hex(42),
      sold: false,
      tokenId: faker.number.hex(42),
      tokenURI: faker.image.url({ width: 300, height: 320 }),
    }) satisfies INft,
);

export const Default: Story = {
  args: {
    nfts,
    loading: false,
    title: "NFT List",
    emptyChildren: <div>没有找到 NFT</div>,
  },
};

export const Loading: Story = {
  args: {
    nfts: [],
    loading: true,
    title: "NFT List",
  },
};

export const Empty: Story = {
  args: {
    nfts: [],
    loading: false,
    title: "NFT List",
    emptyChildren: <div>No NFT found, please create or buy some NFTs!</div>,
  },
};
export default meta;
