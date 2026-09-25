import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideEntry, guideEntries } from "../../../data/guide";

export function generateStaticParams() { return guideEntries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const entry = getGuideEntry((await params).slug); if (!entry) return {}; return { title: entry.title, description: entry.summary, alternates: { canonical: `/guide/${entry.slug}` }, openGraph: { title: entry.title, description: entry.summary, type: "article" } }; }

export default async function GuideEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getGuideEntry((await params).slug); if (!entry) notFound();
  const related = (entry.relatedEntryIds || []).map((id) => guideEntries.find((candidate) => candidate.id === id)).filter(Boolean);
  return <main id="main-content"><header className="entry-hero page-shell"><div><Link className="back-link" href="/guide">← A Guide to Buddhism</Link><p className="eyebrow">{entry.section.replace("-", " ")}</p><h1>{entry.title}</h1>{entry.alternateTerm ? <p className="entry-hero__original">{entry.alternateTerm}</p> : null}</div><div className="entry-hero__meta"><p>Orientation entry</p><p className="small-note">Concise context for terms used across this project. Detailed bibliography remains in editorial development.</p></div></header><article className="guide-entry page-shell"><p className="guide-entry__lead">{entry.summary}</p>{entry.contextNote ? <section><h2>Context and limits</h2><p>{entry.contextNote}</p></section> : null}<section><h2>Source record</h2>{entry.sources?.map((source) => <div className="source-record" key={source.id}><strong>{source.title}</strong>{source.note ? <p>{source.note}</p> : null}</div>)}</section>{related.length ? <section><h2>Related guide entries</h2><div className="tag-list">{related.map((item) => <Link href={`/guide/${item!.slug}`} key={item!.id}>{item!.title}</Link>)}</div></section> : null}</article></main>;
}
