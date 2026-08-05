import type { ClarityCheckId, ContentFormat } from "./types";

/**
 * Jedanaest provera razumljivosti (docs/04 §3.2).
 *
 * VAŽNA RAZLIKA (odluka vlasnika C):
 *  - SVIH 11 provera se EVIDENTIRA u modelu sadržaja — urednik vidi status
 *    svake, i to je uređivačka evidencija.
 *  - OBJAVU BLOKIRAJU samo one koje dokumentacija izričito označava kao
 *    blokirajuće u koloni „Blokira objavu?" tabele iz docs/04 §3.2.
 *
 * Evidencija ≠ bezbednosna kapija. Provera sa `blocking: "never"` nikada ne
 * zaustavlja objavu; ona postoji da bi uredničko razmatranje ostavilo trag.
 */

/** Na koji sadržaj se blokada odnosi. */
export type ClarityBlockingScope =
  /** Blokira uvek (docs/04 §3.2: „⛔ da"). */
  | "always"
  /** Ne blokira nikada — samo upozorenje (docs/04 §3.2: „ne, upozorenje"). */
  | "never"
  /** Blokira za pillar i vodiče (docs/04 §3.2: „⛔ da, za pillar i vodiče"). */
  | "pillarAndGuide"
  /** Blokira za forme i vodiče — u v1 nema formi ni vodiča, pa se ne primenjuje. */
  | "formAndGuide";

export interface ClarityCheckDefinition {
  id: ClarityCheckId;
  label: string;
  blocking: ClarityBlockingScope;
}

/** Doslovno prema tabeli iz docs/04 §3.2. Redosled i tekst se ne menjaju. */
export const CLARITY_CHECKS: readonly ClarityCheckDefinition[] = [
  {
    id: "C1",
    label: "Naslov jasno govori šta korisnik dobija",
    blocking: "always",
  },
  {
    id: "C2",
    label: "Prve dve rečenice odgovaraju na pitanje",
    blocking: "always",
  },
  {
    id: "C3",
    label: "Svaki stručni termin objašnjen pri prvom pojavljivanju",
    blocking: "always",
  },
  {
    id: "C4",
    label: "Skraćenica prvi put ima pun naziv",
    blocking: "always",
  },
  {
    id: "C5",
    label: "Jedan nov koncept po pasusu",
    blocking: "never",
  },
  {
    id: "C6",
    label: "Postoji konkretan primer",
    blocking: "never",
  },
  {
    id: "C7",
    label: "Svaki broj i jedinica objašnjeni",
    blocking: "always",
  },
  {
    id: "C8",
    label: "Korisnik zna šta je sledeći korak",
    blocking: "always",
  },
  {
    id: "C9",
    label: "Tekst ne može biti shvaćen pogrešno",
    blocking: "pillarAndGuide",
  },
  {
    id: "C10",
    label: "Dugme jasno opisuje šta će se desiti",
    blocking: "always",
  },
  {
    id: "C11",
    label: "Radnja se može završiti bez poznavanja digitalnih konvencija",
    blocking: "formAndGuide",
  },
] as const;

/**
 * Da li je provera blokirajuća za dati format sadržaja.
 * `formAndGuide` u v1 nije primenljiv jer nema ni formi ni vodiča.
 */
export function isClarityCheckBlocking(
  check: ClarityCheckDefinition,
  contentFormat: ContentFormat,
): boolean {
  switch (check.blocking) {
    case "always":
      return true;
    case "pillarAndGuide":
      return contentFormat === "pillar";
    case "never":
    case "formAndGuide":
      return false;
  }
}
