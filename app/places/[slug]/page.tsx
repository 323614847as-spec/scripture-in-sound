import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { CommunityDiscussionPanel } from "../../../components/CommunityDiscussionPanel";
import { FieldNoteCard } from "../../../components/FieldNoteCard";
import { ImpactTracker } from "../../../components/ImpactTracker";
import { PhotoGallery } from "../../../components/PhotoGallery";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { SaveContentButton } from "../../../components/SaveContentButton";
import { StatusLabel } from "../../../components/StatusLabel";
import { getFieldNotesForPlace } from "../../../data/field-notes";
import { getPlace, places } from "../../../data/places";
import { getPractice } from "../../../data/practices";
import { getRecording } from "../../../data/recordings";
import { getScripture } from "../../../data/scriptures";

export function generateStaticParams() {
  return places.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const place = getPlace((await params).slug);
  if (!place) return {};
  return {
    title: place.name,
    description: place.shortDescription,
    alternates: { canonical: `/places/${place.slug}` },
    openGraph: { title: place.name, description: place.shortDescription, type: "article", images: place.coverImage ? [{ url: place.coverImage.src, alt: place.coverImage.alt }] : undefined },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  const notes = getFieldNotesForPlace(place.id);
  const relatedItems: RelatedItem[] = [
    ...place.relatedScriptureIds.map((id) => getScripture(id)).filter(Boolean).map((scripture) => ({ eyebrow: "Scripture", title: scripture!.title, description: scripture!.shortDescription, href: `/scriptures/${scripture!.slug}` })),
    ...place.relatedPracticeIds.map(getPractice).filter(Boolean).map((practice) => ({ eyebrow: "Practice", title: practice!.title, description: practice!.description, href: `/practice/${practice!.slug}` })),
  ];

  return (
    <main id="main-content">
      <header className="place-hero page-shell">
        <div>
          <Link className="back-link" href="/places">← All sacred places</Link>
          <p className="eyebrow">{place.location} · {place.historicalPeriod}</p>
          <h1>{place.nameEnglish || place.name}</h1>
          <p className="place-hero__local">{place.nameChinese || place.localName}{place.romanization ? ` · ${place.romanization}` : ""}</p>
          <p className="large-copy">{place.summary || place.shortDescription}</p>
          <div className="tag-list">{place.traditions.map((tradition) => <span key={tradition}>{tradition}</span>)}<StatusLabel status={place.status} /></div>
          <SaveContentButton type="place" id={place.id} returnPath={`/places/${place.slug}`} />
        </div>
        {place.coverImage ? <figure className="place-cover"><img src={place.coverImage.src} alt={place.coverImage.alt} /><figcaption>{place.coverImage.caption || place.coverImage.credit}</figcaption></figure> : <div className="image-placeholder image-placeholder--hero"><span>[AUTHOR COVER PHOTOGRAPH · DATE · CAPTION · RIGHTS TO BE ADDED]</span></div>}
      </header>

      <div className="page-shell longform">
        <section className="entry-section">
          <div className="entry-section__number">01</div>
          <div><h2>Historical Context</h2><div className="coordinate-panel"><strong>{place.location}</strong><p>{place.coordinates?.verified ? `${place.coordinates.latitude}, ${place.coordinates.longitude} · reviewed ${place.coordinates.reviewedOn}` : "[VERIFIED COORDINATES TO BE ADDED]"}</p>{place.coordinates?.sourceUrl ? <a className="text-link" href={place.coordinates.sourceUrl} target="_blank" rel="noreferrer">Open geographic source ↗</a> : null}</div><p>{place.historicalBackground}</p><p>{place.description}</p></div>
        </section>
        <section className="entry-section">
          <div className="entry-section__number">02</div>
          <div><h2>Text &amp; Practice</h2>{relatedItems.length ? <RelatedContent items={relatedItems} /> : <p className="placeholder-panel">[TEXTUAL, RITUAL, AND PRACTICE RELATIONSHIPS TO BE ADDED ONLY AFTER SOURCE OR FIELDWORK REVIEW]</p>}</div>
        </section>
        <section className="entry-section">
          <div className="entry-section__number">03</div>
          <div><h2>Sound</h2>{place.fieldRecordingIds.length ? <div className="stack">{place.fieldRecordingIds.map(getRecording).filter(Boolean).map((recording) => <AudioPlayer recording={recording!} key={recording!.id} />)}</div> : <p className="placeholder-panel">[FIELD RECORDING · DATE · LOCATION · RECORDIST · CONSENT CONTEXT · RIGHTS TO BE ADDED]</p>}</div>
        </section>
        <section className="entry-section">
          <div className="entry-section__number">04</div>
          <div><h2>Field Notes</h2>{notes.length ? <div className="stack">{notes.map((note) => <FieldNoteCard note={note} key={note.id} />)}</div> : <p className="placeholder-panel">[AUTHOR VISIT DATE, QUESTIONNAIRE RESPONSES, OBSERVATIONS, AND REFLEXIVE NOTES TO BE ADDED]</p>}</div>
        </section>
        <section className="entry-section">
          <div className="entry-section__number">05</div>
          <div><h2>Photos</h2><PhotoGallery photographs={place.photographs} /></div>
        </section>
        <section className="entry-section">
          <div className="entry-section__number">06</div>
          <div><h2>Sources</h2><div className="stack">{place.sources.map((source) => <div className="source-record" key={source.id}><strong>{source.title}</strong>{source.author ? <p>{source.author}</p> : null}{source.note ? <p>{source.note}</p> : null}{source.url ? <a className="text-link" href={source.url} target="_blank" rel="noreferrer">View source ↗</a> : null}{source.rights ? <small>{source.rights}</small> : null}{source.accessDate ? <small>Reviewed {source.accessDate}</small> : null}</div>)}</div></div>
        </section>
        <CommunityDiscussionPanel type="place" id={place.id} label="this place" />
      </div>
      <ImpactTracker eventType="place_view" contentId={place.id} />
    </main>
  );
}
