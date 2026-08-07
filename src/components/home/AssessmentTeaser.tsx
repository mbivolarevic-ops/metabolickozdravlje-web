import { Container } from "@/components/ui/Container";

/**
 * Najava buduće samoprocene — samo mesto, bez ijedne interakcije.
 *
 * ⛔ Namerno NEMA: dugmeta, linka, pitanja, polja za unos, e-adrese, telefona,
 * bodovanja, medicinskih pragova i obećanja besplatne konsultacije. Kviz je
 * faza 2 (CLAUDE.md §3) i ovde se ne priprema kao aktivan.
 *
 * Napomena da procena neće postavljati dijagnozu nije ukras nego uslov: ona
 * unapred zatvara očekivanje koje bi tekst inače mogao da stvori.
 */
export function AssessmentTeaser() {
  return (
    <section aria-labelledby="procena">
      <Container className="border-t border-border py-12 sm:py-16">
        <div className="max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6 sm:p-8">
          <p className="inline-block rounded-md border border-border px-3 py-1 font-sans text-sm text-text-muted">
            U pripremi
          </p>
          <h2 id="procena" className="mt-4">
            Procena metaboličkog zdravlja
          </h2>
          <p className="mt-4">
            Kratka samoprocena će u budućnosti pomoći korisnicima da pripreme
            pitanja i procene da li bi razgovor sa zdravstvenim radnikom mogao
            biti koristan sledeći korak.
          </p>
          <p className="mt-4 text-text-muted">
            Procena neće postavljati dijagnozu niti preporučivati konkretnu
            terapiju.
          </p>
        </div>
      </Container>
    </section>
  );
}
