import Link from "next/link";

export interface RelatedItem {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

export function RelatedContent({ title = "Continue exploring", items }: { title?: string; items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <section className="related-section" aria-labelledby="related-title">
      <p className="eyebrow">Related</p>
      <h2 id="related-title">{title}</h2>
      <div className="related-grid">
        {items.map((item) => (
          <Link className="related-card" href={item.href} key={`${item.href}-${item.title}`}>
            <span>{item.eyebrow}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            <span className="text-link">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
