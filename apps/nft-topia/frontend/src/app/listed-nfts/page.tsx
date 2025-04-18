"use client";

import { useItemsListed } from "@/domains/contracts/hooks";
import { NFTCardList } from "@/domains/nft-card/nft-card-list";
import { pathnames } from "@/domains/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ListedNfts() {
  const { value: nfts, loading } = useItemsListed();
  const t = useTranslations("Basic");

  return (
    <NFTCardList
      emptyChildren={
        <Link
          className="btn mx-auto my-12 btn-lg btn-primary"
          href={pathnames.myNft()}
        >
          {t("Sell your NFT")}
        </Link>
      }
      loading={loading}
      nfts={nfts}
      title={t("Listed NFTs")}
    />
  );
}
