import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Offline testovi rute `/tekstovi/[slug]`.
 *
 * Content sloj je mockovan — nema mreže ni Sanity zavisnosti. Svi podaci su
 * sintetički: „Test članak“, „test-clanak“, „Test tema“, „test-tema“.
 */

const getArticle = vi.fn();
const loadArticleSlugs = vi.fn();

vi.mock("@/sanity/content", () => ({
  getArticle: (slug: string) => getArticle(slug),
  loadArticleSlugs: () => loadArticleSlugs(),
}));

vi.mock("@/sanity/env", () => ({
  readSanityConfig: () => ({
    projectId: "testprojekat1",
    dataset: "staging",
    apiVersion: "2026-08-05",
  }),
}));

/** `notFound()` prekida render bacanjem — u testu ga prepoznajemo po poruci. */
const NOT_FOUND = "NEXT_NOT_FOUND";
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error(NOT_FOUND);
  },
}));

import ArticlePage, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/tekstovi/[slug]/page";
import ArticleNotFound from "@/app/tekstovi/[slug]/not-found";

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
    {
      label: "Sintetički izvor",
      url: "https://primer.rs/izvor",
      publisher: "Sintetički izdavač",
      year: 2026,
    },
  ],
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
    {
      _type: "block",
      _key: "b2",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s2", text: "Podnaslov", marks: [] }],
    },
  ],
};

function params(slug: string) {
  return { params: Promise.resolve({ slug }) };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("statičko generisanje", () => {
  it("ruta je potpuno statička — nepoznat slug ne dobija dinamički prikaz", () => {
    expect(dynamicParams).toBe(false);
  });

  it("generiše parametre iz objavljivih članaka", async () => {
    loadArticleSlugs.mockResolvedValue(["test-clanak", "drugi-clanak"]);

    expect(await generateStaticParams()).toEqual([
      { slug: "test-clanak" },
      { slug: "drugi-clanak" },
    ]);
  });

  it("bez podešenog Sanity-ja generiše praznu listu, bez pada", async () => {
    loadArticleSlugs.mockResolvedValue([]);
    expect(await generateStaticParams()).toEqual([]);
  });
});

describe("medicinski obavezni elementi", () => {
  it("prikazuje naslov kao jedini H1", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    const h1 = container.querySelectorAll("h1");
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent("Test članak");
  });

  it("prikazuje autora i njegove kvalifikacije", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    expect(container).toHaveTextContent(
      "Autor: Test Autor · Sintetička kvalifikacija",
    );
  });

  it("prikazuje potpis recenzenta i datum provere", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    expect(screen.getByText("Test Recenzent")).toBeVisible();
    expect(container).toHaveTextContent("Stručno proverio");
    expect(container).toHaveTextContent("5. avgust 2026.");
    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-08-05",
    );
  });

  it("prikazuje medicinsku napomenu u odobrenoj formulaciji", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    expect(container).toHaveTextContent(
      "Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.",
    );
  });

  it("prikazuje listu izvora sa bezbednom vezom", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    const section = screen.getByRole("region", { name: "Izvori" });
    const link = within(section).getByRole("link", {
      name: "Sintetički izvor",
    });
    expect(link).toHaveAttribute("href", "https://primer.rs/izvor");
    expect(link).not.toHaveAttribute("target");
    expect(section).toHaveTextContent("Sintetički izdavač, 2026");
  });

  it("renderuje telo članka", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    expect(screen.getByText("Telo teksta.")).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Podnaslov" }),
    ).toBeVisible();
  });
});

describe("povezanost sa temom", () => {
  it("putanja vodi na početnu i na pregled tema", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    const nav = screen.getByRole("navigation", { name: "Putanja" });
    expect(within(nav).getByRole("link", { name: "Početna" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(nav).getByRole("link", { name: "Teme" })).toHaveAttribute(
      "href",
      "/teme",
    );
  });

  it("nudi povratak na temu kojoj članak pripada", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    const back = screen.getByRole("link", { name: /Nazad na temu/ });
    expect(back).toHaveAttribute("href", "/teme/test-tema");
  });

  it("nema linka ka rutama koje ne postoje", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    const hrefs = Array.from(container.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => href !== null && href.startsWith("/"));

    for (const href of hrefs) {
      expect(["/", "/teme", "/teme/test-tema"]).toContain(href);
    }
  });
});

describe("fail-closed ponašanje", () => {
  it("neprikaziv članak daje 404, bez delimičnog prikaza", async () => {
    getArticle.mockResolvedValue(null);

    await expect(ArticlePage(params("test-clanak"))).rejects.toThrow(NOT_FOUND);
  });

  it("greška iz sloja podataka se PROPAGIRA, ne pretvara u prazan prikaz", async () => {
    getArticle.mockRejectedValue(new Error("upit pogrešnog oblika"));

    await expect(ArticlePage(params("test-clanak"))).rejects.toThrow(
      "upit pogrešnog oblika",
    );
  });
});

describe("metadata", () => {
  it("uzima naslov i opis iz članka", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const meta = await generateMetadata(params("test-clanak"));
    expect(meta.title).toBe("Test članak");
    expect(meta.description).toBe("Ovo je sintetički opis za test.");
  });

  it("dug opis se skraćuje na 160 znakova", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, excerpt: "a".repeat(300) });

    const meta = await generateMetadata(params("test-clanak"));
    expect(String(meta.description).length).toBeLessThanOrEqual(160);
    expect(String(meta.description).endsWith("…")).toBe(true);
  });

  it("neprikaziv članak ne ulazi u metadata", async () => {
    getArticle.mockResolvedValue(null);
    expect(await generateMetadata(params("test-clanak"))).toEqual({});
  });

  it("ne postavlja OG sliku — članak nema polje za nju", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const meta = await generateMetadata(params("test-clanak"));
    expect(meta.openGraph).toBeUndefined();
  });
});

describe("404 za tekst", () => {
  it("ima naslov, povratni link i nijedan tehnički detalj", () => {
    const { container } = render(<ArticleNotFound />);

    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Tekst nije pronađen");

    expect(
      screen.getByRole("link", { name: /Nazad na sve teme/ }),
    ).toHaveAttribute("href", "/teme");

    for (const leak of ["Sanity", "GROQ", "dataset", "404", "undefined"]) {
      expect(container.textContent).not.toContain(leak);
    }
  });
});
