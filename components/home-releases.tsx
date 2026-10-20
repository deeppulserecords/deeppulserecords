import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Release } from "@/lib/spotify";

export function HomeReleases({ releases }: { releases: Release[] }) {
  if (!releases.length) {
    return (
      <p className="mx-auto max-w-xl px-5 pb-32 pt-8 text-center text-sm uppercase leading-7 tracking-[0.04em] text-[#eaf3f6]/55">
        The release feed is connected and awaiting Spotify playlist-track access. Covers will appear automatically as
        soon as Spotify allows the playlist data to load.
      </p>
    );
  }

  return (
    <ol className="home-grid">
      {releases.map((release, index) => (
        <li key={release.id} className="home-card" style={{ "--i": index } as CSSProperties}>
          <Link
            href={release.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Listen to ${release.title} by ${release.artistName} on Spotify`}
            className="block outline-none"
          >
            <div className="cover">
              <Image
                src={release.artwork}
                alt={release.artworkAlt}
                fill
                priority={index < 2}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="scrim" aria-hidden="true" />
              <span className="tag num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="tag cta" aria-hidden="true">
                Listen
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </div>
            <div className="meta">
              <p className="title">{release.title}</p>
              <p className="artist">{release.artistName}</p>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
