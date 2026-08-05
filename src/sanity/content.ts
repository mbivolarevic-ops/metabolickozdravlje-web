import { cache } from "react";
import { getOptionalSanityClient } from "./client";
import {
  isValidArticleSummary,
  isValidTopic,
  type ValidArticleSummary,
  type ValidTopic,
} from "./contentGuards";
import { allClustersQuery, clusterBySlugQuery } from "./queries/clusters";
import { articlesByClusterQuery } from "./queries/articles";

/**
 * Serverski, read-only sloj za dohvat sadržaja tema.
 *
 * Tri pravila koja se ovde ne krše:
 *
 *  1. GROQ upiti se NE pišu ovde ni u stranicama — dolaze iz `queries/`.
 *  2. Nema širokog `try/catch`. Mrežna ili GROQ greška se PROPAGIRA i obara
 *     build. Prazna lista sme da znači samo „nema sadržaja“, nikada
 *     „nešto je puklo“ — inače bismo objavili prazan sajt kao da je ispravan.
 *  3. Nevalidan pojedinačan CMS zapis se filtrira, jer je to podatak, ne
 *     kvar. To je jedina stvar koja se tiho izostavlja.
 */

/** Minimalni ugovor koji loaderima treba. Testovi prosleđuju svoj mock. */
export interface SanityFetcher {
  fetch<T>(query: string, params?: Record<string, unknown>): Promise<T>;
}

/**
 * Bira izvor podataka. Bez prosleđenog fetchera koristi opcioni klijent —
 * koji je `null` samo kada Sanity uopšte nije podešen.
 */
function resolveFetcher(fetcher?: SanityFetcher): SanityFetcher | null {
  return fetcher ?? getOptionalSanityClient();
}

/** Sve teme koje su bezbedne za prikaz. Bez konfiguracije: prazna lista. */
export async function loadTopics(
  fetcher?: SanityFetcher,
): Promise<ValidTopic[]> {
  const client = resolveFetcher(fetcher);
  if (client === null) return [];

  const result = await client.fetch<unknown>(allClustersQuery);
  if (!Array.isArray(result)) return [];

  return result.filter(isValidTopic);
}

/** Jedna tema po slug-u. Nevalidna ili nepostojeća → `null`. */
export async function loadTopic(
  slug: string,
  fetcher?: SanityFetcher,
): Promise<ValidTopic | null> {
  const client = resolveFetcher(fetcher);
  if (client === null) return null;

  const result = await client.fetch<unknown>(clusterBySlugQuery, {
    cluster: slug,
  });

  return isValidTopic(result) ? result : null;
}

/** Sažeci objavljivih članaka jedne teme. */
export async function loadTopicArticleSummaries(
  slug: string,
  fetcher?: SanityFetcher,
): Promise<ValidArticleSummary[]> {
  const client = resolveFetcher(fetcher);
  if (client === null) return [];

  const result = await client.fetch<unknown>(articlesByClusterQuery, {
    cluster: slug,
  });
  if (!Array.isArray(result)) return [];

  return result.filter(isValidArticleSummary);
}

/** Slug vrednosti validnih tema — za `generateStaticParams`. */
export async function loadTopicSlugs(
  fetcher?: SanityFetcher,
): Promise<string[]> {
  const topics = await loadTopics(fetcher);
  return topics.map((topic) => topic.slug);
}

/*
 * Keširane verzije za rute.
 *
 * `cache()` iz Reacta deduplikuje poziv unutar istog zahteva/rendera, pa
 * `generateMetadata` i sama stranica dele jedan dohvat umesto da svaka radi
 * svoj upit.
 */
export const getTopics = cache(() => loadTopics());
export const getTopic = cache((slug: string) => loadTopic(slug));
export const getTopicArticleSummaries = cache((slug: string) =>
  loadTopicArticleSummaries(slug),
);

export type { ValidArticleSummary, ValidTopic };
