"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { communityCategories, relationTypes, safeReturnPath } from "../../lib/community";
import { relatedContentOptions } from "../../lib/content-options";
import { createClient } from "../../lib/supabase/server";

function cleanText(value: FormDataEntryValue | null, max: number) {
  return String(value || "").replace(/\0/g, "").trim().slice(0, max);
}

async function requireUser(next = "/community") {
  const supabase = await createClient();
  if (!supabase) redirect(`/sign-in?error=${encodeURIComponent("Community accounts are not configured yet.")}`);
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  const { data: profileId } = await supabase.rpc("current_profile_id");
  if (!profileId) redirect("/profile?error=Your%20community%20profile%20is%20not%20available.");
  return { supabase, user: data.user, profileId: String(profileId) };
}

export async function createDiscussion(formData: FormData) {
  const { supabase, profileId } = await requireUser("/community/new");
  const title = cleanText(formData.get("title"), 160);
  const body = cleanText(formData.get("body"), 10000);
  const category = cleanText(formData.get("category"), 60);
  const relationType = cleanText(formData.get("relationType"), 30);
  const relationId = cleanText(formData.get("relationId"), 120);
  if (title.length < 4 || body.length < 10 || !communityCategories.some((item) => item.slug === category)) {
    redirect("/community/new?error=Please%20complete%20the%20title%2C%20category%2C%20and%20discussion.");
  }
  const { data: discussion, error } = await supabase.from("discussions").insert({ title, body, category, author_id: profileId }).select("id").single();
  if (error || !discussion) redirect(`/community/new?error=${encodeURIComponent(error?.message || "Could not create discussion.")}`);
  if (relationType && relationId && relationTypes.some((type) => type === relationType)) {
    const valid = relatedContentOptions[relationType as keyof typeof relatedContentOptions]?.some((item) => item.id === relationId);
    if (valid) await supabase.from("discussion_relations").insert({ discussion_id: discussion.id, content_type: relationType, content_id: relationId });
  }
  revalidatePath("/community");
  redirect(`/community/${discussion.id}`);
}

export async function replyToDiscussion(discussionId: string, formData: FormData) {
  const { supabase, profileId } = await requireUser(`/community/${discussionId}`);
  const body = cleanText(formData.get("body"), 10000);
  if (body.length < 2) redirect(`/community/${discussionId}?error=Reply%20is%20too%20short.`);
  const { error } = await supabase.from("replies").insert({ discussion_id: discussionId, author_id: profileId, body });
  if (error) redirect(`/community/${discussionId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/community/${discussionId}`);
}

export async function updateDiscussion(discussionId: string, formData: FormData) {
  const { supabase } = await requireUser(`/community/${discussionId}`);
  const title = cleanText(formData.get("title"), 160);
  const body = cleanText(formData.get("body"), 10000);
  if (title.length < 4 || body.length < 10) return;
  await supabase.from("discussions").update({ title, body }).eq("id", discussionId);
  revalidatePath(`/community/${discussionId}`);
}

export async function deleteDiscussion(discussionId: string) {
  const { supabase } = await requireUser(`/community/${discussionId}`);
  const { error } = await supabase.from("discussions").delete().eq("id", discussionId);
  if (error) redirect(`/community/${discussionId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/community");
  redirect("/community");
}

export async function updateReply(replyId: string, discussionId: string, formData: FormData) {
  const { supabase } = await requireUser(`/community/${discussionId}`);
  const body = cleanText(formData.get("body"), 10000);
  if (body.length >= 2) await supabase.from("replies").update({ body }).eq("id", replyId);
  revalidatePath(`/community/${discussionId}`);
}

export async function deleteReply(replyId: string, discussionId: string) {
  const { supabase } = await requireUser(`/community/${discussionId}`);
  await supabase.from("replies").delete().eq("id", replyId);
  revalidatePath(`/community/${discussionId}`);
}

export async function reportContent(contentType: "discussion" | "reply", contentId: string, discussionId: string, formData: FormData) {
  const { supabase, profileId } = await requireUser(`/community/${discussionId}`);
  const reason = cleanText(formData.get("reason"), 1000);
  if (reason.length >= 4) await supabase.from("reports").insert({ reporter_id: profileId, content_type: contentType, content_id: contentId, reason });
  revalidatePath(`/community/${discussionId}`);
}

export async function moderateDiscussion(discussionId: string, formData: FormData) {
  const { supabase } = await requireUser("/community/moderation");
  const status = cleanText(formData.get("status"), 20);
  const pinned = formData.get("pinned") === "true";
  if (["visible", "hidden", "locked", "removed"].includes(status)) await supabase.from("discussions").update({ status, pinned }).eq("id", discussionId);
  revalidatePath("/community", "layout");
}

export async function moderateReport(reportId: string, formData: FormData) {
  const { supabase } = await requireUser("/community/moderation");
  const status = cleanText(formData.get("status"), 20);
  if (["reviewed", "dismissed", "actioned"].includes(status)) await supabase.from("reports").update({ status }).eq("id", reportId);
  revalidatePath("/community/moderation");
}

export async function moderateReply(replyId: string, formData: FormData) {
  const { supabase } = await requireUser("/community/moderation");
  const status = cleanText(formData.get("status"), 20);
  if (["visible", "hidden", "removed"].includes(status)) await supabase.from("replies").update({ status }).eq("id", replyId);
  revalidatePath("/community", "layout");
}

export async function updateProfile(formData: FormData) {
  const { supabase, profileId } = await requireUser("/profile");
  const username = cleanText(formData.get("username"), 30).toLowerCase().replace(/[^a-z0-9_]/g, "");
  const displayName = cleanText(formData.get("displayName"), 60);
  const bio = cleanText(formData.get("bio"), 500);
  const avatarUrl = cleanText(formData.get("avatarUrl"), 500);
  const interests = cleanText(formData.get("interests"), 500).split(",").map((item) => item.trim()).filter(Boolean).slice(0, 10);
  if (username.length < 3 || !displayName) redirect("/profile?error=Display%20name%20and%20a%20valid%20username%20are%20required.");
  const { error } = await supabase.from("profiles").update({ username, display_name: displayName, bio: bio || null, avatar_url: avatarUrl || null, interests }).eq("id", profileId);
  if (error) redirect(`/profile?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/profile?message=Profile%20updated.");
}

export async function toggleSavedContent(contentType: string, contentId: string, returnPath: string, formData: FormData) {
  const { supabase, profileId } = await requireUser(returnPath);
  const action = formData.get("action") === "remove" ? "remove" : "save";
  if (action === "remove") await supabase.from("saved_content").delete().eq("profile_id", profileId).eq("content_type", contentType).eq("content_id", contentId);
  else await supabase.from("saved_content").upsert({ profile_id: profileId, content_type: contentType, content_id: contentId });
  revalidatePath(returnPath);
  revalidatePath("/profile/saved");
}

export async function safeRedirectBack(formData: FormData) {
  redirect(safeReturnPath(formData.get("returnPath")));
}
