"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export function ClientSaveButton({ type, id }: { type: "audio"; id: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: profileId } = await supabase.rpc("current_profile_id");
      if (!profileId) return;
      setUserId(String(profileId));
      const { data: row } = await supabase.from("saved_content").select("content_id").eq("profile_id", profileId).eq("content_type", type).eq("content_id", id).maybeSingle();
      setSaved(Boolean(row));
    });
  }, [id, type]);

  if (!userId) return null;
  async function toggle() {
    const supabase = createClient(); if (!supabase || !userId || busy) return;
    setBusy(true);
    if (saved) await supabase.from("saved_content").delete().eq("profile_id", userId).eq("content_type", type).eq("content_id", id);
    else await supabase.from("saved_content").upsert({ profile_id: userId, content_type: type, content_id: id });
    setSaved((value) => !value); setBusy(false);
  }
  return <button className="client-save" type="button" onClick={toggle} disabled={busy}>{saved ? "Saved ✓" : "Save"}</button>;
}
