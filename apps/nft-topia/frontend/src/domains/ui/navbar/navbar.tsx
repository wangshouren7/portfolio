"use client";

import { cn, type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { appConfig } from "@/app/config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeSwitch } from "@/modules/ui/theme-switch";
import { LocaleSwitcher } from "@/i18n/ui";
import Image from "next/image";
import { useMenuItems } from "./use-menu-items";
import { useAccount } from "wagmi";
import { useTranslations } from "next-intl";
import { GithubLink } from "@/modules/ui/github-link";

export const Navbar: React.FC<IComponentBaseProps> = (props) => {
  const pathname = usePathname();
  const { address } = useAccount();
  const t = useTranslations("Basic");

  const menuItems = useMenuItems();

  return mp(
    props,
    <div className="navbar gap-4 bg-base-100 shadow-sm">
      <Link className="navbar-start flex items-center gap-1" href="/">
        <Image
          alt="logo"
          className="rounded-full"
          height={50}
          src="/images/logo.png"
          width={50}
        />
        <h1 className="text-sm font-bold md:text-lg lg:text-xl">
          {appConfig.name}
        </h1>
      </Link>

      <div className="navbar-end flex items-center gap-2">
        <ul
          className={
            "menu menu-horizontal hidden flex-none items-center menu-lg px-1 lg:inline-flex"
          }
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                className={cn(
                  pathname === item.href && "menu-active",
                  "text-base lg:text-lg",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ConnectButton
          accountStatus={"avatar"}
          chainStatus={"icon"}
          label="Connect"
        />
        {address && (
          <Link className="btn hidden btn-primary lg:flex" href="/create-nft">
            {t("Create NFT")}
          </Link>
        )}
        <ThemeSwitch />
        <LocaleSwitcher />
        <GithubLink className="w-[40px]" iconSize={32} />
      </div>
    </div>,
  );
};
