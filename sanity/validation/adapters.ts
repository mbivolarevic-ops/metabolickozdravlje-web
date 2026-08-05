import type {
  ArticleInput,
  ClarityCheckId,
  ClarityChecksInput,
  ClarityCheckStatus,
  ContentBlockInput,
  ContentFormat,
  DocumentReferenceInput,
  EditorialTier,
  ReferenceItemInput,
  SeoInput,
} from "./types";

/**
 * Pretvara nepoznat Sanity dokument u ulaz za validaciju.
 *
 * Postoji da bi šema mogla da pozove istu poslovnu logiku bez `any` i bez
 * dupliranja pravila. Sve provere su odbrambene: dokument u studiju je u toku
 * uređivanja i može biti bilo kako nepotpun.
 */

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toDocumentReference(
  value: unknown,
): DocumentReferenceInput | undefined {
  const record = asRecord(value);
  if (record === undefined) return undefined;
  return { _ref: asString(record._ref) };
}

/** Slug u Sanity-ju je objekat `{ current: string }`. */
function toSlug(value: unknown): string | undefined {
  const record = asRecord(value);
  if (record === undefined) return asString(value);
  return asString(record.current);
}

function toContentBlock(value: unknown): ContentBlockInput {
  const record = asRecord(value) ?? {};
  const children = asArray(record.children).map((child) => ({
    text: asString(asRecord(child)?.text),
  }));

  return {
    _type: asString(record._type),
    children,
    alt: asString(record.alt),
  };
}

function toReferenceItem(value: unknown): ReferenceItemInput {
  const record = asRecord(value) ?? {};
  return {
    label: asString(record.label),
    url: asString(record.url),
    publisher: asString(record.publisher),
    year: asNumber(record.year),
  };
}

function toSeo(value: unknown): SeoInput | undefined {
  const record = asRecord(value);
  if (record === undefined) return undefined;
  return {
    metaTitle: asString(record.metaTitle),
    metaDescription: asString(record.metaDescription),
  };
}

const CLARITY_STATUSES: readonly ClarityCheckStatus[] = [
  "unchecked",
  "ok",
  "warning",
  "blocked",
];

function toClarityStatus(value: unknown): ClarityCheckStatus | undefined {
  const candidate = asString(value);
  return CLARITY_STATUSES.find((status) => status === candidate);
}

function toClarityChecks(value: unknown): ClarityChecksInput | undefined {
  const record = asRecord(value);
  if (record === undefined) return undefined;

  const result: ClarityChecksInput = {};
  for (const [key, raw] of Object.entries(record)) {
    const status = toClarityStatus(raw);
    if (status !== undefined) {
      result[key as ClarityCheckId] = status;
    }
  }
  return result;
}

const EDITORIAL_TIERS: readonly EditorialTier[] = [
  "standard",
  "elevated",
  "sensitive",
];

const CONTENT_FORMATS: readonly ContentFormat[] = ["article", "pillar"];

export function toArticleInput(document: unknown): ArticleInput {
  const record = asRecord(document) ?? {};

  const tier = EDITORIAL_TIERS.find(
    (candidate) => candidate === asString(record.editorialTier),
  );
  const format = CONTENT_FORMATS.find(
    (candidate) => candidate === asString(record.contentFormat),
  );

  return {
    title: asString(record.title),
    slug: toSlug(record.slug),
    excerpt: asString(record.excerpt),
    contentFormat: format,
    editorialTier: tier,
    body: asArray(record.body).map(toContentBlock),
    cluster: toDocumentReference(record.cluster),
    author: toDocumentReference(record.author),
    reviewedBy: toDocumentReference(record.reviewedBy),
    reviewDate: asString(record.reviewDate),
    nextReviewDate: asString(record.nextReviewDate),
    references: asArray(record.references).map(toReferenceItem),
    legalReviewed: asBoolean(record.legalReviewed),
    seo: toSeo(record.seo),
    clarityChecks: toClarityChecks(record.clarityChecks),
    clarityTestDone: asBoolean(record.clarityTestDone),
  };
}
