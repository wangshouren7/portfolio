"use client";
import React, { type ReactNode } from "react";
import { type INft } from "../contracts/types";
import { Loader } from "@/modules/ui/loader";
import { NftCard } from "./nft-card";
import { useScreenSize } from "@/modules/ui/use-screen-size";
import { cn, type IComponentBaseProps, mp } from "@pfl-wsr/ui";

function getGridColSpan(size: number) {
  if (size >= 1500) return "grid-cols-5";
  if (size >= 1200) return "grid-cols-4";
  if (size >= 900) return "grid-cols-3";
  if (size >= 640) return "grid-cols-2";
  return "grid-cols-1";
}

interface INFTCardListProps extends IComponentBaseProps {
  nfts?: INft[];
  loading?: boolean;
  title: ReactNode;
  emptyChildren: ReactNode;
}

export const NFTCardList: React.FC<INFTCardListProps> = (props) => {
  const { nfts, loading, title, emptyChildren } = props;
  const { size } = useScreenSize();

  const gridCols = getGridColSpan(size);
  return mp(
    props,
    <div className="flex flex-col">
      <div>
        <h2>{title}</h2>
      </div>

      {loading && <Loader size="xl" />}

      <div className={cn("grid gap-4", gridCols)}>
        {nfts?.length === 0
          ? emptyChildren
          : nfts?.map((nft) => {
              return (
                <NftCard key={nft.tokenId} className={"col-span-1"} nft={nft} />
              );
            })}
      </div>
    </div>,
  );
};
