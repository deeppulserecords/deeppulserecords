"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/metadata";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/artists", label: "Artists" },
  { href: "/playlists", label: "Playlists" },
  { href: "/contact", label: "Contact" }
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-ink/5 bg-porcelain/78 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="DEEPPULSE RECORDS home" className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="hidden text-xs font-medium tracking-[0.24em] text-ink sm:block">DEEPPULSE</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Open DEEPPULSE RECORDS on Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink transition hover:border-ink/25 hover:bg-white">
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button type="button" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="site-menu" onClick={() => setIsOpen((current) => !current)} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink transition hover:border-ink/25 hover:bg-white">
            {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {isOpen ? (
        <div id="site-menu" className="fixed inset-x-0 top-20 z-[80] border-t border-ink/5 bg-porcelain/96 shadow-[0_24px_80px_rgba(42,40,36,0.08)] backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl gap-px px-5 py-4 md:px-10">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-charcoal/72 transition hover:bg-white hover:text-ink">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
