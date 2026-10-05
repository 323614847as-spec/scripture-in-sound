"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Place } from "../types/content";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export function PlacesMap({ places }: { places: Place[] }) {
  const mapNode = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const [activeId, setActiveId] = useState(places[0]?.id);
  const activePlace = places.find((place) => place.id === activeId) || places[0];

  useEffect(() => {
    let cancelled = false;

    async function mountMap() {
      if (!mapNode.current || mapInstance.current) return;
      const L = await import("leaflet");
      if (cancelled || !mapNode.current) return;

      const map = L.map(mapNode.current, {
        center: [39.95, 116.28],
        zoom: 9,
        minZoom: 7,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapInstance.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(map);

      places.forEach((place, index) => {
        if (!place.coordinates?.verified) return;
        const marker = L.marker([place.coordinates.latitude, place.coordinates.longitude], {
          icon: L.divIcon({
            className: "temple-map-marker",
            html: `<span>${String(index + 1).padStart(2, "0")}</span>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20],
          }),
          title: place.name,
        }).addTo(map);

        const period = place.historicalPeriod ? `<p>${escapeHtml(place.historicalPeriod)}</p>` : "";
        marker.bindPopup(`
          <article class="map-popup">
            <p class="map-popup__local">${escapeHtml(place.nameChinese || place.localName || "")}</p>
            <h3>${escapeHtml(place.nameEnglish || place.name)}</h3>
            <small>${escapeHtml(place.traditions.join(" · "))}</small>
            ${period}
            <p>${escapeHtml(place.shortDescription)}</p>
            <a href="/places/${encodeURIComponent(place.slug)}">Open the place record →</a>
          </article>
        `);
        marker.on("click", () => setActiveId(place.id));
      });

      window.setTimeout(() => map.invalidateSize(), 0);
    }

    void mountMap();
    return () => {
      cancelled = true;
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [places]);

  return (
    <div className="map-shell map-shell--leaflet">
      <div ref={mapNode} className="leaflet-map" aria-label="Interactive OpenStreetMap of Buddhist sites in Beijing" />
      {activePlace ? (
        <aside className="map-preview" aria-live="polite">
          <p className="eyebrow">{activePlace.location}</p>
          <h3>{activePlace.nameEnglish || activePlace.name}</h3>
          <p className="map-preview__local">{activePlace.nameChinese || activePlace.localName}</p>
          {activePlace.romanization ? <p className="map-preview__romanization">{activePlace.romanization}</p> : null}
          <p>{activePlace.summary || activePlace.shortDescription}</p>
          <div className="map-preview__footer">
            <span>{activePlace.traditions.join(" · ")}</span>
            <span>{activePlace.historicalPeriod}</span>
            <Link className="text-link" href={`/places/${activePlace.slug}`}>Explore this place →</Link>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
