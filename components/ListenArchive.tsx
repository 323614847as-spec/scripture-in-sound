"use client";

import { useState } from "react";
import type { AudioRecording } from "../types/content";
import { AudioPlayer } from "./AudioPlayer";

export function ListenArchive({ recordings }: { recordings: AudioRecording[] }) {
  const categories = ["All", ...Array.from(new Set(recordings.map((recording) => recording.type)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? recordings : recordings.filter((recording) => recording.type === active);
  return <><div className="category-filter" aria-label="Filter recordings by category">{categories.map((category) => <button type="button" className={category === active ? "is-active" : ""} aria-pressed={category === active} key={category} onClick={() => setActive(category)}>{category}</button>)}</div><div className="archive-count"><span>{visible.length.toString().padStart(2, "0")} recordings</span><span>{active}</span></div><div className="stack stack--large">{visible.map((recording) => <AudioPlayer key={recording.id} recording={recording} />)}</div></>;
}
