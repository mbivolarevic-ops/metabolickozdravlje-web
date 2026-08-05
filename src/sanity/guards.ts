import type { ArticleBySlugQueryResult } from "../../sanity.types";

/**
 * Runtime zaštita prikaza članka.
 *
 * Ovo je DRUGA brana. Prva je filter objavljivosti u samom GROQ upitu
 * (`src/sanity/queries/articles.ts`). Dvostruko je namerno: upit neko može
 * „pojednostaviti“ pri refaktorisanju, a dokument može biti upisan i preko
 * API-ja, mimo validacije u studiju. Pravilo iz docs/01 §8.1 mora važiti i
 * tada — medicinski sadržaj se ne prikazuje bez atribucije i datuma provere.
 *
 * Funkcija je ČISTA: bez mreže, bez bočnih efekata, bez logovanja i bez
 * ijedne Next.js zavisnosti. Ne poziva `notFound()` — odluku o odgovoru
 * donosi sloj rute, ne ovaj modul.
 */

type ArticleResult = NonNullable<ArticleBySlugQueryResult>;

/**
 * Članak koji je bezbedan za prikaz: sva polja neophodna za atribuciju i
 * razumevanje su prisutna i neprazna.
 */
export interface DisplayableArticle extends ArticleResult {
  title: string;
  slug: string;
  excerpt: string;
  body: NonNullable<ArticleResult["body"]>;
  reviewDate: string;
  cluster: { title: string; slug: string };
  author: { name: string; credentials: string; slug: string | null };
  reviewer: {
    name: string;
    credentials: string;
    specialty: string | null;
    institutionNote: string | null;
  };
  references: Array<{
    label: string;
    url: string;
    publisher: string | null;
    year: number | null;
  }>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Postoji i nije prazan niz znakova. */
function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Datum u obliku koji Sanity `date` polje upisuje: YYYY-MM-DD, i stvarno postoji. */
function isValidReviewDate(value: unknown): value is string {
  if (!hasText(value)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;

  // Odbacuje datume koji „preliju“, npr. 2026-02-31.
  return parsed.toISOString().slice(0, 10) === value;
}

/** Osoba uz koju ide potpis: ime i kvalifikacija su obavezni (docs/00 §5.2). */
function hasAttribution(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return hasText(value.name) && hasText(value.credentials);
}

/**
 * Izvor je kompletan kada ima ono što content model traži za objavu:
 * naziv i vezu (v. `referenceItem` šemu i `INCOMPLETE_REFERENCE` pravilo).
 */
function isCompleteReference(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return hasText(value.label) && hasText(value.url);
}

/** Telo mora imati bar jedan blok sa nepraznim tekstom. */
function hasUsableBody(value: unknown): boolean {
  if (!Array.isArray(value) || value.length === 0) return false;

  return value.some((block) => {
    if (!isRecord(block)) return false;
    const children = block.children;
    if (!Array.isArray(children)) return false;
    return children.some((child) => isRecord(child) && hasText(child.text));
  });
}

/**
 * Da li se članak sme prikazati.
 *
 * Prima `unknown` namerno: podatak dolazi spolja i ne sme se pretpostaviti
 * njegov oblik. Neispravan ulaz vraća `false` — nikada ne baca izuzetak.
 */
export function isDisplayableArticle(
  value: unknown,
): value is DisplayableArticle {
  if (!isRecord(value)) return false;

  if (!hasText(value.title)) return false;
  if (!hasText(value.slug)) return false;
  if (!hasText(value.excerpt)) return false;
  if (!hasUsableBody(value.body)) return false;
  if (!isValidReviewDate(value.reviewDate)) return false;

  const cluster = value.cluster;
  if (!isRecord(cluster)) return false;
  if (!hasText(cluster.title) || !hasText(cluster.slug)) return false;

  if (!hasAttribution(value.author)) return false;
  if (!hasAttribution(value.reviewer)) return false;

  const references = value.references;
  if (!Array.isArray(references) || references.length === 0) return false;
  if (!references.every(isCompleteReference)) return false;

  return true;
}
