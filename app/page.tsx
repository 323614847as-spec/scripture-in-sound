import type { Metadata } from "next";
import Link from "next/link";
import { AudioPlayer } from "../components/AudioPlayer";
import { PlacesMap } from "../components/PlacesMap";
import { SectionHeading } from "../components/SectionHeading";
import { practices } from "../data/practices";
import { recordings } from "../data/recordings";
import { scriptures } from "../data/scriptures";
import { places } from "../data/places";

export const metadata: Metadata = { title: "Scripture in Sound", alternates: { canonical: "/" } };

const pathways = [
  { number: "01", title: "Explore Scriptures", text: "Read texts alongside editorial context and listening resources.", href: "/scriptures" },
  { number: "02", title: "Begin Listening", text: "Hear how language, breath, pacing, and repetition shape meaning.", href: "/listen" },
  { number: "03", title: "Practice", text: "Enter clearly labeled contemporary contemplative listening sessions.", href: "/practice" },
  { number: "04", title: "Explore Sacred Places", text: "Follow sound, field notes, and textual connections across place.", href: "/places" },
];

export default function Home() {
  const featuredScripture = scriptures.find((scripture) => scripture.featured)!;
  const demoRecording = recordings.find((recording) => recording.id === "interface-tone")!;
  const featuredPractice = practices.find((practice) => practice.id === "breathing-heart-sutra")!;

  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero__index" aria-hidden="true">TEXT · VOICE · ATTENTION · PLACE</div>
        <div className="hero__content">
          <p className="eyebrow">A digital humanities project</p>
          <h1>Buddhist texts are not only read.</h1>
          <p className="hero__statement">They are heard, repeated, remembered, and lived.</p>
          <p className="hero__intro">Explore Buddhist scripture through text, sound, contemplative practice, and place.</p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/scriptures">Enter the archive</Link>
            <Link className="button button--text" href="/about">About the project →</Link>
          </div>
        </div>
        <div className="hero__sequence" aria-label="Project themes">
          {[["01", "Scripture"], ["02", "Sound"], ["03", "Practice"], ["04", "Place"]].map(([number, label]) => (
            <div key={number}><span>{number}</span><strong>{label}</strong></div>
          ))}
        </div>
      </section>

      <section className="pathways page-section page-shell" aria-label="Explore the project">
        {pathways.map((pathway) => (
          <Link className="pathway-card" href={pathway.href} key={pathway.number}>
            <span>{pathway.number}</span><h2>{pathway.title}</h2><p>{pathway.text}</p><strong aria-hidden="true">↗</strong>
          </Link>
        ))}
      </section>

      <section className="page-section page-shell">
        <SectionHeading eyebrow="Featured scripture" title={featuredScripture.title} />
        <div className="featured-scripture">
          <div className="featured-scripture__title">
            <p>{featuredScripture.originalTitle}</p>
            <div className="tag-list"><span>{featuredScripture.tradition}</span>{featuredScripture.themes.map((theme) => <span key={theme}>{theme}</span>)}</div>
          </div>
          <div><p className="large-copy">{featuredScripture.summary}</p><Link className="text-link" href={`/scriptures/${featuredScripture.slug}`}>Read the prototype entry →</Link></div>
        </div>
      </section>

      <section className="page-section page-section--ink"><div className="page-shell">
        <SectionHeading eyebrow="Listen" title="Attend to the life of a text in sound." intro="The player is ready for verified chanting, recitation, pronunciation, field recordings, and guided listening." action={<Link className="text-link text-link--light" href="/listen">Browse listening archive →</Link>} />
        <AudioPlayer recording={demoRecording} />
      </div></section>

      <section className="page-section page-shell">
        <SectionHeading eyebrow="Practice" title="Five-minute contemplative listening" />
        <div className="practice-feature">
          <div className="practice-feature__duration"><strong>05</strong><span>minutes</span></div>
          <div><p className="eyebrow">{featuredPractice.type}</p><h3>{featuredPractice.title}</h3><p>{featuredPractice.description}</p><p className="editorial-note">{featuredPractice.editorialNote}</p><Link className="button button--outline" href="/practice">Begin a session</Link></div>
        </div>
      </section>

      <section className="page-section page-section--mist"><div className="page-shell">
        <SectionHeading eyebrow="Sacred places" title="A fieldwork archive in formation" intro="Places connect texts to voices, communities, material settings, and lived observation." action={<Link className="text-link" href="/places">Open the full map →</Link>} />
        <PlacesMap places={places.filter((place) => place.featured)} />
      </div></section>

      <section className="page-section page-shell about-strip">
        <p className="eyebrow">About the project</p>
        <div><h2>From writing to voice, ritual, attention, and place.</h2><p>Scripture in Sound is a public humanities project exploring how Buddhist texts move between written form, spoken voice, contemplative practice, and the places in which they are encountered.</p><Link className="text-link" href="/about">Read the editorial approach →</Link></div>
      </section>
    </main>
  );
}
