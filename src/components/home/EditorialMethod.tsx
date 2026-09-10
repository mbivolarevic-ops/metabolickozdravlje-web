import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Kako proveravamo sadržaj.
 *
 * `id` je meta veze iz heroja, pa se ne menja bez izmene i te veze.
 *
 * Sva tri koraka opisuju ono što sistem STVARNO sprovodi: autor i recenzent
 * su obavezne reference, datum provere je obavezno polje, a izvori su
 * blokirajuća validacija pred objavu. Ništa iznad toga se ne tvrdi.
 */
const STEPS = [
  {
    title: "Jasno autorstvo",
    description: "Svaki tekst ima poznatog autora.",
  },
  {
    title: "Stručna provera",
    description:
      "Medicinski sadržaj mora imati stručnog recenzenta i datum provere.",
  },
  {
    title: "Izvori i ažuriranje",
    description:
      "Reference su navedene, a datum poslednje stručne provere vidljiv korisniku.",
  },
] as const;

export function EditorialMethod() {
  return (
    /*
     * `id` sekcije je meta sidra iz heroja; naslov ima svoj, drugačiji `id`.
     * Isti `id` na oba elementa bio bi duplikat u dokumentu i pokvario bi
     * `aria-labelledby`.
     */
    <section id="kako-proveravamo" aria-labelledby="kako-proveravamo-naslov">
      <Container className="border-t border-border py-12 sm:py-16">
        <SectionHeading
          id="kako-proveravamo-naslov"
          title="Kako proveravamo sadržaj"
        >
          Isti postupak važi za svaki tekst.
        </SectionHeading>

        <ol className="mt-8 grid list-none gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <p
                aria-hidden="true"
                className="font-sans text-sm font-semibold text-text-muted"
              >
                {index + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        {/*
         * Izlazi ka stranicama koje postoje. Tri kartice iznad su sažetak
         * postupka; pun opis, pravila i autorstvo stoje zasebno, pa se odavde
         * do njih dolazi direktno.
         */}
        <ul className="mt-8 flex list-none flex-wrap gap-x-8 gap-y-3">
          <li>
            <Link href="/medicinska-recenzija" className="font-sans">
              Kako izgleda medicinska provera
            </Link>
          </li>
          <li>
            <Link href="/uredjivacka-politika" className="font-sans">
              Urednička politika
            </Link>
          </li>
          <li>
            <Link href="/autor" className="font-sans">
              Ko piše sadržaj
            </Link>
          </li>
          <li>
            <Link href="/teme" className="font-sans">
              Pogledajte teme
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
