import type { ValidationResult } from "./types";

/**
 * Most između čiste validacije i Sanity pravila.
 *
 * Sanity za jedno polje/dokument prihvata `true` (u redu) ili poruku. Pošto
 * blokirajući nalazi i upozorenja idu kroz DVA odvojena Sanity pravila
 * (jedno kao greška, drugo kao `.warning()`), ovde se rezultat samo
 * FORMATIRA — nijedno pravilo se ne odlučuje ponovo.
 *
 * Funkcije su čiste i bez zavisnosti od paketa `sanity`, pa se testiraju bez
 * pokretanja studija.
 */

function joinMessages(messages: string[]): string {
  return messages.join(" · ");
}

/** Blokirajući nalazi — u Sanity-ju se prikazuju kao greška. */
export function formatIssuesForSanity(result: ValidationResult): true | string {
  if (result.issues.length === 0) return true;
  return joinMessages(result.issues.map((issue) => issue.message));
}

/**
 * Neblokirajuća upozorenja — u Sanity-ju se prikazuju kao `.warning()`.
 * Obuhvata preporučene SEO dužine i neblokirajuće clarity provere.
 */
export function formatWarningsForSanity(
  result: ValidationResult,
): true | string {
  if (result.warnings.length === 0) return true;
  return joinMessages(result.warnings.map((warning) => warning.message));
}
