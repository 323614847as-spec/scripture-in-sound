import type { Practice } from "../types/content";

export const practices: Practice[] = [
  {
    id: "breathing-heart-sutra",
    slug: "breathing-with-the-heart-sutra",
    title: "Breathing with the Heart Sutra",
    durationMinutes: 5,
    type: "Contemporary contemplative listening exercise",
    historicalStatus: "modern",
    description:
      "A short listening pause that uses breath and a neutral sound as supports for attention.",
    instructions: [
      "Find a stable, comfortable posture.",
      "Let the breath remain natural; there is no need to control it.",
      "Listen for the beginning, continuation, and fading of each sound.",
      "When attention wanders, return gently to sound and breath.",
    ],
    editorialNote:
      "This is a modern educational exercise created for this project. It is not presented as a traditional or historically authoritative Buddhist ritual.",
    audioId: "interface-tone",
    relatedScriptureIds: ["heart-sutra"],
    relatedPlaceIds: ["rongwo-monastery"],
    status: "published",
  },
  {
    id: "silent-listening-3",
    slug: "silent-listening-3",
    title: "Silent Listening",
    durationMinutes: 3,
    type: "Contemporary contemplative listening exercise",
    historicalStatus: "modern",
    description: "Attend to near and distant sounds without naming or pursuing them.",
    instructions: ["Settle into stillness.", "Notice the nearest sound.", "Expand attention to the whole field of sound."],
    editorialNote:
      "This contemporary exercise is offered for reflection and is not identified with a particular lineage.",
    status: "published",
  },
  {
    id: "impermanence-10",
    slug: "reflection-on-impermanence",
    title: "Reflection on Impermanence",
    durationMinutes: 10,
    type: "Contemporary guided reflection",
    historicalStatus: "placeholder",
    description: "A future guided session focused on how sounds arise, change, and pass.",
    instructions: ["Guidance script to be reviewed and added."],
    editorialNote:
      "Placeholder for a modern educational exercise. It must not be described as a traditional ritual without verified sources.",
    status: "placeholder",
  },
  {
    id: "compassion-listening-15",
    slug: "compassion-listening",
    title: "Listening and Compassion",
    durationMinutes: 15,
    type: "Contemporary guided reflection",
    historicalStatus: "placeholder",
    description: "A future session to accompany verified study material on compassion.",
    instructions: ["Guidance and source context to be added."],
    editorialNote: "Placeholder awaiting editorial and scholarly review.",
    status: "placeholder",
  },
];

export function getPractice(slugOrId: string) {
  return practices.find((practice) => practice.slug === slugOrId || practice.id === slugOrId);
}
