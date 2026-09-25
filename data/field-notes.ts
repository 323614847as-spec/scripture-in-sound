import type { FieldNote } from "../types/content";

export const fieldNotes: FieldNote[] = [
  {
    id: "sound-before-dawn-rongwo", slug: "sound-before-dawn-at-rongwo", title: "Sound Before Dawn at Rongwo", placeId: "rongwo-monastery",
    body: "[FIELD NOTE TO BE ADDED BY AUTHOR]", photographIds: [], audioIds: ["rongwo-field-recording"], relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: [],
    tags: ["soundscape", "listening", "fieldwork"], status: "placeholder",
  },
  {
    id: "incense-visitors-yonghe", slug: "incense-and-visitors-at-yonghe-gong", title: "Incense and Visitors at Yonghe Gong", placeId: "yonghe-gong",
    body: "[FIELD NOTE TO BE ADDED BY AUTHOR]", photographIds: [], audioIds: [], relatedScriptureIds: [], relatedPracticeIds: [],
    tags: ["visitors", "ritual space", "fieldwork"], status: "placeholder",
  },
];

export function getFieldNotesForPlace(placeId: string) { return fieldNotes.filter((note) => note.placeId === placeId); }
export function getFieldNote(idOrSlug: string) { return fieldNotes.find((note) => note.id === idOrSlug || note.slug === idOrSlug); }
