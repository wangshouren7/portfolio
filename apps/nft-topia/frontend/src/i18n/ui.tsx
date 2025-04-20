"use client";
import { cn, mp, type IComponentBaseProps } from "@pfl-wsr/ui";
import React from "react";
import { setUserLocale } from "./actions";
import { locales, localeToName } from "./config";
import { useLocale } from "next-intl";

export const LocaleSwitcher: React.FC<IComponentBaseProps> = (props) => {
  const currentLocale = useLocale();
  return mp(
    props,
    <div className="dropdown dropdown-end">
      <div className="btn btn-square btn-ghost" tabIndex={0}>
        <svg
          className="lucide lucide-languages-icon lucide-languages"
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      </div>
      <ul
        className="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
        tabIndex={0}
      >
        {locales.map((locale) => (
          <li key={locale}>
            <button
              className={cn(locale === currentLocale && "menu-active")}
              onClick={() => setUserLocale(locale)}
            >
              {localeToName[locale]}
            </button>
          </li>
        ))}
      </ul>
    </div>,
  );
};
