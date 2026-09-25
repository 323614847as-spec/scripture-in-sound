import type { ContentStatus } from "../types/content";

export function StatusLabel({ status }: { status: ContentStatus }) {
  if (status === "published") return null;
  return <span className="status-label">Editorial placeholder</span>;
}
