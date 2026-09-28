import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Community Guidelines", description: "Participation principles for the Scripture in Sound community." };
const guidelines = [
  ["Discuss ideas, not people", "Critique interpretations and evidence without attacking, harassing, or demeaning another participant."],
  ["Name the kind of claim you are making", "Distinguish personal reflection, tradition-specific teaching, historical evidence, and your own interpretation."],
  ["Support substantial claims", "Where possible, cite reliable sources for historical, textual, linguistic, or institutional claims."],
  ["Respect living traditions", "Avoid sectarian hostility, flattening distinct communities, or presenting yourself as a religious authority you are not."],
  ["Share only what you may share", "Do not post copyrighted texts, photographs, or recordings without permission or a valid legal basis."],
  ["Correct constructively", "Thoughtful corrections and source recommendations are welcome. Explain the issue and offer evidence."],
];
export default function GuidelinesPage() { return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Community</p><h1>Guidelines for careful conversation.</h1><p>This space welcomes disagreement, questions, and reflection while protecting people, living traditions, and the integrity of the archive.</p></header><section className="page-shell guidelines-list">{guidelines.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}<div className="guidelines-footer"><p>Content may be hidden or removed when it violates these principles. Repeated or severe violations may result in account restrictions.</p><Link className="text-link" href="/community">Return to Community →</Link></div></section></main>; }
