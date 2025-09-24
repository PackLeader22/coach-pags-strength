/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "Coach Pags Strength",
  description: "Athlete platform",
  // (optional) metadataBase: new URL("https://strength.crossfitlupos.com"),
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
      import RegisterSW from "@/components/RegisterSW";
      <body className="bg-[#0B0B0B] text-white pb-20">
        <div className="mx-auto max-w-md px-6 py-8">{children}</div>
      </body>
    </html>
  );
}