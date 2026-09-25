import type { FieldNote } from "../types/content";

export const fieldNotes: FieldNote[] = [
  {
    id: "sound-before-dawn-rongwo",
    slug: "sound-before-dawn-at-rongwo",
    title: "Sound Before Dawn at Rongwo",
    placeId: "rongwo-monastery",
    text: "Personal field-note placeholder. Add your own observations, context, and reflection after reviewing notes from the visit.",
    photographs: [{ caption: "Photograph placeholder — add date, subject, and context." }],
    audioIds: ["rongwo-field-recording"],
    relatedScriptureIds: ["heart-sutra"],
    tags: ["soundscape", "listening", "fieldwork"],
    status: "placeholder",
  },
  {
    id: "incense-visitors-yonghe",
    slug: "incense-and-visitors-at-yonghe-gong",
    title: "Incense and Visitors at Yonghe Gong",
    placeId: "yonghe-gong",
    text: "Personal field-note placeholder. Replace with your own ethically framed observation and reflection.",
    photographs: [{ caption: "Photograph placeholder — add credit and contextual caption." }],
    audioIds: [],
    relatedScriptureIds: [],
    tags: ["visitors", "ritual space", "fieldwork"],
    status: "placeholder",
  },
];

export function getFieldNotesForPlace(placeId: string) {
  return fieldNotes.filter((note) => note.placeId === placeId);
}
