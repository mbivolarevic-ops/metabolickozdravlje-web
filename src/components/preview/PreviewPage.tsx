import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PreviewBanner } from "@/components/preview/PreviewBanner";

/**
 * Okvir preview stranice: oznaka na vrhu, pa naslov, pa sadržaj.
 *
 * Postoji da bi oznaka bila deo *strukture* stranice, a ne nešto što autor
 * svake nove rute mora da se seti da doda. Zaboravljena oznaka je jedini način
 * na koji ovaj preview može da naškodi, pa se na nju ne oslanjamo kao na
 * disciplinu.
 *
 * `lead` je uvodni pasus ispod naslova. Odvojen je od `children` zato što nosi
 * drugu tipografsku ulogu — a ne zato što je poseban sadržaj.
 *
 * `aside` je opcioni vizuelni pratilac heroja (npr. maketa korica). Na mobilnom
 * ide ispod teksta, na desktopu pored njega. Ako ga nema, naslov zadržava
 * širinu čitljivog stupca.
 */
export function PreviewPage({
  title,
  lead,
  note,
  aside,
  children,
}: {
  title: string;
  lead?: string;
  /** Dodatna napomena unutar oznake (npr. status medicinske recenzije). */
  note?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <PreviewBanner note={note} />

      <Container className="py-12 sm:py-16">
        {aside ? (
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <header className="max-w-[var(--container-prose)]">
              <h1>{title}</h1>
              {lead ? <p className="mt-6 text-lg">{lead}</p> : null}
            </header>
            {/* Na mobilnom ispod teksta; `order` pomera samo prikaz, ne DOM. */}
            <div className="lg:justify-self-end">{aside}</div>
          </div>
        ) : (
          <header className="max-w-[var(--container-prose)]">
            <h1>{title}</h1>
            {lead ? <p className="mt-6 text-lg">{lead}</p> : null}
          </header>
        )}

        {children}
      </Container>
    </>
  );
}
