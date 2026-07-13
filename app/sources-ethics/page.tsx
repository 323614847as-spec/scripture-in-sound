import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources & Ethics",
  description:
    "Learn about the sources, attribution, educational purpose, and ethical approach behind Scripture in Sound.",
  alternates: {
    canonical: "/sources-ethics",
  },
};

const sections = [
  {
    title: "Course Inspiration",
    text: "This project is inspired by HarvardX's Buddhism Through Its Scriptures and its attention to how Buddhist texts are read, practiced, interpreted, and lived.",
  },
  {
    title: "Text Sources",
    text: "Text examples should come from reliable translations, public domain sources, libraries, course materials, or sources with clear permission for educational use.",
  },
  {
    title: "Audio Sources",
    text: "Audio examples should be credited clearly. Traditional chants, temple recordings, teacher recordings, and educational demos should not be mixed together without explanation.",
  },
  {
    title: "AI Use Statement",
    text: "AI may be used to create draft explanations, pronunciation demos, and study prompts. AI output should be checked against trusted sources before being presented as factual or traditional.",
  },
  {
    title: "Educational Disclaimer",
    text: "This website is a beginner educational project. It is not a substitute for learning from Buddhist teachers, communities, monastics, or tradition-specific practice settings.",
  },
  {
    title: "Copyright and Attribution Policy",
    text: "The project should quote only short excerpts when allowed, link to sources when possible, and include attribution for translations, recordings, images, and course inspiration.",
  },
  {
    title: "Privacy and Analytics",
    text: "This website may use privacy-friendly analytics to understand aggregate page views. Analytics can be disabled if it causes access issues in some regions. It does not attempt to identify individual visitors.",
  },
];

export default function SourcesEthics() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <section>
        <p className="font-sans-soft text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b3f]">
          Sources & Ethics
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[#2f2118] sm:text-5xl">
          Careful sources, respectful use.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f4a3b]">
          Buddhist scriptures, chants, and practices belong to living traditions.
          This project should be clear about what is educational, what is sourced,
          and what should be approached with humility.
        </p>
      </section>

      <section className="mt-10 grid gap-5">
        {sections.map((section) => (
          <article key={section.title} className="rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="font-sans-soft mt-3 text-sm leading-7 text-[#725f50]">
              {section.text}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
