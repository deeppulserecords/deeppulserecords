"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/metadata";

export function Footer() {
  const pathname = usePathname();

  // The home page is intentionally just the title and the latest releases.
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-ink/8 bg-porcelain">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <p className="text-xs tracking-[0.24em] text-charcoal/70">DEEPPULSE RECORDS</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-charcoal/70">
          <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Instagram
          </Link>
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
          <span>© {new Date().getFullYear()} DEEPPULSE RECORDS</span>
        </div>
      </div>
    </footer>
  );
}
