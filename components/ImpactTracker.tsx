"use client";

import { useEffect } from "react";
import { createClient } from "../lib/supabase/client";

export type ImpactEvent = "scripture_view" | "audio_play" | "practice_start" | "place_view" | "field_note_view";

export function recordImpactEvent(eventType: ImpactEvent, contentId?: string) {
  const supabase = createClient();
  if (supabase) void supabase.rpc("record_impact_event", { kind: eventType, item_id: contentId || null });
}

export function ImpactTracker({ eventType, contentId }: { eventType: ImpactEvent; contentId: string }) {
  useEffect(() => {
    const key = `sis-impact:${eventType}:${contentId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    recordImpactEvent(eventType, contentId);
  }, [eventType, contentId]);
  return null;
}
