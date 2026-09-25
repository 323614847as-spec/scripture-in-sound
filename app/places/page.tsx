import type { Metadata } from "next";
import Link from "next/link";
import { PlacesMap } from "../../components/PlacesMap";
import { StatusLabel } from "../../components/StatusLabel";
import { places } from "../../data/places";

export const metadata: Metadata = { title: "Sacred Places", description: "Explore a growing fieldwork archive of Buddhist temples, monasteries, sounds, images, and notes.", alternates: { canonical: "/places" } };

export default function PlacesPage() {
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Sacred places</p><h1>A map of listening and encounter.</h1><p>This evolving archive documents Buddhist sites personally visited by the author and connects scripture, sound, photographs, and observation. It is a fieldwork archive, not a tourism recommendation map.</p></header><section className="page-section page-shell"><PlacesMap places={places} /></section><section className="page-section page-shell"><div className="archive-count"><span>{places.length.toString().padStart(2, "0")} place records</span><span>Verified coordinates added incrementally</span></div><div className="place-grid">{places.map((place, index) => <Link className="place-card" href={`/places/${place.slug}`} key={place.id}>{place.coverImage ? <img className="place-card__image" src={place.coverImage.src} alt={place.coverImage.alt} /> : <div className="image-placeholder"><span>[COVER PHOTOGRAPH TO BE ADDED]</span><b>{String(index + 1).padStart(2, "0")}</b></div>}<div className="place-card__body"><StatusLabel status={place.status} /><p className="eyebrow">{place.location}</p><h2>{place.name}</h2><p className="place-card__local">{place.localName}</p><p>{place.shortDescription}</p><span className="text-link">Explore place →</span></div></Link>)}</div></section></main>;
}
