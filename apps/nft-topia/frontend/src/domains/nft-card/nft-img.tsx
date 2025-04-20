"use client";
import { Loader } from "@/modules/ui/loader";
/* eslint-disable @next/next/no-img-element */
import { cn, mp } from "@pfl-wsr/ui";
import React, { useState } from "react";

const NFT_IMG_SIZES = {
  md: {
    width: 225,
    height: 240,
  },
  lg: {
    width: 300,
    height: 320,
  },
} as const;

interface INftImgProps extends React.ComponentProps<"div"> {
  imgProps: React.ComponentProps<"img">;
}

export const NftImg: React.FC<INftImgProps> = ({
  imgProps,
  children,
  ...divProps
}) => {
  const [loading, setLoading] = useState(true);
  return mp(
    divProps,
    <div
      {...divProps}
      className={`relative rounded-2xl bg-primary/10 p-4 shadow-2xl`}
    >
      {loading && (
        <Loader
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="lg"
        />
      )}

      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          alt={"nft image"}
          className={cn("h-full w-full rounded-2xl object-cover")}
          height={"100%"}
          width={"100%"}
          {...imgProps}
          onLoad={(e) => {
            setLoading(false);
            imgProps.onLoad?.(e);
          }}
        />
      </div>

      {children}
    </div>,
  );
};

export { NFT_IMG_SIZES };
