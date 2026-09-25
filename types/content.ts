export type ContentStatus = "published" | "placeholder";

export type Tradition = "Theravāda" | "Mahāyāna" | "Tibetan Buddhism";

export interface AudioRecording {
  id: string;
  slug: string;
  title: string;
  language: string;
  type:
    | "Chanting"
    | "Recitation"
    | "Slow pronunciation"
    | "Field recording"
    | "Guided contemplative listening"
    | "Interface demonstration";
  durationLabel?: string;
  src?: string;
  transcript?: string;
  description: string;
  status: ContentStatus;
  relatedScriptureIds?: string[];
  relatedPlaceIds?: string[];
}

export interface Scripture {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  tradition: Tradition;
  themes: string[];
  languages: string[];
  summary: string;
  historicalContext: string;
  whatIsThisText: string;
  keyIdeas: string[];
  selectedPassage: string;
  originalLanguageText: string;
  englishTranslation: string;
  howToListen: string[];
  sources: string[];
  audioIds: string[];
  practiceIds: string[];
  placeIds: string[];
  status: ContentStatus;
  featured?: boolean;
}

export interface Practice {
  id: string;
  slug: string;
  title: string;
  durationMinutes: number;
  type: string;
  description: string;
  instructions: string[];
  editorialNote: string;
  audioId?: string;
  relatedScriptureIds?: string[];
  status: ContentStatus;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  localName: string;
  location: string;
  tradition: Tradition;
  summary: string;
  historicalBackground: string;
  image?: string;
  coordinates?: { latitude: number; longitude: number; verified: boolean };
  mapPosition: { x: number; y: number };
  fieldNoteIds: string[];
  audioIds: string[];
  scriptureIds: string[];
  practiceIds: string[];
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
  text: string;
  photographs: Array<{ src?: string; caption: string }>;
  audioIds: string[];
  caption?: string;
  relatedScriptureIds: string[];
  tags: string[];
  status: ContentStatus;
}
