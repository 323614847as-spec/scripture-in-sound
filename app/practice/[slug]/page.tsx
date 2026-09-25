import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { PracticeTimer } from "../../../components/PracticeTimer";
import { getPractice, practices } from "../../../data/practices";
import { getRecording } from "../../../data/recordings";

export function generateStaticParams() { return practices.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const practice = getPractice((await params).slug); if (!practice) return {}; return { title: practice.title, description: practice.description, alternates: { canonical: `/practice/${practice.slug}` }, openGraph: { title: practice.title, description: practice.description, type: "article" } }; }

export default async function PracticeEntryPage({ params }: { params: Promise<{ slug: string }> }) { const practice = getPractice((await params).slug); if (!practice) notFound(); const audio = practice.audioId ? getRecording(practice.audioId) : undefined; return <main id="main-content" className="practice-entry"><header className="page-hero page-shell"><Link className="back-link" href="/practice">← All practices</Link><p className="eyebrow">{practice.type} · {practice.historicalStatus}</p><h1>{practice.title}</h1><p>{practice.description}</p></header><section className="practice-room page-shell"><div><h2>Instructions</h2><ol>{practice.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol><p className="editorial-note">{practice.editorialNote}</p></div><PracticeTimer practice={practice} /></section>{audio ? <section className="page-shell practice-audio"><AudioPlayer recording={audio} /></section> : <section className="page-shell practice-audio"><p className="placeholder-panel">[AUDIO OR GUIDANCE TO BE ADDED AFTER EDITORIAL REVIEW]</p></section>}</main>; }
