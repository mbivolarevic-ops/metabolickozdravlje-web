import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";

/**
 * Završni poziv na akciju.
 *
 * Jedno odredište, i ono postoji. Ime dugmeta govori šta će se desiti i
 * razume se izvan konteksta (docs/04 §3.2, provera C10).
 */
export function HomeFinalCta() {
  return (
    <section aria-labelledby="poslednji-korak">
      <Container className="border-t border-border py-12 sm:py-16">
        <div className="max-w-[var(--container-prose)]">
          <h2 id="poslednji-korak">Počnite od teme koja vam je važna.</h2>
          <div className="mt-6">
            <CtaLink href="/teme">Pogledajte sve teme</CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
