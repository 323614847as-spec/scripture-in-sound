import type { Metadata } from "next";
import { ScriptureArchive } from "../../components/ScriptureArchive";
import { scriptures } from "../../data/scriptures";

export const metadata: Metadata = { title: "Scriptures", description: "Browse Buddhist scriptures by tradition, text type, theme, language, and teaching context.", alternates: { canonical: "/scriptures" } };

export default function ScripturesPage() {
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Scriptures</p><h1>Texts in motion.</h1><p>Browse a growing editorial archive of Buddhist texts as written works, spoken forms, practices, and points of connection. Filters reflect structured metadata and use teaching classifications only where historically appropriate.</p></header><ScriptureArchive scriptures={scriptures} /></main>;
}
