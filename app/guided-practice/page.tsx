const concepts = [
  ["Buddha", "The awakened one; also a reminder of the possibility of awakening."],
  ["Dharma", "The teachings, truth, and path that guide practice."],
  ["Saṅgha", "The community of practitioners who support the path."],
  ["Mantra", "A repeated sacred phrase used to focus attention and devotion."],
  ["Chanting", "Vocal repetition that can join text, breath, rhythm, and memory."],
  ["Meditation", "A practice of steady attention, insight, and compassionate awareness."],
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
          This page introduces basic Buddhist terms, short pronunciation practice,
          and simple meditation prompts for beginners.
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
              AI-generated pronunciation demos are for educational use only. They are
              not traditional monastic chants or ritual performances.
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
