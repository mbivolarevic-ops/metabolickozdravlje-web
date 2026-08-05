import { describe, expect, it } from "vitest";
import { isDisplayableArticle } from "@/sanity/guards";
import {
  allClustersQuery,
  clusterBySlugQuery,
} from "@/sanity/queries/clusters";
import {
  articleBySlugQuery,
  articlesByClusterQuery,
  publishableArticleSlugsQuery,
} from "@/sanity/queries/articles";

/**
 * Offline testovi zaštite prikaza i ugovora upita.
 *
 * Fixture podaci su OČIGLEDNO SINTETIČKI — bez stvarnih imena, bez medicinskih
 * tvrdnji i bez ičega što liči na sadržaj platforme.
 */

type Overrides = Record<string, unknown>;

function validArticle(overrides: Overrides = {}): Record<string, unknown> {
  return {
    _id: "test-clanak-1",
    title: "Tema A — testni zapis",
    slug: "tema-a-testni-zapis",
    excerpt: "Neutralan sažetak koji postoji samo radi provere.",
    contentFormat: "article",
    editorialTier: "standard",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Prvi pasus testnog zapisa." }],
      },
    ],
    reviewDate: "2026-08-05",
    nextReviewDate: "2028-02-05",
    cluster: { title: "Tema A", slug: "tema-a" },
    author: {
      name: "QA TEST AUTOR",
      credentials: "TEST PODATAK",
      slug: "qa-test-autor",
    },
    reviewer: {
      name: "QA TEST RECENZENT",
      credentials: "TEST PODATAK",
      specialty: null,
      institutionNote: null,
    },
    references: [{ label: "Testni izvor", url: "https://example.org/test" }],
    seo: null,
    ...overrides,
  };
}

describe("isDisplayableArticle — dozvoljava", () => {
  it("1 — potpuno validan članak prolazi", () => {
    expect(isDisplayableArticle(validArticle())).toBe(true);
  });

  it("dozvoljava opciona polja da budu prazna", () => {
    const article = validArticle({
      nextReviewDate: null,
      seo: null,
      author: { name: "QA TEST", credentials: "TEST", slug: null },
    });
    expect(isDisplayableArticle(article)).toBe(true);
  });
});

describe("isDisplayableArticle — blokira", () => {
  it("2 — nedostaje autor", () => {
    expect(isDisplayableArticle(validArticle({ author: null }))).toBe(false);
  });

  it("2b — autor bez kvalifikacije", () => {
    const article = validArticle({
      author: { name: "QA TEST", credentials: "", slug: null },
    });
    expect(isDisplayableArticle(article)).toBe(false);
  });

  it("3 — nedostaje stručni recenzent", () => {
    expect(isDisplayableArticle(validArticle({ reviewer: null }))).toBe(false);
  });

  it("3b — recenzent bez kvalifikacije", () => {
    const article = validArticle({
      reviewer: {
        name: "QA TEST",
        credentials: null,
        specialty: null,
        institutionNote: null,
      },
    });
    expect(isDisplayableArticle(article)).toBe(false);
  });

  it("4 — nedostaje datum stručne provere", () => {
    expect(isDisplayableArticle(validArticle({ reviewDate: null }))).toBe(
      false,
    );
  });

  it.each(["05.08.2026.", "2026-8-5", "2026-02-31", "juče", ""])(
    "4b — neispravan datum „%s“ blokira",
    (reviewDate) => {
      expect(isDisplayableArticle(validArticle({ reviewDate }))).toBe(false);
    },
  );

  it("5 — prazna lista izvora", () => {
    expect(isDisplayableArticle(validArticle({ references: [] }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ references: null }))).toBe(
      false,
    );
  });

  it("6 — nepotpun izvor (bez veze ili bez naziva)", () => {
    expect(
      isDisplayableArticle(
        validArticle({ references: [{ label: "Samo naziv" }] }),
      ),
    ).toBe(false);
    expect(
      isDisplayableArticle(
        validArticle({ references: [{ url: "https://example.org/a" }] }),
      ),
    ).toBe(false);
    expect(isDisplayableArticle(validArticle({ references: [{}] }))).toBe(
      false,
    );
  });

  it("6b — jedan kompletan i jedan nepotpun izvor takođe blokira", () => {
    const article = validArticle({
      references: [
        { label: "Testni izvor", url: "https://example.org/test" },
        { label: "Nepotpun" },
      ],
    });
    expect(isDisplayableArticle(article)).toBe(false);
  });

  it("7 — prazno ili neupotrebljivo telo", () => {
    expect(isDisplayableArticle(validArticle({ body: [] }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ body: null }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ body: [{}] }))).toBe(false);
    expect(
      isDisplayableArticle(
        validArticle({ body: [{ _type: "block", children: [] }] }),
      ),
    ).toBe(false);
    expect(
      isDisplayableArticle(
        validArticle({
          body: [{ _type: "block", children: [{ text: "   " }] }],
        }),
      ),
    ).toBe(false);
  });

  it("nedostaju naslov, slug, sažetak ili tema", () => {
    expect(isDisplayableArticle(validArticle({ title: null }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ slug: "" }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ excerpt: null }))).toBe(false);
    expect(isDisplayableArticle(validArticle({ cluster: null }))).toBe(false);
    expect(
      isDisplayableArticle(validArticle({ cluster: { title: "Tema A" } })),
    ).toBe(false);
  });
});

describe("isDisplayableArticle — neispravan ulaz", () => {
  it.each([null, undefined, 0, "", "tekst", [], true, NaN])(
    "8 — vrednost %p bezbedno vraća false bez izuzetka",
    (value) => {
      expect(() => isDisplayableArticle(value)).not.toThrow();
      expect(isDisplayableArticle(value)).toBe(false);
    },
  );

  it("8b — duboko neispravan oblik ne ruši proveru", () => {
    const article = validArticle({
      body: "nije niz",
      references: "nije niz",
      author: "nije objekat",
    });
    expect(() => isDisplayableArticle(article)).not.toThrow();
    expect(isDisplayableArticle(article)).toBe(false);
  });
});

describe("Ugovor GROQ upita (bez mreže)", () => {
  const publishableFilters = [
    '!(_id in path("drafts.**"))',
    "defined(author)",
    "defined(reviewedBy)",
    "defined(reviewDate)",
    "count(references) > 0",
  ];

  it.each(publishableFilters)(
    "upit za jedan članak nosi uslov: %s",
    (filter) => {
      expect(articleBySlugQuery).toContain(filter);
    },
  );

  it.each(publishableFilters)("upit za listu članaka nosi uslov: %s", (f) => {
    expect(articlesByClusterQuery).toContain(f);
  });

  it.each(publishableFilters)("upit za slug-ove nosi uslov: %s", (f) => {
    expect(publishableArticleSlugsQuery).toContain(f);
  });

  it("upit za članak povlači atribuciju i izvore", () => {
    for (const projection of [
      "author->",
      "reviewedBy->",
      "reviewDate",
      "references[]",
      "cluster->",
    ]) {
      expect(articleBySlugQuery).toContain(projection);
    }
  });

  it("upit traži i slug članka i slug teme", () => {
    expect(articleBySlugQuery).toContain("slug.current == $slug");
    expect(articleBySlugQuery).toContain("cluster->slug.current == $cluster");
  });

  it("upiti za teme isključuju draftove", () => {
    expect(allClustersQuery).toContain('!(_id in path("drafts.**"))');
    expect(clusterBySlugQuery).toContain('!(_id in path("drafts.**"))');
  });

  it("nijedan upit ne sadrži mutaciju", () => {
    for (const query of [
      allClustersQuery,
      clusterBySlugQuery,
      articleBySlugQuery,
      articlesByClusterQuery,
      publishableArticleSlugsQuery,
    ]) {
      expect(query).not.toMatch(/create|patch|delete|mutate|drop/i);
    }
  });
});
