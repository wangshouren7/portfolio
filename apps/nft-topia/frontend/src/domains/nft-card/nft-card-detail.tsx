"use client";
import React from "react";
import { type INft } from "../contracts/types";
import { shortenAddress } from "@/modules/web3/shorten-address";
import { NftImg } from "./nft-img";
import { useCreateMarketSale, useResellToken } from "../contracts/hooks";
import { AsyncButton } from "@/modules/ui/async-button";
import { useAccount } from "wagmi";
import { FormBuilder } from "@/modules/ui/form/form-builder";
import { z } from "zod";
import { type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import { useTranslations } from "next-intl";
import { parseEther } from "viem";
import { InputEther } from "@/modules/ui/input-ether";

const RESELL_SCHEMA = z.object({
  price: z.coerce.number().gt(0),
});

interface IResellFormProps {
  nft: INft;
}

function ResellForm({ nft }: IResellFormProps) {
  const resellToken = useResellToken();
  const t = useTranslations("Basic");
  return (
    <FormBuilder
      className="flex-row"
      items={[
        {
          name: "price",
          label: t("Price"),
          renderControl: (field) => <InputEther {...field} className="mt-0" />,
        },
      ]}
      schema={RESELL_SCHEMA}
      styles={{
        label: {
          className: "hidden",
        },
        description: {
          className: "hidden",
        },
      }}
      submitButtonProps={{
        children: t("Resell"),
      }}
      onSubmit={async (values) => {
        await resellToken(
          nft.tokenId.toString(),
          BigInt(parseEther(values.price.toString())),
        );
      }}
    />
  );
}

interface INftCardDetailProps extends IComponentBaseProps {
  nft: INft;
}

export const NftCardDetail: React.FC<INftCardDetailProps> = ({
  nft,
  ...props
}) => {
  const createMarketSale = useCreateMarketSale();
  const { address } = useAccount();
  const t = useTranslations("Basic");
  const descriptions = [
    {
      title: t("Name"),
      description: nft.name,
    },
    {
      title: t("Owner"),
      description: shortenAddress(nft.owner.toString()),
    },
    {
      title: t("Price"),
      description: nft.price.toString(),
    },
    {
      title: t("Seller"),
      description: shortenAddress(nft.seller.toString()),
    },
  ];

  return mp(
    props,
    <div className="flex w-[80vw] flex-col gap-4 p-4 md:w-[640px]">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <NftImg
          className="w-full md:w-[320px]"
          imgProps={{
            src: nft.file,
            alt: nft.name,
          }}
        />

        <div className="flex flex-1 flex-col justify-between py-2">
          <div className="grid auto-rows-min grid-cols-3 gap-2">
            {descriptions.map(({ title, description }) => (
              <React.Fragment key={title}>
                <div className="text-lg font-semibold">{title}</div>
                <div
                  className="text-md col-span-2 line-clamp-5"
                  title={description}
                >
                  {description}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <p className="text-md">{nft.description}</p>

      {address === nft.owner && <ResellForm nft={nft} />}

      {address !== nft.seller && address !== nft.owner && (
        <AsyncButton
          className="btn-primary"
          onClick={() => createMarketSale(nft.tokenId.toString())}
        >
          {t("Buy")}
        </AsyncButton>
      )}
    </div>,
  );
};
