import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Practice",
  description:
    "Explore Buddhist scripture, chanting, pronunciation, listening, and contemplative practice.",
  alternates: {
    canonical: "/guided-practice",
  },
};

const concepts = [
  [
    "Buddha",
    "The Buddha means “the awakened one.” In this project, the term also points to the possibility of attention becoming clearer through practice, listening, and reflection.",
  ],
  [
    "Dharma",
    "Dharma refers to the Buddha’s teaching, the path of practice, and the truth that practice helps reveal. Scripture becomes part of Dharma when it is studied, spoken, remembered, and lived.",
  ],
  [
    "Saṅgha",
    "Saṅgha means the community of practitioners. Chanting often makes this communal dimension visible because individual voices join into a shared rhythm.",
  ],
  [
    "Scripture",
    "Scripture is not only written text. In Buddhist traditions, scripture can be copied, memorized, recited, heard, and practiced as part of religious life.",
  ],
  [
    "Mantra",
    "A mantra is a repeated sacred phrase used to focus attention and devotion. Its meaning comes not only from translation, but also from rhythm, memory, breath, and repetition.",
  ],
  [
    "Chanting",
    "Chanting turns scripture into sound. It allows a text to be experienced through voice, pace, pause, and bodily attention rather than silent reading alone.",
  ],
  [
    "Recitation",
    "Recitation means speaking a text repeatedly and attentively. It connects language with rhythm and memory, making scripture easier to internalize.",
  ],
  [
    "Listening",
    "Listening is an active form of practice. Instead of only understanding words intellectually, the listener notices tone, silence, repetition, and attention.",
  ],
  [
    "Meditation",
    "Meditation is a practice of steady attention and awareness. In this site, sound is treated as one possible support for attention, especially for beginners learning to listen carefully.",
  ],
];

const phrases = [
  {
    phrase: "oṃ maṇi padme hūṃ",
    syllables: "oṃ / ma / ṇi / pad / me / hūṃ",
    meaning:
      "A widely known compassion mantra associated with Avalokiteśvara, the bodhisattva of compassion.",
  },
  {
    phrase: "gate gate pāragate pārasaṃgate bodhi svāhā",
    syllables: "ga / te / ga / te / pā / ra / ga / te / pā / ra / saṃ / ga / te / bo / dhi / svā / hā",
    meaning:
      "A phrase from the Heart Sutra, often understood as moving beyond ordinary grasping toward awakening.",
  },
  {
    phrase: "namo buddhāya",
    syllables: "na / mo / bud / dhā / ya",
    meaning: "An expression of homage or refuge directed toward the Buddha.",
  },
  {
    phrase: "namo dharmāya",
    syllables: "na / mo / dhar / mā / ya",
    meaning: "An expression of homage or refuge directed toward the Dharma.",
  },
  {
    phrase: "namo saṅghāya",
    syllables: "na / mo / saṅ / ghā / ya",
    meaning: "An expression of homage or refuge directed toward the Saṅgha.",
  },
];

const audioButtons = [
  "Slow pronunciation",
  "Syllable practice",
  "Full phrase",
  "Traditional chant",
];

const meditations = [
  {
    title: "Sound Meditation",
    text: "Listen to one tone or phrase. Let the beginning, middle, and fading of sound become the focus.",
  },
  {
    title: "Breath and Repetition",
    text: "Pair a short phrase with natural breathing. Keep the pace gentle and unforced.",
  },
  {
    title: "Loving-Kindness Reflection",
    text: "After repeating a phrase, pause and offer goodwill to yourself, a friend, and all beings.",
  },
];

const prompts = [
  "What did I notice in the sound?",
  "Did repetition change my attention?",
  "Did the phrase feel like language, music, ritual, or meditation?",
  "How was hearing different from reading?",
  "Did meaning come from translation, sound, rhythm, or memory?",
];

export default function GuidedPractice() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <section>
        <p className="font-sans-soft text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b3f]">
          Guided Practice
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[#2f2118] sm:text-5xl">
          Listen, repeat, reflect.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f4a3b]">
          This page introduces key Buddhist terms through sound, repetition, and
          beginner-level reflection. It is designed for educational use and does
          not replace formal instruction from Buddhist teachers or communities.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold">Basic Concepts</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-5 shadow-sm">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="font-sans-soft mt-3 text-sm leading-6 text-[#725f50]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Listen & Repeat</h2>
            <p className="font-sans-soft mt-3 max-w-2xl text-sm leading-6 text-[#725f50]">
              Audio examples are being added gradually. AI-generated pronunciation
              demos will be clearly labeled and will not be presented as traditional
              monastic chanting.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5">
          {phrases.map((item) => (
            <article key={item.phrase} className="rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-5 shadow-sm">
              <h3 className="text-2xl font-semibold italic">{item.phrase}</h3>
              <p className="font-sans-soft mt-3 text-sm font-semibold text-[#b38b3f]">
                {item.syllables}
              </p>
              <p className="font-sans-soft mt-3 max-w-3xl text-sm leading-6 text-[#725f50]">
                {item.meaning}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {audioButtons.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="font-sans-soft rounded-full border border-[#eadfc8] bg-[#fbf7ef] px-4 py-2 text-sm text-[#4b392d] transition hover:border-[#b38b3f] hover:bg-[#eadfc8]"
                    aria-label={`${label} placeholder for ${item.phrase}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-semibold">Enter Meditation</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {meditations.map((item) => (
            <article key={item.title} className="rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-5 shadow-sm">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="font-sans-soft mt-3 text-sm leading-6 text-[#725f50]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-lg border border-[#eadfc8] bg-[#fffdf8] p-6 shadow-sm">
        <h2 className="text-3xl font-semibold">Reflection Prompts</h2>
        <ul className="font-sans-soft mt-5 grid gap-3 text-[#4b392d]">
          {prompts.map((prompt) => (
            <li key={prompt} className="border-l-4 border-[#b38b3f] bg-[#fbf7ef] p-3">
              {prompt}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
