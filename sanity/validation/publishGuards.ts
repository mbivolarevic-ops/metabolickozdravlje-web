import { CLARITY_CHECKS, isClarityCheckBlocking } from "./clarityChecks";
import { findBannedTerms, hasDeadlinePromise } from "./bannedTerms";
import type {
  ArticleInput,
  ContentBlockInput,
  ContentFormat,
  ValidationIssue,
  ValidationResult,
} from "./types";

/**
 * Blokirajuće kapije pred objavu medicinskog članka.
 *
 * Osnovno pravilo (docs/01 §8.1): medicinski sadržaj ne može biti objavljen
 * bez atribucije i datuma recenzije, i to se ne sprovodi uputstvom uredniku
 * nego validacijom koja blokira objavu.
 *
 * Odluke vlasnika koje su ovde sprovedene:
 *  A — recenzent i datum stručne provere obavezni su za SVAKI nivo, uključujući
 *      `standard`. (Time se razrešava protivrečnost između docs/01 §8.3, koji
 *      je za `standard` propuštao, i docs/03 §7.3 + docs/00 §5.2, koji traže
 *      potpis na svakom tekstu.)
 *  B — najmanje jedan izvor obavezan je za svaki medicinski članak.
 *  C — svih 11 clarity provera se evidentira, ali blokiraju samo one koje
 *      docs/04 §3.2 i §14.7 izričito označavaju kao blokirajuće.
 */

/** SEO granice iz docs/03 §4 i liste provere §8. */
const SEO_TITLE_MIN = 50;
const SEO_TITLE_MAX = 60;
const SEO_DESCRIPTION_MIN = 140;
const SEO_DESCRIPTION_MAX = 155;

/** Hvata svaku nezatvorenu uglastu oznaku, npr. [PROVERITI IZVOR]. */
const PLACEHOLDER_MARKER = /\[[^\]]*\]/gu;

/** Type guard: vrednost postoji i nije prazna. Sužava tip na `string`. */
function hasText(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBlank(value: string | undefined): boolean {
  return !hasText(value);
}

function hasReference(ref: { _ref?: string } | undefined): boolean {
  return ref !== undefined && !isBlank(ref._ref);
}

/** Skuplja sav vidljivi tekst iz tela članka. */
export function extractVisibleText(body: ContentBlockInput[] = []): string {
  return body
    .flatMap((block) => (block.children ?? []).map((child) => child.text ?? ""))
    .join(" ");
}

/** Blokovi koji nose sliku i zato moraju imati `alt` opis. */
function isImageBlock(block: ContentBlockInput): boolean {
  return block._type === "imageWithCaption" || block._type === "image";
}

/**
 * Validira da li je članak spreman za objavu.
 *
 * `issues` blokiraju objavu. `warnings` su uredničke evidencije i ne blokiraju.
 */
export function validateArticleForPublish(
  article: ArticleInput,
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const contentFormat: ContentFormat = article.contentFormat ?? "article";
  const tier = article.editorialTier ?? "standard";

  // ——— Osnovna polja ———
  if (isBlank(article.title)) {
    issues.push({
      code: "MISSING_TITLE",
      message: "Članak nema naslov.",
      path: "title",
    });
  }

  if (isBlank(article.slug)) {
    issues.push({
      code: "MISSING_SLUG",
      message: "Članak nema adresu (slug).",
      path: "slug",
    });
  }

  if (isBlank(article.excerpt)) {
    issues.push({
      code: "MISSING_EXCERPT",
      message:
        "Članak nema kratak odgovor na pitanje iz naslova (uvodni sažetak).",
      path: "excerpt",
    });
  }

  /*
   * Telo mora imati bar jedan NEPRAZAN tekstualni span. Prazan element
   * (`body: [{}]`), blok bez tekstualne dece ili blok koji sadrži samo
   * razmake ne predstavlja tekst i ne sme zadovoljiti obavezno polje.
   */
  const body = article.body ?? [];
  const hasMeaningfulText = body.some((block) =>
    (block.children ?? []).some((child) => hasText(child.text)),
  );

  if (!hasMeaningfulText) {
    issues.push({
      code: "MISSING_BODY",
      message: "Članak nema tekst. Potreban je bar jedan neprazan pasus.",
      path: "body",
    });
  }

  // ——— Atribucija i medicinska kontrola (odluke A i B) ———
  if (!hasReference(article.cluster)) {
    issues.push({
      code: "MISSING_CLUSTER",
      message: "Članak nije povezan sa temom (klasterom).",
      path: "cluster",
    });
  }

  if (!hasReference(article.author)) {
    issues.push({
      code: "MISSING_AUTHOR",
      message: "Članak nema navedenog autora.",
      path: "author",
    });
  }

  if (!hasReference(article.reviewedBy)) {
    issues.push({
      code: "MISSING_REVIEWER",
      message:
        "Članak nema stručnog recenzenta. Recenzent je obavezan za svaki nivo, uključujući standardni.",
      path: "reviewedBy",
    });
  }

  if (isBlank(article.reviewDate)) {
    issues.push({
      code: "MISSING_REVIEW_DATE",
      message: "Članak nema datum poslednje stručne provere.",
      path: "reviewDate",
    });
  }

  /*
   * „Najmanje jedan izvor" znači najmanje jedan KOMPLETAN izvor. Prazna
   * stavka (`references: [{}]`) nije izvor — bez naziva i veze niko ne može
   * proveriti tvrdnju, a upravo je provera smisao pravila (docs/03 §7.3).
   */
  const references = article.references ?? [];
  if (references.length === 0) {
    issues.push({
      code: "MISSING_REFERENCES",
      message: "Članak nema nijedan naveden izvor. Potreban je najmanje jedan.",
      path: "references",
    });
  } else {
    references.forEach((reference, index) => {
      if (!hasText(reference.label) || !hasText(reference.url)) {
        issues.push({
          code: "INCOMPLETE_REFERENCE",
          message:
            "Izvor je nepotpun. Svaki izvor mora imati naziv i vezu ka izvoru koji je otvoren i pročitan.",
          path: `references[${index}]`,
        });
      }
    });
  }

  if (tier === "sensitive" && article.legalReviewed !== true) {
    issues.push({
      code: "MISSING_LEGAL_REVIEW",
      message:
        "Osetljiv sadržaj (terapije, lekovi) ne može se objaviti bez potvrđenog pravnog pregleda.",
      path: "legalReviewed",
    });
  }

  /*
   * SEO (docs/03 §4), po odluci vlasnika:
   *  - PRISUSTVO SEO naslova i opisa je blokirajuće;
   *  - preporučene dužine (50–60 i 140–155) su UPOZORENJA i ne blokiraju
   *    objavu. Urednik ih vidi, ali tekst koji je tačan i proveren ne sme
   *    ostati neobjavljen zbog nekoliko znakova.
   */
  const metaTitle = article.seo?.metaTitle;
  const metaDescription = article.seo?.metaDescription;

  if (!hasText(metaTitle)) {
    issues.push({
      code: "MISSING_SEO_TITLE",
      message: "Nedostaje SEO naslov stranice.",
      path: "seo.metaTitle",
    });
  } else if (
    metaTitle.trim().length < SEO_TITLE_MIN ||
    metaTitle.trim().length > SEO_TITLE_MAX
  ) {
    warnings.push({
      code: "SEO_TITLE_LENGTH",
      message: `Preporučena dužina SEO naslova je ${SEO_TITLE_MIN}–${SEO_TITLE_MAX} znakova.`,
      path: "seo.metaTitle",
    });
  }

  if (!hasText(metaDescription)) {
    issues.push({
      code: "MISSING_SEO_DESCRIPTION",
      message: "Nedostaje SEO opis stranice.",
      path: "seo.metaDescription",
    });
  } else if (
    metaDescription.trim().length < SEO_DESCRIPTION_MIN ||
    metaDescription.trim().length > SEO_DESCRIPTION_MAX
  ) {
    warnings.push({
      code: "SEO_DESCRIPTION_LENGTH",
      message: `Preporučena dužina SEO opisa je ${SEO_DESCRIPTION_MIN}–${SEO_DESCRIPTION_MAX} znakova.`,
      path: "seo.metaDescription",
    });
  }

  // ——— Slike bez alt opisa (docs/01 §8.4, docs/04 §14.7 stavka 6) ———
  body.forEach((block, index) => {
    if (isImageBlock(block) && isBlank(block.alt)) {
      issues.push({
        code: "IMAGE_MISSING_ALT",
        message:
          "Slika nema opis (alt) koji prenosi informaciju. Bez njega se sadržaj ne objavljuje.",
        path: `body[${index}].alt`,
      });
    }
  });

  // ——— Nedovršene oznake (docs/04 §14.7 stavka 1) ———
  const visibleText = [
    article.title ?? "",
    article.excerpt ?? "",
    extractVisibleText(body),
  ].join(" ");

  const placeholders = visibleText.match(PLACEHOLDER_MARKER);
  if (placeholders !== null) {
    const unique = Array.from(new Set(placeholders));
    issues.push({
      code: "UNRESOLVED_PLACEHOLDER",
      message: `Tekst sadrži nedovršene oznake koje mora ukloniti čovek: ${unique.join(", ")}.`,
      path: "body",
    });
  }

  // ——— Zabranjeni izrazi (docs/04 §14.6, §14.7 stavka 5) ———
  const banned = findBannedTerms(visibleText);
  if (banned.length > 0) {
    issues.push({
      code: "BANNED_TERM",
      message: `Tekst sadrži izraze koji se ne prikazuju korisniku: ${banned.join(", ")}.`,
      path: "body",
    });
  }

  if (hasDeadlinePromise(visibleText)) {
    issues.push({
      code: "DEADLINE_PROMISE",
      message:
        "Tekst obećava rezultat u roku. Rokovi se ne navode ni u jednom obliku.",
      path: "body",
    });
  }

  // ——— Razumljivost (odluka C) ———
  const checks = article.clarityChecks ?? {};
  for (const definition of CLARITY_CHECKS) {
    const status = checks[definition.id] ?? "unchecked";
    const blocking = isClarityCheckBlocking(definition, contentFormat);

    if (status === "ok") continue;

    const detail = `${definition.id} — ${definition.label} (status: ${status}).`;

    if (blocking) {
      issues.push({
        code: "CLARITY_BLOCKING_CHECK",
        message: `Blokirajuća provera razumljivosti nije potvrđena: ${detail}`,
        path: `clarityChecks.${definition.id}`,
      });
    } else {
      warnings.push({
        code: "CLARITY_BLOCKING_CHECK",
        message: `Provera razumljivosti nije potvrđena, ali ne blokira objavu: ${detail}`,
        path: `clarityChecks.${definition.id}`,
      });
    }
  }

  // Pillar sadržaj traži i test sa ljudima (docs/04 §14.7 stavka 7).
  if (contentFormat === "pillar" && article.clarityTestDone !== true) {
    issues.push({
      code: "CLARITY_TEST_MISSING",
      message:
        "Pillar stranica ne može se objaviti bez sprovedenog testa razumevanja sa ljudima.",
      path: "clarityTestDone",
    });
  }

  return { ok: issues.length === 0, issues, warnings };
}
