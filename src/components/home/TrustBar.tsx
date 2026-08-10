import { Container } from "@/components/ui/Container";

/**
 * Traka poverenja.
 *
 * Ovo NISU marketinška obećanja nego svojstva koja content sistem već
 * sprovodi: bez recenzenta i datuma provere članak ne prolazi kapiju
 * (`isDisplayableArticle`), bez kompletnog izvora ne prolazi validaciju pred
 * objavu, a lista zabranjenih izraza blokira jezik koji osuđuje.
 *
 * Bez ikona i bedževa koji liče na sertifikate (docs/02 §2.3, red ②) — u
 * sistemu ih ni nema, a lažan pečat je gori od nikakvog.
 */
const PRINCIPLES = [
  {
    title: "Stručna provera",
    description:
      "Medicinski tekst se ne prikazuje bez imenovanog stručnog recenzenta.",
  },
  {
    title: "Jasno navedeni izvori",
    description:
      "Uz svaki tekst stoje izvori na koje se oslanja, tako da se mogu proveriti.",
  },
  {
    title: "Datum poslednje provere",
    description:
      "Uz tekst piše kada je poslednji put stručno proveren, pa se zna koliko je svež.",
  },
  {
    title: "Bez stigme i osuđivanja",
    description:
      "Jezik koji krivi čitaoca ne prolazi uredničku proveru i ne objavljuje se.",
  },
] as const;

export function TrustBar() {
  return (
    <section aria-labelledby="poverenje">
      <Container className="border-t border-border py-12">
        <h2 id="poverenje" className="sr-only">
          Po čemu se ovaj sadržaj razlikuje
        </h2>
        <ul className="grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => (
            <li key={principle.title}>
              <p className="font-sans font-semibold text-primary">
                {principle.title}
              </p>
              <p className="mt-2 text-text-muted">{principle.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
