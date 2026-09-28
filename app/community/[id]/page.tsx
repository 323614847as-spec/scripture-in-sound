import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel } from "../../../lib/community";
import { resolveRelatedContent } from "../../../lib/content-options";
import { createClient, getCurrentUser } from "../../../lib/supabase/server";
import { deleteDiscussion, deleteReply, replyToDiscussion, reportContent, updateDiscussion, updateReply } from "../actions";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const supabase = await createClient();
  const id = (await params).id;
  const { data } = supabase ? await supabase.from("discussions").select("title,body").eq("id", id).maybeSingle() : { data: null };
  return data ? { title: data.title, description: data.body.slice(0, 155) } : { title: "Community Discussion" };
}

export default async function DiscussionPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const id = (await params).id;
  const supabase = await createClient();
  if (!supabase) notFound();
  const user = await getCurrentUser();
  const [{ data: discussion }, { data: replies }, { data: relations }, { data: viewerProfile }] = await Promise.all([
    supabase.from("discussions").select("*, profiles!discussions_author_id_fkey(username,display_name,avatar_url)").eq("id", id).maybeSingle(),
    supabase.from("replies").select("*, profiles!replies_author_id_fkey(username,display_name,avatar_url)").eq("discussion_id", id).order("created_at"),
    supabase.from("discussion_relations").select("content_type,content_id").eq("discussion_id", id),
    user ? supabase.rpc("current_profile_id").then(async ({ data: profileId }) => profileId ? supabase.from("profiles").select("id,role").eq("id", profileId).maybeSingle() : { data: null }) : Promise.resolve({ data: null }),
  ]);
  if (!discussion) notFound();
  const canModerate = viewerProfile?.role === "moderator" || viewerProfile?.role === "admin";
  const isOwner = viewerProfile?.id === discussion.author_id;
  const related = (relations || []).map((relation: any) => ({ ...relation, item: resolveRelatedContent(relation.content_type, relation.content_id) })).filter((item: any) => item.item);
  const error = (await searchParams).error;
  return <main id="main-content"><article className="discussion-entry page-shell"><Link className="back-link" href="/community">← All conversations</Link><header><div className="discussion-card__meta"><span>{categoryLabel(discussion.category)}</span>{discussion.pinned ? <strong>Pinned</strong> : null}{discussion.status === "locked" ? <strong>Locked</strong> : null}</div><h1>{discussion.title}</h1><p>Started by <Link href={`/profile/${discussion.profiles?.username}`}>{discussion.profiles?.display_name || "Community member"}</Link> · {new Date(discussion.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })}</p></header><div className="user-prose">{discussion.body}</div>{related.length ? <div className="discussion-relations"><span>Connected archive material</span>{related.map((relation: any) => <Link key={`${relation.content_type}-${relation.content_id}`} href={relation.item.href}>{relation.item.label}</Link>)}</div> : null}{isOwner || canModerate ? <details className="post-tools"><summary>Edit discussion</summary><form className="editorial-form" action={updateDiscussion.bind(null, id)}><label>Title<input name="title" defaultValue={discussion.title} maxLength={160} required /></label><label>Discussion<textarea name="body" defaultValue={discussion.body} rows={9} maxLength={10000} required /></label><button className="button button--solid" type="submit">Save changes</button></form><form action={deleteDiscussion.bind(null, id)}><button className="danger-link" type="submit">Delete this discussion</button></form></details> : null}{user && !isOwner ? <details className="report-tool"><summary>Report this discussion</summary><form action={reportContent.bind(null, "discussion", id, id)}><label>Reason<textarea name="reason" minLength={4} maxLength={1000} required /></label><button type="submit" className="button button--outline">Submit report</button></form></details> : null}</article><section className="discussion-replies page-shell"><div className="section-heading"><div><p className="eyebrow">Responses</p><h2>{replies?.length || 0} replies</h2></div></div>{(replies || []).map((reply: any) => { const ownReply = viewerProfile?.id === reply.author_id; return <article className="reply" key={reply.id}><header><Link href={`/profile/${reply.profiles?.username}`}>{reply.profiles?.display_name || "Community member"}</Link><time>{new Date(reply.created_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}</time></header><div className="user-prose">{reply.body}</div>{ownReply || canModerate ? <details className="post-tools"><summary>Edit reply</summary><form action={updateReply.bind(null, reply.id, id)}><textarea name="body" defaultValue={reply.body} rows={5} maxLength={10000} required /><button className="button button--outline" type="submit">Save</button></form><form action={deleteReply.bind(null, reply.id, id)}><button className="danger-link" type="submit">Delete reply</button></form></details> : null}{user && !ownReply ? <details className="report-tool"><summary>Report</summary><form action={reportContent.bind(null, "reply", reply.id, id)}><textarea name="reason" minLength={4} maxLength={1000} required /><button className="button button--outline" type="submit">Submit report</button></form></details> : null}</article>; })}{error ? <p className="form-message form-message--error">{error}</p> : null}{discussion.status === "locked" ? <p className="community-empty">This discussion is locked. Existing contributions remain available to read.</p> : user ? <form action={replyToDiscussion.bind(null, id)} className="editorial-form reply-form"><label>Add your response<textarea name="body" rows={7} minLength={2} maxLength={10000} required /></label><p className="small-note">Personal reflections are personal experiences, not automatically authoritative Buddhist teaching.</p><button className="button button--solid" type="submit">Post response</button></form> : <div className="community-empty"><h2>Join the conversation.</h2><p>Reading is public. An account is required only to reply.</p><Link className="text-link" href={`/sign-in?next=/community/${id}`}>Sign in to respond →</Link></div>}</section></main>;
}
