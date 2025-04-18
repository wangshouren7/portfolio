import { useTranslations } from "next-intl";
import { Compass, ShoppingBag, Images, BadgePlus } from "lucide-react";
import { pathnames } from "@/domains/routes";

export function useMenuItems(isDock = false) {
  const t = useTranslations("Basic");

  const menuItems = [
    {
      label: t("Explore NFTs"),
      href: pathnames.home(),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      label: t("Listed NFTs"),
      href: pathnames.listedNft(),
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      label: t("My NFTs"),
      href: pathnames.myNft(),
      icon: <Images className="h-5 w-5" />,
    },
  ];

  if (isDock) {
    menuItems.push({
      label: t("Create NFT"),
      href: pathnames.create(),
      icon: <BadgePlus className="h-5 w-5" />,
    });
  }

  return menuItems;
}
