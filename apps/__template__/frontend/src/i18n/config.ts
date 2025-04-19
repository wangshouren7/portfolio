export type Locale = (typeof locales)[number];

export const locales = ["en", "zh"] as const;
export const defaultLocale: Locale = "en";
export const localeToName = {
  en: "English",
  zh: "中文",
} as const;
