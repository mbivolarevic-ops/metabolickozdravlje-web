import { getSanityClient } from "../client";

/**
 * Provera veze sa Content Lake-om.
 *
 * `count(*)` je najmanji mogući upit koji dokazuje da veza radi, a NE traži
 * da sadržaj postoji: na praznom datasetu vraća 0. Time se veza može
 * proveriti pre nego što ijedan dokument bude unet.
 *
 * Upit je isključivo za čitanje. Ovde se ništa ne kreira, ne menja i ne briše.
 *
 * Svi GROQ upiti žive u ovom direktorijumu (docs/01 §6.4) — nikada inline u
 * komponenti, da bi se sprečilo da neki šablon slučajno prikaže članak bez
 * recenzenta i datuma provere.
 */
export const connectionCheckQuery = "count(*)";

/** Vraća broj dokumenata u datasetu. Na praznom datasetu je to 0. */
export async function fetchDocumentCount(): Promise<number> {
  return getSanityClient().fetch<number>(connectionCheckQuery);
}
