import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import type { RelationType } from "../lib/community";

export async function CommunityDiscussionPanel({ type, id, label }: { type: RelationType; id: string; label: string }) {
  const supabase = await createClient();
  let discussions: { id: string; title: string }[] = [];
  if (supabase) {
    const { data: relations } = await supabase.from("discussion_relations").select("discussion_id, discussions!inner(id,title,status)").eq("content_type", type).eq("content_id", id);
    discussions = (relations || []).map((row: any) => row.discussions).filter((item: any) => item && ["visible", "locked"].includes(item.status));
  }
  return <section className="community-panel"><div><p className="eyebrow">Community Discussion</p><h2>{discussions.length ? `${discussions.length} conversation${discussions.length === 1 ? "" : "s"} about ${label}` : "The conversation is open."}</h2><p>Questions, interpretations, and personal reflections connected directly to this archive record.</p></div>{discussions.length ? <ul>{discussions.slice(0, 3).map((discussion) => <li key={discussion.id}><Link href={`/community/${discussion.id}`}>{discussion.title}</Link></li>)}</ul> : null}<div className="community-panel__actions"><Link className="text-link" href={`/community?related=${type}:${id}`}>View discussions →</Link><Link className="button button--outline" href={`/community/new?type=${type}&id=${encodeURIComponent(id)}`}>Start a discussion</Link></div></section>;
}
