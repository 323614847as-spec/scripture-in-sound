"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { safeReturnPath } from "../../lib/community";

function messagePath(path: string, type: "error" | "message", message: string) {
  return `${path}?${type}=${encodeURIComponent(message)}`;
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(messagePath("/sign-in", "error", "Community accounts are not configured yet."));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeReturnPath(formData.get("next"), "/community");
  if (!email || password.length < 8) redirect(messagePath("/sign-in", "error", "Enter a valid email and password."));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(messagePath("/sign-in", "error", error.message));
  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(messagePath("/sign-up", "error", "Community accounts are not configured yet."));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const displayName = String(formData.get("displayName") || "").trim();
  const username = String(formData.get("username") || "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (!email || password.length < 8 || displayName.length < 1 || username.length < 3) {
    redirect(messagePath("/sign-up", "error", "Complete every field. Usernames need at least 3 characters and passwords at least 8."));
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.scriptureinsound.com";
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/profile`,
      data: { display_name: displayName.slice(0, 60), username: username.slice(0, 30) },
    },
  });
  if (error) redirect(messagePath("/sign-up", "error", error.message));
  redirect(messagePath("/sign-in", "message", "Check your email to confirm your account, then sign in."));
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  if (!supabase || process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH !== "true") {
    redirect(messagePath("/sign-in", "error", "Google sign-in is not enabled yet."));
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.scriptureinsound.com";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback?next=/profile` },
  });
  if (error || !data.url) redirect(messagePath("/sign-in", "error", error?.message || "Could not start Google sign-in."));
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
