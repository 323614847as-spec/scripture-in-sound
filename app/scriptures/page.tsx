import type { Metadata } from "next";
import Link from "next/link";
import { StatusLabel } from "../../components/StatusLabel";
import { scriptures } from "../../data/scriptures";

export const metadata: Metadata = {
  title: "Scriptures",
  description: "Browse Buddhist scriptures by tradition, theme, and language.",
  alternates: { canonical: "/scriptures" },
};

export default function ScripturesPage() {
  const traditions = ["Theravāda", "Mahāyāna", "Tibetan Buddhism"];
  const themes = ["Compassion", "Emptiness", "Impermanence", "Mindfulness", "Wisdom"];
  const languages = ["Sanskrit", "Pāli", "Chinese", "Tibetan", "English"];
  return (
    <main id="main-content">
      <header className="page-hero page-shell">
        <p className="eyebrow">Scriptures</p>
        <h1>Texts in motion.</h1>
        <p>Browse a growing editorial archive of Buddhist texts as written works, spoken forms, practices, and points of connection.</p>
      </header>
      <section className="archive-layout page-shell page-section">
        <aside className="filter-panel" aria-label="Available scripture filters">
          <p className="filter-panel__note">Filter interface foundation</p>
          {[{ label: "Tradition", values: traditions }, { label: "Theme", values: themes }, { label: "Language", values: languages }].map((group) => (
            <fieldset key={group.label}><legend>{group.label}</legend>{group.values.map((value) => <label key={value}><input type="checkbox" disabled /> <span>{value}</span></label>)}</fieldset>
          ))}
          <p className="small-note">Filters activate as more verified entries are added.</p>
        </aside>
        <div>
          <div className="archive-count"><span>{scriptures.length.toString().padStart(2, "0")} entries</span><span>Sorted editorially</span></div>
          <div className="scripture-list">
            {scriptures.map((scripture) => (
              <Link href={`/scriptures/${scripture.slug}`} className="scripture-card" key={scripture.id}>
                <div><p className="eyebrow">{scripture.tradition}</p><h2>{scripture.title}</h2><p className="scripture-card__original">{scripture.originalTitle}</p></div>
                <div><StatusLabel status={scripture.status} /><p>{scripture.summary}</p><div className="tag-list">{scripture.languages.map((language) => <span key={language}>{language}</span>)}</div></div>
                <span className="scripture-card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
