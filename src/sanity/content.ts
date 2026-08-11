import { cache } from "react";
import { getOptionalSanityClient } from "./client";
import {
  isValidArticleSummary,
  isValidHomepageArticle,
  isValidTopic,
  type ValidArticleSummary,
  type ValidHomepageArticle,
  type ValidTopic,
} from "./contentGuards";
import { allClustersQuery, clusterBySlugQuery } from "./queries/clusters";
import {
  articleBySlugOnlyQuery,
  articlesByClusterQuery,
  recentlyReviewedArticlesQuery,
  sitemapArticlesQuery,
} from "./queries/articles";
import { isDisplayableArticle, type DisplayableArticle } from "./guards";
import { isAcceptableFeaturedImage, isRenderableBody } from "./bodyGuards";

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

/**
 * Upit koji vraća listu MORA vratiti niz.
 *
 * Prazan niz je validan rezultat i znači „nema sadržaja“. Bilo koji drugi
 * oblik (`null`, objekat, string, broj) znači prekršen ugovor upita ili
 * klijenta — to nije prazan dataset i ne sme tako da izgleda. Zato se baca.
 *
 * Poruka namerno ne sadrži ni CMS podatke, ni upit, ni vrednosti okruženja —
 * samo naziv operacije, da se greška može locirati.
 */
function expectArray(value: unknown, operation: string): unknown[] {
  if (Array.isArray(value)) return value;

  throw new Error(
    `Sanity upit „${operation}“ nije vratio listu. Odgovor je pogrešnog oblika, ` +
      "što znači prekršen ugovor upita — a ne prazan dataset.",
  );
}

/** Sve teme koje su bezbedne za prikaz. Bez konfiguracije: prazna lista. */
export async function loadTopics(
  fetcher?: SanityFetcher,
): Promise<ValidTopic[]> {
  const client = resolveFetcher(fetcher);
  if (client === null) return [];

  const result = await client.fetch<unknown>(allClustersQuery);

  return expectArray(result, "sve teme").filter(isValidTopic);
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

  return expectArray(result, "sažeci članaka teme").filter(
    isValidArticleSummary,
  );
}

/**
 * Nedavno stručno provereni članci za početnu — najviše tri.
 *
 * Redosled dolazi iz upita (`reviewDate desc`) i ovde se NE menja: sortiranje
 * na dva mesta znači da se pre ili kasnije raziđu.
 *
 * Broj se dodatno ograničava i ovde. Upit već uzima `[0...3]`, ali početna ne
 * sme da naraste ako neko upit kasnije „popravi“.
 */
export const HOMEPAGE_ARTICLE_LIMIT = 3;

export async function loadHomepageArticles(
  fetcher?: SanityFetcher,
): Promise<ValidHomepageArticle[]> {
  const client = resolveFetcher(fetcher);
  if (client === null) return [];

  const result = await client.fetch<unknown>(recentlyReviewedArticlesQuery);

  return expectArray(result, "nedavno provereni članci")
    .filter(isValidHomepageArticle)
    .slice(0, HOMEPAGE_ARTICLE_LIMIT);
}

/**
 * Adresa i datum poslednje izmene — sve što sitemap-u treba.
 *
 * `lastModified` je `null` kada CMS podatak nije upotrebljiv. Datum se tada
 * izostavlja iz sitemap-a; datum builda NIJE datum sadržaja i ne izmišlja se.
 */
export interface SitemapEntry {
  slug: string;
  lastModified: string | null;
}

/** Prihvata samo ISO datum koji se stvarno može parsirati. */
function toLastModified(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : value;
}

/**
 * Prikazivi članci — JEDAN izvor istine za svaki spisak adresa članaka.
 *
 * Koriste ga i sitemap i `generateStaticParams`. Ranije su to bila dva puta:
 * sitemap je proveravao telo, a statički parametri nisu, pa se za članak bez
 * teksta generisala ruta koja odmah vraća 404. Dva puta znače dva ugovora, a
 * dva ugovora se pre ili kasnije raziđu.
 *
 * Filtrira ISTIM guardom koji odlučuje sme li članak na listu koja vodi na
 * njegovu stranicu (`isValidHomepageArticle`) — dakle: nije draft, ima autora,
 * recenzenta, datum provere i bar jedan izvor, ima upotrebljivo telo i, ako
 * ima naslovnu sliku, ona je ispravna.
 *
 * Telo se NE povlači: `hasUsableBody` je projekcija koja vraća samo `true` ili
 * `false`, pa provera ne košta prenos celog Portable Text sadržaja.
 */
async function loadDisplayableArticleEntries(
  fetcher?: SanityFetcher,
): Promise<SitemapEntry[]> {
  const client = resolveFetcher(fetcher);
  if (client === null) return [];

  const result = await client.fetch<unknown>(sitemapArticlesQuery);

  return expectArray(result, "prikazivi članci")
    .filter(isValidHomepageArticle)
    .map((article) => ({
      slug: article.slug,
      lastModified: toLastModified(
        (article as { _updatedAt?: unknown })._updatedAt,
      ),
    }));
}

/**
 * Članci za sitemap.
 *
 * Sitemap ne sme da sadrži adresu koja vraća 404 — to je jedina stvar koja ga
 * čini štetnim.
 */
export async function loadSitemapArticles(
  fetcher?: SanityFetcher,
): Promise<SitemapEntry[]> {
  return loadDisplayableArticleEntries(fetcher);
}

/** Teme za sitemap — iz istog validiranog izvora kao i stranica `/teme`. */
export async function loadSitemapTopics(
  fetcher?: SanityFetcher,
): Promise<SitemapEntry[]> {
  const topics = await loadTopics(fetcher);

  return topics.map((topic) => ({
    slug: topic.slug,
    lastModified: toLastModified(
      (topic as { _updatedAt?: unknown })._updatedAt,
    ),
  }));
}

/**
 * Jedan članak po sopstvenom slug-u, spreman za prikaz.
 *
 * Razlikuje TRI ishoda:
 *  - `null` — članak ne postoji ili nije prikaziv (nedostaje atribucija,
 *    telo nije upotrebljivo, medij je neispravan). Ruta na to daje 404.
 *  - GREŠKA — odgovor je pogrešnog OBLIKA (niz, string, broj). To znači
 *    prekršen ugovor upita i ne sme izgledati kao „nema članka“.
 *  - članak — prošao je i `isDisplayableArticle()` i proveru tela.
 *
 * `isDisplayableArticle()` se ne zaobilazi ni ne razvodnjava; provera tela je
 * dodatna, jer ta funkcija ne zna za blokove medija.
 */
export async function loadArticle(
  slug: string,
  fetcher?: SanityFetcher,
): Promise<DisplayableArticle | null> {
  const client = resolveFetcher(fetcher);
  if (client === null) return null;

  const result = await client.fetch<unknown>(articleBySlugOnlyQuery, { slug });

  // Nema članka — legitiman ishod.
  if (result === null || result === undefined) return null;

  if (typeof result !== "object" || Array.isArray(result)) {
    throw new Error(
      "Sanity upit „članak po adresi“ nije vratio dokument. Odgovor je pogrešnog " +
        "oblika, što znači prekršen ugovor upita — a ne da članak ne postoji.",
    );
  }

  if (!isDisplayableArticle(result)) return null;
  if (!isRenderableBody(result.body)) return null;

  // Naslovna slika sme da izostane; ako postoji, mora biti potpuna.
  if (!isAcceptableFeaturedImage(result.featuredImage)) return null;

  return result;
}

/**
 * Slug vrednosti za `generateStaticParams`.
 *
 * Isti izvor kao sitemap, pa se ruta generiše samo za članak koji se stvarno
 * prikazuje. Ranije je ovde bio zaseban, slabiji upit koji je gledao samo
 * postojanje polja: članak bez teksta dobijao je statičku rutu koja zatim
 * vraća 404.
 */
export async function loadArticleSlugs(
  fetcher?: SanityFetcher,
): Promise<string[]> {
  const entries = await loadDisplayableArticleEntries(fetcher);
  return entries.map((entry) => entry.slug);
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
export const getArticle = cache((slug: string) => loadArticle(slug));
export const getHomepageArticles = cache(() => loadHomepageArticles());

export type {
  ValidArticleSummary,
  ValidHomepageArticle,
  ValidTopic,
  DisplayableArticle,
};
