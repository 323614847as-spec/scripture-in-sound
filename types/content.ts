export type ContentStatus = "published" | "placeholder";

export type Tradition = "Early Buddhism" | "Theravāda" | "Mahāyāna" | "Vajrayāna" | "Chinese Buddhism" | "Tibetan Buddhism" | "Japanese Buddhism";
export type TeachingMode = "exoteric" | "esoteric" | "mixed" | null;
export type TextType = "sutra" | "sutta" | "tantra" | "mantra" | "dharani" | "commentary" | "liturgy" | "other";

export interface Source {
  id: string;
  title: string;
  author?: string;
  translator?: string;
  publication?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  note?: string;
}

export interface Photograph {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  location?: string;
  note?: string;
  credit: string;
  rights?: string;
  sourceType: "external" | "original-fieldwork";
  sourceUrl?: string;
  licenseUrl?: string;
  status: ContentStatus;
}

export interface AudioRecording {
  id: string;
  slug: string;
  title: string;
  language: string;
  traditions?: Tradition[];
  type: "Chanting" | "Scripture Recitation" | "Mantra" | "Pronunciation" | "Field Recording" | "Guided Meditation" | "Interface Demonstration";
  durationLabel?: string;
  src?: string;
  transcript?: string;
  description: string;
  attribution?: string;
  rights?: string;
  source?: Source;
  licenseUrl?: string;
  sourceUrl?: string;
  permissions?: {
    rehost: boolean;
    embed: boolean;
    modify: boolean;
    commercialUse: boolean;
  };
  status: ContentStatus;
  relatedScriptureIds?: string[];
  relatedPlaceIds?: string[];
  relatedPracticeIds?: string[];
}

export interface Scripture {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  alternateTitles?: string[];
  traditions: Tradition[];
  regionalTraditions?: string[];
  textType: TextType;
  teachingMode?: TeachingMode;
  themes: string[];
  languages: string[];
  shortDescription: string;
  historicalContext?: string;
  whatIsThisText?: string;
  keyIdeas?: string[];
  selectedPassage?: string;
  originalLanguageText?: string;
  englishTranslation?: string;
  translator?: string;
  originalTextRights?: string;
  translationRights?: string;
  pronunciation?: string;
  howToListen?: string[];
  sources: Source[];
  audioIds: string[];
  practiceIds: string[];
  placeIds: string[];
  fieldNoteIds?: string[];
  status: ContentStatus;
  featured?: boolean;
}

export interface Practice {
  id: string;
  slug: string;
  title: string;
  durationMinutes: number;
  type: string;
  traditionContext?: Tradition[];
  historicalStatus: "traditional" | "modern" | "placeholder";
  category?: "Breath Awareness" | "Listening Meditation" | "Loving-Kindness / Mettā" | "Body Awareness" | "Walking Meditation" | "Contemplation of Scripture";
  provenance?: "traditional" | "modern adaptation" | "created for this project";
  description: string;
  instructions: string[];
  editorialNote: string;
  audioId?: string;
  relatedScriptureIds?: string[];
  relatedPlaceIds?: string[];
  sources?: Source[];
  status: ContentStatus;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  localName?: string;
  nameChinese?: string;
  nameEnglish?: string;
  romanization?: string;
  city?: string;
  region?: string;
  country: string;
  location: string;
  traditions: Tradition[];
  dateVisited?: string;
  shortDescription: string;
  summary?: string;
  description?: string;
  historicalPeriod?: string;
  historicalBackground?: string;
  coverImage?: Photograph;
  photographs: Photograph[];
  coordinates?: { latitude: number; longitude: number; verified: boolean; sourceUrl?: string; reviewedOn?: string };
  mapPosition: { x: number; y: number };
  fieldNoteIds: string[];
  fieldRecordingIds: string[];
  relatedScriptureIds: string[];
  relatedPracticeIds: string[];
  relationships?: { type: "scripture" | "practice" | "place" | "sound"; id: string; note?: string }[];
  sources: Source[];
  status: ContentStatus;
  featured?: boolean;
}

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  placeId: string;
  date?: string;
  author?: string;
  body: string;
  photographIds: string[];
  audioIds: string[];
  relatedScriptureIds: string[];
  relatedPracticeIds?: string[];
  tags: string[];
  status: ContentStatus;
}

export interface GuideEntry {
  id: string;
  slug: string;
  title: string;
  alternateTerm?: string;
  section: "foundations" | "traditions" | "texts-practices" | "context";
  summary: string;
  contextNote?: string;
  relatedEntryIds?: string[];
  relatedScriptureIds?: string[];
  sources?: Source[];
  status: ContentStatus;
}
