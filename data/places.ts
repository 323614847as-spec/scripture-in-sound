import type { Place } from "../types/content";

export const places: Place[] = [
  {
    id: "yonghe-gong",
    slug: "yonghe-gong",
    name: "Yonghe Gong / Lama Temple",
    localName: "雍和宫",
    location: "Beijing, China",
    tradition: "Tibetan Buddhism",
    summary:
      "A fieldwork entry awaiting verified historical description, original photographs, recordings, and visit notes.",
    historicalBackground:
      "Historical background placeholder. Add a concise account based on verified institutional and scholarly sources.",
    mapPosition: { x: 74, y: 34 },
    fieldNoteIds: ["incense-visitors-yonghe"],
    audioIds: [],
    scriptureIds: ["heart-sutra"],
    practiceIds: [],
    status: "placeholder",
    featured: true,
  },
  {
    id: "kumbum-monastery",
    slug: "kumbum-monastery",
    name: "Kumbum Monastery / Ta’er Temple",
    localName: "塔尔寺",
    location: "Qinghai, China",
    tradition: "Tibetan Buddhism",
    summary:
      "A scalable place record prepared for verified coordinates, field materials, and sourced historical context.",
    historicalBackground:
      "Historical background placeholder. Confirm naming, location, dates, and institutional history before publication.",
    mapPosition: { x: 40, y: 57 },
    fieldNoteIds: [],
    audioIds: [],
    scriptureIds: ["heart-sutra"],
    practiceIds: [],
    status: "placeholder",
    featured: true,
  },
  {
    id: "rongwo-monastery",
    slug: "rongwo-monastery",
    name: "Rongwo Monastery / Longwu Temple",
    localName: "隆务寺",
    location: "Qinghai, China",
    tradition: "Tibetan Buddhism",
    summary:
      "A fieldwork record designed to connect place, listening, personal observation, and related texts.",
    historicalBackground:
      "Historical background placeholder. Add verified local names, dates, institutional context, and citations.",
    mapPosition: { x: 48, y: 69 },
    fieldNoteIds: ["sound-before-dawn-rongwo"],
    audioIds: ["rongwo-field-recording"],
    scriptureIds: ["heart-sutra"],
    practiceIds: ["breathing-heart-sutra"],
    status: "placeholder",
    featured: true,
  },
];

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug);
}
