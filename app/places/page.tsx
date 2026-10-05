import type { Metadata } from "next";
import Link from "next/link";
import { PlacesMap } from "../../components/PlacesMap";
import { StatusLabel } from "../../components/StatusLabel";
import { places } from "../../data/places";

export const metadata: Metadata = { title: "Sacred Places", description: "Explore a growing fieldwork archive of Buddhist temples, monasteries, sounds, images, and notes.", alternates: { canonical: "/places" } };

export default function PlacesPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-shell">
        <p className="eyebrow">Sacred Places</p>
        <h1>Buddhist Sites in Beijing.</h1>
        <p className="page-hero__intro">Buddhist practice is shaped not only by texts, but also by the places in which texts are heard, recited, taught, and remembered. This map documents Buddhist sites in Beijing and connects them with historical notes, photographs, field observations, and sound.</p>
        <p className="small-note">Coordinates are drawn from open geographic data and reviewed before publication; a map marker does not imply that fieldwork has already taken place.</p>
      </header>
      <section className="page-section page-shell">
        <PlacesMap places={places} />
        <p className="map-method-note">Map data and tiles © OpenStreetMap contributors, licensed under the ODbL. Historical summaries cite their sources on each place page.</p>
      </section>
      <section className="page-section page-shell">
        <div className="archive-count"><span>{places.length.toString().padStart(2, "0")} reviewed place records</span><span>Beijing municipality · coordinates reviewed 05 Oct 2026</span></div>
        <div className="place-grid">
          {places.map((place, index) => (
            <Link className="place-card" href={`/places/${place.slug}`} key={place.id}>
              {place.coverImage ? <img className="place-card__image" src={place.coverImage.src} alt={place.coverImage.alt} /> : <div className="image-placeholder"><span>[AUTHOR PHOTOGRAPH TO BE ADDED]</span><b>{String(index + 1).padStart(2, "0")}</b></div>}
              <div className="place-card__body">
                <StatusLabel status={place.status} />
                <p className="eyebrow">{place.historicalPeriod}</p>
                <h2>{place.nameEnglish || place.name}</h2>
                <p className="place-card__local">{place.nameChinese || place.localName} {place.romanization ? `· ${place.romanization}` : ""}</p>
                <p>{place.shortDescription}</p>
                <span className="text-link">Explore place →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
