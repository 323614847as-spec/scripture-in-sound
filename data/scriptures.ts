import type { Scripture } from "../types/content";

export const scriptures: Scripture[] = [
  {
    id: "heart-sutra",
    slug: "heart-sutra",
    title: "Heart Sutra",
    originalTitle: "Prajñāpāramitāhṛdaya — title form for editorial review",
    alternateTitles: ["Heart of the Perfection of Wisdom — translation form to be verified"],
    traditions: ["Mahāyāna"],
    regionalTraditions: ["Chinese Buddhism", "Tibetan Buddhism", "Japanese Buddhism"],
    textType: "sutra",
    teachingMode: null,
    themes: ["Emptiness", "Wisdom", "Bodhisattva Practice"],
    languages: ["Sanskrit", "Classical Chinese", "Tibetan", "English"],
    shortDescription: "A prototype entry for exploring one Buddhist text across writing, recitation, listening, practice, and place.",
    historicalContext: "[VERIFIED HISTORICAL CONTEXT TO BE ADDED] Add a concise account of formation, transmission, and use with reviewed sources.",
    whatIsThisText: "[EDITORIAL EXPLANATION TO BE ADDED] Explain genre, scope, and uses with verified scholarly and tradition-specific sources.",
    keyIdeas: ["Emptiness — reviewed explanation needed", "Wisdom — reviewed explanation needed", "Form and emptiness — editorial review required"],
    selectedPassage: "[SELECTED PASSAGE TO BE ADDED] Include translator, edition, and rights information.",
    originalLanguageText: "[ORIGINAL-LANGUAGE TEXT TO BE ADDED] Confirm recension, script, transliteration standard, and source.",
    englishTranslation: "[VERIFIED TRANSLATION TO BE ADDED] Do not publish without source and rights review.",
    pronunciation: "[PRONUNCIATION RESOURCE TO BE ADDED] Identify language, teacher or performer, and recording context.",
    howToListen: [
      "Identify the language, recitation tradition, performer, and recording context.",
      "Notice pacing, repetition, breath, and silence before reaching for interpretation.",
      "Keep liturgical recitation, pronunciation study, and modern contemplative listening distinct.",
    ],
    sources: [{ id: "heart-sutra-sources", title: "[VERIFIED EDITIONS, TRANSLATIONS, AND SCHOLARLY SOURCES TO BE ADDED]", rights: "Rights status to be verified" }],
    audioIds: ["heart-sutra-recitation", "interface-tone"],
    practiceIds: ["breathing-heart-sutra"],
    placeIds: ["yonghe-gong", "kumbum-monastery", "rongwo-monastery"],
    fieldNoteIds: ["sound-before-dawn-rongwo"],
    status: "placeholder",
    featured: true,
  },
];

export function getScripture(slugOrId: string) {
  return scriptures.find((scripture) => scripture.slug === slugOrId || scripture.id === slugOrId);
}
