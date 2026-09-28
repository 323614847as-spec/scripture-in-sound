import Link from "next/link";
import { categoryLabel, type DiscussionSummary } from "../lib/community";

export function DiscussionCard({ discussion }: { discussion: DiscussionSummary }) {
  const profile = discussion.profiles;
  return (
    <article className="discussion-card">
      <div className="discussion-card__meta"><span>{categoryLabel(discussion.category)}</span>{discussion.pinned ? <strong>Pinned</strong> : null}</div>
      <h2><Link href={`/community/${discussion.id}`}>{discussion.title}</Link></h2>
      <p>{discussion.body.length > 220 ? `${discussion.body.slice(0, 220)}…` : discussion.body}</p>
      <div className="discussion-card__footer"><span>By {profile?.display_name || "Community member"}</span><span>{new Date(discussion.updated_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span><span>{discussion.reply_count || 0} replies</span></div>
    </article>
  );
}
