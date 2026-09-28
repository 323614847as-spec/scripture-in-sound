import Link from "next/link";
import { signOut } from "../app/auth/actions";
import { getCurrentUser, createClient } from "../lib/supabase/server";

export async function AccountControl() {
  const user = await getCurrentUser();
  if (!user) return <Link href="/sign-in" className="site-nav__link site-nav__account">Sign In</Link>;
  const supabase = await createClient();
  const { data: profileId } = supabase ? await supabase.rpc("current_profile_id") : { data: null };
  const { data: profile } = supabase && profileId ? await supabase.from("profiles").select("username, display_name, avatar_url").eq("id", profileId).maybeSingle() : { data: null };
  const initial = (profile?.display_name || "M").slice(0, 1).toUpperCase();
  return (
    <details className="account-menu">
      <summary aria-label="Open account menu">{profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <span>{initial}</span>}</summary>
      <div>
        <p>{profile?.display_name || "Community member"}</p>
        <Link href="/profile">Profile</Link>
        <Link href="/profile/discussions">My Discussions</Link>
        <Link href="/profile/saved">Saved Content</Link>
        <form action={signOut}><button type="submit">Sign Out</button></form>
      </div>
    </details>
  );
}
