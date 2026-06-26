import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact DEEPPULSE RECORDS for playlist submissions and demos."
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-36 md:px-10">
      <section className="rounded-[2rem] border border-ink/8 bg-white/58 p-6 shadow-soft md:p-12">
        <Logo size="lg" className="mx-auto" priority />
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-charcoal/45">Contact</p>
          <h1 className="mt-5 font-display text-6xl font-light leading-none text-ink md:text-8xl">Submissions</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-8 text-charcoal/68">
            Send playlist submissions, demos and catalogue enquiries for DeepPulse Records.
          </p>
          <Link href={`mailto:${siteConfig.email}`} className="mt-8 inline-block text-lg text-charcoal/70 hover:text-ink">
            {siteConfig.email}
          </Link>
          <div className="mt-8">
            <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-ink/10 px-5 py-3 text-sm text-ink transition hover:border-ink/24 hover:bg-porcelain">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Instagram
            </Link>
          </div>
        </div>

        <form className="mx-auto mt-12 grid max-w-2xl gap-4">
          <label className="grid gap-2 text-sm text-charcoal/65">
            Name
            <input name="name" autoComplete="name" className="rounded-2xl border border-ink/10 bg-porcelain/80 px-5 py-4 text-ink outline-none transition focus:border-ink/30" />
          </label>
          <label className="grid gap-2 text-sm text-charcoal/65">
            Email
            <input name="email" type="email" autoComplete="email" className="rounded-2xl border border-ink/10 bg-porcelain/80 px-5 py-4 text-ink outline-none transition focus:border-ink/30" />
          </label>
          <label className="grid gap-2 text-sm text-charcoal/65">
            Message
            <textarea name="message" rows={5} placeholder="Tell us if this is a playlist submission, demo, or catalogue enquiry." className="resize-none rounded-2xl border border-ink/10 bg-porcelain/80 px-5 py-4 text-ink outline-none transition focus:border-ink/30" />
          </label>
          <button type="submit" className="mt-3 rounded-full border border-ink/12 bg-ink px-7 py-4 text-sm text-porcelain transition hover:-translate-y-0.5 hover:bg-charcoal">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
