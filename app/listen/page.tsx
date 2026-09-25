import type { Metadata } from "next";
import { AudioPlayer } from "../../components/AudioPlayer";
import { recordings } from "../../data/recordings";

export const metadata: Metadata = { title: "Listen", description: "Listen to recitation, chanting, pronunciation, field recordings, and contemplative audio.", alternates: { canonical: "/listen" } };

export default function ListenPage() {
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Listening archive</p><h1>Voice is another form of transmission.</h1><p>Recordings are presented with language, type, context, and editorial status so that traditional recitation is never confused with modern guided practice.</p></header><section className="page-section page-shell"><div className="archive-count"><span>{recordings.length.toString().padStart(2, "0")} recordings</span><span>Verified audio added incrementally</span></div><div className="stack stack--large">{recordings.map((recording) => <AudioPlayer key={recording.id} recording={recording} />)}</div></section></main>;
}
