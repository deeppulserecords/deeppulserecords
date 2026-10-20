import { preload } from "react-dom";
import { HomeReleases } from "@/components/home-releases";
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
  preload("/fonts/archivo-vf.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  const content = await loadContent();

  return (
    <main className="home">
      {/* Keeps overscroll / rubber-banding dark while the home page is mounted. */}
      <style>{`html,body{background:#0b0a09}body{background-image:none}`}</style>

      <section className="home-hero">
        <h1 className="home-title">
          <span className="w1">DeepPulse</span> <span className="w2">Records</span>
        </h1>
      </section>

      <section id="latest-releases" aria-label="Latest releases">
        <HomeReleases releases={content.releases} />
      </section>
    </main>
  );
}
