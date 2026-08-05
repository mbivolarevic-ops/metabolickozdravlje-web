/**
 * Izrazi koji se nikada ne prikazuju korisniku.
 *
 * Izvor: docs/04 §14.6 („Lista izraza koje korisniku ne prikazujemo"), koji
 * objedinjuje §6.3 i §8.2. Dodat je „cookie policy" — §6.3 ga navodi, a §14.6
 * ga pri objedinjavanju ispušta, pa se koristi unija da lista ne bude uža od
 * najstrožeg izvora.
 *
 * Pravilo je blokirajuće: docs/04 §14.7, stavka 5 („Reč sa liste 14.6 → blokira").
 */

/** Digitalni žargon (docs/04 §6.3 i §14.6). */
export const BANNED_DIGITAL_JARGON: readonly string[] = [
  "submit",
  "validation error",
  "authentication",
  "verify account",
  "consent management",
  "cta",
  "resource",
  "download asset",
  "loading",
  "error 404",
  "session expired",
  "opt-in",
  "subscribe",
  "dashboard",
  "toggle",
  "filter",
  "accordion",
  "modal",
  "banner",
  "required field",
  "invalid input",
  "newsletter",
  "cookie policy",
] as const;

/** Ponižavajuće i moralizatorske formulacije (docs/04 §8.2 i §14.6). */
export const BANNED_MORALIZING: readonly string[] = [
  "samo treba",
  "nedostatak volje",
  "disciplina",
  "izgovori",
  "loša hrana",
  "greh",
  "varanje",
  "čista ishrana",
  "naravno, svi znaju",
  "mit u koji neki i dalje veruju",
  "vi to možete",
  "hajde da naučimo",
] as const;

/** Preterivanja i strah (docs/04 §14.6). */
export const BANNED_HYPE_AND_FEAR: readonly string[] = [
  "šokantno",
  "neverovatno",
  "tajna",
  "ubica",
  "čudotvorno",
  "revolucionarno",
  "lekari ne govore o ovome",
] as const;

export const BANNED_TERMS: readonly string[] = [
  ...BANNED_DIGITAL_JARGON,
  ...BANNED_MORALIZING,
  ...BANNED_HYPE_AND_FEAR,
] as const;

/**
 * Obećanje roka („za 30 dana" i svaki drugi rok).
 * docs/04 §14.6 navodi „bilo koji rok („za 30 dana")", pa se hvata obrascem,
 * ne samo doslovnim nizom znakova.
 */
const DEADLINE_PROMISE =
  /\bza\s+\d+\s+(dan|dana|nedelju|nedelja|meseci|mesec)\b/iu;

/**
 * Traži izraz kao POČETAK reči, da bi se uhvatili i oblici po padežima
 * („tajna" → „tajnama", „greh" → „greha"), a da se izraz ne pronađe usred
 * nevezane reči. Svesno ograničenje: prefiksni oblici se hvataju, a oblici
 * sa promenjenom osnovom ne — lista je bezbednosna mreža, ne zamena za
 * uredničko čitanje.
 */
function buildTermMatcher(term: string): RegExp {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}])${escaped}\\p{L}*`, "iu");
}

const TERM_MATCHERS: ReadonlyArray<{ term: string; matcher: RegExp }> =
  BANNED_TERMS.map((term) => ({ term, matcher: buildTermMatcher(term) }));

/** Vraća sve zabranjene izraze pronađene u tekstu. */
export function findBannedTerms(text: string): string[] {
  return TERM_MATCHERS.filter(({ matcher }) => matcher.test(text)).map(
    ({ term }) => term,
  );
}

/** Da li tekst sadrži obećanje roka. */
export function hasDeadlinePromise(text: string): boolean {
  return DEADLINE_PROMISE.test(text);
}
