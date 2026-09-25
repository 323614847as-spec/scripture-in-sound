import type { Place } from "../types/content";

export const places: Place[] = [
  {
    id: "yonghe-gong", slug: "yonghe-gong", name: "Yonghe Gong / Lama Temple", localName: "雍和宫",
    city: "Beijing", region: "Beijing", country: "China", location: "Beijing, China", traditions: ["Tibetan Buddhism", "Vajrayāna"],
    shortDescription: "A fieldwork entry awaiting verified historical description, original photographs, recordings, and visit notes.",
    historicalBackground: "[VERIFIED HISTORICAL BACKGROUND TO BE ADDED]",
    photographs: [], mapPosition: { x: 74, y: 34 }, fieldNoteIds: ["incense-visitors-yonghe"], fieldRecordingIds: [],
    relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: [],
    sources: [{ id: "yonghe-sources", title: "[ACADEMIC AND INSTITUTIONAL SOURCES TO BE ADDED]" }], status: "placeholder", featured: true,
  },
  {
    id: "kumbum-monastery", slug: "kumbum-monastery", name: "Kumbum Monastery / Ta’er Temple", localName: "塔尔寺",
    region: "Qinghai", country: "China", location: "Qinghai, China", traditions: ["Tibetan Buddhism", "Vajrayāna"],
    shortDescription: "A scalable place record prepared for verified coordinates, field materials, and sourced historical context.",
    historicalBackground: "[VERIFIED HISTORICAL BACKGROUND TO BE ADDED]",
    photographs: [], mapPosition: { x: 40, y: 57 }, fieldNoteIds: [], fieldRecordingIds: [],
    relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: [],
    sources: [{ id: "kumbum-sources", title: "[ACADEMIC AND INSTITUTIONAL SOURCES TO BE ADDED]" }], status: "placeholder", featured: true,
  },
  {
    id: "rongwo-monastery", slug: "rongwo-monastery", name: "Rongwo Monastery / Longwu Temple", localName: "隆务寺",
    city: "Tongren", region: "Huangnan, Qinghai", country: "China", location: "Huangnan, Qinghai, China", traditions: ["Tibetan Buddhism", "Vajrayāna"],
    shortDescription: "A fieldwork record designed to connect place, listening, personal observation, and related texts.",
    historicalBackground: "[VERIFIED HISTORICAL BACKGROUND TO BE ADDED]",
    photographs: [], mapPosition: { x: 48, y: 69 }, fieldNoteIds: ["sound-before-dawn-rongwo"], fieldRecordingIds: ["rongwo-field-recording"],
    relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: ["breathing-heart-sutra"],
    sources: [{ id: "rongwo-sources", title: "[ACADEMIC AND INSTITUTIONAL SOURCES TO BE ADDED]" }], status: "placeholder", featured: true,
  },
];

export function getPlace(slugOrId: string) { return places.find((place) => place.slug === slugOrId || place.id === slugOrId); }
