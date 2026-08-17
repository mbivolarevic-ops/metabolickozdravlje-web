import type { Metadata } from "next";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Metapodaci po ruti, kanonske adrese i trajni `noindex`.
 *
 * Kanonska adresa je obećanje koja je adresa prava; `noindex` je obećanje da
 * to obećanje niko još ne sluša. Oba se ovde brane.
 */

const getTopics = vi.fn();
const getTopic = vi.fn();
const getTopicArticleSummaries = vi.fn();
const getHomepageArticles = vi.fn();
const getArticle = vi.fn();
const loadTopicSlugs = vi.fn();
const loadArticleSlugs = vi.fn();

vi.mock("@/sanity/content", () => ({
  getTopics: () => getTopics(),
  getTopic: (slug: string) => getTopic(slug),
  getTopicArticleSummaries: (slug: string) => getTopicArticleSummaries(slug),
  getHomepageArticles: () => getHomepageArticles(),
  getArticle: (slug: string) => getArticle(slug),
  loadTopicSlugs: () => loadTopicSlugs(),
  loadArticleSlugs: () => loadArticleSlugs(),
  // Povezani tekstovi se testiraju u `related-articles.test.tsx`; ovde su
  // prazni, pa se blok ne renderuje i ne meša u provere metapodataka.
  getRelatedArticles: () => Promise.resolve([]),
}));

vi.mock("@/sanity/env", () => ({
  readSanityConfig: () => ({
    projectId: "testprojekat1",
    dataset: "staging",
    apiVersion: "2026-08-05",
  }),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter-mock", className: "" }),
  Source_Serif_4: () => ({ variable: "font-serif-mock", className: "" }),
}));

const NOT_FOUND = "NEXT_NOT_FOUND";
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error(NOT_FOUND);
  },
}));

import { metadata as rootMetadata } from "@/app/layout";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as topicsMetadata } from "@/app/teme/page";
import { generateMetadata as topicMetadata } from "@/app/teme/[cluster]/page";
import ArticlePage, {
  generateMetadata as articleMetadata,
} from "@/app/tekstovi/[slug]/page";
import TopicPage from "@/app/teme/[cluster]/page";

const TOPIC = {
  _id: "topic-1",
  title: "Test tema",
  slug: "test-tema",
  intro: "Ovo je sintetički opis za test.",
  order: 1,
};

const ARTICLE = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
  author: {
    name: "Test Autor",
    credentials: "Sintetička kvalifikacija",
    slug: null,
  },
  reviewer: {
    name: "Test Recenzent",
    credentials: "Sintetička licenca",
    specialty: null,
    institutionNote: null,
  },
  references: [
    { label: "Izvor", url: "https://primer.rs/", publisher: null, year: null },
  ],
  featuredImage: null,
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s1", text: "Telo.", marks: [] }],
    },
  ],
};

function params<T extends Record<string, string>>(value: T) {
  return { params: Promise.resolve(value) };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("Root metadata", () => {
  it("postavlja metadataBase na kanonski domen", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(
      "https://metabolickozdravlje.rs/",
    );
  });

  it("ima podrazumevani naslov i šablon za unutrašnje stranice", () => {
    const title = rootMetadata.title as { default: string; template: string };
    expect(title.default).toBe(
      "Metaboličko zdravlje, objašnjeno jasno i bez osude",
    );
    expect(title.template).toBe("%s · metabolickozdravlje.rs");
  });

  it("ima naziv aplikacije i opis", () => {
    expect(rootMetadata.applicationName).toBe("metabolickozdravlje.rs");
    expect(rootMetadata.description).toContain("Pouzdane informacije");
  });

  /*
   * ⛔ Root metadata se NASLEĐUJE na svaku stranicu, uključujući 404.
   * Kanonska adresa ovde značila bi da svaka nepostojeća adresa tvrdi da je
   * zapravo početna stranica. Postavlja je svaka stvarna stranica za sebe.
   */
  it("NE nosi kanonsku adresu ni og:url — to bi nasledila i 404", () => {
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
    expect(
      (rootMetadata.openGraph as Record<string, unknown> | undefined)?.url,
    ).toBeUndefined();
  });

  it("uklanjanje canonical nije uklonilo osnovu", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(
      "https://metabolickozdravlje.rs/",
    );

    const og = rootMetadata.openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
    expect(og.siteName).toBe("metabolickozdravlje.rs");
    expect(og.locale).toBe("sr_RS");
    expect(og.title).toBe("Metaboličko zdravlje, objašnjeno jasno i bez osude");

    const tw = rootMetadata.twitter as Record<string, unknown>;
    expect(tw.card).toBe("summary_large_image");

    expect(rootMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  /*
   * ⛔ Brava. Dodavanje metapodataka NIJE dozvola za indeksiranje; ako ovaj
   * test padne, neko je otvorio sajt pretraživačima bez odluke vlasnika.
   */
  it("globalni noindex ostaje aktivan", () => {
    expect(rootMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("ne tvrdi autora, izdavača ni organizaciju", () => {
    expect(rootMetadata.authors).toBeUndefined();
    expect(rootMetadata.publisher).toBeUndefined();
    expect(rootMetadata.creator).toBeUndefined();
  });
});

describe("Metadata početne", () => {
  it("ima kanonsku adresu i odobreni naslov", () => {
    expect(homeMetadata.title).toBe(
      "Metaboličko zdravlje, objašnjeno jasno i bez osude",
    );
    expect(homeMetadata.alternates?.canonical).toBe(
      "https://metabolickozdravlje.rs/",
    );
  });

  it("sama nosi og:url, koji više ne dolazi iz layout-a", () => {
    expect((homeMetadata.openGraph as Record<string, unknown>).url).toBe(
      "https://metabolickozdravlje.rs/",
    );
  });
});

/**
 * Nasleđivanje metapodataka na 404.
 *
 * Globalna `not-found.tsx` ne može da izveze `generateMetadata` — Next za nju
 * koristi isključivo ono što je nasleđeno iz root layout-a. Zato je jedini
 * način da 404 nema kanonsku adresu taj da je root nema.
 *
 * Ovo je simulacija tog spajanja; stvarni HTML je proveren u QA-u.
 */
describe("Globalna 404 i nasleđeni metapodaci", () => {
  /** Ono što 404 stranica stvarno dobije: samo root, bez ičega svog. */
  const nasledjeno = { ...rootMetadata };

  it("404 ne dobija kanonsku adresu početne", () => {
    expect(nasledjeno.alternates?.canonical).toBeUndefined();
  });

  it("404 ne dobija ni og:url početne", () => {
    expect(
      (nasledjeno.openGraph as Record<string, unknown> | undefined)?.url,
    ).toBeUndefined();
  });

  it("404 i dalje nasleđuje noindex", () => {
    expect(nasledjeno.robots).toMatchObject({ index: false, follow: false });
  });

  /*
   * Ranije je ovaj test tražio da 404 UOPŠTE nema `metadata` izvoz. To je bio
   * posredan način da se proveri ono što zaista treba braniti — odsustvo
   * kanonske adrese. Sada stranica ima naslov, pa se proverava sama namera:
   * naslov sme, canonical i `og:url` ne smeju.
   */
  it("stranica 404 ima sopstveni naslov, ali ne i kanonsku adresu", async () => {
    const modul: Record<string, unknown> = await import("@/app/not-found");
    const notFoundMetadata = modul.metadata as Metadata | undefined;

    expect(notFoundMetadata?.title).toBe("Stranica nije pronađena");
    expect(notFoundMetadata?.alternates).toBeUndefined();
    expect(notFoundMetadata?.openGraph).toBeUndefined();
    expect(modul.generateMetadata).toBeUndefined();
  });

  it("naslov 404 stranice ne poništava globalni noindex", async () => {
    const modul: Record<string, unknown> = await import("@/app/not-found");
    const notFoundMetadata = modul.metadata as Metadata | undefined;

    // Robots ostaje nasleđen iz root layout-a; 404 ga ne dira.
    expect(notFoundMetadata?.robots).toBeUndefined();
    expect(nasledjeno.robots).toMatchObject({ index: false, follow: false });
  });
});

describe("Metadata /teme", () => {
  it("ima jedinstven naslov, opis i kanonsku adresu", () => {
    expect(topicsMetadata.title).toBe("Teme");
    expect(topicsMetadata.description).toContain("Pregled tema");
    expect(topicsMetadata.alternates?.canonical).toBe(
      "https://metabolickozdravlje.rs/teme",
    );
  });

  it("ne poništava globalni noindex", () => {
    expect(topicsMetadata.robots).toBeUndefined();
  });
});

describe("Metadata teme", () => {
  it("izvodi naslov, opis i canonical iz validne teme", async () => {
    getTopic.mockResolvedValue(TOPIC);

    const meta = await topicMetadata(params({ cluster: "test-tema" }));
    expect(meta.title).toBe("Test tema");
    expect(meta.description).toBe("Ovo je sintetički opis za test.");
    expect(meta.alternates?.canonical).toBe(
      "https://metabolickozdravlje.rs/teme/test-tema",
    );
  });

  it("enkodira slug u kanonskoj adresi", async () => {
    getTopic.mockResolvedValue({ ...TOPIC, slug: "zlo?a=1" });

    const meta = await topicMetadata(params({ cluster: "zlo?a=1" }));
    expect(meta.alternates?.canonical).toBe(
      "https://metabolickozdravlje.rs/teme/zlo%3Fa%3D1",
    );
  });

  /*
   * Prazan objekat znači da tema nema svoju kanonsku adresu — a pošto je ni
   * root više ne nosi, nevalidna tema ne emituje nikakav obmanjujući canonical.
   */
  it("nevalidna tema ne dobija ni naslov ni canonical", async () => {
    getTopic.mockResolvedValue(null);

    const meta = await topicMetadata(params({ cluster: "nema-je" }));
    expect(meta).toEqual({});
    expect({ ...rootMetadata, ...meta }.alternates?.canonical).toBeUndefined();
  });

  /*
   * Metadata ne sme ni da izazove 404 ni da ga spreči — o tome odlučuje
   * stranica, i to istim, keširanim pozivom.
   */
  it("nevalidna tema i dalje daje 404 na stranici", async () => {
    getTopic.mockResolvedValue(null);
    getTopicArticleSummaries.mockResolvedValue([]);

    await expect(TopicPage(params({ cluster: "nema-je" }))).rejects.toThrow(
      NOT_FOUND,
    );
  });

  it("greška iz CMS-a se propagira, ne postaje lažan 404", async () => {
    getTopic.mockRejectedValue(new Error("upit pogrešnog oblika"));

    await expect(topicMetadata(params({ cluster: "x" }))).rejects.toThrow(
      "upit pogrešnog oblika",
    );
  });
});

describe("Metadata članka", () => {
  it("izvodi naslov, opis, canonical i og:type iz prikazivog članka", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const meta = await articleMetadata(params({ slug: "test-clanak" }));
    expect(meta.title).toBe("Test članak");
    expect(meta.description).toBe("Ovo je sintetički opis za test.");
    expect(meta.alternates?.canonical).toBe(
      "https://metabolickozdravlje.rs/tekstovi/test-clanak",
    );

    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe("article");
    expect(og.url).toBe("https://metabolickozdravlje.rs/tekstovi/test-clanak");
  });

  it("neprikaziv članak ne dobija metapodatke", async () => {
    getArticle.mockResolvedValue(null);
    const meta = await articleMetadata(params({ slug: "x" }));

    expect(meta).toEqual({});
    expect({ ...rootMetadata, ...meta }.alternates?.canonical).toBeUndefined();
  });

  it("bez naslovne slike ne izmišlja OG sliku", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const og = (await articleMetadata(params({ slug: "test-clanak" })))
      .openGraph as Record<string, unknown>;
    expect(og.images).toBeUndefined();
  });

  it("malformirana naslovna slika ne daje OG sliku", async () => {
    getArticle.mockResolvedValue({
      ...ARTICLE,
      featuredImage: { alt: "Bez asseta" },
    });

    const og = (await articleMetadata(params({ slug: "test-clanak" })))
      .openGraph as Record<string, unknown>;
    expect(og.images).toBeUndefined();
  });

  it("validna naslovna slika daje OG sliku samo sa Sanity CDN-a", async () => {
    getArticle.mockResolvedValue({
      ...ARTICLE,
      featuredImage: {
        alt: "Sintetički opis",
        asset: { _id: "image-abc-1600x900-jpg" },
      },
    });

    const og = (await articleMetadata(params({ slug: "test-clanak" })))
      .openGraph as { images?: Array<{ url: string }> };
    expect(
      og.images?.[0]?.url.startsWith("https://cdn.sanity.io/images/"),
    ).toBe(true);
  });

  it("neprikaziv članak i dalje daje 404, a metadata ga ne omekšava", async () => {
    getArticle.mockResolvedValue(null);

    await expect(ArticlePage(params({ slug: "x" }))).rejects.toThrow(NOT_FOUND);
    expect(await articleMetadata(params({ slug: "x" }))).toEqual({});
  });
});

describe("Strukturirani podaci na stranicama", () => {
  function jsonLdNodes(container: HTMLElement): Array<Record<string, unknown>> {
    return Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map(
      (el) => JSON.parse(el.textContent ?? "{}") as Record<string, unknown>,
    );
  }

  it("stranica članka emituje MedicalWebPage i BreadcrumbList", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(
      await ArticlePage(params({ slug: "test-clanak" })),
    );

    const nodes = jsonLdNodes(container);
    const types = nodes.map((n) => n["@type"]);
    expect(types).toContain("MedicalWebPage");
    expect(types).toContain("BreadcrumbList");

    const page = nodes.find((n) => n["@type"] === "MedicalWebPage");
    expect(page?.author).toEqual({ "@type": "Person", name: "Test Autor" });
    expect(page?.reviewedBy).toEqual({
      "@type": "Person",
      name: "Test Recenzent",
    });
    expect(page?.lastReviewed).toBe("2026-08-05");
    expect(page?.datePublished).toBeUndefined();
  });

  it("JSON-LD članka je validan JSON i ne sadrži sirov `<`", async () => {
    getArticle.mockResolvedValue({
      ...ARTICLE,
      title: "Naslov </script><script>alert(1)</script>",
    });
    const { container } = render(
      await ArticlePage(params({ slug: "test-clanak" })),
    );

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThan(0);

    for (const script of scripts) {
      const raw = script.textContent ?? "";
      expect(raw).not.toContain("<");
      expect(() => JSON.parse(raw)).not.toThrow();
    }
  });

  it("stranica teme emituje BreadcrumbList sa tri koraka", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([]);
    const { container } = render(
      await TopicPage(params({ cluster: "test-tema" })),
    );

    const crumb = jsonLdNodes(container).find(
      (n) => n["@type"] === "BreadcrumbList",
    );
    const items = crumb?.itemListElement as Array<Record<string, unknown>>;
    expect(items.map((i) => i.name)).toEqual(["Početna", "Teme", "Test tema"]);
  });

  it("neprikaziv članak nema nijedan JSON-LD", async () => {
    getArticle.mockResolvedValue(null);

    await expect(ArticlePage(params({ slug: "x" }))).rejects.toThrow(NOT_FOUND);
    expect(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).toHaveLength(0);
  });
});

describe("Očuvanje medicinskih kapija i prikaza", () => {
  it("stranica članka i dalje prikazuje potpis recenzenta i napomenu", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(
      await ArticlePage(params({ slug: "test-clanak" })),
    );

    expect(screen.getByText("Test Recenzent")).toBeVisible();
    expect(container).toHaveTextContent("Stručno proverio");
    expect(container).toHaveTextContent(
      "Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.",
    );
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});
