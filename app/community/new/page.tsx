import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createDiscussion } from "../actions";
import { communityCategories, relationTypes } from "../../../lib/community";
import { relatedContentOptions } from "../../../lib/content-options";
import { getCurrentUser } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "Start a Discussion", robots: { index: false, follow: true } };
export default async function NewDiscussionPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const user = await getCurrentUser(); if (!user) redirect("/sign-in?next=/community/new");
  const params = await searchParams;
  return <main id="main-content" className="page-shell compose-page"><Link className="back-link" href="/community">← Community</Link><p className="eyebrow">New conversation</p><h1>Start a discussion</h1><p>Ask a careful question, offer a sourced interpretation, or share a clearly labeled personal reflection.</p><form action={createDiscussion} className="editorial-form"><label>Title<input name="title" required minLength={4} maxLength={160} /></label><label>Category<select name="category" required defaultValue={params.category || ""}><option value="" disabled>Choose a category</option>{communityCategories.map((category) => <option value={category.slug} key={category.slug}>{category.label}</option>)}</select></label><label>Discussion<textarea name="body" required minLength={10} maxLength={10000} rows={12} /><small>Plain text only. Distinguish personal experience from historical or doctrinal claims and cite sources when possible.</small></label><fieldset><legend>Connect to the archive <span>(optional)</span></legend><label>Content type<select name="relationType" defaultValue={params.type || ""}><option value="">No relationship</option>{relationTypes.map((type) => <option value={type} key={type}>{type}</option>)}</select></label><label>Archive record<select name="relationId" defaultValue={params.id || ""}><option value="">Choose a related record</option>{relationTypes.flatMap((type) => relatedContentOptions[type].map((item) => <option value={item.id} key={`${type}-${item.id}`}>{type}: {item.label}</option>))}</select><small>The selected record must match the chosen content type.</small></label></fieldset>{params.error ? <p className="form-message form-message--error" role="alert">{params.error}</p> : null}<p className="small-note">Before posting, review the <Link href="/community/guidelines">Community Guidelines</Link>.</p><button className="button button--solid" type="submit">Publish discussion</button></form></main>;
}
