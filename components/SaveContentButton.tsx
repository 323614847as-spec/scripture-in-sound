import { toggleSavedContent } from "../app/community/actions";
import { createClient, getCurrentUser } from "../lib/supabase/server";

export async function SaveContentButton({ type, id, returnPath }: { type: "scripture" | "place" | "practice" | "audio" | "field-note"; id: string; returnPath: string }) {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data: profileId } = supabase ? await supabase.rpc("current_profile_id") : { data: null };
  const { data } = supabase && profileId ? await supabase.from("saved_content").select("content_id").eq("profile_id", profileId).eq("content_type", type).eq("content_id", id).maybeSingle() : { data: null };
  const saved = Boolean(data);
  return <form action={toggleSavedContent.bind(null, type, id, returnPath)} className="save-control"><input type="hidden" name="action" value={saved ? "remove" : "save"} /><button type="submit">{saved ? "Saved ✓" : "Save to profile"}</button></form>;
}
