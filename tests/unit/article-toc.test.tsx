import { render, screen, within } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";

/**
 * Sidra na podnaslovima i sadržaj članka (docs/02 §3.1 ④).
 *
 * Dve stvari se ovde brane: da svaki link iz sadržaja pogodi postojeći `id` u
 * tekstu, i da cela stavka ostane bez klijentskog JavaScripta.
 *
 * Bez mreže. Sanity konfiguracija je mockovana, pa se stvarni project ID nigde
 * ne pojavljuje.
 */

vi.mock("@/sanity/env", () => ({
  readSanityConfig: () => ({
    projectId: "testprojekat1",
    dataset: "staging",
    apiVersion: "2026-08-05",
  }),
}));

import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleToc } from "@/components/content/ArticleToc";
import {
  collectBodyHeadings,
  slugifyHeading,
  headingIdByBlockIndex,
} from "@/sanity/headingId";

/** Minimalan Portable Text blok. */
function block(text: string, style = "normal") {
  return {
    _type: "block",
    style,
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  };
}

describe("slugifyHeading", () => {
  it("prevodi srpsku latinicu bez dijakritike", () => {
    expect(slugifyHeading("Šećer i žuč")).toBe("secer-i-zuc");
    expect(slugifyHeading("Đubrivo čini ćud")).toBe("dubrivo-cini-cud");
  });

  it("prevodi i velika slova sa dijakritikom", () => {
    expect(slugifyHeading("ČĆŠŽĐ")).toBe("ccszd");
  });

  it("upitnik i interpunkcija ne ulaze u adresu", () => {
    expect(slugifyHeading("Kako se tumače vrednosti?")).toBe(
      "kako-se-tumace-vrednosti",
    );
  });

  it("ne ostavlja vodeće ni prateće crtice", () => {
    const slug = slugifyHeading("  ...Šta dalje?!  ");
    expect(slug).toBe("sta-dalje");
    expect(slug.startsWith("-")).toBe(false);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("tekst bez upotrebljivog znaka daje prazan niz", () => {
    expect(slugifyHeading("???")).toBe("");
    expect(slugifyHeading("   ")).toBe("");
  });

  it("ne baca na ulazu koji nije string", () => {
    expect(slugifyHeading(undefined)).toBe("");
    expect(slugifyHeading(42)).toBe("");
    expect(slugifyHeading(null)).toBe("");
  });
});

describe("collectBodyHeadings", () => {
  it("uzima samo H2 i H3, redosledom pojavljivanja", () => {
    const headings = collectBodyHeadings([
      block("Uvodni pasus"),
      block("Prvi odeljak", "h2"),
      block("Pasus"),
      block("Pododeljak", "h3"),
      block("Drugi odeljak", "h2"),
    ]);

    expect(headings.map((h) => h.text)).toEqual([
      "Prvi odeljak",
      "Pododeljak",
      "Drugi odeljak",
    ]);
    expect(headings.map((h) => h.level)).toEqual(["h2", "h3", "h2"]);
  });

  /*
   * Isti podnaslov u dva odeljka nije greška u sadržaju. Bez sufiksa bi oba
   * linka vodila na prvi, pa bi polovina sadržaja tiho promašila.
   */
  it("ponovljen podnaslov dobija jedinstven id", () => {
    const headings = collectBodyHeadings([
      block("Kada se ponavlja nalaz?", "h2"),
      block("Kada se ponavlja nalaz?", "h2"),
      block("Kada se ponavlja nalaz?", "h3"),
    ]);

    const ids = headings.map((h) => h.id);
    expect(ids).toEqual([
      "kada-se-ponavlja-nalaz",
      "kada-se-ponavlja-nalaz-2",
      "kada-se-ponavlja-nalaz-3",
    ]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("podnaslov od same interpunkcije dobija rezervu sa rednim brojem", () => {
    const headings = collectBodyHeadings([block("Pasus"), block("???", "h2")]);

    expect(headings).toHaveLength(1);
    expect(headings[0]?.id).toBe("odeljak-2");
  });

  it("prazan podnaslov se preskače, ne dobija sidro", () => {
    const headings = collectBodyHeadings([
      { _type: "block", style: "h2", children: [{ text: "   " }] },
      block("Stvaran odeljak", "h2"),
    ]);

    expect(headings.map((h) => h.text)).toEqual(["Stvaran odeljak"]);
  });

  it("neispravan ulaz daje praznu listu, bez izuzetka", () => {
    expect(collectBodyHeadings(undefined)).toEqual([]);
    expect(collectBodyHeadings("tekst")).toEqual([]);
    expect(
      collectBodyHeadings([null, 7, { _type: "imageWithCaption" }]),
    ).toEqual([]);
  });

  it("mapa po rednom broju bloka pokazuje na iste id-jeve", () => {
    const body = [block("Pasus"), block("Odeljak", "h2")];
    const headings = collectBodyHeadings(body);
    const map = headingIdByBlockIndex(headings);

    expect(map.get(1)).toBe("odeljak");
    expect(map.get(0)).toBeUndefined();
  });
});

describe("ArticleToc", () => {
  const body = [
    block("Uvod"),
    block("Kako se tumače vrednosti?", "h2"),
    block("Šta znači granični nalaz", "h3"),
  ];

  it("prikazuje stavku po podnaslovu, sa naslovom bloka", () => {
    render(<ArticleToc headings={collectBodyHeadings(body)} />);

    const nav = screen.getByRole("navigation", { name: "Sadržaj članka" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((a) => a.textContent)).toEqual([
      "Kako se tumače vrednosti?",
      "Šta znači granični nalaz",
    ]);
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "#kako-se-tumace-vrednosti",
      "#sta-znaci-granicni-nalaz",
    ]);
  });

  /* docs/02 §3.2: prvih 600px pripada odgovoru, ne navigaciji. */
  it("podrazumevano je sklopljen", () => {
    const { container } = render(
      <ArticleToc headings={collectBodyHeadings(body)} />,
    );

    const details = container.querySelector("details");
    expect(details).not.toBeNull();
    expect(details?.hasAttribute("open")).toBe(false);
  });

  it("članak bez podnaslova ne prikazuje sadržaj uopšte", () => {
    const { container } = render(
      <ArticleToc headings={collectBodyHeadings([block("Samo pasus")])} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});

describe("Sidra u telu članka", () => {
  it("H2 i H3 dobijaju id koji odgovara sadržaju", () => {
    const body = [
      block("Uvod"),
      block("Kako se tumače vrednosti?", "h2"),
      block("Šta znači granični nalaz", "h3"),
    ];

    const { container } = render(<ArticleBody value={body} />);

    expect(
      container.querySelector("h2#kako-se-tumace-vrednosti"),
    ).not.toBeNull();
    expect(
      container.querySelector("h3#sta-znaci-granicni-nalaz"),
    ).not.toBeNull();
  });

  /*
   * Najvažniji test u fajlu: svaki link iz sadržaja mora da pogodi postojeći
   * element u tekstu. Ako se dve strane ikada raziđu, ovde pada.
   */
  it("svaki href iz sadržaja pogađa postojeći id u tekstu", () => {
    const body = [
      block("Uvod"),
      block("Šećer u krvi", "h2"),
      block("Pasus"),
      block("Šećer u krvi", "h2"),
      block("???", "h3"),
      block("Đačko pitanje", "h3"),
    ];
    const headings = collectBodyHeadings(body);

    const toc = render(<ArticleToc headings={headings} />);
    const hrefs = within(toc.container)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));

    const article = render(
      <ArticleBody value={body} headings={headings} />,
    ).container;

    expect(hrefs).toHaveLength(4);
    for (const href of hrefs) {
      expect(href?.startsWith("#")).toBe(true);
      expect(article.querySelector(`[id="${href?.slice(1)}"]`)).not.toBeNull();
    }
  });

  it("podnaslovi nose scroll-margin zbog lepljivog zaglavlja", () => {
    const { container } = render(
      <ArticleBody value={[block("Odeljak", "h2")]} />,
    );

    expect(container.querySelector("h2")?.className).toContain("scroll-mt-");
  });

  it("telo bez prosleđenih podnaslova samo izvede ista sidra", () => {
    const body = [block("Odeljak", "h2")];
    const withHeadings = render(
      <ArticleBody value={body} headings={collectBodyHeadings(body)} />,
    ).container.innerHTML;
    const withoutHeadings = render(<ArticleBody value={body} />).container
      .innerHTML;

    expect(withoutHeadings).toBe(withHeadings);
  });
});

describe("Bez klijentskog JavaScripta", () => {
  /*
   * Sklapanje nosi nativni `details`. Da neko kasnije doda `"use client"` zbog
   * upravljanja fokusom ili animacije, budžet skripte na članku (CLAUDE.md §10)
   * bi porastao zbog navigacije — a to je upravo ono što se ovde brani.
   */
  it("ArticleToc nije klijentska komponenta", async () => {
    const source = await readFile(
      "src/components/content/ArticleToc.tsx",
      "utf8",
    );

    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("useState");
    expect(source).not.toContain("onClick");
  });

  it("headingId je čist modul, bez React-a i bez mreže", async () => {
    const source = await readFile("src/sanity/headingId.ts", "utf8");

    expect(source).not.toContain("fetch(");
    expect(source).not.toContain("react");
  });
});
