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
const patimokkha = verifiedSource("commons-patimokkha-pali");
const japaneseHeartSutra = verifiedSource("commons-heart-sutra-japanese");
const shurangama = verifiedSource("commons-shurangama-dharani");
const sitatapatra = verifiedSource("commons-sitatapatra-dharani");
const mahaPiritha = verifiedSource("commons-maha-piritha");
const omMani = verifiedSource("commons-om-mani-dingjue");

function commonsRecording(
  source: ReturnType<typeof verifiedSource>,
  details: Pick<AudioRecording, "id" | "slug" | "language" | "traditions" | "type" | "description" | "relatedScriptureIds">,
): AudioRecording {
  return {
    ...details,
    title: source.title,
    durationLabel: source.durationLabel,
    src: source.directMediaUrl,
    attribution: `${source.creator}; ${source.platform}${source.recordingDate ? ` · ${source.recordingDate}` : ""}`,
    rights: `${source.license} · streamed from the unmodified Commons source`,
    sourceUrl: source.sourceUrl,
    licenseUrl: source.licenseUrl,
    permissions: source.permissions,
    source: { id: source.id, title: source.title, author: source.creator, publication: source.platform, url: source.sourceUrl, rights: source.license },
    status: "published",
  };
}

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
  commonsRecording(japaneseHeartSutra, {
    id: "heart-sutra-japanese", slug: "heart-sutra-japanese", language: "Japanese liturgical recitation",
    traditions: ["Japanese Buddhism", "Mahāyāna"], type: "Scripture Recitation",
    description: "Head Priest Yodo Sasaki and members of Kegon-in in Sōja recite the Heart Sutra. The archive presents this as a documented local performance, not a universal pronunciation model.",
    relatedScriptureIds: ["heart-sutra"],
  }),
  commonsRecording(patimokkha, {
    id: "patimokkha-pali", slug: "patimokkha-pali", language: "Pāli",
    traditions: ["Theravāda", "Early Buddhism"], type: "Chanting",
    description: "Monks chant the Pāṭimokkha during an Uposatha observance at Wat Khung Taphao in Uttaradit, Thailand. The complete recording runs over thirty-four minutes.",
    relatedScriptureIds: [],
  }),
  commonsRecording(shurangama, {
    id: "shurangama-dharani", slug: "shurangama-dharani", language: "Sanskrit / Siddham liturgical chant",
    traditions: ["Chinese Buddhism", "Mahāyāna"], type: "Mantra",
    description: "A thirty-second excerpt from Venerable Chan Master Hsuan Hua's recording of the Śūraṅgama dhāraṇī. The Commons source documents the excerpt and its license lineage.",
    relatedScriptureIds: [],
  }),
  commonsRecording(sitatapatra, {
    id: "sitatapatra-dharani", slug: "sitatapatra-dharani", language: "Sanskrit / Siddham liturgical chant",
    traditions: ["Chinese Buddhism", "Mahāyāna"], type: "Mantra",
    description: "A documented excerpt of the Uṣṇīṣa Sitātapatrā dhāraṇī chanted by Venerable Chan Master Hsuan Hua. No attempt is made here to standardize the source's transliteration.",
    relatedScriptureIds: [],
  }),
  commonsRecording(mahaPiritha, {
    id: "maha-piritha", slug: "maha-piritha", language: "Pāli",
    traditions: ["Theravāda"], type: "Chanting",
    description: "A complete, exceptionally long Mahā Piritha protective-chant recording. It is streamed from Wikimedia Commons; listeners should expect a large file and a multi-hour performance.",
    relatedScriptureIds: [],
  }),
  commonsRecording(omMani, {
    id: "om-mani-dingjue", slug: "om-mani-dingjue", language: "Sanskrit mantra in a Chinese Buddhist setting",
    traditions: ["Chinese Buddhism", "Mahāyāna"], type: "Field Recording",
    description: "A brief field recording of Oṃ maṇi padme hūṃ being played at Dingjue Temple in Changhua, Taiwan. It documents a place and moment rather than a studio performance.",
    relatedScriptureIds: [],
  }),
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
