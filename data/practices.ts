import type { Practice, Source } from "../types/content";
import { getMeditationSource } from "./meditation-sources";

function source(id: string): Source {
  const item = getMeditationSource(id);
  if (!item) throw new Error(`Meditation source missing: ${id}`);
  return { id: item.id, title: item.title, author: item.creator, url: item.url, rights: item.license, accessDate: item.reviewedOn, note: item.note };
}

export const practices: Practice[] = [
  {
    id: "breathing-heart-sutra", slug: "breathing-with-the-heart-sutra", title: "Breathing with the Heart Sutra", durationMinutes: 5, category: "Listening Meditation", type: "Contemporary contemplative listening exercise", traditionContext: ["Mahāyāna"], historicalStatus: "modern", provenance: "created for this project",
    description: "A short listening pause that uses breath and a licensed recitation as supports for attention.",
    instructions: ["Find a stable, comfortable posture.", "Let the breath remain natural; there is no need to control it.", "Listen for the beginning, continuation, and fading of each phrase.", "When attention wanders, return gently to sound and breath."],
    editorialNote: "Created by Scripture in Sound as a modern educational exercise. It is not presented as a traditional Heart Sutra ritual or lineage instruction.",
    audioId: "heart-sutra-recitation", relatedScriptureIds: ["heart-sutra"], status: "published",
  },
  {
    id: "silent-listening-3", slug: "silent-listening-3", title: "Silent Listening", durationMinutes: 3, category: "Listening Meditation", type: "Contemporary contemplative listening exercise", historicalStatus: "modern", provenance: "created for this project",
    description: "Attend to near and distant sounds without naming or pursuing them.",
    instructions: ["Settle into a position you can keep for three minutes.", "Notice the nearest sound without searching for its source.", "Let attention widen to include the whole field of sound.", "End by noticing how silence and sound define one another."],
    editorialNote: "Created for this project. It is not identified with a particular Buddhist lineage.", status: "published",
  },
  {
    id: "breath-text-study", slug: "breath-and-text-study", title: "Breath and Text Study", durationMinutes: 10, category: "Breath Awareness", type: "Text-informed study and reflection", traditionContext: ["Early Buddhism", "Theravāda"], historicalStatus: "modern", provenance: "modern adaptation",
    description: "A modern reading exercise placed beside an early Buddhist discourse on mindfulness of breathing.",
    instructions: ["Read the linked discourse before beginning; do not treat this short exercise as a substitute for the text or a teacher.", "Sit comfortably and notice whether the breath is long or short without forcing it.", "Attend to the experience of the whole body while breathing.", "Close by writing one sentence about what changed in your attention."],
    editorialNote: "This sequence was created for Scripture in Sound. Its historical reference is MN 118 in a CC0 translation; the wording and four-step exercise are modern editorial work.",
    sources: [source("suttacentral-mn118"), source("suttacentral-licensing")], status: "published",
  },
  {
    id: "compassion-reading", slug: "compassion-reading", title: "Compassionate Reading", durationMinutes: 12, category: "Loving-Kindness / Mettā", type: "Text-based contemplative reading", traditionContext: ["Early Buddhism", "Theravāda"], historicalStatus: "modern", provenance: "modern adaptation",
    description: "Read a public-domain translation on love, then reflect without turning the source text into a decontextualized affirmation.",
    instructions: ["Open the linked source and read it slowly once.", "On a second reading, mark a phrase that changes how you understand goodwill.", "Sit quietly with that phrase for several breaths.", "Write how the text's ethical demand differs from a general wish to feel calm."],
    editorialNote: "A project-created reading protocol, not a traditional chanting or mettā instruction. The referenced SuttaCentral translation is CC0.",
    sources: [source("suttacentral-snp1.8"), source("suttacentral-licensing")], status: "published",
  },
  {
    id: "body-awareness-10", slug: "body-awareness", title: "Body Awareness", durationMinutes: 10, category: "Body Awareness", type: "Planned modern educational exercise", historicalStatus: "placeholder", provenance: "created for this project",
    description: "A planned session for careful attention to posture and bodily sensation.", instructions: ["[GUIDANCE SCRIPT AND SOURCE REVIEW TO BE COMPLETED BEFORE PUBLICATION]"],
    editorialNote: "Placeholder only. No traditional lineage or historical authority is claimed.", status: "placeholder",
  },
  {
    id: "textual-close-reading", slug: "textual-close-reading", title: "Contemplative Close Reading", durationMinutes: 15, category: "Contemplation of Scripture", type: "Project-created study exercise", historicalStatus: "modern", provenance: "created for this project",
    description: "A repeatable way to slow down, compare a translation with its notes, and separate observation from interpretation.",
    instructions: ["Choose a short passage whose translator and rights statement are visible.", "Read once for structure and once for repeated words or images.", "Note one observation and one interpretation in separate lines.", "Return to the source notes before drawing a doctrinal conclusion."],
    editorialNote: "Created for Scripture in Sound as a humanities-study method, not as a traditional Buddhist meditation.", status: "published",
  },
  {
    id: "walking-meditation", slug: "walking-meditation", title: "Walking Meditation", durationMinutes: 15, category: "Walking Meditation", type: "Planned source-based practice entry", historicalStatus: "placeholder", provenance: "modern adaptation",
    description: "A future practice entry awaiting a reusable, lineage-contextualized source and editorial review.", instructions: ["[SOURCE, LICENSE, AND INSTRUCTIONS TO BE ADDED AFTER REVIEW]"],
    editorialNote: "This placeholder is not yet a practice instruction. It will remain unpublished as guidance until a precise reusable source is documented.", status: "placeholder",
  },
];

export function getPractice(slugOrId: string) {
  return practices.find((practice) => practice.slug === slugOrId || practice.id === slugOrId);
}
