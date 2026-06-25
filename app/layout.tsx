import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://iptv-player.vercel.app"),
  title: {
    default: "NONTON — Live TV, Movies & Series Gratis",
    template: "%s | NONTON",
  },
  description:
    "Nonton 950+ channel TV Indonesia, Korea, Thailand, Japan gratis + 40+ film & series pilihan. Streaming live TV dan VOD tanpa buffering, tanpa login.",
  applicationName: "NONTON",
  keywords: [
    "nonton tv",
    "live tv",
    "tv indonesia",
    "streaming tv",
    "tv korea",
    "iptv",
    "nonton gratis",
  ],
  authors: [{ name: "Archanist" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "NONTON",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "NONTON",
    title: "NONTON — Live TV Indonesia & Asia Tenggara",
    description:
      "Nonton 265+ channel TV Indonesia, Korea, Thailand, Japan gratis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NONTON — Live TV",
    description: "265+ channel live TV gratis",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
