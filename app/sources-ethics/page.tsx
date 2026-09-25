import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sources & Ethics", description: "The sourcing, attribution, rights, and ethical framework for Scripture in Sound.", alternates: { canonical: "/sources-ethics" } };

const principles = [
  ["Scholarly care", "Historical claims, dates, translations, quotations, and doctrinal explanations require reviewed sources. Unverified material remains visibly marked."],
  ["Living traditions", "Texts, chants, objects, and practices belong to living communities. The archive avoids presenting one context as universal or flattening differences between traditions."],
  ["Sound in context", "Every published recording should identify its type, language, performer or recordist, place and date where appropriate, permission status, and relationship to a tradition."],
  ["Fieldwork honesty", "First-person observations are written only by the author. Missing field notes remain explicit placeholders; the interface does not invent experience."],
  ["Photographic attribution", "Original fieldwork images are distinguished from third-party material. Each image record supports credit, caption, date, location, notes, and rights status."],
  ["Modern practice labels", "Contemporary exercises created for this site are clearly separated from historically situated or lineage-specific Buddhist practices."],
];

export default function SourcesEthicsPage() {
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Sources & ethics</p><h1>Careful sources, visible limits.</h1><p>Scripture in Sound treats attribution, context, permissions, and uncertainty as part of the public-facing archive rather than as hidden production notes.</p></header><section className="page-shell ethics-grid">{principles.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className="page-section page-section--mist"><div className="page-shell source-schema"><div><p className="eyebrow">Source infrastructure</p><h2>What each record can hold</h2></div><dl><div><dt>Textual source</dt><dd>Title, author, translator, publication, URL, access date, notes, and rights status.</dd></div><div><dt>Recording</dt><dd>Title, language, tradition, recording type, attribution, transcript, context, and permission or license.</dd></div><div><dt>Photograph</dt><dd>File path, alt text, caption, date, location, field note, photographer credit, and rights status.</dd></div><div><dt>Original material</dt><dd>May be labeled “Photograph by the author” or “Field recording by the author” only after the author confirms the record.</dd></div></dl></div></section></main>;
}
