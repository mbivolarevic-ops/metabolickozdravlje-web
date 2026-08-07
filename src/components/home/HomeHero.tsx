import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";

/**
 * Hero početne stranice.
 *
 * Nosi jedini `h1` na stranici. Poruka odgovara na prvo pitanje čitaoca —
 * gde sam došao — i odmah kaže da ovde nema osude (docs/02 §1.5).
 *
 * Bez fotografija: u ovoj fazi ne koristimo stock slike ni portrete. Vizuelni
 * naglasak nose tipografija i jedna suptilna CSS površina, bez JavaScripta i
 * bez animacije pri skrolovanju.
 *
 * Dva izlaza, oba postoje: „Istražite teme“ vodi na `/teme`, a druga veza na
 * sekciju metodologije na istoj stranici. Nema CTA za lek, konsultaciju ni
 * procenu — to su odluke koje ova stranica ne donosi.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="naslov-platforme" className="relative">
      {/*
       * Dekoracija: mek prelaz iza teksta. `aria-hidden` jer ne nosi nikakvu
       * informaciju, i `pointer-events-none` da ne presreće klik.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-surface to-transparent"
      />

      <Container className="relative py-16 sm:py-24">
        <p className="inline-block rounded-md border border-border bg-surface px-3 py-1 font-sans text-sm text-text-muted">
          Nezavisna edukativna platforma
        </p>

        <h1
          id="naslov-platforme"
          className="mt-6 max-w-[var(--container-prose)]"
        >
          Metaboličko zdravlje, objašnjeno jasno i bez osude.
        </h1>

        <p className="mt-6 max-w-[var(--container-prose)] text-lg">
          Pouzdane informacije o gojaznosti, šećeru u krvi, hormonima i drugim
          temama koje utiču na metaboličko zdravlje.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CtaLink href="/teme">Istražite teme</CtaLink>
          <Link href="#kako-proveravamo" className="font-sans">
            Kako proveravamo sadržaj
          </Link>
        </div>
      </Container>
    </section>
  );
}
