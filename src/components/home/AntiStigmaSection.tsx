import { Container } from "@/components/ui/Container";

/**
 * Anti-stigma sekcija.
 *
 * Tekst je doslovno onaj koji je vlasnik odobrio i ne menja se bez nove
 * odluke. Nabraja činioce, a ponašanje ostavlja među njima — ne tvrdi da
 * ponašanje nema ulogu, niti da je jedina.
 *
 * Namerno ne oslovljava čitaoca kao pacijenta, ne postavlja dijagnozu, ne
 * obećava ishod i ne pominje nijedan lek.
 */
export function AntiStigmaSection() {
  return (
    <section aria-labelledby="bez-stigme">
      <Container className="border-t border-border py-12 sm:py-16">
        <div className="max-w-[var(--container-prose)]">
          <h2 id="bez-stigme">Metaboličko zdravlje nije pitanje karaktera.</h2>
          <p className="mt-6 text-lg">
            Na telesnu masu i metaboličko zdravlje utiču biologija, genetika,
            okruženje, san, mentalno zdravlje, životne okolnosti i ponašanje.
            Zato objašnjenja zasnovana samo na volji i disciplini nisu dovoljna.
          </p>
          <p className="mt-4 text-text-muted">
            Cilj platforme nije da osuđuje, već da pomogne ljudima da razumeju
            svoje zdravlje i mogućnosti podrške.
          </p>
        </div>
      </Container>
    </section>
  );
}
