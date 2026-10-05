import type { AudioRecording } from "../types/content";
import { audioSources } from "./audio-sources";

function verifiedSource(id: string) {
  const source = audioSources.find((item) => item.id === id && item.status === "verified");
  if (!source || !source.directMediaUrl || !source.license || !source.licenseUrl) throw new Error(`Verified audio source missing: ${id}`);
  return source;
}

const heartSutra = verifiedSource("commons-heart-sutra-mandarin");
const lingyin = verifiedSource("commons-lingyin-chanting");
const refuges = verifiedSource("commons-three-refuges");

export const recordings: AudioRecording[] = [
  {
    id: "heart-sutra-recitation", slug: "heart-sutra-recitation", title: heartSutra.title,
    language: "Mandarin Chinese", traditions: ["Mahāyāna", "Chinese Buddhism"], type: "Scripture Recitation", durationLabel: "2:09", src: heartSutra.directMediaUrl,
    description: "A lay recitation of the Heart Sutra. This is presented as one recorded performance, not as a universal model of Chinese Buddhist recitation.",
    attribution: `Recorded by ${heartSutra.creator}; hosted by Wikimedia Commons`, rights: `${heartSutra.license} · embedded from the unmodified source file`,
    sourceUrl: heartSutra.sourceUrl, licenseUrl: heartSutra.licenseUrl, permissions: heartSutra.permissions,
    source: { id: heartSutra.id, title: heartSutra.title, author: heartSutra.creator, publication: heartSutra.platform, url: heartSutra.sourceUrl, rights: heartSutra.license },
    status: "published", relatedScriptureIds: ["heart-sutra"],
  },
  {
    id: "lingyin-chanting", slug: "lingyin-chanting", title: lingyin.title,
    language: "Liturgical language not identified by source", traditions: ["Chinese Buddhism", "Mahāyāna"], type: "Field Recording", durationLabel: "1:03", src: lingyin.directMediaUrl,
    description: "A 2010 field recording described by its creator as Buddhist monks chanting at Lingyin Temple in Hangzhou. The source does not identify the liturgical text, so this archive does not infer one.",
    attribution: `LouiseBrown1981, ${lingyin.platform}`, rights: `${lingyin.license} · no changes made`,
    sourceUrl: lingyin.sourceUrl, licenseUrl: lingyin.licenseUrl, permissions: lingyin.permissions,
    source: { id: lingyin.id, title: lingyin.title, author: lingyin.creator, publication: lingyin.platform, url: lingyin.sourceUrl, rights: lingyin.license },
    status: "published",
  },
  {
    id: "three-refuges-chant", slug: "three-refuges-chant", title: refuges.title,
    language: "Pali / Sanskrit", traditions: ["Early Buddhism", "Mahāyāna"], type: "Chanting", durationLabel: "6:19", src: refuges.directMediaUrl,
    description: "A musical rendering of the Three Refuges. It is catalogued as a recording from India and should not be treated as representative of every lineage or ritual setting.",
    attribution: `Hariharan, ${refuges.platform}`, rights: `${refuges.license} · embedded from the unmodified source file`,
    sourceUrl: refuges.sourceUrl, licenseUrl: refuges.licenseUrl, permissions: refuges.permissions,
    source: { id: refuges.id, title: refuges.title, author: refuges.creator, publication: refuges.platform, url: refuges.sourceUrl, rights: refuges.license },
    status: "published",
  },
  {
    id: "interface-tone", slug: "interface-tone", title: "Listening interface demonstration", language: "Non-verbal", traditions: [], type: "Interface Demonstration", durationLabel: "0:20", src: "/audio/interface-tone.wav",
    description: "A neutral tone created only to demonstrate the player. It is not a Buddhist chant, ritual, or field recording.", attribution: "Generated interface test tone", rights: "Created for Scripture in Sound; not a traditional recording", permissions: { rehost: true, embed: true, modify: true, commercialUse: true }, status: "published",
  },
  {
    id: "rongwo-field-recording", slug: "rongwo-field-recording", title: "Rongwo soundscape", language: "Ambient sound", traditions: ["Tibetan Buddhism"], type: "Field Recording",
    description: "Field-recording placeholder awaiting an original recording, date, location notes, and consent context.", attribution: "[FIELD RECORDING BY THE AUTHOR — DETAILS TO BE ADDED]", rights: "[RIGHTS STATEMENT TO BE ADDED BY AUTHOR]", status: "placeholder", relatedPlaceIds: ["rongwo-monastery"],
  },
];

export function getRecording(id: string) {
  return recordings.find((recording) => recording.id === id);
}
