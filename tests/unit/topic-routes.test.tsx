import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Offline testovi ruta `/teme` i `/teme/[cluster]`.
 *
 * Content sloj je mockovan, pa nema mreže ni Sanity zavisnosti. Podaci su
 * sintetički: „Test tema“, „test-tema“, „Test članak“, „test-clanak“.
 */

const getTopics = vi.fn();
const getTopic = vi.fn();
const getTopicArticleSummaries = vi.fn();
const loadTopicSlugs = vi.fn();

vi.mock("@/sanity/content", () => ({
  getTopics: () => getTopics(),
  getTopic: (slug: string) => getTopic(slug),
  getTopicArticleSummaries: (slug: string) => getTopicArticleSummaries(slug),
  loadTopicSlugs: () => loadTopicSlugs(),
}));

/** `notFound()` prekida render bacanjem — u testu ga prepoznajemo po poruci. */
const NOT_FOUND = "NEXT_NOT_FOUND";
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error(NOT_FOUND);
  },
}));

import TopicsPage, { metadata as topicsMetadata } from "@/app/teme/page";
import TopicPage, {
  generateMetadata,
  generateStaticParams,
  dynamicParams,
} from "@/app/teme/[cluster]/page";
import TopicNotFound from "@/app/teme/[cluster]/not-found";

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
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("/teme", () => {
  it("17, 18 — ima tačno jedan h1 sa naslovom „Teme“", async () => {
    getTopics.mockResolvedValue([]);
    const { container } = render(await TopicsPage());

    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Teme");
  });

  it("19 — bez konfiguracije prikazuje prazno stanje", async () => {
    // Loader vraća [] kada Sanity nije podešen.
    getTopics.mockResolvedValue([]);
    render(await TopicsPage());

    expect(screen.getByText(/Teme se pripremaju/)).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("20 — prazan validan rezultat prikazuje isto prazno stanje", async () => {
    getTopics.mockResolvedValue([]);
    render(await TopicsPage());
    expect(screen.getByText(/još nije objavljen/)).toBeInTheDocument();
  });

  /*
   * Bez ovog linka prazno stanje je slepa ulica: u glavnom sadržaju nema
   * nijednog odredišta, pa jedini put dalje vodi kroz zaglavlje.
   */
  it("prazno stanje nudi eksplicitan izlaz na početnu", async () => {
    getTopics.mockResolvedValue([]);
    render(await TopicsPage());

    expect(
      screen.getByRole("link", { name: "Nazad na početnu" }),
    ).toHaveAttribute("href", "/");
  });

  it("prazno stanje zadržava poruku da se teme pripremaju", async () => {
    getTopics.mockResolvedValue([]);
    render(await TopicsPage());

    expect(screen.getByText(/Teme se pripremaju/)).toBeInTheDocument();
  });

  it("kada teme postoje, povratni link se NE prikazuje", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    render(await TopicsPage());

    // Svaka tema je već svoj sledeći korak; povratni link bi bio šum.
    expect(screen.queryByRole("link", { name: "Nazad na početnu" })).toBeNull();
    expect(screen.queryByText(/Teme se pripremaju/)).toBeNull();
  });

  it("kada teme postoje, jedini linkovi vode na same teme", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    const { container } = render(await TopicsPage());

    const hrefs = [...container.querySelectorAll("a")].map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual(["/teme/test-tema"]);
  });

  it("21 — validne teme imaju tačne linkove", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    render(await TopicsPage());

    const link = screen.getByRole("link", { name: "Test tema" });
    expect(link).toHaveAttribute("href", "/teme/test-tema");
    expect(screen.getByText("Ovo je sintetički opis za test.")).toBeVisible();
  });

  it("22 — prikazuje se samo ono što loader vrati (nevalidno je već filtrirano)", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    const { container } = render(await TopicsPage());

    expect(container.querySelectorAll("li")).toHaveLength(1);
  });

  it("23 — nema hardkodovanih tema kao fallback", async () => {
    getTopics.mockResolvedValue([]);
    const { container } = render(await TopicsPage());

    for (const planned of [
      "Laboratorijske analize",
      "Insulinska rezistencija",
      "Predijabetes",
      "Metabolički sindrom",
    ]) {
      expect(container.textContent).not.toContain(planned);
    }
  });

  it("38 — metadata ima očekivani naslov i opis", () => {
    expect(topicsMetadata.title).toBe("Teme");
    expect(typeof topicsMetadata.description).toBe("string");
    expect(String(topicsMetadata.description).length).toBeGreaterThan(10);
  });
});

describe("/teme/[cluster]", () => {
  function params(cluster: string) {
    return { params: Promise.resolve({ cluster }) };
  }

  it("24 — validna tema prikazuje naslov i uvod", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([]);

    const { container } = render(await TopicPage(params("test-tema")));

    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Test tema");
    expect(screen.getByText("Ovo je sintetički opis za test.")).toBeVisible();
  });

  it("25 — tema bez članaka prikazuje kontrolisano prazno stanje", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([]);

    const { container } = render(await TopicPage(params("test-tema")));

    expect(
      screen.getByText(/Tekstovi za ovu temu se pripremaju/),
    ).toBeVisible();
    expect(container.textContent).not.toContain("0 članaka");
    expect(container.querySelectorAll("li")).toHaveLength(0);
  });

  it("26 — validni sažeci prikazuju naslov, sažetak i datum", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([SUMMARY]);

    const { container } = render(await TopicPage(params("test-tema")));
    const item = screen.getByRole("listitem");

    expect(within(item).getByText("Test članak")).toBeVisible();
    expect(item).toHaveTextContent("Ovo je sintetički opis za test.");
    expect(item).toHaveTextContent("5. avgust 2026.");
    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-08-05",
    );
  });

  /*
   * Ranije je ova provera tvrdila da sažeci NISU linkovi, jer stranica članka
   * nije postojala. Sada postoji `/tekstovi/[slug]`, pa se proverava suprotno:
   * naslov vodi tačno tamo, i to je jedini link u kartici.
   *
   * Adresa i dalje ne sme da sadrži slug teme — članak koji promeni temu ne
   * sme da izgubi objavljenu adresu.
   */
  it("27, 28 — naslov sažetka vodi na stranicu članka, van putanje teme", async () => {
    getTopic.mockResolvedValue(TOPIC);
    getTopicArticleSummaries.mockResolvedValue([SUMMARY]);

    const { container } = render(await TopicPage(params("test-tema")));

    const item = screen.getByRole("listitem");
    const links = within(item).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Test članak");
    expect(links[0]).toHaveAttribute("href", "/tekstovi/test-clanak");

    const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual(["/teme", "/tekstovi/test-clanak"]);
    for (const href of hrefs) {
      expect(href).not.toContain("/teme/test-tema/");
    }
  });

  it("29 — nepostojeća tema aktivira 404", async () => {
    getTopic.mockResolvedValue(null);
    await expect(TopicPage(params("nepostojeca"))).rejects.toThrow(NOT_FOUND);
  });

  it("30 — nevalidna tema aktivira 404 (loader je već vratio null)", async () => {
    getTopic.mockResolvedValue(null);
    await expect(TopicPage(params("nevalidna"))).rejects.toThrow(NOT_FOUND);
    expect(getTopicArticleSummaries).not.toHaveBeenCalled();
  });

  it("statičke putanje dolaze iz validnih tema, bez dinamičkog fallbacka", async () => {
    loadTopicSlugs.mockResolvedValue(["test-tema"]);

    expect(dynamicParams).toBe(false);
    expect(await generateStaticParams()).toEqual([{ cluster: "test-tema" }]);
  });

  it("prazan dataset ne generiše nijednu cluster rutu", async () => {
    loadTopicSlugs.mockResolvedValue([]);
    expect(await generateStaticParams()).toEqual([]);
  });

  it("39 — metadata validne teme dolazi iz validiranog rezultata", async () => {
    getTopic.mockResolvedValue(TOPIC);
    const meta = await generateMetadata(params("test-tema"));

    expect(meta.title).toBe("Test tema");
    expect(meta.description).toBe("Ovo je sintetički opis za test.");
  });

  it("40 — nevalidan rezultat ne ulazi u metadata", async () => {
    getTopic.mockResolvedValue(null);
    const meta = await generateMetadata(params("nevalidna"));

    expect(meta.title).toBeUndefined();
    expect(meta.description).toBeUndefined();
  });

  it("dug uvod se skraćuje u meta opisu", async () => {
    const longIntro = `${"a".repeat(300)}`;
    getTopic.mockResolvedValue({ ...TOPIC, intro: longIntro });

    const meta = await generateMetadata(params("test-tema"));
    expect(String(meta.description).length).toBeLessThanOrEqual(160);
    expect(String(meta.description).endsWith("…")).toBe(true);
  });
});

describe("404 za temu", () => {
  it("35, 36, 37 — naslov, povratni link i bez tehničkih detalja", () => {
    const { container } = render(<TopicNotFound />);

    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Tema nije pronađena");

    const link = screen.getByRole("link", { name: /Nazad na sve teme/ });
    expect(link).toHaveAttribute("href", "/teme");

    for (const leak of ["Sanity", "GROQ", "dataset", "404", "undefined"]) {
      expect(container.textContent).not.toContain(leak);
    }
  });
});
