import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Release } from "@/lib/spotify";

export function ReleaseGrid({ releases }: { releases: Release[] }) {
  if (!releases.length) {
    return (
      <div className="rounded-[2rem] border border-ink/8 bg-white/55 p-10 text-center text-charcoal/65">
        <p className="mx-auto max-w-2xl leading-7">
          The release feed is connected and awaiting Spotify playlist-track access. Covers will appear automatically as
          soon as Spotify allows the playlist data to load.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {releases.map((release) => (
        <article key={release.id} className="group rounded-[1.35rem] border border-ink/8 bg-white/58 p-3 shadow-[0_18px_60px_rgba(42,40,36,0.05)] transition duration-300 hover:-translate-y-1 hover:bg-white">
          <Link href={release.spotifyUrl} target="_blank" rel="noreferrer" aria-label={`Open ${release.title} on Spotify`}>
            <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-sand/35">
              <Image src={release.artwork} alt={release.artworkAlt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              {release.featured ? (
                <span className="absolute left-3 top-3 rounded-full bg-porcelain/82 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ink backdrop-blur">
                  Featured
                </span>
              ) : null}
            </div>
          </Link>
          <div className="px-2 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/48">{release.artistName}</p>
            <h3 className="mt-3 min-h-12 text-lg font-light leading-snug text-ink">{release.title}</h3>
            <Link href={release.spotifyUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-ink underline decoration-ink/20 underline-offset-8 transition hover:decoration-ink">
              Spotify
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
