import {
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_TITLE,
  canonicalUrl,
} from "./config";

/**
 * Strukturirani podaci (JSON-LD).
 *
 * Dva pravila drže ovaj sloj bezbednim:
 *
 *  1. Ovde se ne izmišlja nijedan podatak. Svako polje dolazi iz validiranog
 *     Sanity dokumenta ili iz konfiguracije sajta. Polje koje nemamo se
 *     izostavlja — prazan string ili pogađanje bilo bi tvrdnja.
 *  2. Serijalizacija neutralizuje `<`, pa sadržaj iz CMS-a ne može da zatvori
 *     `<script>` element i ubaci svoj kod.
 *
 * Bez nove zavisnosti: reč je o objektima i jednom `JSON.stringify`.
 */

/** Zajednički oblik JSON-LD čvora. */
export type JsonLdNode = Record<string, unknown>;

/**
 * Pretvara JSON-LD u string bezbedan za ubacivanje u `<script>`.
 *
 * ⛔ `JSON.stringify` sam po sebi NIJE dovoljan. Naslov članka koji sadrži
 * `</script>` završio bi u dokumentu doslovno i zatvorio element — sve posle
 * toga brauzer bi čitao kao HTML, uključujući i ono što napadač doda. Zato se
 * znak „manje od“ uvek ispisuje kao escape niz: za JSON parser je to isti
 * znak, a za HTML parser bezopasan tekst.
 *
 * `>` i `&` se takođe neutralizuju: ne otvaraju napad sami, ali drže izlaz
 * potpuno inertnim i kada se ugnezdi u drugačiji kontekst.
 */
export function serializeJsonLd(node: JsonLdNode): string {
  return JSON.stringify(node)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** Izostavlja polja bez vrednosti, umesto da ih šalje prazna. */
function withoutEmpty(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

/**
 * `WebSite` za početnu stranicu.
 *
 * Namerno BEZ `Organization` i bez `publisher`: nemamo potvrđen pravni naziv,
 * adresu, matični broj ni registrovane naloge. Schema.org bi to prihvatila,
 * ali bi tvrdnja bila naša, ne proverena.
 *
 * Bez `SearchAction` — pretraga na sajtu ne postoji.
 */
export function websiteJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TITLE,
    url: canonicalUrl(),
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
  };
}

export interface BreadcrumbStep {
  name: string;
  url: string;
}

/** `BreadcrumbList` — redosled je značenje, pa se pozicije broje od 1. */
export function breadcrumbJsonLd(steps: readonly BreadcrumbStep[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

export interface MedicalWebPageInput {
  title: string;
  description: string;
  url: string;
  authorName: string;
  reviewerName: string;
  /** Datum poslednje stručne provere, „YYYY-MM-DD“. */
  reviewDate: string;
  /** Apsolutna adresa naslovne slike — samo ako je prošla postojeće guardove. */
  imageUrl?: string | null;
}

/**
 * `MedicalWebPage` za stranicu članka.
 *
 * Zašto baš taj tip, a ne `Article`: sadržaj je zdravstvena edukacija sa
 * imenovanim stručnim recenzentom i datumom provere. `MedicalWebPage` ima
 * `lastReviewed` i `reviewedBy` — polja koja tačno opisuju ono što ovaj
 * projekat stvarno sprovodi.
 *
 * ⛔ NEMA `datePublished`. Content model nema polje datuma objavljivanja, a
 * predstaviti `reviewDate` kao datum objave bila bi neistina: to je datum
 * poslednje provere, ne prvog objavljivanja. Prazno polje je pošteno.
 *
 * ⛔ NEMA `medicalSpecialty`, licence ni ustanove — ta polja u modelu ne
 * postoje i ne izvode se iz slobodnog teksta kvalifikacija.
 *
 * `author` i `reviewedBy` su `Person` sa imenom. Kvalifikacije se namerno ne
 * mapiraju u `honorificSuffix` ni `hasCredential`: u modelu su jedan slobodan
 * niz znakova, a ne strukturisan podatak.
 */
export function medicalWebPageJsonLd(input: MedicalWebPageInput): JsonLdNode {
  return withoutEmpty({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: input.title,
    url: input.url,
    description: input.description,
    inLanguage: SITE_LANGUAGE,
    author: { "@type": "Person", name: input.authorName },
    reviewedBy: { "@type": "Person", name: input.reviewerName },
    lastReviewed: input.reviewDate,
    image: input.imageUrl ?? undefined,
  });
}
