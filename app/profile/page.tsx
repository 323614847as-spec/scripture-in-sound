import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { updateProfile } from "../community/actions";
import { createClient, getCurrentUser } from "../../lib/supabase/server";

export const metadata: Metadata = { title: "Your Profile", robots: { index: false, follow: true } };
export default async function ProfilePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const user = await getCurrentUser(); if (!user) redirect("/sign-in?next=/profile");
  const supabase = await createClient();
  const { data: profileId } = supabase ? await supabase.rpc("current_profile_id") : { data: null };
  const { data: profile } = supabase && profileId ? await supabase.from("profiles").select("id,username,display_name,avatar_url,bio,interests,role,created_at").eq("id", profileId).single() : { data: null };
  if (!profile) redirect("/sign-in");
  const params = await searchParams;
  return <main id="main-content" className="profile-page page-shell"><header><p className="eyebrow">Account</p><h1>Your profile</h1><p>Your email is used for authentication and is never shown publicly.</p></header><nav className="profile-nav"><Link href="/profile/discussions">My Discussions</Link><Link href="/profile/saved">Saved Content</Link>{["moderator", "admin"].includes(profile.role) ? <Link href="/community/moderation">Moderation</Link> : null}</nav><form action={updateProfile} className="editorial-form profile-form"><label>Display name<input name="displayName" defaultValue={profile.display_name} required maxLength={60} /></label><label>Username<input name="username" defaultValue={profile.username} required minLength={3} maxLength={30} pattern="[a-z0-9_]+" /></label><label>Avatar URL<input name="avatarUrl" type="url" defaultValue={profile.avatar_url || ""} maxLength={500} /><small>Optional. Use an image you have permission to display.</small></label><label>Short bio<textarea name="bio" defaultValue={profile.bio || ""} maxLength={500} rows={5} /></label><label>Interests<input name="interests" defaultValue={(profile.interests || []).join(", ")} maxLength={500} /><small>Separate up to ten interests with commas.</small></label>{params.error ? <p className="form-message form-message--error">{params.error}</p> : null}{params.message ? <p className="form-message">{params.message}</p> : null}<button className="button button--solid" type="submit">Save profile</button></form><p className="small-note">Joined {new Date(profile.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })}. To request account deletion, follow the instructions in the <Link href="/privacy">Privacy Notice</Link>.</p></main>;
}
