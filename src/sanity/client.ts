import { createClient, type SanityClient } from "@sanity/client";
import { announceSanityConfig, readSanityConfig } from "./env";

/**
 * Jedina tačka pristupa Sanity Content Lake-u.
 *
 * Pristup je serverski i read-only. Klijent se NIKADA ne uvozi u klijentsku
 * komponentu — svi upiti idu sa servera (server komponente, route handleri,
 * build korak), pa CORS nije u igri.
 *
 * Klijent se pravi LENJO, pri prvom pozivu. Time uvoz ovog modula ne ruši
 * build kada konfiguracija još nije postavljena — a u ovoj fazi nijedna
 * stranica ne čita sadržaj.
 */

let cachedClient: SanityClient | undefined;

export function getSanityClient(): SanityClient {
  if (cachedClient !== undefined) return cachedClient;

  const config = readSanityConfig();
  announceSanityConfig(config);

  cachedClient = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,

    // Statički build traži najsvežiji sadržaj, pa se ne ide preko keša.
    // Sanity: „If you are building static sites you should use the live API
    // to ensure you always get the freshest version."
    useCdn: false,

    // Samo objavljeni sadržaj. Draftovi ne smeju iscuriti na javni sajt;
    // draft mode i preview su van obima ove faze.
    perspective: "published",

    // Token se NE prosleđuje. Datasetovi su javni, pa za čitanje objavljenog
    // sadržaja nije potreban — a svaka nepotrebna tajna je suvišan rizik.
  });

  return cachedClient;
}

/** Samo za testove — poništava keširan klijent. */
export function resetSanityClientForTests(): void {
  cachedClient = undefined;
}
