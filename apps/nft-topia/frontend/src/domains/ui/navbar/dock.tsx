"use client";
import { cn, type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import React from "react";
import { useMenuItems } from "./use-menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Dock: React.FC<IComponentBaseProps> = (props) => {
  const menuItems = useMenuItems(true);
  const pathname = usePathname();

  return mp(
    props,
    <div className="dock lg:hidden">
      {menuItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          className={cn(pathname === href && "dock-active")}
          href={href}
        >
          {icon}
          <span className="dock-label">{label}</span>
        </Link>
      ))}
    </div>,
  );
};
