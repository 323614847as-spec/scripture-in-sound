import Link from "next/link";

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
            A Student-Curated Guide
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#2f2118] sm:text-6xl">
            Scripture in Sound
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-snug text-[#5f4a3b]">
            A Student-Curated Guide to Buddhist Scriptures, Chanting, and Meditation
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4b392d]">
            Inspired by HarvardX&apos;s Buddhism Through Its Scriptures, this project
            explores how Buddhist scriptures become meaningful through reading,
            chanting, pronunciation practice, meditation, and reflection.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/guided-practice"
              className="font-sans-soft rounded-full bg-[#2f2118] px-5 py-3 text-sm font-semibold text-[#fffdf8] transition hover:bg-[#4b392d]"
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
