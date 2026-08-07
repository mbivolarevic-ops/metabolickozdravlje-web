import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Pregled oblasti podrške i lečenja.
 *
 * Nabraja, ne preporučuje. Nijedna oblast nije istaknuta u odnosu na druge,
 * nema imena leka ni klase lekova, i nema tvrdnje šta kome odgovara — takva
 * odluka pripada lekaru, ne stranici.
 *
 * Stavke NISU linkovi: odredišta još ne postoje, a projekat ne pravi mrtve
 * linkove. Kada rute nastanu, stavke se mogu povezati bez promene teksta.
 */
const AREAS = [
  {
    title: "Ishrana i svakodnevne navike",
    description: "Šta se u svakodnevnom životu može menjati i na koji način.",
  },
  {
    title: "Fizička aktivnost",
    description: "Uloga kretanja, bez propisivanja plana vežbanja.",
  },
  {
    title: "San i mentalno zdravlje",
    description:
      "Zašto se san i psihičko stanje razmatraju uz metaboličko zdravlje.",
  },
  {
    title: "Lekovi",
    description:
      "Da postoje i da o njima odlučuje lekar, uz procenu pojedinačnog slučaja.",
  },
  {
    title: "Barijatrijska i metabolička hirurgija",
    description: "Šta ovaj pristup podrazumeva i ko ga razmatra.",
  },
  {
    title: "Dugoročno praćenje",
    description: "Zašto se metaboličko zdravlje prati tokom vremena.",
  },
] as const;

export function TreatmentOverview() {
  return (
    <section aria-labelledby="pristupi">
      <Container className="border-t border-border py-12 sm:py-16">
        <SectionHeading id="pristupi" title="Ne postoji samo jedan put.">
          Metaboličko zdravlje može uključivati promene životnog stila,
          psihološku podršku, lečenje povezanih stanja, lekove ili hirurške
          procedure. Pravi pristup zavisi od osobe i zahteva individualnu
          stručnu procenu.
        </SectionHeading>

        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <li
              key={area.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold">{area.title}</h3>
              <p className="mt-2 text-text-muted">{area.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
