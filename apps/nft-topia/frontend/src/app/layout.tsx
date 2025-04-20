import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/domains/ui/navbar/navbar";
import { getLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import { Providers } from "@/domains/providers";
import { Dock } from "@/domains/ui/dock";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NFT Topia - Your Digital Art Marketplace",
  description:
    "Explore, mint, and trade NFTs on NFT Topia, the leading platform for digital art and collectibles.",
  keywords:
    "NFT, digital art, blockchain, marketplace, collectibles, minting, trading",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as Locale;
  return (
    <html lang={locale}>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <NextIntlClientProvider>
          <Providers>
            <div className="flex h-screen flex-col">
              <Navbar />
              <div className="flex-1 overflow-auto p-4">
                <div className="container mx-auto">{children}</div>
              </div>
              <Dock />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
