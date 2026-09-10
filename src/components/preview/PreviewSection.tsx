import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Sekcija preview stranice: razdelnik, naslov (h2), opcioni uvod, sadržaj.
 *
 * `id` nosi naslov, a `aria-labelledby` ga povezuje sa sekcijom — isti obrazac
 * koji već koriste sekcije početne stranice, pa je struktura dokumenta ista
 * bez obzira na to gde se čitalac zatekne.
 */
export function PreviewSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-naslov`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="mt-12 border-t border-border pt-12 sm:mt-16 sm:pt-16"
    >
      <SectionHeading id={headingId} title={title}>
        {intro}
      </SectionHeading>
      {children}
    </section>
  );
}
