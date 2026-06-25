import Link from "next/link";
import { AmbientField } from "@/components/ambient-field";
import { Logo } from "@/components/logo";
import { ReleaseGrid } from "@/components/release-grid";
import { getDeeppulseContent, getFallbackContent } from "@/lib/spotify";

export const dynamic = "force-dynamic";

async function loadContent() {
  try {
    return await getDeeppulseContent();
  } catch {
    return getFallbackContent();
  }
}

export default async function Home() {
  const content = await loadContent();

  return (
    <main>
      <section className="relative grid min-h-[92vh] place-items-center overflow-hidden px-5 pb-20 pt-32">
        <AmbientField />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Logo size="lg" priority className="mb-10" />
          <h1 className="max-w-4xl font-display text-6xl font-light leading-[0.95] text-ink md:text-8xl">DeepPulse Records</h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-charcoal/78 md:text-xl">
            DeepPulse is a wellness music label and creative ecosystem dedicated to ambient, meditative and healing
            soundscapes.
          </p>
          <Link
            href="#latest-releases"
            className="mt-10 rounded-full border border-ink/12 bg-porcelain/78 px-7 py-4 text-sm text-ink shadow-[0_16px_50px_rgba(42,40,36,0.06)] transition hover:-translate-y-0.5 hover:border-ink/22 hover:bg-white"
          >
            Explore Releases
          </Link>
        </div>
      </section>

      <section id="latest-releases" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-charcoal/45">Latest Releases</p>
          <h2 className="mt-4 font-display text-5xl font-light text-ink md:text-7xl">Current pulse</h2>
        </div>
        <ReleaseGrid releases={content.releases} />
      </section>
    </main>
  );
}
