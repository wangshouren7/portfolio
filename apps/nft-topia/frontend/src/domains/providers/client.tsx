"use client";

import React, { type ComponentProps } from "react";

import { ThemeProvider, useTheme } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { TooltipProvider } from "@pfl-wsr/ui";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import {
  RainbowKitProvider as RainbowKitProviderBase,
  darkTheme,
  lightTheme,
  type Chain,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";

import { sepolia, hardhat } from "wagmi/chains";
import { IS_DEV } from "@/modules/env";
import { appConfig } from "@/app/config";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      {...props}
    />
  );
};

const themeOptions: Parameters<typeof darkTheme>[0] = {
  borderRadius: "small",
  accentColor: "var(--color-primary)",
};

const dark = darkTheme(themeOptions);
const light = lightTheme(themeOptions);

const RainbowkitProvider: React.FC<
  ComponentProps<typeof RainbowKitProviderBase>
> = (props) => {
  const { theme } = useTheme();
  return (
    <RainbowKitProviderBase
      {...props}
      theme={theme === "dark" ? dark : light}
    />
  );
};

const sepoliaTest: Chain = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SEPOLIA_TEST_RPC_URL ?? ""],
    },
  },
};

const wagmiConfig = getDefaultConfig({
  appName: appConfig.name,
  projectId: appConfig.name,
  chains: [sepoliaTest, ...(IS_DEV ? [hardhat] : [])],
  ssr: true,
});

const queryClient = new QueryClient();

interface IProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: IProvidersProps) {
  return (
    <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="dark">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowkitProvider showRecentTransactions modalSize="wide">
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </RainbowkitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
