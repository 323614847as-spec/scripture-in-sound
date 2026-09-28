import { scriptures } from "../data/scriptures";
import { places } from "../data/places";
import { practices } from "../data/practices";
import { recordings } from "../data/recordings";
import { guideEntries } from "../data/guide";
import type { RelationType } from "./community";

export const relatedContentOptions: Record<RelationType, { id: string; label: string; href: string }[]> = {
  scripture: scriptures.map((item) => ({ id: item.id, label: item.title, href: `/scriptures/${item.slug}` })),
  place: places.map((item) => ({ id: item.id, label: item.name, href: `/places/${item.slug}` })),
  practice: practices.map((item) => ({ id: item.id, label: item.title, href: `/practice/${item.slug}` })),
  audio: recordings.map((item) => ({ id: item.id, label: item.title, href: "/listen" })),
  guide: guideEntries.map((item) => ({ id: item.id, label: item.title, href: `/guide/${item.slug}` })),
};

export function resolveRelatedContent(type: string, id: string) {
  if (!(type in relatedContentOptions)) return null;
  return relatedContentOptions[type as RelationType].find((item) => item.id === id) || null;
}
