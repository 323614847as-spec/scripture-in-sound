import type { Metadata } from "next";
import Link from "next/link";
import { AudioPlayer } from "../../components/AudioPlayer";
import { PracticeTimer } from "../../components/PracticeTimer";
import { StatusLabel } from "../../components/StatusLabel";
import { practices } from "../../data/practices";
import { getRecording } from "../../data/recordings";

export const metadata: Metadata = { title: "Practice", description: "Contemporary contemplative listening sessions, clearly distinguished from traditional Buddhist ritual.", alternates: { canonical: "/practice" } };

export default function PracticePage() {
  const featured = practices[0];
  const audio = featured.audioId ? getRecording(featured.audioId) : undefined;
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Contemplative practice</p><h1>Make room for attentive listening.</h1><p>Short exercises designed for reflection. Historical status is shown on every session so contemporary material is not presented as authoritative Buddhist ritual.</p></header><section className="practice-room page-shell"><div><p className="eyebrow">{featured.type} · {featured.historicalStatus}</p><h2>{featured.title}</h2><p className="large-copy">{featured.description}</p><ol>{featured.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol><p className="editorial-note">{featured.editorialNote}</p></div><PracticeTimer practice={featured} /></section>{audio ? <section className="page-shell practice-audio"><AudioPlayer recording={audio} /></section> : null}<section className="page-section page-shell"><div className="section-heading"><div><p className="eyebrow">Session library</p><h2>Choose a duration</h2></div></div><div className="practice-grid">{practices.map((practice) => <Link className="practice-card" href={`/practice/${practice.slug}`} key={practice.id}><div className="practice-card__duration"><strong>{practice.durationMinutes.toString().padStart(2, "0")}</strong><span>min</span></div><div><StatusLabel status={practice.status} /><p className="eyebrow">{practice.type} · {practice.historicalStatus}</p><h3>{practice.title}</h3><p>{practice.description}</p><span className="text-link">Open session →</span></div></Link>)}</div></section></main>;
}
