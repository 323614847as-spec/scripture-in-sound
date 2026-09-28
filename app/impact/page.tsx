import type { Metadata } from "next";
import { createClient } from "../../lib/supabase/server";

export const metadata: Metadata = { title: "The Project in Use", description: "Real, aggregate engagement with Scripture in Sound." };
const presentation = [
  ["registered_users", "registered participants", "Community"],
  ["discussions", "public discussions", "Community"],
  ["replies", "responses posted", "Community"],
  ["scripture_view", "scripture readings", "Archive"],
  ["audio_play", "recordings heard", "Archive"],
  ["practice_start", "contemplative sessions started", "Practice"],
  ["place_view", "Sacred Place pages explored", "Fieldwork"],
  ["field_note_view", "field notes read", "Fieldwork"],
] as const;
export default async function ImpactPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.rpc("get_impact_metrics") : { data: null };
  const totals = new Map<string, number>((data || []).map((row: any) => [row.metric, Number(row.total)]));
  const available = presentation.map(([key, label, group]) => ({ key, label, group, total: totals.get(key) ?? 0 })).filter((item) => item.total > 0);
  return <main id="main-content"><header className="page-hero page-shell"><p className="eyebrow">Public impact</p><h1>The Project in Use</h1><p>Scripture in Sound is an evolving public humanities project. These figures reflect real engagement with its texts, recordings, practices, fieldwork archive, and community.</p></header><section className="page-shell impact-section">{supabase ? available.length ? <div className="impact-grid">{available.map((item) => <article key={item.key}><span>{item.group}</span><strong>{item.total.toLocaleString("en-US")}</strong><p>{item.label}</p></article>)}</div> : <div className="community-empty"><p className="eyebrow">Measured from launch</p><h2>There is not yet enough activity to display.</h2><p>Metrics will appear here only when genuine events or contributions have been recorded. No presentation data is seeded.</p></div> : <div className="community-empty"><p className="eyebrow">Infrastructure prepared</p><h2>Impact measurement is awaiting database connection.</h2><p>No figures are displayed because no verified database is connected in this environment.</p></div>}<aside className="impact-method"><h2>What is counted</h2><p>Archive interactions are counted as aggregate events. A page event is recorded once per browser tab session for the corresponding record. Audio plays and practice starts are recorded when a visitor initiates them. Account and community totals come directly from public database records.</p><p>No fake history, testimonials, users, countries, or engagement totals are included.</p></aside></section></main>;
}
