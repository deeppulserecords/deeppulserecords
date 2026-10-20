"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/metadata";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/artists", label: "Artists" },
  { href: "/playlists", label: "Playlists" },
  { href: "/contact", label: "Contact" }
];

const homeLinks = navItems.filter((item) => item.href !== "/");

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <header className="font-archivo fixed inset-x-0 top-0 z-[80] bg-gradient-to-b from-[#0b0a09]/90 via-[#0b0a09]/45 to-transparent">
        <nav className="flex h-20 items-center justify-between px-5 sm:px-6">
          <Link href="/" aria-label="DEEPPULSE RECORDS home" className="block rounded-[0.6rem] ring-1 ring-white/10">
            <Logo size="sm" className="!rounded-[0.6rem] !shadow-none" />
          </Link>
          <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.01em] text-[#eaf3f6] sm:gap-9 sm:text-[0.8125rem]">
            {homeLinks.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex items-center gap-1 transition-opacity hover:opacity-60">
                {item.label}
                {item.href === "/contact" ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> : null}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    );
  }

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
