import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/modules/ui/header";
import { Footer } from "@/modules/ui/footer";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PDFGenius – AI-Powered PDF Summarizer",
  description:
    "PDFGenius is an application that efficiently summarizes PDFs using AI. Users can upload PDFs, generate concise summaries, and extract key insights quickly. The app streamlines information processing, making research and document analysis effortless.",
  keywords: [
    "PDF",
    "Summarizer",
    "AI",
    "Research",
    "Document Analysis",
    "Next.js",
    "React",
    "Tailwind CSS",
    "PDFGenius",
    "PDF Summarizer",
    "PDF Summarizer App",
    "PDF Summarizer Tool",
    "PDF Summarizer Online",
    "PDF Summarizer Free",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} bg-background font-sans text-foreground antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
