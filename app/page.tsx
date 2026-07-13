import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scripture in Sound",
  alternates: {
    canonical: "/",
  },
};

const entryCards = [
  {
    title: "Read Scripture",
    text: "Begin with short passages, translations, and reflective reading practices.",
  },
  {
    title: "Hear Chanting",
    text: "Notice how rhythm, voice, repetition, and silence shape attention.",
  },
  {
    title: "Learn Pronunciation",
    text: "Practice sacred phrases slowly, syllable by syllable, with care.",
  },
  {
    title: "Enter Meditation",
    text: "Use sound and breath as gentle supports for stillness and compassion.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-24">
        <div>
          <p className="font-sans-soft mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b3f]">
            Scripture, Chanting, and Contemplative Listening
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#2f2118] sm:text-6xl">
            Scripture in Sound
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-snug text-[#5f4a3b]">
            A Curated Guide to Buddhist Scripture, Chanting, and Contemplative Practice
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4b392d]">
            Inspired by <em>HarvardX&apos;s Buddhism Through Its Scriptures</em>, this
            project explores how Buddhist scripture becomes meaningful when it is
            read aloud, repeated, and practiced through sound.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/guided-practice"
              className="font-sans-soft rounded-full border border-[#B8893A] bg-[#B8893A] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:border-[#8A6428] hover:bg-[#8A6428]"
            >
              Start Guided Practice
            </Link>
            <Link
              href="/sources-ethics"
              className="font-sans-soft rounded-full border border-[#b38b3f] px-5 py-3 text-sm font-semibold text-[#4b392d] transition hover:bg-[#eadfc8]"
            >
              View Sources & Ethics
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-6 shadow-sm">
          <p className="font-sans-soft text-sm font-semibold uppercase tracking-[0.16em] text-[#b38b3f]">
            Practice Path
          </p>
          <div className="mt-5 grid gap-4">
            {entryCards.map((card) => (
              <article key={card.title} className="border-l-4 border-[#b38b3f] bg-[#fbf7ef] p-4">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="mt-2 font-sans-soft text-sm leading-6 text-[#725f50]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
