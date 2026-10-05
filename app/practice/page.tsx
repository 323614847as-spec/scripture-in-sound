import type { Metadata } from "next";
import { AudioPlayer } from "../../components/AudioPlayer";
import { PracticeLibrary } from "../../components/PracticeLibrary";
import { PracticeTimer } from "../../components/PracticeTimer";
import { practices } from "../../data/practices";
import { getRecording } from "../../data/recordings";

export const metadata: Metadata = { title: "Practice", description: "Contemporary contemplative listening sessions, clearly distinguished from traditional Buddhist ritual.", alternates: { canonical: "/practice" } };

export default function PracticePage() {
  const featured = practices[0];
  const audio = featured.audioId ? getRecording(featured.audioId) : undefined;
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Meditation library</p><h1>Make room for attentive listening.</h1><p>Browse by category and duration. Every session states whether it is traditional, a modern adaptation, or created for this project; source-based entries link to their exact texts and licenses.</p></header><section className="practice-room page-shell"><div><p className="eyebrow">{featured.category} · {featured.provenance}</p><h2>{featured.title}</h2><p className="large-copy">{featured.description}</p><ol>{featured.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol><p className="editorial-note">{featured.editorialNote}</p></div><PracticeTimer practice={featured} /></section>{audio ? <section className="page-shell practice-audio"><AudioPlayer recording={audio} /></section> : null}<section className="page-section page-shell"><div className="section-heading"><div><p className="eyebrow">Session library</p><h2>Choose a way to practice</h2></div></div><PracticeLibrary practices={practices} /></section></main>;
}
