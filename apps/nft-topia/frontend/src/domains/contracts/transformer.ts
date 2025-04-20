import { formatEther, type PublicClient } from "viem";
import { type ICreateFormValues } from "../create/form-values";
import { type contracts, type IContractsConfig } from "./config";

export async function marketItemToNft(
  {
    owner,
    seller,
    sold,
    tokenId,
    price,
  }: contracts.NFTMarketplace.MarketItemStruct,
  client: PublicClient,
  configs: IContractsConfig,
) {
  const tokenURI = await client.readContract({
    ...configs.NFTMarketplace,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const json: ICreateFormValues = await fetch(tokenURI, {
    method: "GET",
  }).then((res) => res.json());

  return {
    ...json,
    owner,
    seller,
    sold,
    tokenURI,
    tokenId,
    price: +formatEther(BigInt(price)),
  };
}
