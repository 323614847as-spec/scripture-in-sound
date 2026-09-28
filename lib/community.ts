export const communityCategories = [
  {
    slug: "scripture-interpretation",
    label: "Scripture & Interpretation",
    description: "Questions and discussion about Buddhist texts, translations, concepts, and interpretations.",
  },
  {
    slug: "sound-chanting",
    label: "Sound & Chanting",
    description: "Recitation, chanting, pronunciation, language, and attentive listening.",
  },
  {
    slug: "practice-reflection",
    label: "Practice & Reflection",
    description: "Personal reflections on contemplative practice—not automatically authoritative Buddhist teaching.",
  },
  {
    slug: "sacred-places",
    label: "Sacred Places",
    description: "Monasteries, temples, architecture, local traditions, and field observations.",
  },
  {
    slug: "questions",
    label: "Questions",
    description: "A welcoming place to ask about Buddhism and material encountered across this project.",
  },
  {
    slug: "project-feedback",
    label: "Project Feedback",
    description: "Constructive corrections, source recommendations, and suggestions for Scripture in Sound.",
  },
] as const;

export const relationTypes = ["scripture", "place", "practice", "audio", "guide"] as const;
export type RelationType = (typeof relationTypes)[number];

export type CommunityProfile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  interests: string[];
  role: "user" | "moderator" | "admin";
  created_at: string;
};

export type DiscussionSummary = {
  id: string;
  title: string;
  body: string;
  category: string;
  author_id: string;
  status: "visible" | "hidden" | "locked" | "removed";
  pinned: boolean;
  created_at: string;
  updated_at: string;
  reply_count?: number;
  profiles?: Pick<CommunityProfile, "username" | "display_name" | "avatar_url"> | null;
};

export function categoryLabel(slug: string) {
  return communityCategories.find((category) => category.slug === slug)?.label || "Community";
}

export function safeReturnPath(value: FormDataEntryValue | null, fallback = "/community") {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}
