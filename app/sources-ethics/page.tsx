import type { Metadata } from "next";
import { audioSources } from "../../data/audio-sources";
import { meditationSources } from "../../data/meditation-sources";

export const metadata: Metadata = { title: "Sources & Ethics", description: "The sourcing, attribution, rights, and ethical framework for Scripture in Sound.", alternates: { canonical: "/sources-ethics" } };

const sections = [
  {
    title: "Map data",
    text: "Geographic data is drawn from OpenStreetMap and used under the Open Database License (ODbL). The Sacred Places map uses the standard OpenStreetMap tile service, and its visible attribution links to the copyright and license page. Coordinates are reviewed against mapped temple features before publication; historical statements do not come from OpenStreetMap.",
    links: [{ label: "OpenStreetMap copyright and ODbL information", href: "https://www.openstreetmap.org/copyright" }],
  },
  {
    title: "Audio sources",
    text: "Every playable external recording must have an item-level creator, source URL, license, and explicit permissions record. Free access is not treated as permission to rehost, embed, edit, or use commercially. Materials marked needs-review stay out of the player. Changes to licensed recordings must be disclosed, and ShareAlike or NoDerivatives terms are followed exactly.",
    links: [{ label: "Wikimedia Commons reuse guidance", href: "https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia" }],
  },
  {
    title: "Meditation sources",
    text: "Traditional texts, modern adaptations, and project-created exercises are labeled separately. A public-domain scripture does not automatically make every modern meditation script reusable. The archive checks each translation or guide, identifies its license, and avoids reproducing instructions whose authorship or permission is unclear.",
    links: [{ label: "SuttaCentral licensing", href: "https://suttacentral.net/licensing" }],
  },
  {
    title: "Images",
    text: "Original fieldwork photographs require a date, location, caption, alt text, photographer credit, and confirmed rights statement. Third-party images require an item-level source and license. Empty galleries remain visible placeholders rather than being filled with decorative images of uncertain origin.",
    links: [],
  },
  {
    title: "Fieldwork",
    text: "First-person observations, interviews, questionnaires, and recordings are added only by the author. Records should distinguish public-space ambience from identifiable voices, note consent where relevant, avoid exposing sensitive personal information, and preserve a route for correction or removal.",
    links: [],
  },
];

export default function SourcesEthicsPage() {
  const audioCounts = { verified: audioSources.filter((item) => item.status === "verified").length, review: audioSources.filter((item) => item.status === "needs-review").length, rejected: audioSources.filter((item) => item.status === "rejected").length };
  const meditationCounts = { verified: meditationSources.filter((item) => item.status === "verified").length, review: meditationSources.filter((item) => item.status === "needs-review").length, rejected: meditationSources.filter((item) => item.status === "rejected").length };
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Sources &amp; ethics</p><h1>Careful sources, visible limits.</h1><p>Attribution, context, permissions, and uncertainty are part of the public archive. When a claim or license is not settled, the website says so or leaves the material unpublished.</p></header><section className="page-shell ethics-ledger"><p><strong>Current research ledger</strong></p><div><span>Audio · {audioCounts.verified} verified / {audioCounts.review} needs review / {audioCounts.rejected} rejected</span><span>Meditation · {meditationCounts.verified} verified / {meditationCounts.review} needs review / {meditationCounts.rejected} rejected</span></div></section><section className="page-shell ethics-sections">{sections.map((section, index) => <article className="entry-section" key={section.title}><div className="entry-section__number">{String(index + 1).padStart(2, "0")}</div><div><h2>{section.title}</h2><p>{section.text}</p>{section.links.map((link) => <a className="text-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}</div></article>)}</section><section className="page-section page-section--mist"><div className="page-shell source-schema"><div><p className="eyebrow">Publication rule</p><h2>No provenance, no publication.</h2></div><dl><div><dt>Map point</dt><dd>Coordinates, geographic source, review date, and separate historical sources.</dd></div><div><dt>Recording</dt><dd>Creator, source URL, license, license URL, and rehost/embed/modify permissions.</dd></div><div><dt>Meditation</dt><dd>Category, duration, tradition context, provenance label, exact source, and license.</dd></div><div><dt>Field material</dt><dd>Author confirmation, date, place, context, consent where needed, and rights.</dd></div></dl></div></section></main>;
}
