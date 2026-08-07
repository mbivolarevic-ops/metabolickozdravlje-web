import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  loadArticle,
  loadArticleSlugs,
  loadHomepageArticles,
  loadTopic,
  loadTopicArticleSummaries,
  loadTopicSlugs,
  loadTopics,
  type SanityFetcher,
} from "@/sanity/content";
import {
  isValidArticleSummary,
  isValidHomepageArticle,
  isValidTopic,
} from "@/sanity/contentGuards";

/**
 * Offline testovi konfiguracije i content loadera.
 *
 * Bez mreže: fetcher se uvek prosleđuje kao mock, osim u testovima koji
 * namerno proveravaju stanje „Sanity nije podešen“.
 *
 * Podaci su sintetički: „Test tema“, „test-tema“, „Test članak“.
 */

const VALID_TOPIC = {
  _id: "topic-1",
  title: "Test tema",
  slug: "test-tema",
  intro: "Ovo je sintetički opis za test.",
  order: 1,
};

const VALID_SUMMARY = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
};

/** Mock koji vraća zadatu vrednost i beleži pozive. */
function fetcherReturning(value: unknown): SanityFetcher & {
  calls: Array<{ query: string; params?: Record<string, unknown> }>;
} {
  const calls: Array<{ query: string; params?: Record<string, unknown> }> = [];
  return {
    calls,
    async fetch<T>(
      query: string,
      params?: Record<string, unknown>,
    ): Promise<T> {
      calls.push({ query, params });
      return value as T;
    },
  };
}

/** Mock koji uvek odbija — simulira mrežnu ili GROQ grešku. */
const rejectingFetcher: SanityFetcher = {
  fetch() {
    return Promise.reject(new Error("mrežna greška"));
  },
};

const originalProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const originalDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

function setEnv(projectId?: string, dataset?: string): void {
  if (projectId === undefined) delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  else process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = projectId;

  if (dataset === undefined) delete process.env.NEXT_PUBLIC_SANITY_DATASET;
  else process.env.NEXT_PUBLIC_SANITY_DATASET = dataset;
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  setEnv(originalProjectId, originalDataset);
});

describe("Stanja Sanity konfiguracije", () => {
  it("1 — obe promenljive odsutne daju kontrolisano „nije konfigurisan“", async () => {
    setEnv(undefined, undefined);
    const { readSanityConfigState } = await import("@/sanity/env");
    const { getOptionalSanityClient } = await import("@/sanity/client");

    expect(readSanityConfigState().status).toBe("not-configured");
    expect(getOptionalSanityClient()).toBeNull();
  });

  it("2 — samo project ID baca grešku", async () => {
    setEnv("testprojekat1", undefined);
    const { readSanityConfigState } = await import("@/sanity/env");
    expect(() => readSanityConfigState()).toThrowError(
      /NEXT_PUBLIC_SANITY_DATASET/,
    );
  });

  it("3 — samo dataset baca grešku", async () => {
    setEnv(undefined, "staging");
    const { readSanityConfigState } = await import("@/sanity/env");
    expect(() => readSanityConfigState()).toThrowError(
      /NEXT_PUBLIC_SANITY_PROJECT_ID/,
    );
  });

  it("4 — nevalidan project ID baca grešku", async () => {
    setEnv("nije ispravan id", "staging");
    const { readSanityConfigState } = await import("@/sanity/env");
    expect(() => readSanityConfigState()).toThrowError(/nije ispravnog oblika/);
  });

  it.each(["prod", "Production", "master", "STAGING"])(
    "5 — nevalidan dataset „%s“ baca grešku",
    async (dataset) => {
      setEnv("testprojekat1", dataset);
      const { readSanityConfigState } = await import("@/sanity/env");
      expect(() => readSanityConfigState()).toThrowError(
        /nedozvoljenu vrednost/,
      );
    },
  );

  it("6 — validna staging konfiguracija daje read-only klijent", async () => {
    setEnv("testprojekat1", "staging");
    const { readSanityConfigState } = await import("@/sanity/env");

    const state = readSanityConfigState();
    expect(state.status).toBe("configured");
    if (state.status === "configured") {
      expect(state.config.dataset).toBe("staging");
      expect(state.config.projectId).toBe("testprojekat1");
    }
  });

  it("7 — delimična konfiguracija NIKADA ne pada na production", async () => {
    setEnv("testprojekat1", undefined);
    const { readSanityConfigState } = await import("@/sanity/env");

    // Mora baciti, a ne tiho izabrati bilo koji dataset.
    expect(() => readSanityConfigState()).toThrow();
  });
});

/**
 * Prazna vrednost NIJE odsustvo.
 *
 * Prazna GitHub repository variable ili prazan red u `.env` znače pogrešnu
 * konfiguraciju, ne „Sanity nije podešen“. Da se tretiraju kao odsustvo,
 * build bi tiho proizveo prazan sajt koji izgleda ispravno.
 */
describe("Prazne i whitespace vrednosti moraju oboriti build", () => {
  it("1 — obe stvarno odsutne (undefined) daju not-configured", async () => {
    setEnv(undefined, undefined);
    const { readSanityConfigState } = await import("@/sanity/env");
    expect(readSanityConfigState().status).toBe("not-configured");
  });

  it.each([
    ["2 — obe prazan string", "", ""],
    ["3 — obe samo razmaci", "   ", "  \t "],
    ["4 — prazan project ID + odsutan dataset", "", undefined],
    ["5 — odsutan project ID + prazan dataset", undefined, ""],
    ["6 — validan project ID + prazan dataset", "testprojekat1", ""],
    ["7 — prazan project ID + staging", "", "staging"],
    ["7b — whitespace project ID + staging", "   ", "staging"],
    ["7c — validan project ID + whitespace dataset", "testprojekat1", "   "],
  ])("%s → greška", async (_label, projectId, dataset) => {
    setEnv(projectId, dataset);
    const { readSanityConfigState } = await import("@/sanity/env");

    expect(() => readSanityConfigState()).toThrow();
    expect(readSanityConfigState).not.toThrowError(/not-configured/);
  });

  it("prazna vrednost ne daje opcioni klijent, nego baca", async () => {
    setEnv("", "");
    const { getOptionalSanityClient } = await import("@/sanity/client");
    expect(() => getOptionalSanityClient()).toThrow();
  });
});

describe("Provere validnosti sadržaja", () => {
  it("prihvata validnu temu i validan sažetak", () => {
    expect(isValidTopic(VALID_TOPIC)).toBe(true);
    expect(isValidArticleSummary(VALID_SUMMARY)).toBe(true);
  });

  it.each([
    ["bez naslova", { title: null }],
    ["bez sluga", { slug: "" }],
    ["bez uvoda", { intro: "   " }],
    ["bez _id", { _id: null }],
    ["neupotrebljiv order", { order: Number.NaN }],
  ])("odbija temu %s", (_label, override) => {
    expect(isValidTopic({ ...VALID_TOPIC, ...override })).toBe(false);
  });

  it.each([
    ["bez naslova", { title: null }],
    ["bez sažetka", { excerpt: "" }],
    ["bez datuma", { reviewDate: null }],
    ["nemoguć datum", { reviewDate: "2026-02-31" }],
    ["bez teme", { cluster: null }],
    ["tema bez sluga", { cluster: { title: "Test tema" } }],
  ])("odbija sažetak %s", (_label, override) => {
    expect(isValidArticleSummary({ ...VALID_SUMMARY, ...override })).toBe(
      false,
    );
  });

  it.each([null, undefined, "tekst", 42, []])(
    "neispravan ulaz %p ne baca",
    (value) => {
      expect(() => isValidTopic(value)).not.toThrow();
      expect(isValidTopic(value)).toBe(false);
      expect(isValidArticleSummary(value)).toBe(false);
    },
  );
});

describe("Content loaderi", () => {
  it("8 — validne teme prolaze", async () => {
    const topics = await loadTopics(fetcherReturning([VALID_TOPIC]));
    expect(topics).toHaveLength(1);
    expect(topics[0]?.title).toBe("Test tema");
  });

  it("9 — nevalidne teme se filtriraju", async () => {
    const fetcher = fetcherReturning([
      VALID_TOPIC,
      { ...VALID_TOPIC, _id: "topic-2", title: null },
      { ...VALID_TOPIC, _id: "topic-3", intro: "" },
      "nije objekat",
    ]);
    const topics = await loadTopics(fetcher);
    expect(topics).toHaveLength(1);
    expect(topics[0]?._id).toBe("topic-1");
  });

  it("10 — validna pojedinačna tema prolazi", async () => {
    const topic = await loadTopic("test-tema", fetcherReturning(VALID_TOPIC));
    expect(topic?.slug).toBe("test-tema");
  });

  it("11 — nevalidna pojedinačna tema postaje null", async () => {
    expect(
      await loadTopic("x", fetcherReturning({ ...VALID_TOPIC, title: null })),
    ).toBeNull();
    expect(await loadTopic("x", fetcherReturning(null))).toBeNull();
  });

  it("12 — validni sažeci članaka prolaze", async () => {
    const summaries = await loadTopicArticleSummaries(
      "test-tema",
      fetcherReturning([VALID_SUMMARY]),
    );
    expect(summaries).toHaveLength(1);
    expect(summaries[0]?.title).toBe("Test članak");
  });

  it("13 — nevalidni sažeci se filtriraju", async () => {
    const summaries = await loadTopicArticleSummaries(
      "test-tema",
      fetcherReturning([
        VALID_SUMMARY,
        { ...VALID_SUMMARY, _id: "a2", reviewDate: "2026-02-31" },
        { ...VALID_SUMMARY, _id: "a3", excerpt: "" },
      ]),
    );
    expect(summaries).toHaveLength(1);
    expect(summaries[0]?._id).toBe("article-1");
  });

  it.each([
    ["loadTopics", () => loadTopics(rejectingFetcher)],
    ["loadTopic", () => loadTopic("x", rejectingFetcher)],
    [
      "loadTopicArticleSummaries",
      () => loadTopicArticleSummaries("x", rejectingFetcher),
    ],
    ["loadTopicSlugs", () => loadTopicSlugs(rejectingFetcher)],
  ])("14 — %s propagira odbijen fetch", async (_label, run) => {
    await expect(run()).rejects.toThrow("mrežna greška");
  });

  it("15 — odbijen fetch se NE pretvara u praznu listu ni u null", async () => {
    const result = await loadTopics(rejectingFetcher).then(
      (value) => ({ resolved: value }),
      (error: unknown) => ({ error }),
    );

    expect("error" in result).toBe(true);
    expect("resolved" in result).toBe(false);
  });

  it("16 — loaderi ne pozivaju create, patch, mutate ni delete", async () => {
    const mutationSpy = {
      calls: [] as string[],
      async fetch<T>(query: string): Promise<T> {
        this.calls.push(query);
        return [] as T;
      },
      create: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      mutate: vi.fn(),
    };

    await loadTopics(mutationSpy);
    await loadTopic("x", mutationSpy);
    await loadTopicArticleSummaries("x", mutationSpy);

    expect(mutationSpy.create).not.toHaveBeenCalled();
    expect(mutationSpy.patch).not.toHaveBeenCalled();
    expect(mutationSpy.delete).not.toHaveBeenCalled();
    expect(mutationSpy.mutate).not.toHaveBeenCalled();
    for (const query of mutationSpy.calls) {
      expect(query).not.toMatch(/create|patch|delete|mutate|drop/i);
    }
  });

  it("bez konfiguracije loaderi vraćaju kontrolisano prazno stanje", async () => {
    setEnv(undefined, undefined);
    const content = await import("@/sanity/content");

    expect(await content.loadTopics()).toEqual([]);
    expect(await content.loadTopic("bilo-sta")).toBeNull();
    expect(await content.loadTopicArticleSummaries("bilo-sta")).toEqual([]);
    expect(await content.loadTopicSlugs()).toEqual([]);
  });

  it("slug-ovi za statičke parametre dolaze samo iz validnih tema", async () => {
    const slugs = await loadTopicSlugs(
      fetcherReturning([VALID_TOPIC, { ...VALID_TOPIC, _id: "t2", slug: "" }]),
    );
    expect(slugs).toEqual(["test-tema"]);
  });

  it("pravi prazan niz ostaje uspešno prazna lista", async () => {
    await expect(loadTopics(fetcherReturning([]))).resolves.toEqual([]);
    await expect(
      loadTopicArticleSummaries("x", fetcherReturning([])),
    ).resolves.toEqual([]);
    await expect(loadTopicSlugs(fetcherReturning([]))).resolves.toEqual([]);
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objekat", { nije: "niz" }],
    ["string", "nije niz"],
    ["broj", 42],
  ])("loadTopics odbija malformiran odgovor: %s", async (_label, value) => {
    await expect(loadTopics(fetcherReturning(value))).rejects.toThrow(
      /nije vratio listu/,
    );
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objekat", { nije: "niz" }],
    ["string", "nije niz"],
    ["broj", 42],
  ])(
    "loadTopicArticleSummaries odbija malformiran odgovor: %s",
    async (_label, value) => {
      await expect(
        loadTopicArticleSummaries("x", fetcherReturning(value)),
      ).rejects.toThrow(/nije vratio listu/);
    },
  );

  it("malformiran odgovor NE postaje prazna lista", async () => {
    const result = await loadTopics(fetcherReturning(null)).then(
      (value) => ({ resolved: value }),
      (error: unknown) => ({ error }),
    );

    expect("error" in result).toBe(true);
    expect("resolved" in result).toBe(false);
  });

  it("greška zbog oblika ne otkriva CMS podatke ni upit", async () => {
    const secretish = { tajniPodatak: "ne sme se videti", _id: "doc-1" };

    await expect(loadTopics(fetcherReturning(secretish))).rejects.toThrow(
      /nije vratio listu/,
    );

    const message = await loadTopics(fetcherReturning(secretish)).catch(
      (error: unknown) => String(error),
    );
    expect(message).not.toContain("ne sme se videti");
    expect(message).not.toContain("doc-1");
    expect(message).not.toContain("_type ==");
    expect(message).not.toContain("jjinmc3k");
  });

  it("loadTopic i dalje vraća null za null i za nevalidan dokument", async () => {
    // Pojedinačan rezultat zadržava prethodno odobreno ponašanje.
    expect(await loadTopic("x", fetcherReturning(null))).toBeNull();
    expect(
      await loadTopic("x", fetcherReturning({ ...VALID_TOPIC, title: null })),
    ).toBeNull();
  });

  it("upit za temu prosleđuje slug kao parametar", async () => {
    const fetcher = fetcherReturning(VALID_TOPIC);
    await loadTopic("test-tema", fetcher);
    expect(fetcher.calls[0]?.params).toEqual({ cluster: "test-tema" });
  });
});

/**
 * `loadArticle` razlikuje TRI ishoda: `null` (nema članka ili nije prikaziv),
 * grešku (odgovor pogrešnog OBLIKA) i članak. Ta razlika je ovde i testirana,
 * jer bi njeno urušavanje značilo da se kvar prikaže kao „nema teksta“.
 */
const VALID_ARTICLE = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
  author: { name: "Test Autor", credentials: "Sintetička kvalifikacija" },
  reviewer: { name: "Test Recenzent", credentials: "Sintetička licenca" },
  references: [{ label: "Sintetički izvor", url: "https://primer.rs/izvor" }],
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: "s1", text: "Telo teksta.", marks: [] },
      ],
    },
  ],
};

describe("Loader članka", () => {
  it("validan članak prolazi obe kapije", async () => {
    const article = await loadArticle(
      "test-clanak",
      fetcherReturning(VALID_ARTICLE),
    );
    expect(article?.slug).toBe("test-clanak");
  });

  it("prosleđuje slug kao parametar upita", async () => {
    const fetcher = fetcherReturning(VALID_ARTICLE);
    await loadArticle("test-clanak", fetcher);
    expect(fetcher.calls[0]?.params).toEqual({ slug: "test-clanak" });
  });

  it("nepostojeći članak je null, ne greška", async () => {
    expect(await loadArticle("x", fetcherReturning(null))).toBeNull();
    expect(await loadArticle("x", fetcherReturning(undefined))).toBeNull();
  });

  it.each([
    ["bez recenzenta", { reviewer: null }],
    ["bez autora", { author: { name: "Test Autor", credentials: "" } }],
    ["bez datuma provere", { reviewDate: null }],
    ["nemoguć datum provere", { reviewDate: "2026-02-31" }],
    ["bez izvora", { references: [] }],
    ["nepotpun izvor", { references: [{ label: "Bez adrese" }] }],
    ["bez teme", { cluster: null }],
  ])("članak %s se ne prikazuje", async (_label, override) => {
    expect(
      await loadArticle(
        "x",
        fetcherReturning({ ...VALID_ARTICLE, ...override }),
      ),
    ).toBeNull();
  });

  it("članak sa neispravnim medijem u telu se ne prikazuje", async () => {
    const withBadVideo = {
      ...VALID_ARTICLE,
      body: [
        ...VALID_ARTICLE.body,
        {
          _type: "videoEmbed",
          _key: "v1",
          provider: "youtube",
          url: "https://napadac.rs/embed/zlo",
          title: "Naslov",
          transcript: "Transkript.",
        },
      ],
    };

    expect(await loadArticle("x", fetcherReturning(withBadVideo))).toBeNull();
  });

  it("članak BEZ naslovne slike i dalje prolazi", async () => {
    // Odsutno polje i eksplicitan `null` su isto stanje: nema slike.
    expect(
      (await loadArticle("x", fetcherReturning(VALID_ARTICLE)))?.slug,
    ).toBe("test-clanak");
    expect(
      (
        await loadArticle(
          "x",
          fetcherReturning({ ...VALID_ARTICLE, featuredImage: null }),
        )
      )?.slug,
    ).toBe("test-clanak");
  });

  it("članak sa potpunom naslovnom slikom prolazi", async () => {
    const article = await loadArticle(
      "x",
      fetcherReturning({
        ...VALID_ARTICLE,
        featuredImage: {
          asset: { _id: "image-abc-1600x900-jpg" },
          alt: "Sintetički opis naslovne slike",
          caption: "Potpis.",
          credit: "Sintetički izvor",
        },
      }),
    );

    expect(article?.slug).toBe("test-clanak");
  });

  it.each([
    ["bez asseta", { alt: "Opis" }],
    ["bez alt teksta", { asset: { _id: "image-abc-1600x900-jpg" }, alt: "" }],
    ["prazan objekat", {}],
    ["pogrešan tip", "image-abc"],
  ])("malformirana naslovna slika (%s) obara članak", async (_l, featured) => {
    expect(
      await loadArticle(
        "x",
        fetcherReturning({ ...VALID_ARTICLE, featuredImage: featured }),
      ),
    ).toBeNull();
  });

  it("članak sa nepoznatim blokom u telu se ne prikazuje", async () => {
    const withUnknownBlock = {
      ...VALID_ARTICLE,
      body: [...VALID_ARTICLE.body, { _type: "priceTable", _key: "p1" }],
    };

    expect(
      await loadArticle("x", fetcherReturning(withUnknownBlock)),
    ).toBeNull();
  });

  it.each([
    ["niz", [VALID_ARTICLE]],
    ["string", "nije dokument"],
    ["broj", 42],
  ])("odgovor pogrešnog oblika (%s) baca", async (_label, value) => {
    await expect(loadArticle("x", fetcherReturning(value))).rejects.toThrow(
      /nije vratio dokument/,
    );
  });

  it("greška zbog oblika ne otkriva CMS podatke ni upit", async () => {
    const message = await loadArticle(
      "x",
      fetcherReturning(["tajni sadržaj dokumenta"]),
    ).catch((error: unknown) => String(error));

    expect(message).not.toContain("tajni sadržaj dokumenta");
    expect(message).not.toContain("_type ==");
    expect(message).not.toContain("jjinmc3k");
  });

  it("odbijen fetch se propagira", async () => {
    await expect(loadArticle("x", rejectingFetcher)).rejects.toThrow(
      "mrežna greška",
    );
  });

  it("slug-ovi za statičke parametre preskaču prazne i neispravne vrednosti", async () => {
    const slugs = await loadArticleSlugs(
      fetcherReturning([
        { slug: "test-clanak" },
        { slug: "" },
        { slug: null },
        {},
        "nije objekat",
      ]),
    );
    expect(slugs).toEqual(["test-clanak"]);
  });

  it("malformiran odgovor za slug-ove baca, ne postaje prazna lista", async () => {
    await expect(loadArticleSlugs(fetcherReturning(null))).rejects.toThrow(
      /nije vratio listu/,
    );
  });

  it("bez konfiguracije članak je null, a lista slug-ova prazna", async () => {
    setEnv(undefined, undefined);
    const content = await import("@/sanity/content");

    expect(await content.loadArticle("bilo-sta")).toBeNull();
    expect(await content.loadArticleSlugs()).toEqual([]);
  });
});

/**
 * Članci za početnu stranicu.
 *
 * Ista pravila kao svuda: prava prazna lista je dozvoljena, odgovor pogrešnog
 * OBLIKA je greška, a nevalidan pojedinačan zapis se filtrira.
 */
const HOMEPAGE_ARTICLE = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
  featuredImage: null,
  hasUsableBody: true,
};

const HOMEPAGE_IMAGE = {
  alt: "Sintetički opis naslovne slike",
  asset: { _id: "image-abc-1600x900-jpg" },
};

describe("isValidHomepageArticle", () => {
  it("prihvata članak bez naslovne slike", () => {
    expect(isValidHomepageArticle(HOMEPAGE_ARTICLE)).toBe(true);
    expect(
      isValidHomepageArticle({ ...HOMEPAGE_ARTICLE, featuredImage: undefined }),
    ).toBe(true);
  });

  it("prihvata članak sa potpunom naslovnom slikom", () => {
    expect(
      isValidHomepageArticle({
        ...HOMEPAGE_ARTICLE,
        featuredImage: HOMEPAGE_IMAGE,
      }),
    ).toBe(true);
  });

  it.each([
    ["bez asseta", { alt: "Opis" }],
    ["bez alt teksta", { asset: { _id: "image-abc" }, alt: "" }],
    ["prazan objekat", {}],
  ])("odbija članak sa nevalidnom naslovnom slikom (%s)", (_l, featured) => {
    expect(
      isValidHomepageArticle({ ...HOMEPAGE_ARTICLE, featuredImage: featured }),
    ).toBe(false);
  });

  /*
   * Regresija, nađena sintetičkim QA-om: uslov objavljivosti u upitu ne traži
   * telo, pa članak bez teksta prođe filter. `isDisplayableArticle()` ga
   * odbija, njegova stranica daje 404 — a kartica na početnoj je vodila tamo.
   */
  it.each([
    ["bez tela", false],
    ["telo nepoznatog oblika", undefined],
    ["telo prazno", null],
  ])("odbija članak %s — kartica bi vodila u 404", (_l, hasUsableBody) => {
    expect(isValidHomepageArticle({ ...HOMEPAGE_ARTICLE, hasUsableBody })).toBe(
      false,
    );
  });

  it("odbija članak koji ne bi prošao ni kao sažetak", () => {
    expect(isValidHomepageArticle({ ...HOMEPAGE_ARTICLE, title: "" })).toBe(
      false,
    );
    expect(
      isValidHomepageArticle({ ...HOMEPAGE_ARTICLE, reviewDate: "2026-02-31" }),
    ).toBe(false);
  });
});

describe("loadHomepageArticles", () => {
  it("propušta validne članke", async () => {
    const articles = await loadHomepageArticles(
      fetcherReturning([HOMEPAGE_ARTICLE]),
    );
    expect(articles).toHaveLength(1);
    expect(articles[0]?.slug).toBe("test-clanak");
  });

  it("ograničava na najviše tri, i kada upit vrati više", async () => {
    const many = Array.from({ length: 7 }, (_unused, index) => ({
      ...HOMEPAGE_ARTICLE,
      _id: `article-${index}`,
      slug: `clanak-${index}`,
    }));

    expect(await loadHomepageArticles(fetcherReturning(many))).toHaveLength(3);
  });

  it("zadržava redosled koji je upit vratio", async () => {
    const ordered = [
      { ...HOMEPAGE_ARTICLE, _id: "a1", slug: "a1", reviewDate: "2026-08-05" },
      { ...HOMEPAGE_ARTICLE, _id: "a2", slug: "a2", reviewDate: "2026-07-01" },
      { ...HOMEPAGE_ARTICLE, _id: "a3", slug: "a3", reviewDate: "2026-01-15" },
    ];

    const articles = await loadHomepageArticles(fetcherReturning(ordered));
    expect(articles.map((a) => a.slug)).toEqual(["a1", "a2", "a3"]);
  });

  it("filtrira nevalidne zapise, ostatak prolazi", async () => {
    const articles = await loadHomepageArticles(
      fetcherReturning([
        HOMEPAGE_ARTICLE,
        { ...HOMEPAGE_ARTICLE, _id: "a2", excerpt: "" },
        { ...HOMEPAGE_ARTICLE, _id: "a3", cluster: null },
        {
          ...HOMEPAGE_ARTICLE,
          _id: "a4",
          featuredImage: { alt: "Bez asseta" },
        },
        { ...HOMEPAGE_ARTICLE, _id: "a5", hasUsableBody: false },
        "nije objekat",
      ]),
    );

    expect(articles).toHaveLength(1);
    expect(articles[0]?._id).toBe("article-1");
  });

  it("popunjava do tri tek posle filtriranja, ne pre njega", async () => {
    // Upit uzima jedan zapis više, da odbačen članak ne ostavi rupu u listi.
    const articles = await loadHomepageArticles(
      fetcherReturning([
        { ...HOMEPAGE_ARTICLE, _id: "a1", slug: "a1" },
        { ...HOMEPAGE_ARTICLE, _id: "a2", slug: "a2", hasUsableBody: false },
        { ...HOMEPAGE_ARTICLE, _id: "a3", slug: "a3" },
        { ...HOMEPAGE_ARTICLE, _id: "a4", slug: "a4" },
      ]),
    );

    expect(articles.map((a) => a.slug)).toEqual(["a1", "a3", "a4"]);
  });

  it("prava prazna lista ostaje prazna lista", async () => {
    await expect(loadHomepageArticles(fetcherReturning([]))).resolves.toEqual(
      [],
    );
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objekat", { nije: "niz" }],
    ["string", "nije niz"],
  ])("odbija malformiran odgovor: %s", async (_label, value) => {
    await expect(loadHomepageArticles(fetcherReturning(value))).rejects.toThrow(
      /nije vratio listu/,
    );
  });

  it("greška ne otkriva CMS podatke, upit ni projekat", async () => {
    const message = await loadHomepageArticles(
      fetcherReturning({ tajniPodatak: "ne sme se videti", _id: "doc-1" }),
    ).catch((error: unknown) => String(error));

    expect(message).not.toContain("ne sme se videti");
    expect(message).not.toContain("doc-1");
    expect(message).not.toContain("_type ==");
    expect(message).not.toContain("jjinmc3k");
  });

  it("odbijen fetch se propagira", async () => {
    await expect(loadHomepageArticles(rejectingFetcher)).rejects.toThrow(
      "mrežna greška",
    );
  });

  it("bez konfiguracije vraća praznu listu, bez pada", async () => {
    setEnv(undefined, undefined);
    const content = await import("@/sanity/content");
    expect(await content.loadHomepageArticles()).toEqual([]);
  });
});
