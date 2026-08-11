import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * `robots.txt` i sitemap.
 *
 * Najvažniji test u ovom fajlu je onaj koji sprečava da neko slučajno otvori
 * sajt pretraživačima. Indeksiranje se uključuje ljudskom odlukom, ne izmenom
 * koja „usput“ prođe pregled.
 */

const loadSitemapTopics = vi.fn();
const loadSitemapArticles = vi.fn();

vi.mock("@/sanity/content", () => ({
  loadSitemapTopics: () => loadSitemapTopics(),
  loadSitemapArticles: () => loadSitemapArticles(),
}));

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

afterEach(() => {
  vi.clearAllMocks();
});

describe("robots.txt pre lansiranja", () => {
  it("blokira sve agente na svim putanjama", () => {
    const rules = robots().rules;
    expect(Array.isArray(rules)).toBe(false);

    const rule = rules as { userAgent?: string; disallow?: unknown };
    expect(rule.userAgent).toBe("*");
    expect(rule.disallow).toBe("/");
  });

  /*
   * ⛔ Ovo je brava. Ako neko doda `allow` ili suzi `disallow`, ovaj test pada
   * i izmena ne prolazi CI. Indeksiranje se otvara posebnim PR-om, u kojem se
   * ovaj test svesno menja — a ne usput.
   */
  it("NE dozvoljava nijednu putanju", () => {
    const rule = robots().rules as { allow?: unknown; disallow?: unknown };

    expect(rule.allow).toBeUndefined();
    expect(rule.disallow).toBe("/");

    const serialized = JSON.stringify(robots());
    expect(serialized).not.toContain('"allow"');
  });

  it("ne poziva crawlere na sitemap dok su zabranjeni", () => {
    expect(robots().sitemap).toBeUndefined();
  });

  it("imenuje kanonski domen kao host", () => {
    expect(robots().host).toBe("metabolickozdravlje.rs");
  });

  /*
   * Pravilo ne sme da zavisi od okruženja. Provera se izvršava dvaput, sa
   * različitim `NODE_ENV`, i mora dati isti rezultat.
   */
  it("ne otvara indeksiranje ni u jednom okruženju", () => {
    const results: string[] = [];

    for (const value of ["development", "production", "test"]) {
      vi.stubEnv("NODE_ENV", value as "development" | "production" | "test");
      vi.stubEnv("VERCEL_ENV", value);
      vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
      results.push(JSON.stringify(robots()));
    }
    vi.unstubAllEnvs();

    expect(new Set(results).size).toBe(1);
    expect(results[0]).toContain('"disallow":"/"');
  });

  /*
   * Pravilo ne sme ni da čita okruženje. Ako ga ne čita, ne može ni da se
   * prevari — nijedna pogrešna promenljiva ne može otvoriti sajt.
   */
  it("izvorni kod pravila ne pominje nijednu promenljivu okruženja", async () => {
    const { readFile } = await import("node:fs/promises");
    const source = await readFile("src/app/robots.ts", "utf8");
    const code = source.replace(/\/\*[\s\S]*?\*\//g, "");

    expect(code).not.toContain("process.env");
    expect(code).not.toContain("NODE_ENV");
  });
});

describe("sitemap bez konfiguracije", () => {
  it("sadrži samo poznate statičke rute", async () => {
    loadSitemapTopics.mockResolvedValue([]);
    loadSitemapArticles.mockResolvedValue([]);

    const entries = await sitemap();

    expect(entries.map((e) => e.url)).toEqual([
      "https://metabolickozdravlje.rs/",
      "https://metabolickozdravlje.rs/teme",
    ]);
  });

  /*
   * Datum builda NIJE datum sadržaja. Statične rute zato nemaju `lastModified`
   * — inače bi svaki build tvrdio da se stranica promenila.
   */
  it("statične rute nemaju izmišljen datum", async () => {
    loadSitemapTopics.mockResolvedValue([]);
    loadSitemapArticles.mockResolvedValue([]);

    for (const entry of await sitemap()) {
      expect(entry.lastModified).toBeUndefined();
    }
  });
});

describe("sitemap sa sadržajem", () => {
  it("dodaje validne teme i članke sa kanonskim adresama", async () => {
    loadSitemapTopics.mockResolvedValue([
      { slug: "test-tema", lastModified: "2026-08-05T10:00:00Z" },
    ]);
    loadSitemapArticles.mockResolvedValue([
      { slug: "test-clanak", lastModified: "2026-08-06T12:00:00Z" },
    ]);

    const entries = await sitemap();

    expect(entries.map((e) => e.url)).toEqual([
      "https://metabolickozdravlje.rs/",
      "https://metabolickozdravlje.rs/teme",
      "https://metabolickozdravlje.rs/teme/test-tema",
      "https://metabolickozdravlje.rs/tekstovi/test-clanak",
    ]);
  });

  it("koristi datum iz CMS-a kada je upotrebljiv", async () => {
    loadSitemapTopics.mockResolvedValue([
      { slug: "test-tema", lastModified: "2026-08-05T10:00:00Z" },
    ]);
    loadSitemapArticles.mockResolvedValue([]);

    const topic = (await sitemap()).find((e) => e.url.includes("test-tema"));
    expect(topic?.lastModified).toBe("2026-08-05T10:00:00Z");
  });

  it("izostavlja datum kada CMS podatak nije upotrebljiv", async () => {
    loadSitemapTopics.mockResolvedValue([
      { slug: "test-tema", lastModified: null },
    ]);
    loadSitemapArticles.mockResolvedValue([]);

    const topic = (await sitemap()).find((e) => e.url.includes("test-tema"));
    expect(topic?.lastModified).toBeUndefined();
  });

  it("enkodira slug u kanonskoj adresi", async () => {
    loadSitemapTopics.mockResolvedValue([
      { slug: "zlo?a=1", lastModified: null },
    ]);
    loadSitemapArticles.mockResolvedValue([]);

    const entry = (await sitemap())[2];
    expect(entry?.url).toBe("https://metabolickozdravlje.rs/teme/zlo%3Fa%3D1");
  });

  it("ne uključuje Studio, tehničke rute ni 404", async () => {
    loadSitemapTopics.mockResolvedValue([
      { slug: "test-tema", lastModified: null },
    ]);
    loadSitemapArticles.mockResolvedValue([
      { slug: "test-clanak", lastModified: null },
    ]);

    const urls = (await sitemap()).map((e) => e.url).join(" ");

    for (const forbidden of [
      "/studio",
      "/staging",
      "/production",
      "_next",
      "not-found",
      "robots",
      "sitemap",
      "opengraph-image",
    ]) {
      expect(urls).not.toContain(forbidden);
    }
  });

  /*
   * Malformiran odgovor obara build. Loader baca, a sitemap tu grešku ne hvata
   * — inače bi se kvar pretvorio u „nema sadržaja“ i objavili bismo prazan
   * sitemap kao ispravan.
   */
  it("greška iz loadera se propagira, ne postaje prazan sitemap", async () => {
    loadSitemapTopics.mockRejectedValue(
      new Error("Sanity upit „sve teme“ nije vratio listu."),
    );
    loadSitemapArticles.mockResolvedValue([]);

    await expect(sitemap()).rejects.toThrow(/nije vratio listu/);
  });

  it("greška iz loadera članaka se takođe propagira", async () => {
    loadSitemapTopics.mockResolvedValue([]);
    loadSitemapArticles.mockRejectedValue(
      new Error("Sanity upit „članci za sitemap“ nije vratio listu."),
    );

    await expect(sitemap()).rejects.toThrow(/nije vratio listu/);
  });
});
