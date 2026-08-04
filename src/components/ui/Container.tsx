import type { ReactNode } from "react";

/**
 * Centralni kontejner sadržaja. Ograničava širinu na `--container-page`
 * (1200px, docs/02 §6.5) i drži dosledan bočni razmak. Bez klijentskog JS-a.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-page)] px-4 sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
