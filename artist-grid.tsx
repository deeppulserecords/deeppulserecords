import Link from "next/link";
import { ExternalLink, Instagram } from "lucide-react";
import type { DeeppulseArtist, ArtistPlatform } from "@/lib/artists";

const platformTone: Record<ArtistPlatform, string> = {
  spotify: "bg-[#e6f2df] text-ink",
  apple: "bg-[#f1e8e1] text-ink",
  amazon: "bg-[#e5edf0] text-ink",
  pandora: "bg-[#e9e5f0] text-ink"
};

export function ArtistGrid({ artists }: { artists: DeeppulseArtist[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {artists.map((artist) => (
        <article key={artist.name} className="group flex min-h-[20rem] flex-col justify-between rounded-[1.35rem] border border-ink/8 bg-white/58 p-6 shadow-[0_18px_60px_rgba(42,40,36,0.04)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
          <div>
            <div className="mb-10 flex items-start justify-between gap-5">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-mist/45 font-display text-3xl font-light text-ink">
                {artist.name.slice(0, 1)}
              </div>
              {artist.instagram ? (
                <Link href={artist.instagram} target="_blank" rel="noreferrer" aria-label={`${artist.name} on Instagram`} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink transition hover:border-ink/25 hover:bg-porcelain">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-charcoal/42">Artist</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-none text-ink">{artist.name}</h2>
          </div>
          <div className="mt-10 grid gap-2">
            {artist.links.map((link) =>
              link.url ? (
                <Link key={link.platform} href={link.url} target="_blank" rel="noreferrer" className={`flex items-center justify-between rounded-full px-4 py-3 text-xs tracking-[0.18em] transition hover:-translate-y-0.5 ${platformTone[link.platform]}`}>
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : (
                <span key={link.platform} className="flex items-center justify-between rounded-full border border-ink/6 px-4 py-3 text-xs tracking-[0.18em] text-charcoal/28">
                  {link.label}
                  <span className="text-[0.6rem] tracking-[0.16em]">SOON</span>
                </span>
              )
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
