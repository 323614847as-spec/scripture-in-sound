"use client";

import { useState } from "react";
import type { AudioRecording } from "../types/content";
import { AudioPlayer } from "./AudioPlayer";

export function ListenArchive({ recordings }: { recordings: AudioRecording[] }) {
  const categories = ["All", "Chanting", "Scripture Recitation", "Mantra", "Pronunciation", "Field Recording", "Guided Meditation"];
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [tradition, setTradition] = useState("All traditions");
  const [language, setLanguage] = useState("All languages");
  const traditions = ["All traditions", ...Array.from(new Set(recordings.flatMap((recording) => recording.traditions || []))).sort()];
  const languages = ["All languages", ...Array.from(new Set(recordings.map((recording) => recording.language))).sort()];
  const visible = recordings.filter((recording) => {
    const categoryMatches = active === "All" || recording.type === active;
    const traditionMatches = tradition === "All traditions" || recording.traditions?.includes(tradition as never);
    const languageMatches = language === "All languages" || recording.language === language;
    const searchText = [recording.title, recording.description, recording.language, recording.type, recording.traditions?.join(" ")].join(" ").toLowerCase();
    return categoryMatches && traditionMatches && languageMatches && searchText.includes(query.trim().toLowerCase());
  });
  return <><div className="archive-tools"><label className="archive-search"><span>Search the archive</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, language, tradition, or type" /></label><div className="archive-selects"><label><span>Tradition</span><select value={tradition} onChange={(event) => setTradition(event.target.value)}>{traditions.map((value) => <option key={value}>{value}</option>)}</select></label><label><span>Language</span><select value={language} onChange={(event) => setLanguage(event.target.value)}>{languages.map((value) => <option key={value}>{value}</option>)}</select></label></div><div className="category-filter" aria-label="Filter recordings by category">{categories.map((category) => <button type="button" className={category === active ? "is-active" : ""} aria-pressed={category === active} key={category} onClick={() => setActive(category)}>{category}</button>)}</div></div><div className="archive-count"><span>{visible.length.toString().padStart(2, "0")} recordings</span><span>{active}{tradition !== "All traditions" ? ` · ${tradition}` : ""}{language !== "All languages" ? ` · ${language}` : ""}{query ? ` · “${query}”` : ""}</span></div><div className="stack stack--large">{visible.map((recording) => <AudioPlayer key={recording.id} recording={recording} />)}{!visible.length ? <p className="placeholder-panel">No recordings match the current filters.</p> : null}</div></>;
}
