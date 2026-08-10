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
  featuredImage: null,
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

/**
 * Naslovna slika je opciona. Članak bez nje mora izgledati potpuno ispravno;
 * članak sa nevalidnom slikom uopšte ne stiže do prikaza (v. loader testove).
 */
const FEATURED_IMAGE = {
  alt: "Sintetički opis naslovne slike",
  caption: "Potpis naslovne slike.",
  credit: "Sintetički izvor",
  crop: { top: 0.1, bottom: 0.1, left: 0.2, right: 0.2 },
  hotspot: { x: 0.5, y: 0.4, width: 0.5, height: 0.5 },
  asset: {
    _id: "image-abc1234567890abcdef1234567890abcdef1234-1600x900-jpg",
    dimensions: { width: 1600, height: 900 },
  },
};

describe("naslovna slika", () => {
  it("članak bez naslovne slike se prikazuje potpuno, bez praznog okvira", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    const { container } = render(await ArticlePage(params("test-clanak")));

    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector("figure")).toBeNull();

    // Sve ostalo je i dalje tu.
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText("Telo teksta.")).toBeVisible();
    expect(screen.getByRole("region", { name: "Izvori" })).toBeVisible();
  });

  it("validna naslovna slika se prikazuje sa alt tekstom", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });
    render(await ArticlePage(params("test-clanak")));

    expect(
      screen.getByRole("img", { name: "Sintetički opis naslovne slike" }),
    ).toBeVisible();
  });

  it("prikazuje potpis i izvor kada postoje", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });
    const { container } = render(await ArticlePage(params("test-clanak")));

    const figure = container.querySelector("figure");
    expect(figure).toHaveTextContent("Potpis naslovne slike.");
    expect(figure).toHaveTextContent("Izvor: Sintetički izvor");
  });

  it("bez potpisa i izvora nema praznog reda ispod slike", async () => {
    getArticle.mockResolvedValue({
      ...ARTICLE,
      featuredImage: { ...FEATURED_IMAGE, caption: null, credit: null },
    });
    const { container } = render(await ArticlePage(params("test-clanak")));

    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("prosleđuje crop i hotspot u adresu slike", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });
    render(await ArticlePage(params("test-clanak")));

    const decoded = decodeURIComponent(
      screen.getByRole("img").getAttribute("src") ?? "",
    );

    // Isečak koji je urednik izabrao mora stići do CDN-a kao `rect`.
    expect(decoded).toContain("rect=");
    expect(decoded).toContain("cdn.sanity.io/images/testprojekat1/staging/");
  });

  it("stoji posle atribucije, a pre teksta članka", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });
    const { container } = render(await ArticlePage(params("test-clanak")));

    const figure = container.querySelector("figure");
    const byline = screen.getByText("Test Recenzent");
    const body = screen.getByText("Telo teksta.");

    expect(figure).not.toBeNull();
    expect(
      byline.compareDocumentPosition(figure as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      (figure as Node).compareDocumentPosition(body) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("okvir slike ima fiksne dimenzije, pa nema skoka rasporeda", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });
    render(await ArticlePage(params("test-clanak")));

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "675");
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

  /*
   * Regresija: tema se ranije pojavljivala i kao poslednja stavka putanje i
   * kao zaseban red iznad naslova — dva susedna linka istog teksta i istog
   * odredišta, koja čitač ekrana pročita dvaput zaredom.
   */
  it("tema se ne ponavlja kao drugi link istog imena", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    const toTopic = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/teme/test-tema");

    // Tačno dva: jedan u putanji, jedan imenovani na dnu teksta.
    expect(toTopic).toHaveLength(2);

    const names = toTopic.map((link) => link.textContent);
    expect(new Set(names).size).toBe(2);
  });

  it("naziv teme iznad naslova nosi putanja, ne zaseban link", async () => {
    getArticle.mockResolvedValue(ARTICLE);
    render(await ArticlePage(params("test-clanak")));

    const nav = screen.getByRole("navigation", { name: "Putanja" });
    expect(
      within(nav).getByRole("link", { name: "Test tema" }),
    ).toHaveAttribute("href", "/teme/test-tema");

    // Van putanje sme postojati samo imenovani povratni link.
    const outside = screen
      .getAllByRole("link")
      .filter(
        (link) =>
          link.getAttribute("href") === "/teme/test-tema" &&
          !nav.contains(link),
      );
    expect(outside).toHaveLength(1);
    expect(outside[0]).toHaveTextContent(/^Nazad na temu/);
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

  /*
   * Članak od tada ima Open Graph blok (tip, naslov, adresa) — to je uvedeno
   * uz kanonske adrese. Garancija je ostala ista i proverava se tamo gde sada
   * živi: SLIKA se ne izmišlja.
   */
  it("bez naslovne slike ne izmišlja OG sliku", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const meta = await generateMetadata(params("test-clanak"));
    const og = meta.openGraph as Record<string, unknown>;

    expect(og.type).toBe("article");
    expect(og.images).toBeUndefined();
  });

  it("malformirana naslovna slika ne daje OG sliku", async () => {
    // Do rute ovakav članak i ne stiže, ali metadata ne sme da improvizuje.
    getArticle.mockResolvedValue({
      ...ARTICLE,
      featuredImage: { alt: "Opis bez asseta" },
    });

    const meta = await generateMetadata(params("test-clanak"));
    expect((meta.openGraph as Record<string, unknown>).images).toBeUndefined();
  });

  it("validna naslovna slika daje OG sliku samo sa Sanity CDN-a", async () => {
    getArticle.mockResolvedValue({ ...ARTICLE, featuredImage: FEATURED_IMAGE });

    const meta = await generateMetadata(params("test-clanak"));
    const image = meta.openGraph?.images;
    expect(Array.isArray(image)).toBe(true);

    const first = Array.isArray(image) ? image[0] : undefined;
    const url =
      typeof first === "object" && first !== null && "url" in first
        ? String(first.url)
        : "";

    expect(url.startsWith("https://cdn.sanity.io/images/")).toBe(true);
    expect(decodeURIComponent(url)).toContain("testprojekat1/staging/");
    expect(first).toMatchObject({
      width: 1200,
      height: 630,
      alt: "Sintetički opis naslovne slike",
    });
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
