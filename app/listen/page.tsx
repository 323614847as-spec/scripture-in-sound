import type { Metadata } from "next";
import { ListenArchive } from "../../components/ListenArchive";
import { recordings } from "../../data/recordings";

export const metadata: Metadata = { title: "Listen", description: "Listen to recitation, chanting, pronunciation, field recordings, and contemplative audio.", alternates: { canonical: "/listen" } };

export default function ListenPage() {
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Listening archive</p><h1>What happens when scripture becomes sound?</h1><p>Listen across chanting, recitation, pronunciation, mantra, field recording, and contemporary guided practice. Language, tradition, attribution, rights, and editorial status remain visible so unlike forms of sound are not collapsed together.</p></header><section className="page-section page-shell"><ListenArchive recordings={recordings} /></section></main>;
}
