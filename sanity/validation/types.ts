/**
 * Tipovi za validaciju sadržaja.
 *
 * Ovaj modul je NAMERNO nezavisan od paketa `sanity`: pravila su čista
 * poslovna logika koja se testira bez Sanity projekta, naloga i mreže.
 * Šeme u `sanity/schemas/` pozivaju ove funkcije — logika se ne duplira.
 */

/** Nivo uređivačke kontrole (docs/01 §8.3). */
export type EditorialTier = "standard" | "elevated" | "sensitive";

/** Format sadržaja. Utiče na to koje su clarity provere blokirajuće. */
export type ContentFormat = "article" | "pillar";

/** Šifre pravila. Svaka odgovara pravilu iz projektne dokumentacije. */
export type ValidationRuleCode =
  | "MISSING_TITLE"
  | "MISSING_SLUG"
  | "MISSING_EXCERPT"
  | "MISSING_BODY"
  | "MISSING_CLUSTER"
  | "MISSING_AUTHOR"
  | "MISSING_REVIEWER"
  | "MISSING_REVIEW_DATE"
  | "MISSING_REFERENCES"
  | "INCOMPLETE_REFERENCE"
  | "MISSING_LEGAL_REVIEW"
  | "MISSING_SEO_TITLE"
  | "MISSING_SEO_DESCRIPTION"
  | "SEO_TITLE_LENGTH"
  | "SEO_DESCRIPTION_LENGTH"
  | "IMAGE_MISSING_ALT"
  | "UNRESOLVED_PLACEHOLDER"
  | "BANNED_TERM"
  | "DEADLINE_PROMISE"
  | "CLARITY_BLOCKING_CHECK"
  | "CLARITY_TEST_MISSING";

/** Jedan nalaz validacije. */
export interface ValidationIssue {
  /** Šifra pravila — stabilna, pogodna za testove i izveštaje. */
  code: ValidationRuleCode;
  /** Poruka uredniku, na srpskom, koja kaže šta konkretno nedostaje. */
  message: string;
  /** Polje na koje se nalaz odnosi, kada je poznato. */
  path?: string;
}

/**
 * Rezultat validacije.
 *
 * `issues` su BLOKIRAJUĆE — dok postoji makar jedan, sadržaj nije spreman za
 * objavu. `warnings` su EVIDENCIJA uredničke provere i ne blokiraju objavu
 * (odluka vlasnika C).
 */
export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
  warnings: ValidationIssue[];
}

/** Referenca na drugi dokument (autor, recenzent, klaster). */
export interface DocumentReferenceInput {
  _ref?: string;
}

/** Jedan izvor iz liste referenci (docs/01 §8.3). */
export interface ReferenceItemInput {
  label?: string;
  url?: string;
  publisher?: string;
  year?: number;
}

/** SEO polja (docs/03 §4). */
export interface SeoInput {
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Blok Portable Text-a, sveden na ono što validacija zaista čita:
 * tip bloka, tekstualnu decu i `alt` opis kod slika.
 */
export interface ContentBlockInput {
  _type?: string;
  children?: Array<{ text?: string }>;
  alt?: string;
}

/** Identifikatori 11 provera razumljivosti (docs/04 §3.2). */
export type ClarityCheckId =
  "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9" | "C10" | "C11";

/** Status pojedinačne provere. `unchecked` znači da provera nije sprovedena. */
export type ClarityCheckStatus = "unchecked" | "ok" | "warning" | "blocked";

export type ClarityChecksInput = Partial<
  Record<ClarityCheckId, ClarityCheckStatus>
>;

/**
 * Ulaz za validaciju članka. Sva polja su opciona jer validacija upravo
 * proverava šta nedostaje — nepotpun dokument mora moći da uđe u funkciju.
 */
export interface ArticleInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  contentFormat?: ContentFormat;
  editorialTier?: EditorialTier;
  body?: ContentBlockInput[];
  cluster?: DocumentReferenceInput;
  author?: DocumentReferenceInput;
  reviewedBy?: DocumentReferenceInput;
  reviewDate?: string;
  nextReviewDate?: string;
  references?: ReferenceItemInput[];
  legalReviewed?: boolean;
  seo?: SeoInput;
  clarityChecks?: ClarityChecksInput;
  clarityTestDone?: boolean;
}
