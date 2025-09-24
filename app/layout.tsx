/* eslint-disable react/no-unescaped-entities */
import "./globals.css";
import type { Metadata } from "next";
import RegisterSW from "@/components/RegisterSW";
import BottomTabs from "@/components/BottomTabs";

export const metadata: Metadata = {
  title: "Coach Pags Strength",
  description: "Athlete platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#C9B037" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#0B0B0B] text-white pb-20">
        <RegisterSW />
        <div className="mx-auto max-w-md px-6 py-8 min-h-screen">{children}</div>
        <BottomTabs />
      </body>
    </html>
  );
}