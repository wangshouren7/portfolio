"use client";

import { useNfts } from "@/domains/contracts/hooks";
import { NFTCardList } from "@/domains/nft-card/nft-card-list";
import { pathnames } from "@/domains/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const { value: nfts, loading } = useNfts();
  const t = useTranslations("Basic");

  return (
    <NFTCardList
      emptyChildren={
        <Link
          className="btn mx-auto my-12 btn-lg btn-primary"
          href={pathnames.create()}
        >
          {t("Create first NFT")}
        </Link>
      }
      loading={loading}
      nfts={nfts}
      title={t("Explore NFTs")}
    />
  );
}
