import type { Metadata } from "next";
import Link from "next/link";
import { DiscussionCard } from "../../components/DiscussionCard";
import { communityCategories, type DiscussionSummary } from "../../lib/community";
import { createClient, getCurrentUser } from "../../lib/supabase/server";

export const metadata: Metadata = { title: "Community", description: "Conversations around Buddhist texts, sound, practice, and place." };

export default async function CommunityPage({ searchParams }: { searchParams: Promise<{ category?: string; related?: string }> }) {
  const params = await searchParams;
  const selected = params.category;
  const supabase = await createClient();
  const user = await getCurrentUser();
  let discussions: DiscussionSummary[] = [];
  if (supabase) {
    let query = supabase.from("discussions").select("*, profiles!discussions_author_id_fkey(username,display_name,avatar_url), replies(count)").in("status", ["visible", "locked"]).order("pinned", { ascending: false }).order("updated_at", { ascending: false });
    if (selected && communityCategories.some((item) => item.slug === selected)) query = query.eq("category", selected);
    if (params.related?.includes(":")) {
      const [contentType, contentId] = params.related.split(":", 2);
      const { data: relations } = await supabase.from("discussion_relations").select("discussion_id").eq("content_type", contentType).eq("content_id", contentId);
      const ids = (relations || []).map((row: any) => row.discussion_id);
      if (ids.length) query = query.in("id", ids); else query = query.eq("id", "00000000-0000-0000-0000-000000000000");
    }
    const { data } = await query;
    discussions = (data || []).map((item: any) => ({ ...item, reply_count: item.replies?.[0]?.count || 0 }));
  }
  return <main id="main-content"><header className="page-hero page-shell community-hero"><p className="eyebrow">Participatory archive</p><h1>Community</h1><p>Conversations around Buddhist texts, sound, practice, and place.</p><div className="community-hero__actions"><Link className="button button--solid" href={user ? "/community/new" : "/sign-in?next=/community/new"}>Start a discussion</Link><Link className="text-link" href="/community/guidelines">Read the guidelines →</Link></div></header><section className="page-shell community-layout"><aside><h2>Conversation areas</h2><Link className={!selected ? "active" : ""} href="/community">All conversations</Link>{communityCategories.map((category) => <Link className={selected === category.slug ? "active" : ""} href={`/community?category=${category.slug}`} key={category.slug}><strong>{category.label}</strong><span>{category.description}</span></Link>)}</aside><div className="discussion-list"><div className="archive-count"><span>{discussions.length.toString().padStart(2, "0")} conversations</span><span>Public reading · account required to participate</span></div>{discussions.length ? discussions.map((discussion) => <DiscussionCard key={discussion.id} discussion={discussion} />) : <div className="community-empty"><p className="eyebrow">An open invitation</p><h2>The conversation is just beginning.</h2><p>Start the first discussion about a text, practice, sound, or place. No fictional accounts or activity have been added.</p><Link className="text-link" href={user ? "/community/new" : "/sign-in?next=/community/new"}>Start a discussion →</Link></div>}</div></section></main>;
}
