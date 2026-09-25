import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro ? <p className="section-heading__intro">{intro}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
