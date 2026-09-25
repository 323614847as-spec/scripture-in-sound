"use client";

import { useEffect, useState } from "react";
import type { Photograph } from "../types/content";

export function PhotoGallery({ photographs }: { photographs: Photograph[] }) {
  const [active, setActive] = useState<Photograph | null>(null);
  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [active]);

  if (!photographs.length) return <div className="gallery-empty"><strong>[FIELDWORK PHOTOGRAPHS TO BE ADDED BY AUTHOR]</strong><p>Add image files and register them in <code>data/places.ts</code>. The gallery and lightbox will appear automatically.</p></div>;

  return <><div className="photo-gallery">{photographs.map((photo) => <figure key={photo.id}><button type="button" onClick={() => setActive(photo)} aria-label={`Open image: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /></button><figcaption><span>{photo.caption || "Caption to be added by author"}</span><small>{photo.credit}</small></figcaption></figure>)}</div>{active ? <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.alt} onClick={() => setActive(null)}><button type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image">Close ×</button><figure onClick={(event) => event.stopPropagation()}><img src={active.src} alt={active.alt} /><figcaption><strong>{active.caption || active.alt}</strong><span>{active.credit}{active.date ? ` · ${active.date}` : ""}{active.location ? ` · ${active.location}` : ""}</span>{active.rights ? <small>{active.rights}</small> : null}</figcaption></figure></div> : null}</>;
}
