import type { Metadata } from "next";
import { ArtistGrid } from "@/components/artist-grid";
import { artists } from "@/lib/artists";

export const metadata: Metadata = {
  title: "Artists",
  description: "DEEPPULSE RECORDS artists across Spotify, Apple Music, Amazon Music, Pandora and Instagram."
};

export default function ArtistsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 pb-24 pt-36 md:px-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-charcoal/45">Artists</p>
        <h1 className="mt-5 font-display text-6xl font-light leading-none text-ink md:text-8xl">DeepPulse artists</h1>
        <p className="mt-8 text-lg font-light leading-8 text-charcoal/68">
          A focused roster of ambient, meditative and healing sound projects within the DeepPulse ecosystem.
        </p>
      </div>
      <div className="mt-16">
        <ArtistGrid artists={artists} />
      </div>
    </main>
  );
}
