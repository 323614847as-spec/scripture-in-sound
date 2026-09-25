import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { scriptures } from "../data/scriptures";
import { places } from "../data/places";
import { guideEntries } from "../data/guide";
import { fieldNotes } from "../data/field-notes";
import { practices } from "../data/practices";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/scriptures",
    "/listen",
    "/practice",
    "/places",
    "/about",
    "/guide",
    "/sources-ethics",
    "/field-notes",
    ...scriptures.map((scripture) => `/scriptures/${scripture.slug}`),
    ...places.map((place) => `/places/${place.slug}`),
    ...guideEntries.map((entry) => `/guide/${entry.slug}`),
    ...fieldNotes.map((note) => `/field-notes/${note.slug}`),
    ...practices.map((practice) => `/practice/${practice.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.currentUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
