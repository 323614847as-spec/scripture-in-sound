import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { FieldNoteCard } from "../../../components/FieldNoteCard";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { PhotoGallery } from "../../../components/PhotoGallery";
import { StatusLabel } from "../../../components/StatusLabel";
import { getFieldNotesForPlace } from "../../../data/field-notes";
import { getPractice } from "../../../data/practices";
import { getRecording } from "../../../data/recordings";
import { getScripture } from "../../../data/scriptures";
import { getPlace, places } from "../../../data/places";

export function generateStaticParams() { return places.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const place = getPlace((await params).slug); if (!place) return {}; return { title: place.name, description: place.shortDescription, alternates: { canonical: `/places/${place.slug}` }, openGraph: { title: place.name, description: place.shortDescription, type: "article", images: place.coverImage ? [{ url: place.coverImage.src, alt: place.coverImage.alt }] : undefined } }; }

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  const notes = getFieldNotesForPlace(place.id);
  const relatedItems: RelatedItem[] = [
    ...place.relatedScriptureIds.map((id) => getScripture(id)).filter(Boolean).map((scripture) => ({ eyebrow: "Scripture", title: scripture!.title, description: scripture!.shortDescription, href: `/scriptures/${scripture!.slug}` })),
    ...place.relatedPracticeIds.map(getPractice).filter(Boolean).map((practice) => ({ eyebrow: "Practice", title: practice!.title, description: practice!.description, href: `/practice/${practice!.slug}` })),
  ];
  return <main id="main-content"><header className="place-hero page-shell"><div><Link className="back-link" href="/places">← All sacred places</Link><p className="eyebrow">{place.location}</p><h1>{place.name}</h1><p className="place-hero__local">{place.localName}</p><div className="tag-list">{place.traditions.map((tradition) => <span key={tradition}>{tradition}</span>)}<StatusLabel status={place.status} /></div></div>{place.coverImage ? <figure className="place-cover"><img src={place.coverImage.src} alt={place.coverImage.alt} /><figcaption>{place.coverImage.caption || place.coverImage.credit}</figcaption></figure> : <div className="image-placeholder image-placeholder--hero"><span>[COVER PHOTOGRAPH TO BE ADDED BY AUTHOR]</span></div>}</header><div className="page-shell longform"><section className="entry-section"><div className="entry-section__number">01</div><div><h2>The Place</h2><div className="coordinate-panel"><strong>{place.location}</strong><p>{place.coordinates?.verified ? `${place.coordinates.latitude}, ${place.coordinates.longitude}` : "[VERIFIED COORDINATES TO BE ADDED] Add coordinates in data/places.ts only after checking a reliable source."}</p></div><p>{place.historicalBackground}</p></div></section><section className="entry-section"><div className="entry-section__number">02</div><div><h2>What I Saw</h2><p className="placeholder-panel">[VISUAL OBSERVATIONS TO BE ADDED BY AUTHOR]</p><PhotoGallery photographs={place.photographs} /></div></section><section className="entry-section"><div className="entry-section__number">03</div><div><h2>What I Heard</h2><p className="placeholder-panel">[LISTENING OBSERVATIONS TO BE ADDED BY AUTHOR]</p>{place.fieldRecordingIds.length ? <div className="stack">{place.fieldRecordingIds.map(getRecording).filter(Boolean).map((recording) => <AudioPlayer recording={recording!} key={recording!.id} />)}</div> : <p className="placeholder-panel">[FIELD RECORDINGS, DATES, PERMISSIONS, AND CONTEXT TO BE ADDED]</p>}</div></section><section className="entry-section"><div className="entry-section__number">04</div><div><h2>Field Notes</h2>{notes.length ? <div className="stack">{notes.map((note) => <FieldNoteCard note={note} key={note.id} />)}</div> : <p className="placeholder-panel">[FIELD NOTE TO BE ADDED BY AUTHOR]</p>}</div></section><section className="entry-section"><div className="entry-section__number">05</div><div><h2>Sources</h2><div className="stack">{place.sources.map((source) => <div className="source-record" key={source.id}><strong>{source.title}</strong>{source.author ? <p>{source.author}</p> : null}{source.rights ? <small>{source.rights}</small> : null}</div>)}</div></div></section><RelatedContent items={relatedItems} /></div></main>;
}
