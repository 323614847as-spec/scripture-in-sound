export type AudioResearchStatus = "verified" | "needs-review" | "rejected";

export interface AudioSourceResearch {
  id: string;
  title: string;
  creator?: string;
  platform: string;
  sourceUrl: string;
  directMediaUrl?: string;
  license?: string;
  licenseUrl?: string;
  status: AudioResearchStatus;
  permissions: { rehost: boolean; embed: boolean; modify: boolean; commercialUse: boolean };
  reviewedOn: string;
  note: string;
}

export const audioSources: AudioSourceResearch[] = [
  {
    id: "commons-heart-sutra-mandarin",
    title: "Heart Sutra recited in Mandarin by a Chinese Buddhist layperson",
    creator: "Nyarlathotep1001",
    platform: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bore_Xinjing_%E8%88%AC%E8%8B%A5%E5%BF%83%E7%BB%8F_(Heart_Sutra)_in_Mandarin_recited_by_a_Chinese_Buddhist_layperson_2.ogg",
    directMediaUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bore_Xinjing_%E8%88%AC%E8%8B%A5%E5%BF%83%E7%BB%8F_(Heart_Sutra)_in_Mandarin_recited_by_a_Chinese_Buddhist_layperson_2.ogg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    status: "verified",
    permissions: { rehost: true, embed: true, modify: true, commercialUse: true },
    reviewedOn: "2026-10-05",
    note: "The file page identifies this as the uploader's own work and carries an explicit CC0 dedication. The archive embeds the Commons-hosted original rather than copying it.",
  },
  {
    id: "commons-lingyin-chanting",
    title: "Chanting at Lingyin Temple, Hangzhou",
    creator: "LouiseBrown1981",
    platform: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chanting_at_Lingyin_Temple,_Hangzhou.ogg",
    directMediaUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chanting_at_Lingyin_Temple,_Hangzhou.ogg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    status: "verified",
    permissions: { rehost: true, embed: true, modify: true, commercialUse: true },
    reviewedOn: "2026-10-05",
    note: "Reuse requires attribution, a license link, change disclosure, and ShareAlike for adaptations. Embedded from the Commons original without modification.",
  },
  {
    id: "commons-three-refuges",
    title: "Buddham Saranam Gacchami — male voice with female chorus",
    creator: "Hariharan",
    platform: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Buddham_Saranam_Gacchami_-_Male_Voice,_with_Female_Chorus.oga",
    directMediaUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Buddham_Saranam_Gacchami_-_Male_Voice,_with_Female_Chorus.oga",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    status: "verified",
    permissions: { rehost: true, embed: true, modify: true, commercialUse: true },
    reviewedOn: "2026-10-05",
    note: "The Commons file record identifies the recording as dedicated to the public domain under CC0. Embedded from Commons without modification.",
  },
  {
    id: "audiodharma-collection",
    title: "AudioDharma talk archive",
    platform: "AudioDharma",
    sourceUrl: "https://www.audiodharma.org/help",
    license: "CC BY-NC-ND 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    status: "needs-review",
    permissions: { rehost: true, embed: false, modify: false, commercialUse: false },
    reviewedOn: "2026-10-05",
    note: "The site permits sharing with attribution for noncommercial, unmodified uses. A specific talk and an approved delivery method must be selected before it can appear as playable here.",
  },
  {
    id: "free-buddhist-audio-collection",
    title: "Free Buddhist Audio collection",
    platform: "Free Buddhist Audio",
    sourceUrl: "https://www.freebuddhistaudio.com/",
    status: "needs-review",
    permissions: { rehost: false, embed: false, modify: false, commercialUse: false },
    reviewedOn: "2026-10-05",
    note: "Free access and download language was found, but no single blanket reuse license was verified for all recordings. Review the rights statement for an individual talk before use.",
  },
  {
    id: "amaravati-audio-collection",
    title: "Amaravati Buddhist Monastery audio and publications",
    platform: "Amaravati Buddhist Monastery",
    sourceUrl: "https://amaravati.org/",
    status: "needs-review",
    permissions: { rehost: false, embed: false, modify: false, commercialUse: false },
    reviewedOn: "2026-10-05",
    note: "Licenses differ by work. 'Free distribution' notices and Creative Commons labels must be checked on each item; they are not treated as a collection-wide grant.",
  },
  {
    id: "internet-archive-generic-search",
    title: "Generic Internet Archive Buddhist-audio search results",
    platform: "Internet Archive",
    sourceUrl: "https://archive.org/search?query=buddhist+chant",
    status: "rejected",
    permissions: { rehost: false, embed: false, modify: false, commercialUse: false },
    reviewedOn: "2026-10-05",
    note: "A platform listing or uploader-supplied metadata does not establish rights for an unspecified recording. No item is published without an item-level license and provenance review.",
  },
];
