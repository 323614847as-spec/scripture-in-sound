import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { StatusLabel } from "../../../components/StatusLabel";
import { fieldNotes, getFieldNote } from "../../../data/field-notes";
import { getPlace } from "../../../data/places";
import { getRecording } from "../../../data/recordings";
import { getScripture } from "../../../data/scriptures";

export function generateStaticParams() { return fieldNotes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const note = getFieldNote((await params).slug); if (!note) return {}; return { title: note.title, description: note.status === "placeholder" ? "Field note placeholder awaiting material from the author." : note.body, alternates: { canonical: `/field-notes/${note.slug}` }, openGraph: { title: note.title, description: "A Scripture in Sound field note.", type: "article" } }; }

export default async function FieldNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const note = getFieldNote((await params).slug); if (!note) notFound(); const place = getPlace(note.placeId);
  return <main id="main-content"><header className="page-hero page-shell"><Link className="back-link" href="/field-notes">← All field notes</Link><p className="eyebrow">{place?.name || "Field note"}</p><h1>{note.title}</h1><p>{note.date || "[DATE TO BE ADDED BY AUTHOR]"}{note.author ? ` · ${note.author}` : ""}</p></header><article className="field-note-entry page-shell"><StatusLabel status={note.status} /><p className="field-note-entry__body">{note.body}</p>{note.audioIds.length ? <section><h2>Related sound</h2><div className="stack">{note.audioIds.map(getRecording).filter(Boolean).map((recording) => <AudioPlayer recording={recording!} key={recording!.id} />)}</div></section> : null}<section><h2>Related archive records</h2><div className="tag-list">{place ? <Link href={`/places/${place.slug}`}>{place.name}</Link> : null}{note.relatedScriptureIds.map(getScripture).filter(Boolean).map((scripture) => <Link href={`/scriptures/${scripture!.slug}`} key={scripture!.id}>{scripture!.title}</Link>)}</div></section></article></main>;
}
