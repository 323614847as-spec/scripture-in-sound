import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient, getCurrentUser } from "../../../lib/supabase/server";
import { moderateDiscussion, moderateReply, moderateReport } from "../actions";

export default async function ModerationPage() {
  const user = await getCurrentUser(); if (!user) redirect("/sign-in?next=/community/moderation");
  const supabase = await createClient(); if (!supabase) redirect("/community");
  const { data: profileId } = await supabase.rpc("current_profile_id");
  const { data: profile } = profileId ? await supabase.from("profiles").select("role").eq("id", profileId).maybeSingle() : { data: null };
  if (!profile || !["moderator", "admin"].includes(profile.role)) redirect("/community");
  const [{ data: reports }, { data: discussions }, { data: replies }] = await Promise.all([
    supabase.from("reports").select("*").eq("status", "open").order("created_at"),
    supabase.from("discussions").select("id,title,status,pinned,created_at").order("created_at", { ascending: false }).limit(50),
    supabase.from("replies").select("id,discussion_id,body,status,created_at").order("created_at", { ascending: false }).limit(50),
  ]);
  return <main id="main-content" className="page-shell moderation-page"><Link className="back-link" href="/profile">← Profile</Link><p className="eyebrow">Restricted</p><h1>Moderation</h1><section><h2>Open reports</h2>{reports?.length ? reports.map((report: any) => <article className="moderation-row" key={report.id}><div><strong>{report.content_type}</strong><p>{report.reason}</p><small>{report.content_id}</small></div><form action={moderateReport.bind(null, report.id)}><select name="status" defaultValue="reviewed"><option value="reviewed">Reviewed</option><option value="dismissed">Dismiss</option><option value="actioned">Action taken</option></select><button type="submit">Update</button></form></article>) : <p className="community-empty">No open reports.</p>}</section><section><h2>Recent discussions</h2>{(discussions || []).map((discussion: any) => <article className="moderation-row" key={discussion.id}><div><Link href={`/community/${discussion.id}`}><strong>{discussion.title}</strong></Link><p>{discussion.status}{discussion.pinned ? " · pinned" : ""}</p></div><form action={moderateDiscussion.bind(null, discussion.id)}><select name="status" defaultValue={discussion.status}><option value="visible">Visible</option><option value="locked">Locked</option><option value="hidden">Hidden</option><option value="removed">Removed</option></select><label><input type="checkbox" name="pinned" value="true" defaultChecked={discussion.pinned} /> Pin</label><button type="submit">Apply</button></form></article>)}</section><section><h2>Recent replies</h2>{(replies || []).map((reply: any) => <article className="moderation-row" key={reply.id}><div><Link href={`/community/${reply.discussion_id}`}><strong>{reply.body.slice(0, 120)}{reply.body.length > 120 ? "…" : ""}</strong></Link><p>{reply.status}</p></div><form action={moderateReply.bind(null, reply.id)}><select name="status" defaultValue={reply.status}><option value="visible">Visible</option><option value="hidden">Hidden</option><option value="removed">Removed</option></select><button type="submit">Apply</button></form></article>)}</section></main>;
}
