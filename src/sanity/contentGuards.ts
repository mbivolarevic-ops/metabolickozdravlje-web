import type {
  AllClustersQueryResult,
  ArticlesByClusterQueryResult,
  RecentlyReviewedArticlesQueryResult,
} from "../../sanity.types";
import { isAcceptableFeaturedImage } from "./bodyGuards";

/**
 * Runtime provere za sadržaj koji se prikazuje na stranicama tema.
 *
 * Odvojene su od `isDisplayableArticle()` NAMERNO. Ta provera važi za pun
 * članak i traži autora, recenzenta, izvore i telo. Skraćena projekcija za
 * liste te podatke svesno ne povlači, pa bi puna provera odbila svaki sažetak.
 * Ovde se proverava tačno ono što se na listi i prikazuje.
 *
 * Funkcije su čiste: bez mreže, bez bočnih efekata, bez logovanja. Neispravan
 * ulaz vraća `false`, nikada ne baca.
 */

type RawTopic = AllClustersQueryResult[number];
type RawArticleSummary = ArticlesByClusterQueryResult[number];

/** Tema koja je bezbedna za prikaz. */
export interface ValidTopic extends RawTopic {
  title: string;
  slug: string;
  intro: string;
}

/** Sažetak članka koji je bezbedan za prikaz u listi. */
export interface ValidArticleSummary extends RawArticleSummary {
  title: string;
  slug: string;
  excerpt: string;
  reviewDate: string;
  cluster: { title: string; slug: string };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Datum „YYYY-MM-DD“ koji stvarno postoji (odbija npr. 2026-02-31). */
function isValidDate(value: unknown): value is string {
  if (!hasText(value)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;

  return parsed.toISOString().slice(0, 10) === value;
}

/**
 * `order` je opciono polje, ali ako postoji mora biti upotrebljiv broj —
 * `NaN` ili `Infinity` bi pokvarili redosled liste.
 */
function hasUsableOrder(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  return typeof value === "number" && Number.isFinite(value);
}

export function isValidTopic(value: unknown): value is ValidTopic {
  if (!isRecord(value)) return false;

  if (!hasText(value._id)) return false;
  if (!hasText(value.title)) return false;
  if (!hasText(value.slug)) return false;
  if (!hasText(value.intro)) return false;
  if (!hasUsableOrder(value.order)) return false;

  return true;
}

/**
 * Sažetak članka za početnu — isto što i sažetak u listi, plus opciona
 * naslovna slika za sličicu.
 */
export interface ValidHomepageArticle extends ValidArticleSummary {
  featuredImage: RecentlyReviewedArticlesQueryResult[number]["featuredImage"];
}

export function isValidArticleSummary(
  value: unknown,
): value is ValidArticleSummary {
  if (!isRecord(value)) return false;

  if (!hasText(value._id)) return false;
  if (!hasText(value.title)) return false;
  if (!hasText(value.slug)) return false;
  if (!hasText(value.excerpt)) return false;
  if (!isValidDate(value.reviewDate)) return false;

  const cluster = value.cluster;
  if (!isRecord(cluster)) return false;
  if (!hasText(cluster.title) || !hasText(cluster.slug)) return false;

  return true;
}

/**
 * Članak koji sme na početnu.
 *
 * Uz sve što traži sažetak, naslovna slika mora biti prihvatljiva: odsutna
 * je u redu, prisutna mora biti potpuna.
 *
 * Zašto neispravna slika izbacuje CEO članak, a ne samo sličicu: isti podatak
 * na stranici članka obara prikaz i daje 404 (v. `loadArticle`). Kartica koja
 * bi ostala vodila bi čitaoca u 404. Bolje je da je nema.
 */
export function isValidHomepageArticle(
  value: unknown,
): value is ValidHomepageArticle {
  if (!isValidArticleSummary(value)) return false;

  return isAcceptableFeaturedImage(
    (value as { featuredImage?: unknown }).featuredImage,
  );
}
