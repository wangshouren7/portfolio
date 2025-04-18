"use client";

import { useMyNfts } from "@/domains/contracts/hooks";
import { NFTCardList } from "@/domains/nft-card/nft-card-list";
import { pathnames } from "@/domains/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MyNfts() {
  const { value: nfts, loading } = useMyNfts();
  const t = useTranslations("Basic");

  return (
    <NFTCardList
      emptyChildren={
        <Link
          className="btn mx-auto my-12 btn-lg btn-primary"
          href={pathnames.home()}
        >
          {t("Buy your first NFT")}
        </Link>
      }
      loading={loading}
      nfts={nfts}
      title={t("My NFTs")}
    />
  );
}
