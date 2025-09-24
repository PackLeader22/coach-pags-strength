/* eslint-disable react/no-unescaped-entities */
import "./globals.css";
import type { Metadata } from "next";
import RegisterSW from "@/components/RegisterSW";
import BottomTabs from "@/components/BottomTabs";

export const metadata: Metadata = {
  title: "Coach Pags Strength",
  description: "Athlete platform",
  // metadataBase: new URL("https://strength.crossfitlupos.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#C9B037" />

        {/* iOS home screen icon */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* iOS status bar style */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <body className="bg-[#0B0B0B] text-white pb-20">
        {/* Register service worker for PWA */}
        <RegisterSW />

        {/* Page content */}
        <div className="mx-auto max-w-md px-6 py-8">{children}</div>

        {/* Bottom navigation tabs */}
        <BottomTabs />
      </body>
    </html>
  );
}