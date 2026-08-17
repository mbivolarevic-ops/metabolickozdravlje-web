import { readFile } from "node:fs/promises";
import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Globalna 404 stranica, znak sajta, social slike i ključni interni linkovi.
 *
 * „Ključni interni link“ ovde znači: link koji projekat sam generiše. Ako
 * takav link vodi na rutu koja ne postoji, čitalac udara u 404 zbog nas, ne
 * zbog pogrešno otkucane adrese.
 */

const getTopics = vi.fn();
const getHomepageArticles = vi.fn();
const getTopic = vi.fn();
const getTopicArticleSummaries = vi.fn();
const getArticle = vi.fn();

vi.mock("@/sanity/content", () => ({
  getTopics: () => getTopics(),
  getHomepageArticles: () => getHomepageArticles(),
  getTopic: (slug: string) => getTopic(slug),
  getTopicArticleSummaries: (slug: string) => getTopicArticleSummaries(slug),
  getArticle: (slug: string) => getArticle(slug),
  loadTopicSlugs: () => Promise.resolve([]),
  loadArticleSlugs: () => Promise.resolve([]),
  // Povezani tekstovi se testiraju u `related-articles.test.tsx`; ovde su
  // prazni, pa provera internih linkova gleda samo postojeće elemente stranice.
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

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import NotFound from "@/app/not-found";
import HomePage from "@/app/page";
import TopicsPage from "@/app/teme/page";
import TopicPage from "@/app/teme/[cluster]/page";
import ArticlePage from "@/app/tekstovi/[slug]/page";
import TopicNotFound from "@/app/teme/[cluster]/not-found";
import ArticleNotFound from "@/app/tekstovi/[slug]/not-found";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
} from "@/site/socialImage";
import {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "@/app/opengraph-image";
import {
  alt as twAlt,
  contentType as twContentType,
  size as twSize,
} from "@/app/twitter-image";

const TOPIC = {
  _id: "topic-1",
  title: "Test tema",
  slug: "test-tema",
  intro: "Ovo je sintetički opis za test.",
  order: 1,
};

const SUMMARY = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
  hasUsableBody: true,
};

const ARTICLE = {
  ...SUMMARY,
  author: { name: "Test Autor", credentials: "Kvalifikacija", slug: null },
  reviewer: {
    name: "Test Recenzent",
    credentials: "Licenca",
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

/** Rute koje projekat stvarno ima. Sve ostalo je mrtav link. */
const POSTOJECE_RUTE = new Set(["/", "/teme"]);

function jePoznataRuta(href: string): boolean {
  if (href.startsWith("#")) return true;
  if (POSTOJECE_RUTE.has(href)) return true;
  return /^\/(teme|tekstovi)\/[^/]+$/.test(href);
}

function internalHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a[href]"))
    .map((a) => a.getAttribute("href") ?? "")
    .filter((href) => href.startsWith("/") || href.startsWith("#"));
}

afterEach(() => {
  vi.clearAllMocks();
});

/** Uklanja komentare, da provera nad izvorom ne bi pogodila prozu o kodu. */
function bezKomentara(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("Globalna 404 stranica", () => {
  it("jasno kaže da stranica nije pronađena", () => {
    const { container } = render(<NotFound />);

    const h1 = container.querySelectorAll("h1");
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent("Stranica nije pronađena");
  });

  it("nudi povratak na početnu i na teme", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("link", { name: "Nazad na početnu" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: "Pogledajte sve teme" }),
    ).toHaveAttribute("href", "/teme");
  });

  it("nema pretrage, forme ni medicinske tvrdnje", () => {
    const { container } = render(<NotFound />);

    expect(container.querySelectorAll("form")).toHaveLength(0);
    expect(container.querySelectorAll("input")).toHaveLength(0);
    expect(container.textContent).not.toMatch(
      /dijagnoz|terapij|lečenj|simptom/i,
    );
  });

  it("svi njeni linkovi vode na postojeće rute", () => {
    const { container } = render(<NotFound />);
    for (const href of internalHrefs(container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  it("ne otkriva tehničke detalje", () => {
    const { container } = render(<NotFound />);
    for (const leak of ["Sanity", "GROQ", "dataset", "undefined", "404"]) {
      expect(container.textContent).not.toContain(leak);
    }
  });

  /*
   * Bez sopstvenog naslova tab nasleđuje naslov početne strane, pa istorija
   * brauzera tvrdi da je korisnik bio na početnoj — a nije.
   */
  it("ima sopstveni naslov dokumenta na srpskom", async () => {
    const modul: Record<string, unknown> = await import("@/app/not-found");
    const notFoundMetadata = modul.metadata as { title?: unknown } | undefined;

    expect(notFoundMetadata?.title).toBe("Stranica nije pronađena");
  });

  /*
   * Provera mora da gleda KOD, ne komentare: `not-found.tsx` u dokumentaciji
   * objašnjava zašto `<title>` nije upotrebljen, pa bi pretraga po celom fajlu
   * pogodila sopstveno objašnjenje.
   */
  it("naslov se postavlja metapodacima, ne React elementom `title`", async () => {
    const code = bezKomentara(await readFile("src/app/not-found.tsx", "utf8"));

    /*
     * React `<title>` je ovde probano i ne radi: Next iz globalnog metadata već
     * emituje `<title>` ranije u dokumentu, brauzer koristi PRVI, a hidratacija
     * doda još jedan. Ako neko kasnije vrati taj pristup, ovaj test pada.
     */
    expect(code).not.toContain("<title>");
    expect(code).toContain("export const metadata");
  });

  it("nije klijentska komponenta", async () => {
    const code = bezKomentara(await readFile("src/app/not-found.tsx", "utf8"));
    expect(code).not.toContain("use client");
  });

  it("specifične 404 stranice zadržavaju svoje poruke", () => {
    const topic = render(<TopicNotFound />);
    expect(topic.container).toHaveTextContent("Tema nije pronađena");
    topic.unmount();

    const article = render(<ArticleNotFound />);
    expect(article.container).toHaveTextContent("Tekst nije pronađen");
  });
});

describe("Znak sajta (favicon)", () => {
  it("SVG ikona postoji i validna je", async () => {
    const svg = await readFile("src/app/icon.svg", "utf8");

    expect(svg).toContain("<svg");
    expect(svg).toContain('viewBox="0 0 64 64"');
    expect(svg).toContain("</svg>");
  });

  it("koristi postojeće tokene palete", async () => {
    const svg = await readFile("src/app/icon.svg", "utf8");

    expect(svg).toContain("#0f4c4a");
    expect(svg).toContain("#faf8f5");
    expect(svg).toContain("#b85a37");
  });

  it("nosi monogram i ima pristupačan naziv", async () => {
    const svg = await readFile("src/app/icon.svg", "utf8");

    expect(svg).toContain('aria-label="MZ"');
    expect(svg).toContain('role="img"');
  });

  /*
   * Znak ne sme da sugeriše zdravstvenu ustanovu ni farmaciju — platforma je
   * edukativni studio (docs/02 §9.4).
   */
  it("ne sadrži medicinske ni farmaceutske simbole", async () => {
    // Bez komentara: provera se odnosi na crtež, ne na obrazloženje uz njega.
    const svg = (await readFile("src/app/icon.svg", "utf8"))
      .replace(/<!--[\s\S]*?-->/g, "")
      .toLowerCase();

    for (const zabranjeno of [
      "cross",
      "krst",
      "stethoscope",
      "pill",
      "syringe",
      "caduceus",
    ]) {
      expect(svg).not.toContain(zabranjeno);
    }

    // Samo pravougaonici i putanje slova — nijedan simbolički oblik.
    expect(svg).not.toContain("<circle");
    expect(svg).not.toContain("<image");
  });

  it("ne zavisi ni od jednog fonta", async () => {
    const svg = await readFile("src/app/icon.svg", "utf8");

    expect(svg).not.toContain("<text");
    expect(svg).not.toContain("font-family");
  });
});

describe("Social slike", () => {
  it("Open Graph ruta izvozi tražene podatke", () => {
    expect(ogSize).toEqual({ width: 1200, height: 630 });
    expect(ogContentType).toBe("image/png");
    expect(ogAlt).toBe(SOCIAL_IMAGE_ALT);
  });

  it("Twitter ruta koristi iste vrednosti, bez razilaženja", () => {
    expect(twSize).toEqual(ogSize);
    expect(twContentType).toBe(ogContentType);
    expect(twAlt).toBe(ogAlt);
  });

  it("dimenzije su 1200×630, kako čitači linkova očekuju", () => {
    expect(SOCIAL_IMAGE_SIZE.width).toBe(1200);
    expect(SOCIAL_IMAGE_SIZE.height).toBe(630);
    expect(SOCIAL_IMAGE_CONTENT_TYPE).toBe("image/png");
  });

  it("alt tekst imenuje platformu i ne obećava ishod", () => {
    expect(SOCIAL_IMAGE_ALT).toContain("metabolickozdravlje.rs");
    expect(SOCIAL_IMAGE_ALT).not.toMatch(/izlečenj|garantovano|rezultat/i);
  });

  it("render ne poziva mrežu ni spoljni font", async () => {
    const source = await readFile("src/site/socialImage.tsx", "utf8");
    const code = source.replace(/\/\*[\s\S]*?\*\//g, "");

    expect(code).not.toContain("fetch(");
    expect(code).not.toContain("https://fonts");
    expect(code).not.toContain("fonts:");
  });
});

describe("Ključni interni linkovi", () => {
  it("početna ne vodi ni na jednu nepostojeću rutu", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([SUMMARY]);

    const { container } = render(await HomePage());
    const hrefs = internalHrefs(container);

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  it("kartice tema i članaka vode tačno na svoje rute", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([SUMMARY]);

    render(await HomePage());

    expect(screen.getByRole("link", { name: "Test tema" })).toHaveAttribute(
      "href",
      "/teme/test-tema",
    );
    expect(screen.getByRole("link", { name: "Test članak" })).toHaveAttribute(
      "href",
      "/tekstovi/test-clanak",
    );
  });

  it("zaglavlje i podnožje vode samo na postojeće rute", () => {
    const header = render(<Header />);
    for (const href of internalHrefs(header.container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
    header.unmount();

    const footer = render(<Footer />);
    for (const href of internalHrefs(footer.container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  it("/teme vodi samo na postojeće rute", async () => {
    getTopics.mockResolvedValue([TOPIC]);

    const { container } = render(await TopicsPage());
    for (const href of internalHrefs(container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  it("stranica teme vodi samo na postojeće rute", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([SUMMARY]);

    const { container } = render(
      await TopicPage({ params: Promise.resolve({ cluster: "test-tema" }) }),
    );
    for (const href of internalHrefs(container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  it("putanja na stranici članka vodi samo na postojeće rute", async () => {
    getArticle.mockResolvedValue(ARTICLE);

    const { container } = render(
      await ArticlePage({ params: Promise.resolve({ slug: "test-clanak" }) }),
    );

    const nav = within(container).getByRole("navigation", { name: "Putanja" });
    for (const href of internalHrefs(nav as HTMLElement)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
    for (const href of internalHrefs(container)) {
      expect(jePoznataRuta(href)).toBe(true);
    }
  });

  /*
   * Kartica sme da vodi samo na članak koji runtime guard propušta. Sažetak
   * bez upotrebljivog tela ne stiže do prikaza, pa ni link ne nastaje.
   */
  it("članak koji guard odbija ne dobija karticu ni link", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([]);

    const { container } = render(
      await TopicPage({ params: Promise.resolve({ cluster: "test-tema" }) }),
    );

    expect(
      Array.from(container.querySelectorAll("a[href]")).filter((a) =>
        (a.getAttribute("href") ?? "").startsWith("/tekstovi/"),
      ),
    ).toHaveLength(0);
  });
});
