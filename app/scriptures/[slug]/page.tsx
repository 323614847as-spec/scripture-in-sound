import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { StatusLabel } from "../../../components/StatusLabel";
import { getPractice } from "../../../data/practices";
import { getRecording } from "../../../data/recordings";
import { getScripture, scriptures } from "../../../data/scriptures";
import { places } from "../../../data/places";

export function generateStaticParams() { return scriptures.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const scripture = getScripture((await params).slug);
  if (!scripture) return {};
  return { title: scripture.title, description: scripture.shortDescription, alternates: { canonical: `/scriptures/${scripture.slug}` }, openGraph: { title: scripture.title, description: scripture.shortDescription, type: "article" } };
}

function EntrySection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="entry-section"><div className="entry-section__number">{number}</div><div><h2>{title}</h2>{children}</div></section>;
}

export default async function ScripturePage({ params }: { params: Promise<{ slug: string }> }) {
  const scripture = getScripture((await params).slug);
  if (!scripture) notFound();
  const relatedPlaces = places.filter((place) => scripture.placeIds.includes(place.id));
  const relatedItems: RelatedItem[] = [
    ...scripture.practiceIds.map(getPractice).filter(Boolean).map((practice) => ({ eyebrow: "Practice", title: practice!.title, description: practice!.description, href: "/practice" })),
    ...relatedPlaces.map((place) => ({ eyebrow: "Place", title: place.name, description: place.shortDescription, href: `/places/${place.slug}` })),
  ];

  return (
    <main id="main-content">
      <header className="entry-hero page-shell">
        <div><Link className="back-link" href="/scriptures">← All scriptures</Link><p className="eyebrow">{scripture.traditions.join(" · ")}</p><h1>{scripture.title}</h1><p className="entry-hero__original">{scripture.originalTitle}</p></div>
        <div className="entry-hero__meta"><StatusLabel status={scripture.status} /><dl><div><dt>Text type</dt><dd>{scripture.textType}</dd></div><div><dt>Themes</dt><dd>{scripture.themes.join(", ")}</dd></div><div><dt>Languages</dt><dd>{scripture.languages.join(", ")}</dd></div><div><dt>Context</dt><dd>{scripture.teachingMode ? `${scripture.teachingMode} — historically contextual` : "Not assigned"}</dd></div></dl></div>
      </header>
      <div className="longform page-shell">
        <EntrySection number="01" title="Historical context"><p>{scripture.historicalContext || "[VERIFIED HISTORICAL CONTEXT TO BE ADDED]"}</p></EntrySection>
        <EntrySection number="02" title="What is this text?"><p>{scripture.whatIsThisText || "[EDITORIAL EXPLANATION TO BE ADDED]"}</p></EntrySection>
        <EntrySection number="03" title="Key ideas"><ul>{(scripture.keyIdeas || []).map((idea) => <li key={idea}>{idea}</li>)}</ul></EntrySection>
        <EntrySection number="04" title="Selected passage"><blockquote>{scripture.selectedPassage}</blockquote></EntrySection>
        <EntrySection number="05" title="Original-language text"><div className="text-panel"><p>{scripture.originalLanguageText}</p></div></EntrySection>
        <EntrySection number="06" title="English translation"><div className="text-panel"><p>{scripture.englishTranslation}</p></div></EntrySection>
        <EntrySection number="07" title="Chanting, recitation & pronunciation"><p>{scripture.pronunciation || "[PRONUNCIATION RESOURCES TO BE ADDED]"}</p><div className="stack">{scripture.audioIds.map(getRecording).filter(Boolean).map((recording) => <AudioPlayer key={recording!.id} recording={recording!} />)}</div></EntrySection>
        <EntrySection number="08" title="How to listen"><ol>{(scripture.howToListen || []).map((item) => <li key={item}>{item}</li>)}</ol></EntrySection>
        <EntrySection number="09" title="Sources & further reading"><div className="stack">{scripture.sources.map((source) => <div className="source-record" key={source.id}><strong>{source.title}</strong>{source.author ? <p>Author: {source.author}</p> : null}{source.translator ? <p>Translator: {source.translator}</p> : null}{source.publication ? <p>{source.publication}</p> : null}{source.rights ? <small>{source.rights}</small> : null}</div>)}</div></EntrySection>
        <RelatedContent items={relatedItems} />
      </div>
    </main>
  );
}
