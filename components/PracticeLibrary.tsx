"use client";

import Link from "next/link";
import { useState } from "react";
import type { Practice } from "../types/content";
import { StatusLabel } from "./StatusLabel";

export function PracticeLibrary({ practices }: { practices: Practice[] }) {
  const categories = ["All", ...Array.from(new Set(practices.map((practice) => practice.category).filter(Boolean)))] as string[];
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("All");
  const visible = practices.filter((practice) => (category === "All" || practice.category === category) && (duration === "All" || practice.durationMinutes <= Number(duration)));

  return <><div className="archive-tools practice-library-tools"><div className="category-filter" aria-label="Filter practices by category">{categories.map((item) => <button type="button" className={item === category ? "is-active" : ""} aria-pressed={item === category} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="duration-filter"><span>Duration</span><select value={duration} onChange={(event) => setDuration(event.target.value)}><option value="All">Any length</option><option value="5">5 minutes or less</option><option value="10">10 minutes or less</option><option value="15">15 minutes or less</option></select></label></div><div className="archive-count"><span>{visible.length.toString().padStart(2, "0")} sessions</span><span>{category} · {duration === "All" ? "any duration" : `up to ${duration} min`}</span></div><div className="practice-grid">{visible.map((practice) => <Link className="practice-card" href={`/practice/${practice.slug}`} key={practice.id}><div className="practice-card__duration"><strong>{practice.durationMinutes.toString().padStart(2, "0")}</strong><span>min</span></div><div><StatusLabel status={practice.status} /><p className="eyebrow">{practice.category} · {practice.provenance}</p><h3>{practice.title}</h3><p>{practice.description}</p>{practice.traditionContext?.length ? <small>{practice.traditionContext.join(" · ")}</small> : <small>Not lineage-specific</small>}<span className="text-link">Open session →</span></div></Link>)}</div></>;
}
