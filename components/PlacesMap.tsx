"use client";

import { useState } from "react";
import Link from "next/link";
import type { Place } from "../types/content";

export function PlacesMap({ places }: { places: Place[] }) {
  const [activeId, setActiveId] = useState(places[0]?.id);
  const activePlace = places.find((place) => place.id === activeId) || places[0];

  return (
    <div className="map-shell">
      <div className="map-canvas" aria-label="Interactive schematic map of featured places">
        <div className="map-canvas__grid" aria-hidden="true" />
        <div className="map-canvas__land" aria-hidden="true">
          <span>CHINA</span>
        </div>
        {places.map((place, index) => (
          <button
            key={place.id}
            type="button"
            className={`map-marker ${place.id === activePlace?.id ? "is-active" : ""}`}
            style={{ left: `${place.mapPosition.x}%`, top: `${place.mapPosition.y}%` }}
            onClick={() => setActiveId(place.id)}
            aria-label={`Show ${place.name}`}
            aria-pressed={place.id === activePlace?.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
        <p className="map-canvas__notice">
          Schematic display only · verified geographic coordinates forthcoming
        </p>
      </div>
      {activePlace ? (
        <aside className="map-preview" aria-live="polite">
          <div className="image-placeholder image-placeholder--map">
            <span>Field photograph forthcoming</span>
          </div>
          <p className="eyebrow">{activePlace.location}</p>
          <h3>{activePlace.name}</h3>
          <p className="map-preview__local">{activePlace.localName}</p>
          <p>{activePlace.summary}</p>
          <div className="map-preview__footer">
            <span>{activePlace.tradition}</span>
            <Link className="text-link" href={`/places/${activePlace.slug}`}>Explore this place →</Link>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
