import type { BodyHeading } from "@/sanity/headingId";

/**
 * Sadržaj članka (docs/02 §3.1, element ④).
 *
 * Serverska komponenta. Sklapanje nosi nativni `<details>`, pa cela stavka ne
 * dodaje nijedan bajt klijentskog JavaScripta — što je ovde i suštinsko, jer
 * budžet skripte na članku (CLAUDE.md §10) ne sme da raste zbog navigacije.
 *
 * PODRAZUMEVANO SKLOPLJENO. Otvoren spisak od šest do osam stavki na telefonu
 * gurnuo bi naslov, potpis recenzenta i prve rečenice ispod prvog ekrana, a
 * docs/02 §3.2 traži upravo suprotno: da čitalac u prvih 600px dobije odgovor,
 * a ne navigaciju.
 *
 * Pomeranje do odeljka radi brauzer preko sidra. Nema JavaScripta koji „hvata"
 * klik, pa link radi i kada skripta ne učita, i ostaje ono što jeste — adresa
 * koja se može kopirati i poslati.
 */
export function ArticleToc({ headings }: { headings: readonly BodyHeading[] }) {
  // Članak bez podnaslova nema šta da sadrži — blok se tada ne prikazuje.
  if (headings.length === 0) return null;

  return (
    <details className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface">
      <summary className="cursor-pointer px-5 py-3 font-sans text-base font-semibold">
        Sadržaj članka
      </summary>

      <nav aria-label="Sadržaj članka" className="px-5 pb-4">
        <ol className="list-none space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              /*
               * Uvučena stavka pokazuje da odeljak pripada prethodnom naslovu.
               * Uvlačenje je vizuelno; hijerarhiju za čitač ekrana već nose
               * `h2` i `h3` u samom tekstu, pa se ovde ne udvaja ugnježdenim
               * listama koje bi se čitale kao „lista u listi".
               */
              className={heading.level === "h3" ? "ml-5" : undefined}
            >
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
