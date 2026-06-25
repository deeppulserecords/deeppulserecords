import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Playlists",
  description: "Official DEEPPULSE RECORDS playlist profiles on Pandora and Spotify."
};

const playlists = [
  {
    title: "Pandora Playlists",
    description: "Curated stations for sleep, meditation, ambient music and wellness.",
    button: "Open on Pandora",
    href: "https://pandora.app.link/7jPryGDkY2b"
  },
  {
    title: "Spotify Playlists",
    description: "Official Deeppulse Records curated playlists featuring our artists and catalogue.",
    button: "Open on Spotify",
    href: "https://open.spotify.com/user/31j7eykltzoicjjcugkjy72cug5u?si=a11cc0213b9f4903"
  }
];

export default function PlaylistsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 pb-24 pt-36 md:px-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-charcoal/45">Playlists</p>
        <h1 className="mt-5 font-display text-6xl font-light leading-none text-ink md:text-8xl">Curated calm</h1>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {playlists.map((playlist) => (
          <article key={playlist.title} className="min-h-[24rem] rounded-[2rem] border border-ink/8 bg-white/58 p-8 shadow-[0_24px_80px_rgba(42,40,36,0.05)] md:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-charcoal/42">Official profile</p>
                <h2 className="mt-8 font-display text-5xl font-light text-ink">{playlist.title}</h2>
                <p className="mt-8 max-w-md text-lg font-light leading-8 text-charcoal/66">{playlist.description}</p>
              </div>
              <Link href={playlist.href} target="_blank" rel="noreferrer" className="mt-12 inline-flex w-fit items-center gap-3 text-sm text-ink underline decoration-ink/20 underline-offset-8 transition hover:decoration-ink">
                {playlist.button}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
