import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { scriptures } from "../data/scriptures";
import { places } from "../data/places";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/scriptures",
    "/listen",
    "/practice",
    "/places",
    "/about",
    "/sources-ethics",
    ...scriptures.map((scripture) => `/scriptures/${scripture.slug}`),
    ...places.map((place) => `/places/${place.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.currentUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
