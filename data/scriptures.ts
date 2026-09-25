import type { Scripture } from "../types/content";

export const scriptures: Scripture[] = [
  {
    id: "heart-sutra",
    slug: "heart-sutra",
    title: "Heart Sutra",
    originalTitle: "Prajñāpāramitāhṛdaya — title form for editorial review",
    tradition: "Mahāyāna",
    themes: ["Emptiness", "Wisdom"],
    languages: ["Sanskrit", "Chinese", "Tibetan", "English"],
    summary:
      "A prototype entry for exploring one Buddhist text across writing, recitation, listening, practice, and place.",
    historicalContext:
      "Editorial placeholder: add a concise, sourced account of the text’s formation, transmission, and use across Buddhist traditions.",
    whatIsThisText:
      "Editorial placeholder: explain the text’s genre, scope, and ritual or educational uses using verified scholarly and tradition-specific sources.",
    keyIdeas: [
      "Emptiness — explanation and sources to be added",
      "Wisdom — explanation and sources to be added",
      "The relation between form and emptiness — editorial review required",
    ],
    selectedPassage:
      "Selected passage placeholder. Insert a short, permission-compatible excerpt with translator and edition clearly credited.",
    originalLanguageText:
      "Original-language passage placeholder. Confirm the recension, script, transliteration standard, and source before publishing.",
    englishTranslation:
      "Translation placeholder. Do not publish a translation here until its source, rights status, and wording have been verified.",
    howToListen: [
      "Identify the language, recitation tradition, performer, and recording context.",
      "Notice pacing, repetition, breath, and silence before reaching for interpretation.",
      "Keep differences between liturgical recitation, pronunciation study, and modern contemplative listening visible.",
    ],
    sources: [
      "Source list placeholder: add verified editions, translations, catalog records, and scholarly studies.",
      "Recording credits placeholder: add performer, location, date, permission, and tradition-specific context.",
    ],
    audioIds: ["heart-sutra-recitation", "interface-tone"],
    practiceIds: ["breathing-heart-sutra"],
    placeIds: ["yonghe-gong", "kumbum-monastery", "rongwo-monastery"],
    status: "placeholder",
    featured: true,
  },
];

export function getScripture(slug: string) {
  return scriptures.find((scripture) => scripture.slug === slug);
}
