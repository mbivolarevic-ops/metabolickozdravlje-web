import { toSafeExternalUrl } from "./safeUrl";

/**
 * Lista izvora uz medicinski tekst (docs/02 §9.8: izvori su obavezan signal
 * poverenja na članku i pillar stranici).
 *
 * Prezentacioni tip je namerno MALI i nezavisan od generisanih Sanity tipova:
 * komponenta prikazuje izvor, ne ceo dokument. Polja prate `referenceItem`
 * šemu — `label`, `url`, `publisher`, `year` — i ništa preko toga.
 *
 * Ključno pravilo: izvor koji nema bezbednu adresu i dalje se PRIKAZUJE, samo
 * ne kao link. Tiho izostavljanje izvora bilo bi gore od izostanka veze —
 * čitalac mora videti na šta se tvrdnja oslanja (docs/03 §7.3).
 */
export interface ReferenceListItem {
  /** Naziv izvora. */
  label: string;
  /** Adresa izvora. Ako nije bezbedna ili je nema, prikazuje se samo tekst. */
  url?: string | null;
  /** Izdavač ili publikacija. */
  publisher?: string | null;
  /** Godina izdanja. */
  year?: number | null;
}

export interface ReferenceListProps {
  references: readonly ReferenceListItem[];
  /** Nivo naslova sekcije. Podrazumevano `h2`, ispod `h1` naslova članka. */
  headingLevel?: "h2" | "h3";
}

function ReferenceMeta({ item }: { item: ReferenceListItem }) {
  const parts = [item.publisher, item.year].filter(
    (part): part is string | number =>
      typeof part === "number" || (typeof part === "string" && part.length > 0),
  );

  if (parts.length === 0) return null;

  return <span className="text-text-muted"> — {parts.join(", ")}</span>;
}

export function ReferenceList({
  references,
  headingLevel = "h2",
}: ReferenceListProps) {
  /*
   * Prazna lista: ne renderuje se ništa.
   *
   * Objavljiv članak po definiciji ima bar jedan kompletan izvor — to
   * sprovode i GROQ filter i `isDisplayableArticle()`. Ako lista ipak stigne
   * prazna, nešto je pošlo naopako uzvodno; naslov „Izvori“ bez ijedne stavke
   * izgledao bi kao da izvora nema, što je gora poruka od izostanka sekcije.
   */
  if (references.length === 0) return null;

  const Heading = headingLevel;

  return (
    <section aria-labelledby="izvori">
      <Heading id="izvori" className="text-xl">
        Izvori
      </Heading>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        {references.map((item, index) => {
          const safeUrl = toSafeExternalUrl(item.url);

          return (
            <li key={`${item.label}-${index}`} className="break-words">
              {safeUrl === null ? (
                <span>{item.label}</span>
              ) : (
                /*
                 * Isti tab, po usvojenoj odluci projekta — bez `target="_blank"`,
                 * pa nije potrebna ni najava „otvara se u novom prozoru“
                 * (docs/04 §6.2). `rel` ostaje radi privatnosti.
                 */
                <a href={safeUrl} rel="noopener noreferrer external">
                  {item.label}
                </a>
              )}
              <ReferenceMeta item={item} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
