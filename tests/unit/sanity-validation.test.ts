import { describe, expect, it } from "vitest";
import { validateArticleForPublish } from "../../sanity/validation/publishGuards";
import { toArticleInput } from "../../sanity/validation/adapters";
import {
  CLARITY_CHECKS,
  isClarityCheckBlocking,
} from "../../sanity/validation/clarityChecks";
import {
  ALLOWED_CONTENT_BLOCK_TYPES,
  FORBIDDEN_CONTENT_BLOCK_TYPES,
} from "../../sanity/schemas/blockTypes";
import type {
  EditorialTier,
  ValidationRuleCode,
} from "../../sanity/validation/types";
import {
  allClarityChecksOk,
  articleWith,
  articleWithout,
  bodyWithText,
  validArticle,
} from "../fixtures/content";

/** Da li rezultat sadrži nalaz sa datom šifrom. */
function hasCode(
  result: ReturnType<typeof validateArticleForPublish>,
  code: ValidationRuleCode,
): boolean {
  return result.issues.some((issue) => issue.code === code);
}

const ALL_TIERS: EditorialTier[] = ["standard", "elevated", "sensitive"];

describe("Validacija članka pred objavu", () => {
  it("11 — potpuno validan neutralni članak prolazi", () => {
    const result = validateArticleForPublish(validArticle());
    expect(result.issues).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it("1 — standardni članak bez recenzenta je blokiran (odluka A)", () => {
    const result = validateArticleForPublish(
      articleWith({ editorialTier: "standard", reviewedBy: undefined }),
    );
    expect(hasCode(result, "MISSING_REVIEWER")).toBe(true);
    expect(result.ok).toBe(false);
  });

  it("2 — članak bez autora je blokiran", () => {
    const result = validateArticleForPublish(articleWithout("author"));
    expect(hasCode(result, "MISSING_AUTHOR")).toBe(true);
  });

  it("3 — članak bez datuma stručne provere je blokiran", () => {
    const result = validateArticleForPublish(articleWithout("reviewDate"));
    expect(hasCode(result, "MISSING_REVIEW_DATE")).toBe(true);
  });

  it("4 — članak bez ijednog izvora je blokiran (odluka B)", () => {
    const result = validateArticleForPublish(articleWith({ references: [] }));
    expect(hasCode(result, "MISSING_REFERENCES")).toBe(true);
  });

  it("5 — osetljiv članak bez pravnog pregleda je blokiran", () => {
    const result = validateArticleForPublish(
      articleWith({ editorialTier: "sensitive", legalReviewed: false }),
    );
    expect(hasCode(result, "MISSING_LEGAL_REVIEW")).toBe(true);
  });

  it("5b — osetljiv članak sa potvrđenim pravnim pregledom prolazi", () => {
    const result = validateArticleForPublish(
      articleWith({ editorialTier: "sensitive", legalReviewed: true }),
    );
    expect(result.ok).toBe(true);
  });

  it("6 — oznaka [PROVERITI IZVOR] blokira objavu", () => {
    const result = validateArticleForPublish(
      articleWith({
        body: bodyWithText("Rečenica sa [PROVERITI IZVOR] u tekstu."),
      }),
    );
    expect(hasCode(result, "UNRESOLVED_PLACEHOLDER")).toBe(true);
  });

  it("7 — oznaka [BROJ NEPOTVRĐEN] blokira objavu", () => {
    const result = validateArticleForPublish(
      articleWith({ body: bodyWithText("Vrednost [BROJ NEPOTVRĐEN] ovde.") }),
    );
    expect(hasCode(result, "UNRESOLVED_PLACEHOLDER")).toBe(true);
  });

  it("7b — svaka druga uglasta oznaka takođe blokira", () => {
    const result = validateArticleForPublish(
      articleWith({ body: bodyWithText("Ostatak šablona [PRAVNI PREGLED].") }),
    );
    expect(hasCode(result, "UNRESOLVED_PLACEHOLDER")).toBe(true);
  });

  it("8 — zabranjen izraz blokira objavu", () => {
    const result = validateArticleForPublish(
      articleWith({ body: bodyWithText("Ovo je neverovatno otkriće.") }),
    );
    expect(hasCode(result, "BANNED_TERM")).toBe(true);
  });

  it("8b — obećanje roka blokira objavu", () => {
    const result = validateArticleForPublish(
      articleWith({ body: bodyWithText("Rezultat stiže za 30 dana.") }),
    );
    expect(hasCode(result, "DEADLINE_PROMISE")).toBe(true);
  });

  it("9 — slika bez alt opisa blokira objavu", () => {
    const result = validateArticleForPublish(
      articleWith({
        body: [{ _type: "imageWithCaption", children: [] }],
      }),
    );
    expect(hasCode(result, "IMAGE_MISSING_ALT")).toBe(true);
  });

  it("10 — pillar bez sprovedenog testa razumevanja je blokiran", () => {
    const result = validateArticleForPublish(
      articleWith({ contentFormat: "pillar", clarityTestDone: false }),
    );
    expect(hasCode(result, "CLARITY_TEST_MISSING")).toBe(true);
  });

  it("naslov, slug, sažetak i telo su obavezni", () => {
    const result = validateArticleForPublish({});
    expect(hasCode(result, "MISSING_TITLE")).toBe(true);
    expect(hasCode(result, "MISSING_SLUG")).toBe(true);
    expect(hasCode(result, "MISSING_EXCERPT")).toBe(true);
    expect(hasCode(result, "MISSING_BODY")).toBe(true);
  });

  it("SEO polja su obavezna i moraju biti u propisanom opsegu", () => {
    const bezSeo = validateArticleForPublish(articleWithout("seo"));
    expect(hasCode(bezSeo, "MISSING_SEO_TITLE")).toBe(true);
    expect(hasCode(bezSeo, "MISSING_SEO_DESCRIPTION")).toBe(true);

    const prekratko = validateArticleForPublish(
      articleWith({
        seo: { metaTitle: "Prekratko", metaDescription: "Kratko" },
      }),
    );
    expect(hasCode(prekratko, "SEO_TITLE_LENGTH")).toBe(true);
    expect(hasCode(prekratko, "SEO_DESCRIPTION_LENGTH")).toBe(true);
  });

  it("svaki nalaz ima šifru i poruku na srpskom", () => {
    const result = validateArticleForPublish({});
    expect(result.issues.length).toBeGreaterThan(0);
    for (const issue of result.issues) {
      expect(issue.code).toBeTruthy();
      expect(issue.message.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("Ista kapija važi za sve nivoe kontrole", () => {
  for (const tier of ALL_TIERS) {
    it(`nivo „${tier}" traži autora, recenzenta, datum provere i izvor`, () => {
      const result = validateArticleForPublish(
        articleWith({
          editorialTier: tier,
          legalReviewed: true,
          author: undefined,
          reviewedBy: undefined,
          reviewDate: undefined,
          references: [],
        }),
      );

      expect(hasCode(result, "MISSING_AUTHOR")).toBe(true);
      expect(hasCode(result, "MISSING_REVIEWER")).toBe(true);
      expect(hasCode(result, "MISSING_REVIEW_DATE")).toBe(true);
      expect(hasCode(result, "MISSING_REFERENCES")).toBe(true);
      expect(result.ok).toBe(false);
    });
  }
});

describe("Provere razumljivosti (odluka C)", () => {
  it("evidentira se svih 11 provera", () => {
    expect(CLARITY_CHECKS).toHaveLength(11);
    expect(CLARITY_CHECKS.map((check) => check.id)).toEqual([
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "C10",
      "C11",
    ]);
  });

  it("blokiraju samo provere označene kao blokirajuće u dokumentaciji", () => {
    const blokirajuceZaClanak = CLARITY_CHECKS.filter((check) =>
      isClarityCheckBlocking(check, "article"),
    ).map((check) => check.id);

    expect(blokirajuceZaClanak).toEqual([
      "C1",
      "C2",
      "C3",
      "C4",
      "C7",
      "C8",
      "C10",
    ]);
  });

  it("C9 blokira pillar, ali ne i običan članak", () => {
    const c9 = CLARITY_CHECKS.find((check) => check.id === "C9");
    expect(c9).toBeDefined();
    expect(isClarityCheckBlocking(c9!, "pillar")).toBe(true);
    expect(isClarityCheckBlocking(c9!, "article")).toBe(false);
  });

  it("nepotvrđena blokirajuća provera zaustavlja objavu", () => {
    const result = validateArticleForPublish(
      articleWith({
        clarityChecks: { ...allClarityChecksOk(), C1: "unchecked" },
      }),
    );
    expect(hasCode(result, "CLARITY_BLOCKING_CHECK")).toBe(true);
  });

  it("nepotvrđena neblokirajuća provera je samo upozorenje", () => {
    const result = validateArticleForPublish(
      articleWith({
        clarityChecks: { ...allClarityChecksOk(), C5: "warning" },
      }),
    );
    expect(result.ok).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe("Zabranjeni sadržajni blokovi", () => {
  it("12 — model nema blokove za cenu, svedočenje ni before/after", () => {
    for (const forbidden of FORBIDDEN_CONTENT_BLOCK_TYPES) {
      expect(ALLOWED_CONTENT_BLOCK_TYPES).not.toContain(forbidden);
    }
  });

  it("dozvoljena lista blokova je zatvorena i minimalna", () => {
    expect(ALLOWED_CONTENT_BLOCK_TYPES).toEqual(["block", "imageWithCaption"]);
  });
});

describe("Adapter za Sanity dokument", () => {
  it("čita slug objekat i clarity statuse bez upotrebe any", () => {
    const input = toArticleInput({
      title: "Tema A",
      slug: { current: "tema-a" },
      clarityChecks: { C1: "ok", C2: "nepostojeci-status" },
      references: [{ label: "Primer", url: "https://example.org" }],
    });

    expect(input.slug).toBe("tema-a");
    expect(input.clarityChecks?.C1).toBe("ok");
    expect(input.clarityChecks?.C2).toBeUndefined();
    expect(input.references).toHaveLength(1);
  });

  it("nepoznat ulaz ne ruši validaciju", () => {
    expect(() => validateArticleForPublish(toArticleInput(null))).not.toThrow();
    expect(validateArticleForPublish(toArticleInput(undefined)).ok).toBe(false);
  });
});
