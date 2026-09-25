import type { FieldNote } from "../types/content";
import Link from "next/link";
import { StatusLabel } from "./StatusLabel";

export function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <article className="field-note-card">
      <div className="field-note-card__meta">
        <span>{note.date || "Date to be added"}</span>
        <StatusLabel status={note.status} />
      </div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <div className="tag-list" aria-label="Field note tags">
        {note.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <Link className="text-link" href={`/field-notes/${note.slug}`}>Open field note →</Link>
    </article>
  );
}
