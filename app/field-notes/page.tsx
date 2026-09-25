import type { Metadata } from "next";
import { FieldNoteCard } from "../../components/FieldNoteCard";
import { fieldNotes } from "../../data/field-notes";

export const metadata: Metadata = { title: "Field Notes", description: "Fieldwork notes connecting Buddhist places, sound, photographs, and scripture.", alternates: { canonical: "/field-notes" } };

export default function FieldNotesPage() { return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Fieldwork archive</p><h1>Field Notes</h1><p>Infrastructure for the author’s own dated observations, photographs, recordings, and reflections. Placeholder entries do not claim personal experiences.</p></header><section className="page-section page-shell stack">{fieldNotes.map((note) => <FieldNoteCard note={note} key={note.id} />)}</section></main>; }
