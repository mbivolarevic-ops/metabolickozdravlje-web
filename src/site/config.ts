/**
 * Javni identitet sajta — jedno mesto za vrednosti koje bi se inače ponavljale
 * po rutama, metapodacima, sitemap-u i strukturiranim podacima.
 *
 * ⛔ NEMA promenljive okruženja za javni URL, i to je odluka, ne propust.
 * Adresa `metabolickozdravlje.rs` je ista u svakoj sredini: staging se ne
 * indeksira i nije javno odredište, pa kanonska adresa nikada ne sme da
 * pokazuje na njega. Promenljiva bi značila da se kanonska adresa može
 * razlikovati po okruženju — a upravo to je greška koju kanonska adresa treba
 * da spreči. Ako se domen ikada promeni, menja se ovde, u jednom redu.
 */

/** Naziv platforme kako se prikazuje korisniku i u metapodacima. */
export const SITE_NAME = "metabolickozdravlje.rs";

/** Javni produkcioni URL. Bez završne kose crte. */
export const SITE_URL = "https://metabolickozdravlje.rs";

/** Domen bez šeme — za `robots` host i prikaz. */
export const SITE_DOMAIN = "metabolickozdravlje.rs";

/**
 * Jezik sadržaja za metapodatke i strukturirane podatke.
 *
 * Razlikuje se od `HTML_LANG` namerno: `inLanguage` u Schema.org opisuje jezik
 * i pismo, dok `<html lang>` nosi i region, što je za čitače ekrana korisnije.
 * Obe vrednosti opisuju isti jezik — srpski, latinično pismo.
 */
export const SITE_LANGUAGE = "sr-Latn";

/** Vrednost `lang` atributa dokumenta. Zatečena vrednost, ne menja se ovde. */
export const HTML_LANG = "sr-Latn-RS";

/** Open Graph `locale`. */
export const SITE_LOCALE = "sr_RS";

/**
 * Podrazumevani opis platforme.
 *
 * Doslovno prati odobrenu poruku sa početne stranice (uvodni tekst heroja),
 * da se metapodaci i vidljivi sadržaj ne bi razišli.
 */
export const SITE_DESCRIPTION =
  "Pouzdane informacije o gojaznosti, šećeru u krvi, hormonima i drugim temama koje utiču na metaboličko zdravlje. Svaki tekst ima autora, stručnog recenzenta i datum provere.";

/** Podrazumevani naslov — koristi se i kao naslov početne stranice. */
export const SITE_TITLE = "Metaboličko zdravlje, objašnjeno jasno i bez osude";

/** Osnova za `metadataBase`. */
export const siteUrl = new URL(SITE_URL);

/**
 * Sastavlja apsolutnu kanonsku adresu iz segmenata putanje.
 *
 * Svaki segment se enkodira. To NIJE kozmetika: slug dolazi iz CMS-a, a
 * segment koji sadrži `?`, `#` ili kosu crtu bi pri prostom spajanju stringova
 * napravio upit, fragment ili sasvim drugu putanju. `URL` konstruktor sam ne
 * bi to sprečio — on takve znake tumači, ne beži od njih.
 *
 * Bez segmenata vraća adresu početne stranice.
 */
export function canonicalUrl(...segments: readonly string[]): string {
  const path = segments
    .filter((segment) => segment.length > 0)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return new URL(path === "" ? "/" : `/${path}`, siteUrl).toString();
}

/**
 * Apsolutna adresa iz gotove putanje (npr. „/teme“).
 *
 * Za putanje koje sami pišemo u kodu. Za vrednosti iz CMS-a koristi
 * `canonicalUrl`, koji enkodira segmente.
 */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
