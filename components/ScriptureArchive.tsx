"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Scripture, TeachingMode, TextType } from "../types/content";
import { StatusLabel } from "./StatusLabel";

const options = {
  tradition: ["Theravāda", "Mahāyāna", "Vajrayāna"],
  textType: ["sutra", "sutta", "tantra", "mantra", "dharani", "commentary", "liturgy"],
  theme: ["Compassion", "Emptiness", "Wisdom", "Impermanence", "Mindfulness", "Pure Land", "Bodhisattva Practice"],
  language: ["Sanskrit", "Pāli", "Classical Chinese", "Tibetan", "English"],
  teachingMode: ["exoteric", "esoteric"],
};

const textTypeLabel: Record<TextType, string> = { sutra: "Sutra", sutta: "Sutta", tantra: "Tantra", mantra: "Mantra", dharani: "Dhāraṇī", commentary: "Commentary", liturgy: "Liturgy", other: "Other" };

export function ScriptureArchive({ scriptures }: { scriptures: Scripture[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string[]>>({ tradition: [], textType: [], theme: [], language: [], teachingMode: [] });

  function toggle(group: string, value: string) {
    setSelected((current) => ({ ...current, [group]: current[group].includes(value) ? current[group].filter((item) => item !== value) : [...current[group], value] }));
  }

  const activeCount = Object.values(selected).flat().length;
  const filtered = useMemo(() => scriptures.filter((scripture) => {
    if (
      selected.tradition.length &&
      !selected.tradition.some((value) =>
        scripture.traditions.some((tradition) => tradition === value),
      )
    )
      return false;
    if (selected.textType.length && !selected.textType.includes(scripture.textType)) return false;
    if (selected.theme.length && !selected.theme.some((value) => scripture.themes.includes(value))) return false;
    if (selected.language.length && !selected.language.some((value) => scripture.languages.includes(value))) return false;
    if (selected.teachingMode.length && !selected.teachingMode.includes(scripture.teachingMode || "")) return false;
    return true;
  }), [scriptures, selected]);

  return (
    <section className="page-shell page-section archive-browser">
      <div className="archive-toolbar">
        <button type="button" className="filter-toggle" onClick={() => setFiltersOpen((value) => !value)} aria-expanded={filtersOpen} aria-controls="scripture-filters">
          {filtersOpen ? "Hide filters" : "Filter archive"}<span>{activeCount ? `${activeCount} active` : "Tradition · type · theme · language"}</span>
        </button>
        {activeCount ? <button type="button" className="clear-filters" onClick={() => setSelected({ tradition: [], textType: [], theme: [], language: [], teachingMode: [] })}>Clear all</button> : null}
      </div>
      {filtersOpen ? (
        <div className="filter-drawer" id="scripture-filters">
          {Object.entries(options).map(([group, values]) => (
            <fieldset key={group}><legend>{group === "textType" ? "Text type" : group === "teachingMode" ? "Teaching context" : group}</legend>{values.map((value) => <label key={value}><input type="checkbox" checked={selected[group].includes(value)} onChange={() => toggle(group, value)} /><span>{group === "textType" ? textTypeLabel[value as TextType] : value === "exoteric" ? "Exoteric" : value === "esoteric" ? "Esoteric" : value}</span></label>)}</fieldset>
          ))}
          <p className="filter-context">Teaching context is used only where historically appropriate. It is not assigned automatically from tradition.</p>
        </div>
      ) : null}
      <div className="archive-count"><span>{filtered.length.toString().padStart(2, "0")} of {scriptures.length.toString().padStart(2, "0")} entries</span><span>Structured archive</span></div>
      <div className="scripture-list">
        {filtered.map((scripture) => (
          <Link href={`/scriptures/${scripture.slug}`} className="scripture-card" key={scripture.id}>
            <div><p className="eyebrow">{scripture.traditions.join(" · ")}</p><h2>{scripture.title}</h2><p className="scripture-card__original">{scripture.originalTitle}</p></div>
            <div><StatusLabel status={scripture.status} /><p>{scripture.shortDescription}</p><div className="tag-list"><span>{textTypeLabel[scripture.textType]}</span>{scripture.languages.map((language) => <span key={language}>{language}</span>)}</div></div>
            <span className="scripture-card__arrow" aria-hidden="true">→</span>
          </Link>
        ))}
        {!filtered.length ? <div className="empty-state"><h2>No entries match these filters yet.</h2><p>Clear one or more filters, or add a new structured scripture record.</p></div> : null}
      </div>
    </section>
  );
}
