"use client";
import { useTranslations } from "next-intl";
import { CreateForm } from "@/domains/create/form";

export default function Create() {
  const t = useTranslations("Basic");

  return (
    <div>
      <div>
        <h2>{t("Create NFT")}</h2>
      </div>

      <CreateForm />
    </div>
  );
}
