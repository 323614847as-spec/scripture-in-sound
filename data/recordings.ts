import type { AudioRecording } from "../types/content";

export const recordings: AudioRecording[] = [
  {
    id: "interface-tone",
    slug: "interface-tone",
    title: "Listening interface demonstration",
    language: "Non-verbal",
    type: "Interface demonstration",
    durationLabel: "0:20",
    src: "/audio/interface-tone.wav",
    description:
      "A neutral tone created only to demonstrate the player. It is not a Buddhist chant, ritual, or field recording.",
    status: "published",
  },
  {
    id: "heart-sutra-recitation",
    slug: "heart-sutra-recitation",
    title: "Heart Sutra recitation",
    language: "Language to be confirmed",
    type: "Recitation",
    description:
      "Recording placeholder. Add a verified recording, performer credit, language, lineage context, and permission information before publication.",
    status: "placeholder",
    relatedScriptureIds: ["heart-sutra"],
  },
  {
    id: "rongwo-field-recording",
    slug: "rongwo-field-recording",
    title: "Rongwo soundscape",
    language: "Ambient sound",
    type: "Field recording",
    description:
      "Field-recording placeholder awaiting an original recording, date, location notes, and consent context.",
    status: "placeholder",
    relatedPlaceIds: ["rongwo-monastery"],
  },
];

export function getRecording(id: string) {
  return recordings.find((recording) => recording.id === id);
}
