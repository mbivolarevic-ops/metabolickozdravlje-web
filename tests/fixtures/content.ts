import type {
  ArticleInput,
  ClarityChecksInput,
} from "../../sanity/validation/types";

/**
 * Fixture podaci za testove validacije.
 *
 * NAMERNO NEUTRALNI I NEMEDICINSKI. Ovde se ne pišu medicinske tvrdnje ni
 * bilo šta što liči na sadržaj platforme — test podaci ne smeju izgledati kao
 * stvarni edukativni tekst. Koriste se bezlične formulacije („Tema A").
 */

/** Svih 11 provera potvrđeno — koristi se za validan fixture. */
export function allClarityChecksOk(): ClarityChecksInput {
  return {
    C1: "ok",
    C2: "ok",
    C3: "ok",
    C4: "ok",
    C5: "ok",
    C6: "ok",
    C7: "ok",
    C8: "ok",
    C9: "ok",
    C10: "ok",
    C11: "ok",
  };
}

/** SEO naslov dužine tačno 55 znakova (opseg 50–60). */
const VALID_SEO_TITLE =
  "Tema A — kratak opis primera za proveru validacije.....";

/** SEO opis dužine tačno 148 znakova (opseg 140–155). */
const VALID_SEO_DESCRIPTION =
  "Ovo je neutralan opis primera koji postoji samo radi provere validacije, bez ijedne stvarne tvrdnje, i dovoljno je dug da uđe u traženi opseg..";

/**
 * Potpuno validan članak. Svaki test za blokirajuće pravilo kreće od njega i
 * uklanja tačno jednu stvar, pa je jasno šta je izazvalo grešku.
 */
export function validArticle(): ArticleInput {
  return {
    title: "Tema A",
    slug: "tema-a",
    excerpt: "Ovo je neutralan uvodni sažetak primera.",
    contentFormat: "article",
    editorialTier: "standard",
    body: [
      {
        _type: "block",
        children: [
          { text: "Prvi pasus primera bez ikakvog stvarnog sadržaja." },
        ],
      },
      {
        _type: "imageWithCaption",
        alt: "Neutralan opis slike u primeru.",
        children: [],
      },
    ],
    cluster: { _ref: "cluster-1" },
    author: { _ref: "author-1" },
    reviewedBy: { _ref: "reviewer-1" },
    reviewDate: "2026-08-05",
    nextReviewDate: "2028-02-05",
    references: [
      {
        label: "Primer izvora",
        url: "https://example.org/primer",
        publisher: "Primer izdavača",
        year: 2026,
      },
    ],
    seo: {
      metaTitle: VALID_SEO_TITLE,
      metaDescription: VALID_SEO_DESCRIPTION,
    },
    clarityChecks: allClarityChecksOk(),
    clarityTestDone: true,
  };
}

/** Validan članak sa izmenjenim poljima. */
export function articleWith(overrides: Partial<ArticleInput>): ArticleInput {
  return { ...validArticle(), ...overrides };
}

/** Validan članak kome je jedno polje uklonjeno. */
export function articleWithout(field: keyof ArticleInput): ArticleInput {
  const article = validArticle();
  delete article[field];
  return article;
}

/** Telo teksta sa jednim pasusom zadatog teksta. */
export function bodyWithText(text: string): ArticleInput["body"] {
  return [{ _type: "block", children: [{ text }] }];
}
