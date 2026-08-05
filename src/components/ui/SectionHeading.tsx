import type { ReactNode } from "react";

/**
 * Naslov sekcije (h2) sa opcionim uvodnim tekstom. Drži doslednu
 * hijerarhiju naslova na stranici: h1 (hero) → h2 (sekcija) → h3 (kartica).
 */
export function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-[var(--container-prose)]">
      <h2 id={id}>{title}</h2>
      {children ? <p className="mt-3 text-text-muted">{children}</p> : null}
    </div>
  );
}
