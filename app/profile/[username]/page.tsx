import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscussionCard } from "../../../components/DiscussionCard";
import { createClient } from "../../../lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> { return { title: `@${(await params).username}` }; }
export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const supabase = await createClient(); if (!supabase) notFound();
  const username = (await params).username;
  const { data: profile } = await supabase.from("profiles").select("id,username,display_name,avatar_url,bio,interests,created_at").eq("username", username).maybeSingle();
  if (!profile) notFound();
  const { data } = await supabase.from("discussions").select("*, profiles!discussions_author_id_fkey(username,display_name,avatar_url), replies(count)").eq("author_id", profile.id).in("status", ["visible", "locked"]).order("updated_at", { ascending: false });
  const discussions = (data || []).map((item: any) => ({ ...item, reply_count: item.replies?.[0]?.count || 0 }));
  return <main id="main-content" className="page-shell public-profile"><header><div className="profile-avatar">{profile.avatar_url ? <img src={profile.avatar_url} alt="" /> : profile.display_name.slice(0,1).toUpperCase()}</div><p className="eyebrow">Community profile</p><h1>{profile.display_name}</h1><p>@{profile.username} · Joined {new Date(profile.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>{profile.bio ? <p className="large-copy">{profile.bio}</p> : null}<div className="tag-list">{(profile.interests || []).map((interest: string) => <span key={interest}>{interest}</span>)}</div></header><section><div className="section-heading"><div><p className="eyebrow">Public contributions</p><h2>Discussions</h2></div></div>{discussions.length ? discussions.map((discussion: any) => <DiscussionCard discussion={discussion} key={discussion.id} />) : <p className="community-empty">No public discussions yet.</p>}</section></main>;
}
