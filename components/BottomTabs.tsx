"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const tabs = [
  { href: "/", file: "/home.png", alt: "Home" },
  { href: "/workout", file: "/workout.png", alt: "Workout" },
  { href: "/buy", file: "/buy.png", alt: "Buy" },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2a2a2a] bg-[#0B0B0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0B0B0B]/70">
      <div className="mx-auto max-w-md grid grid-cols-3">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center justify-center py-3 ${
                active ? "bg-[#C9B037]" : ""
              }`}
            >
              <Image
                src={t.file}
                alt={t.alt}
                width={28}
                height={28}
                className={`${active ? "invert" : ""}`}
              />
            </Link>
          );
        })}
      </div>

      {/* safe area padding for iOS notches */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}