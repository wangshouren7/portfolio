"use client";

import { cn, type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useMenuItems } from "./navbar/use-menu-items";

export const Dock: React.FC<IComponentBaseProps> = (props) => {
  const menuItems = useMenuItems(true);
  const pathname = usePathname();

  return mp(
    props,
    <div className="dock static lg:hidden">
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
