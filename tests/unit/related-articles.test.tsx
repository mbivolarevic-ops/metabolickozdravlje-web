import { render, screen, within } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { RelatedArticles } from "@/components/content/RelatedArticles";
import {
  RELATED_ARTICLE_LIMIT,
  loadRelatedArticles,
  type SanityFetcher,
} from "@/sanity/content";

/**
 * Povezani tekstovi iz iste teme (docs/02 §3.1, element ⑮).
 *
 * Bez mreže. Svi podaci su sintetički i nemedicinski — test podaci ne smeju
 * ličiti na stvarni edukativni tekst.
 */

/** Sažetak u obliku u kojem ga upit vraća, pre `isValidArticleSummary`. */
function summary(slug: string, overrides: Record<string, unknown> = {}) {
  return {
    _id: `id-${slug}`,
    title: `Naslov ${slug}`,
    slug,
    excerpt: `Neutralan sažetak za ${slug}.`,
    reviewDate: "2026-08-05",
    cluster: { title: "Tema A", slug: "tema-a" },
    hasUsableBody: true,
    ...overrides,
  };
}

/** Fetcher koji vraća unapred zadat odgovor i beleži kako je pozvan. */
function fetcherReturning(result: unknown): SanityFetcher & {
  calls: Array<{ query: string; params?: Record<string, unknown> }>;
} {
  const calls: Array<{ query: string; params?: Record<string, unknown> }> = [];

  return {
    calls,
    fetch: <T,>(query: string, params?: Record<string, unknown>) => {
      calls.push({ query, params });
      return Promise.resolve(result as T);
    },
  };
}

describe("loadRelatedArticles — izbor", () => {
  it("isključuje trenutni članak", async () => {
    const fetcher = fetcherReturning([
      summary("prvi"),
      summary("trenutni"),
      summary("drugi"),
    ]);

    const related = await loadRelatedArticles("tema-a", "trenutni", fetcher);

    expect(related.map((a) => a.slug)).toEqual(["prvi", "drugi"]);
  });

  it("vraća najviše tri rezultata", async () => {
    const fetcher = fetcherReturning([
      summary("a"),
      summary("b"),
      summary("c"),
      summary("d"),
      summary("e"),
    ]);

    const related = await loadRelatedArticles("tema-a", "trenutni", fetcher);

    expect(RELATED_ARTICLE_LIMIT).toBe(3);
    expect(related).toHaveLength(3);
    expect(related.map((a) => a.slug)).toEqual(["a", "b", "c"]);
  });

  /*
   * Pripadnost temi sprovodi sam upit, kroz parametar `cluster`. Test zato
   * proverava da se prosleđuje slug TRENUTNE teme — da lista ne bi tiho počela
   * da vuče tekstove iz cele baze.
   */
  it("traži isključivo tekstove iz iste teme", async () => {
    const fetcher = fetcherReturning([summary("a")]);

    await loadRelatedArticles("tema-a", "trenutni", fetcher);

    expect(fetcher.calls).toHaveLength(1);
    expect(fetcher.calls[0]?.params).toEqual({ cluster: "tema-a" });
    expect(fetcher.calls[0]?.query).toContain(
      "cluster->slug.current == $cluster",
    );
  });

  it("odbacuje nevalidan zapis, a ne ostavlja rupu", async () => {
    const fetcher = fetcherReturning([
      summary("bez-tela", { hasUsableBody: false }),
      summary("bez-sazetka", { excerpt: "   " }),
      summary("bez-datuma", { reviewDate: "2026-02-31" }),
      summary("ispravan-1"),
      summary("ispravan-2"),
      summary("ispravan-3"),
      summary("ispravan-4"),
    ]);

    const related = await loadRelatedArticles("tema-a", "trenutni", fetcher);

    // Tri nevalidna otpadaju, ali se lista i dalje popunjava do tri.
    expect(related.map((a) => a.slug)).toEqual([
      "ispravan-1",
      "ispravan-2",
      "ispravan-3",
    ]);
  });

  it("redosled je determinističan — onaj koji upit vrati", async () => {
    const order = ["treci", "prvi", "drugi", "cetvrti"];
    const fetcher = fetcherReturning(order.map((slug) => summary(slug)));

    const first = await loadRelatedArticles("tema-a", "x", fetcher);
    const second = await loadRelatedArticles(
      "tema-a",
      "x",
      fetcherReturning(order.map((slug) => summary(slug))),
    );

    expect(first.map((a) => a.slug)).toEqual(["treci", "prvi", "drugi"]);
    expect(second.map((a) => a.slug)).toEqual(first.map((a) => a.slug));
  });

  it("tema bez drugih tekstova daje praznu listu", async () => {
    const fetcher = fetcherReturning([summary("trenutni")]);

    expect(await loadRelatedArticles("tema-a", "trenutni", fetcher)).toEqual(
      [],
    );
  });

  it("bez podešenog Sanity-ja vraća praznu listu, bez izuzetka", async () => {
    const related = await loadRelatedArticles("tema-a", "trenutni", undefined);
    expect(related).toEqual([]);
  });
});

describe("RelatedArticles — prikaz", () => {
  async function relatedFrom(slugs: string[]) {
    const fetcher = fetcherReturning(slugs.map((slug) => summary(slug)));
    return loadRelatedArticles("tema-a", "trenutni", fetcher);
  }

  it("ne renderuje ništa kada nema rezultata", () => {
    const { container } = render(<RelatedArticles articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    [1, ["a"]],
    [2, ["a", "b"]],
    [3, ["a", "b", "c"]],
  ])(
    "renderuje %i rezultat(a) sa ispravnim linkovima",
    async (count, slugs) => {
      const articles = await relatedFrom(slugs);
      render(<RelatedArticles articles={articles} />);

      const section = screen.getByRole("region", { name: "Povezani tekstovi" });
      const links = within(section).getAllByRole("link");

      expect(links).toHaveLength(count);
      expect(links.map((a) => a.getAttribute("href"))).toEqual(
        slugs.map((slug) => `/tekstovi/${slug}`),
      );
      // Nijedno prazno mesto: koliko rezultata, toliko stavki.
      expect(within(section).getAllByRole("listitem")).toHaveLength(count);
    },
  );

  it("naslov sekcije je dostupan, a stavke su semantička lista", async () => {
    render(<RelatedArticles articles={await relatedFrom(["a", "b"])} />);

    const section = screen.getByRole("region", { name: "Povezani tekstovi" });
    expect(
      within(section).getByRole("heading", { name: "Povezani tekstovi" }),
    ).toBeInTheDocument();
    expect(within(section).getAllByRole("list")).toHaveLength(1);
  });

  it("imenuje temu iz koje tekstovi dolaze", async () => {
    render(<RelatedArticles articles={await relatedFrom(["a"])} />);
    expect(screen.getByText(/Iz iste teme: Tema A/)).toBeInTheDocument();
  });

  it("prikazuje datum poslednje provere kao mašinski čitljiv datum", async () => {
    const { container } = render(
      <RelatedArticles articles={await relatedFrom(["a"])} />,
    );

    const time = container.querySelector("time");
    expect(time?.getAttribute("datetime")).toBe("2026-08-05");
  });
});

/**
 * Uklanja komentare pre provere.
 *
 * Bez ovoga bi provera pogađala sopstveno objašnjenje: komentar u komponenti
 * kaže da `"use client"` NEMA, pa bi doslovna pretraga po celom fajlu prijavila
 * da ga ima. Provera mora da gleda kod, ne prozu o kodu.
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("Bez klijentskog JavaScripta", () => {
  it("RelatedArticles je serverska komponenta", async () => {
    const code = stripComments(
      await readFile("src/components/content/RelatedArticles.tsx", "utf8"),
    );

    expect(code).not.toContain("use client");
    expect(code).not.toContain("useState");
    expect(code).not.toContain("useEffect");
    expect(code).not.toContain("onClick");
  });
});

describe("Stranica članka zadržava vezu nazad na temu", () => {
  it("„Nazad na temu“ i dalje postoji uz povezane tekstove", async () => {
    const source = await readFile("src/app/tekstovi/[slug]/page.tsx", "utf8");

    expect(source).toContain("Nazad na temu");
    expect(source).toContain("<RelatedArticles");
  });
});
