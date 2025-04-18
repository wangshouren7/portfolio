/** Should be same as in src/app/layout.tsx */

import type { Preview } from "@storybook/react";
import "@/app/globals.css";
import { ClientProviders } from "@/domains/providers/client";
import { Toaster, useMount } from "@pfl-wsr/ui";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../src/i18n/messages/en.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // enable background change to theme change
      const {
        globals: { backgrounds },
      } = context;
      const theme = backgrounds?.value === "#333" ? "dark" : "light";
      const { setTheme } = useTheme();

      useEffect(() => {
        setTheme(theme);
      }, [theme, setTheme]);

      useMount(() => {
        document.body.classList.add(inter.className, "antialiased");
      });

      return <Story />;
    },
    (Story) => (
      <ClientProviders>
        <NextIntlClientProvider locale="en" messages={messages}>
          <Toaster richColors />
          <Story />
        </NextIntlClientProvider>
      </ClientProviders>
    ),
  ],
};

export default preview;
