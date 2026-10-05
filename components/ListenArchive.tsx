"use client";

import { useState } from "react";
import type { AudioRecording } from "../types/content";
import { AudioPlayer } from "./AudioPlayer";

export function ListenArchive({ recordings }: { recordings: AudioRecording[] }) {
  const categories = ["All", "Chanting", "Scripture Recitation", "Mantra", "Pronunciation", "Field Recording", "Guided Meditation"];
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const visible = recordings.filter((recording) => {
    const categoryMatches = active === "All" || recording.type === active;
    const searchText = [recording.title, recording.description, recording.language, recording.type, recording.traditions?.join(" ")].join(" ").toLowerCase();
    return categoryMatches && searchText.includes(query.trim().toLowerCase());
  });
  return <><div className="archive-tools"><label className="archive-search"><span>Search the archive</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, language, tradition, or type" /></label><div className="category-filter" aria-label="Filter recordings by category">{categories.map((category) => <button type="button" className={category === active ? "is-active" : ""} aria-pressed={category === active} key={category} onClick={() => setActive(category)}>{category}</button>)}</div></div><div className="archive-count"><span>{visible.length.toString().padStart(2, "0")} recordings</span><span>{active}{query ? ` · “${query}”` : ""}</span></div><div className="stack stack--large">{visible.map((recording) => <AudioPlayer key={recording.id} recording={recording} />)}{!visible.length ? <p className="placeholder-panel">No recordings match this search and category.</p> : null}</div></>;
}
