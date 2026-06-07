import clsx from "clsx";
import type { Metadata } from "next";
import Footer from "./Footer";
import Header from "./Header";
import { FaviconRefresh } from "./FaviconRefresh";
import "./globals.scss";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "László Tuss",
  description: "Indie iOS developer",
  icons: {
    icon: [{ url: "/profile.jpg", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "dark:bg-gray-800")}>
        <FaviconRefresh />
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://cdn.undicat.com/analytics.js"
          strategy="afterInteractive"
          {...({
            apikey: "ud_live_OPzWKqcF43pmhLMZkul-gysOiWWC9-pd",
            spa: "auto",
          } as any)}
        />
      </body>
    </html>
  );
}
