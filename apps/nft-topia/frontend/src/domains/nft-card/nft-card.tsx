import React from "react";
import { type INft } from "../contracts/types";
import { shortenAddress } from "@/modules/web3/shorten-address";
import { shortenFloat } from "@/modules/math/shorten-float";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  type IComponentBaseProps,
  mp,
} from "@pfl-wsr/ui";
import { NftCardDetail } from "./nft-card-detail";
import { NftImg } from "./nft-img";

interface INftCardProps extends IComponentBaseProps {
  nft: INft;
}

export const NftCard: React.FC<INftCardProps> = ({ nft, ...props }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {mp(
          props,
          <NftImg
            className={`flex cursor-pointer flex-col items-center gap-4`}
            imgProps={{
              src: nft.file,
              alt: nft.name,
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="truncate text-sm font-bold" title={nft.name}>
                {nft.name}
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {shortenFloat(nft.price)}
                  </span>
                  <span>ETH</span>
                </div>
                <div className="font-semibold" title={nft.seller.toString()}>
                  {shortenAddress(nft.seller.toString())}
                </div>
              </div>
            </div>
          </NftImg>,
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-auto">
        <NftCardDetail className="p-0" nft={nft} />
      </DialogContent>
    </Dialog>
  );
};
