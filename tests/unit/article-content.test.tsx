import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Offline testovi prikaza tela članka: Portable Text, slika, video, putanja.
 *
 * Bez mreže. Sanity konfiguracija je mockovana sintetičkim projektom, pa se
 * stvarni project ID nigde ne pojavljuje.
 */

vi.mock("@/sanity/env", () => ({
  readSanityConfig: () => ({
    projectId: "testprojekat1",
    dataset: "staging",
    apiVersion: "2026-08-05",
  }),
}));

import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleImage } from "@/components/content/ArticleImage";
import { VideoEmbed } from "@/components/content/VideoEmbed";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";

/** Minimalan Portable Text blok sa jednim tekstualnim detetom. */
function block(
  text: string,
  style = "normal",
  extra: Record<string, unknown> = {},
) {
  return {
    _type: "block",
    _key: `k-${text.slice(0, 8)}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text, marks: [] }],
    ...extra,
  };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("ArticleBody — struktura teksta", () => {
  it("renderuje pasuse, H2 i H3, a nijedan H1", () => {
    const { container } = render(
      <ArticleBody
        value={[
          block("Uvodni pasus.", "normal"),
          block("Podnaslov drugog nivoa", "h2"),
          block("Podnaslov trećeg nivoa", "h3"),
        ]}
      />,
    );

    expect(container.querySelectorAll("h1")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Podnaslov drugog nivoa",
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Podnaslov trećeg nivoa",
    );
    expect(container.querySelector("p")).toHaveTextContent("Uvodni pasus.");
  });

  it("renderuje listu sa tačkama i numerisanu listu", () => {
    const { container } = render(
      <ArticleBody
        value={[
          { ...block("Prva stavka"), listItem: "bullet", level: 1 },
          { ...block("Druga stavka"), listItem: "number", level: 1 },
        ]}
      />,
    );

    expect(container.querySelector("ul")).toHaveTextContent("Prva stavka");
    expect(container.querySelector("ol")).toHaveTextContent("Druga stavka");
  });

  it("renderuje citat kao blockquote", () => {
    const { container } = render(
      <ArticleBody value={[block("Navod iz izvora.", "blockquote")]} />,
    );

    expect(container.querySelector("blockquote")).toHaveTextContent(
      "Navod iz izvora.",
    );
  });

  it("renderuje podebljano i kurziv semantički", () => {
    const { container } = render(
      <ArticleBody
        value={[
          {
            _type: "block",
            _key: "k1",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "s1", text: "važno", marks: ["strong"] },
              { _type: "span", _key: "s2", text: "naglašeno", marks: ["em"] },
            ],
          },
        ]}
      />,
    );

    expect(container.querySelector("strong")).toHaveTextContent("važno");
    expect(container.querySelector("em")).toHaveTextContent("naglašeno");
  });

  it("prazna ili neispravna vrednost ne renderuje ništa", () => {
    const { container } = render(<ArticleBody value={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ArticleBody — linkovi", () => {
  function withLink(href: string) {
    return [
      {
        _type: "block",
        _key: "k1",
        style: "normal",
        markDefs: [{ _key: "l1", _type: "link", href }],
        children: [
          { _type: "span", _key: "s1", text: "tekst veze", marks: ["l1"] },
        ],
      },
    ];
  }

  it("interna veza ostaje interna i bez `rel`", () => {
    render(<ArticleBody value={withLink("/teme/test-tema")} />);

    const link = screen.getByRole("link", { name: "tekst veze" });
    expect(link).toHaveAttribute("href", "/teme/test-tema");
    expect(link).not.toHaveAttribute("rel");
  });

  it("spoljna veza dobija `rel` i ostaje u istom tabu", () => {
    render(<ArticleBody value={withLink("https://primer.rs/izvor")} />);

    const link = screen.getByRole("link", { name: "tekst veze" });
    expect(link).toHaveAttribute("href", "https://primer.rs/izvor");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
    expect(link).not.toHaveAttribute("target");
  });

  it("nebezbedna veza se ne renderuje kao link, ali tekst ostaje", () => {
    render(<ArticleBody value={withLink("javascript:alert(1)")} />);

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("tekst veze")).toBeVisible();
  });
});

describe("ArticleImage", () => {
  const IMAGE = {
    _type: "imageWithCaption",
    asset: {
      _ref: "image-abc1234567890abcdef1234567890abcdef1234-1200x675-jpg",
    },
    alt: "Grafikon kretanja vrednosti kroz vreme",
    caption: "Opis ispod slike.",
    credit: "Sintetički izvor",
  };

  it("prikazuje sliku sa opisom, potpisom i izvorom", () => {
    const { container } = render(<ArticleImage value={IMAGE} />);

    const image = screen.getByRole("img", {
      name: "Grafikon kretanja vrednosti kroz vreme",
    });
    expect(image).toBeVisible();

    const figure = container.querySelector("figure");
    expect(figure).not.toBeNull();
    expect(
      within(figure as HTMLElement).getByText(/Opis ispod slike/),
    ).toBeVisible();
    expect(figure).toHaveTextContent("Izvor: Sintetički izvor");
  });

  it("adresa slike ide na Sanity CDN i nosi tražene dimenzije", () => {
    render(<ArticleImage value={IMAGE} />);

    const src = screen.getByRole("img").getAttribute("src") ?? "";
    const decoded = decodeURIComponent(src);

    expect(decoded).toContain("cdn.sanity.io/images/testprojekat1/staging/");
    expect(decoded).toContain("w=1200");
    expect(decoded).toContain("h=675");
  });

  it("poštuje izabrani isečak i fokus (`crop` i `hotspot`)", () => {
    render(
      <ArticleImage
        value={{
          ...IMAGE,
          crop: { top: 0.1, bottom: 0.1, left: 0.2, right: 0.2 },
          hotspot: { x: 0.5, y: 0.4, width: 0.5, height: 0.5 },
        }}
      />,
    );

    const decoded = decodeURIComponent(
      screen.getByRole("img").getAttribute("src") ?? "",
    );

    // Builder isečak upisuje kao `rect` — bez njega bi izbor urednika nestao.
    expect(decoded).toContain("rect=");
  });

  it("ne renderuje sliku bez opisa", () => {
    const { container } = render(
      <ArticleImage value={{ ...IMAGE, alt: "  " }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("ne renderuje sliku bez asseta", () => {
    const { container } = render(
      <ArticleImage value={{ alt: "Opis", caption: "Potpis" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("VideoEmbed", () => {
  const VIDEO = {
    provider: "youtube",
    url: "https://www.youtube.com/watch?v=abcdefghij1",
    title: "Sintetički naslov videa",
    transcript: "Prva rečenica transkripta.",
    caption: "Potpis ispod videa.",
  };

  it("ne učitava iframe pre klika i nudi dugme", () => {
    const { container } = render(<VideoEmbed value={VIDEO} />);

    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("button", { name: /Prikaži video/ })).toBeVisible();
  });

  it("transkript je dostupan i pre učitavanja videa", () => {
    render(<VideoEmbed value={VIDEO} />);

    expect(screen.getByText("Transkript videa")).toBeVisible();
    expect(screen.getByText("Prva rečenica transkripta.")).toBeInTheDocument();
  });

  it("posle klika učitava iframe sa sastavljenom adresom i naslovom", () => {
    const { container } = render(<VideoEmbed value={VIDEO} />);

    fireEvent.click(screen.getByRole("button", { name: /Prikaži video/ }));

    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/abcdefghij1",
    );
    expect(iframe).toHaveAttribute("title", "Sintetički naslov videa");
    expect(iframe?.getAttribute("src")).not.toContain("autoplay");
    expect(iframe?.getAttribute("allow") ?? "").not.toContain("autoplay");
  });

  it("ne renderuje ništa bez transkripta", () => {
    const { container } = render(
      <VideoEmbed value={{ ...VIDEO, transcript: "" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("ne renderuje ništa bez naslova", () => {
    const { container } = render(
      <VideoEmbed value={{ ...VIDEO, title: "" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("ne renderuje ništa za nedozvoljen izvor", () => {
    const { container } = render(
      <VideoEmbed value={{ ...VIDEO, url: "https://napadac.rs/embed/zlo" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ArticleBody — ugrađeni medij", () => {
  it("renderuje sliku i video iz tela", () => {
    const { container } = render(
      <ArticleBody
        value={[
          block("Pasus pre slike."),
          {
            _type: "imageWithCaption",
            _key: "img1",
            asset: {
              _ref: "image-abc1234567890abcdef1234567890abcdef1234-1200x675-jpg",
            },
            alt: "Sintetički opis slike",
          },
          {
            _type: "videoEmbed",
            _key: "vid1",
            provider: "vimeo",
            url: "https://vimeo.com/123456789",
            title: "Sintetički video",
            transcript: "Transkript.",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Sintetički opis slike" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: /Prikaži video/ })).toBeVisible();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("nepoznat tip bloka se ne renderuje", () => {
    // Do rutera ovakvo telo i ne stiže — `isRenderableBody()` ga odbija ranije.
    const { container } = render(
      <ArticleBody
        value={[{ _type: "priceTable", _key: "p1", cena: "999" }]}
      />,
    );

    expect(container.textContent).not.toContain("999");
  });
});

describe("Breadcrumbs", () => {
  it("poslednja stavka nije link i označena je kao tekuća stranica", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Teme", href: "/teme" },
          { label: "Test tema" },
        ]}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Test tema")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("ima pristupačan naziv navigacije", () => {
    render(<Breadcrumbs items={[{ label: "Početna", href: "/" }]} />);
    expect(screen.getByRole("navigation", { name: "Putanja" })).toBeVisible();
  });

  it("prazna lista ne renderuje ništa", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
