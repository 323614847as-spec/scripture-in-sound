import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { FieldNoteCard } from "../../../components/FieldNoteCard";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { StatusLabel } from "../../../components/StatusLabel";
import { getFieldNotesForPlace } from "../../../data/field-notes";
import { getPractice } from "../../../data/practices";
import { getRecording } from "../../../data/recordings";
import { getScripture } from "../../../data/scriptures";
import { getPlace, places } from "../../../data/places";

export function generateStaticParams() { return places.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const place = getPlace((await params).slug); if (!place) return {}; return { title: place.name, description: place.summary, alternates: { canonical: `/places/${place.slug}` }, openGraph: { title: place.name, description: place.summary, type: "article" } }; }

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  const notes = getFieldNotesForPlace(place.id);
  const relatedItems: RelatedItem[] = [
    ...place.scriptureIds.map((id) => getScripture(id === "heart-sutra" ? "heart-sutra" : id)).filter(Boolean).map((scripture) => ({ eyebrow: "Scripture", title: scripture!.title, description: scripture!.summary, href: `/scriptures/${scripture!.slug}` })),
    ...place.practiceIds.map((id) => getPractice(id === "breathing-heart-sutra" ? "breathing-with-the-heart-sutra" : id)).filter(Boolean).map((practice) => ({ eyebrow: "Practice", title: practice!.title, description: practice!.description, href: "/practice" })),
  ];
  return <main id="main-content"><header className="place-hero page-shell"><div><Link className="back-link" href="/places">← All sacred places</Link><p className="eyebrow">{place.location}</p><h1>{place.name}</h1><p className="place-hero__local">{place.localName}</p><div className="tag-list"><span>{place.tradition}</span><StatusLabel status={place.status} /></div></div><div className="image-placeholder image-placeholder--hero"><span>Original field photograph forthcoming</span></div></header><div className="page-shell longform"><section className="entry-section"><div className="entry-section__number">01</div><div><h2>Location & map</h2><div className="coordinate-panel"><strong>{place.location}</strong><p>{place.coordinates?.verified ? `${place.coordinates.latitude}, ${place.coordinates.longitude}` : "Exact coordinates have not yet been verified. Add them in data/places.ts after checking a reliable source."}</p></div></div></section><section className="entry-section"><div className="entry-section__number">02</div><div><h2>Historical background</h2><p>{place.historicalBackground}</p></div></section><section className="entry-section"><div className="entry-section__number">03</div><div><h2>Photo gallery</h2><div className="gallery-placeholder">{[1,2,3].map((number) => <div className="image-placeholder" key={number}><span>Photograph {number} forthcoming</span></div>)}</div></div></section><section className="entry-section"><div className="entry-section__number">04</div><div><h2>Field recordings</h2>{place.audioIds.length ? <div className="stack">{place.audioIds.map(getRecording).filter(Boolean).map((recording) => <AudioPlayer recording={recording!} key={recording!.id} />)}</div> : <p className="placeholder-panel">Original field recordings, dates, permissions, and listening notes to be added.</p>}</div></section><section className="entry-section"><div className="entry-section__number">05</div><div><h2>What I heard / what I saw</h2><div className="observation-grid"><div><h3>What I heard</h3><p>Personal observation placeholder. Add your own listening notes and context.</p></div><div><h3>What I saw</h3><p>Personal observation placeholder. Add your own visual notes and reflection.</p></div></div></div></section><section className="entry-section"><div className="entry-section__number">06</div><div><h2>Field notes</h2>{notes.length ? <div className="stack">{notes.map((note) => <FieldNoteCard note={note} key={note.id} />)}</div> : <p className="placeholder-panel">No field notes added yet. Create a record in data/field-notes.ts.</p>}</div></section><section className="entry-section"><div className="entry-section__number">07</div><div><h2>Sources</h2><p className="placeholder-panel">Add verified institutional sources, scholarly references, image credits, and fieldwork documentation.</p></div></section><RelatedContent items={relatedItems} /></div></main>;
}
