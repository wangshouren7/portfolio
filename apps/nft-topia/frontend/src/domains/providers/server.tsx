import type React from "react";

import { NextIntlClientProvider } from "next-intl";

interface IProvidersProps {
  children: React.ReactNode;
}

export function ServerProviders({ children }: IProvidersProps) {
  return (
    <NextIntlClientProvider locale={"en"}>{children}</NextIntlClientProvider>
  );
}
