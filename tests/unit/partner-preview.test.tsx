import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * Privatni partnerski preview.
 *
 * Ovaj fajl ne proverava da stranice „lepo izgledaju“ — proverava da ne mogu
 * da naprave štetu. Svaka tvrdnja ovde odgovara jednoj granici koju je vlasnik
 * postavio: nema naplate, nema prikupljanja podataka, nema pripisanog potpisa
 * autora, nema institucionalnog recenzenta i nema medicinskih pragova.
 *
 * ⛔ Sve provere rade nad RENDEROVANIM izlazom, nikada nad izvornim kodom.
 * Razlog je konkretan: fajlovi su puni komentara koji nabrajaju upravo ono što
 * je zabranjeno („bez checkout-a“, „bez ALMA-e“). Provera nad izvorom bi te
 * komentare prijavila kao prekršaj i postala nekorisna od prvog dana.
 */

// next/font je build-time transform; u testu ga zamenjujemo laganim mockom.
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter-mock", className: "" }),
  Source_Serif_4: () => ({ variable: "font-serif-mock", className: "" }),
}));

import AboutPage, { metadata as aboutMetadata } from "@/app/o-nama/page";
import AuthorPage, { metadata as authorMetadata } from "@/app/autor/page";
import MedicalReviewPage, {
  metadata as reviewMetadata,
} from "@/app/medicinska-recenzija/page";
import EditorialPolicyPage, {
  metadata as policyMetadata,
} from "@/app/uredjivacka-politika/page";
import GuidePage, {
  metadata as guideMetadata,
} from "@/app/vodic/metabolicko-zdravlje/page";
import PartnerPreviewPage, {
  metadata as partnerMetadata,
} from "@/app/partner-preview/page";
import { metadata as rootMetadata } from "@/app/layout";
import robots from "@/app/robots";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  GUIDE_PATH,
  GUIDE_PRICE_LABEL,
  GUIDE_STATUS,
  GUIDE_WORKING_TITLE,
  PLANNED_AUTHOR,
  PREVIEW_BADGE,
  SELLER_REGISTRATION_NUMBER,
  SELLER_TAX_ID,
} from "@/site/preview";
import { DEMO_BADGE, DEMO_TOPIC_CARDS } from "@/site/previewDemo";

/** Šest ruta koje ovaj zadatak uvodi, sa komponentom i naslovom. */
const PREVIEW_ROUTES = [
  { path: "/o-nama", Page: AboutPage, metadata: aboutMetadata },
  { path: "/autor", Page: AuthorPage, metadata: authorMetadata },
  {
    path: "/medicinska-recenzija",
    Page: MedicalReviewPage,
    metadata: reviewMetadata,
  },
  {
    path: "/uredjivacka-politika",
    Page: EditorialPolicyPage,
    metadata: policyMetadata,
  },
  { path: GUIDE_PATH, Page: GuidePage, metadata: guideMetadata },
  {
    path: "/partner-preview",
    Page: PartnerPreviewPage,
    metadata: partnerMetadata,
  },
] as const;

/** Rute koje projekat stvarno ima — ista lista kao u `launch-assets`. */
const POSTOJECE_RUTE = new Set([
  "/",
  "/teme",
  "/o-nama",
  "/autor",
  "/medicinska-recenzija",
  "/uredjivacka-politika",
  GUIDE_PATH,
  "/partner-preview",
]);

function renderPage(Page: () => React.JSX.Element) {
  return render(<Page />);
}

function internalHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a[href]"))
    .map((a) => a.getAttribute("href") ?? "")
    .filter((href) => href.startsWith("/") || href.startsWith("#"));
}

function externalHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a[href]"))
    .map((a) => a.getAttribute("href") ?? "")
    .filter((href) => !href.startsWith("/") && !href.startsWith("#"));
}

describe("Preview rute se renderuju", () => {
  for (const { path, Page } of PREVIEW_ROUTES) {
    it(`${path} se renderuje sa tačno jednim h1`, () => {
      const { container } = renderPage(Page);
      const naslovi = container.querySelectorAll("h1");
      expect(naslovi).toHaveLength(1);
      expect(naslovi[0].textContent?.trim().length).toBeGreaterThan(0);
    });
  }

  it("hijerarhija naslova ne preskače nivoe", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      const nivoi = Array.from(
        container.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      ).map((el) => Number(el.tagName.slice(1)));

      for (let i = 1; i < nivoi.length; i += 1) {
        // Nivo sme da opadne bilo koliko, ali sme da poraste samo za jedan.
        expect(
          nivoi[i] - nivoi[i - 1],
          `${path}: skok sa h${nivoi[i - 1]} na h${nivoi[i]}`,
        ).toBeLessThanOrEqual(1);
      }
      unmount();
    }
  });
});

describe("Oznaka preview-a", () => {
  for (const { path, Page } of PREVIEW_ROUTES) {
    it(`${path} nosi vidljivu oznaku „partnerski preview“`, () => {
      renderPage(Page);
      expect(screen.getByText(PREVIEW_BADGE)).toBeVisible();
    });
  }

  it("oznaka stoji na vrhu stranice, pre naslova", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      const oznaka = screen.getByText(PREVIEW_BADGE);
      const h1 = container.querySelector("h1");
      expect(h1).not.toBeNull();

      /*
       * `compareDocumentPosition` je jedini pouzdan način da se u jsdom-u
       * proveri redosled u dokumentu — layout ne postoji, pa se pozicija na
       * ekranu ne može izmeriti.
       */
      const position = oznaka.compareDocumentPosition(h1 as HTMLElement);
      expect(
        position & Node.DOCUMENT_POSITION_FOLLOWING,
        `${path}: oznaka nije pre naslova`,
      ).toBeTruthy();

      unmount();
    }
  });

  it("oznaka nije skrivena od čitača ekrana ni vizuelno", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { unmount } = renderPage(Page);
      const oznaka = screen.getByText(PREVIEW_BADGE);

      expect(oznaka.closest("[aria-hidden='true']"), path).toBeNull();
      expect(oznaka.className, path).not.toMatch(/sr-only|hidden/);

      unmount();
    }
  });

  it("stranica vodiča dodatno navodi da sadržaj čeka pregled", () => {
    renderPage(GuidePage);
    expect(
      screen.getByText(
        "Radni sadržaj čeka pregled autora i medicinsku recenziju.",
      ),
    ).toBeVisible();
  });
});

describe("Atribucija autora", () => {
  it("dr Snežana je označena kao planirani autor, uz obe kvalifikacije", () => {
    for (const Page of [AuthorPage, GuidePage]) {
      const { unmount } = renderPage(Page);

      expect(screen.getAllByText(PLANNED_AUTHOR.name).length).toBeGreaterThan(
        0,
      );
      expect(screen.getAllByText(PLANNED_AUTHOR.status).length).toBeGreaterThan(
        0,
      );

      unmount();
    }

    const { container } = renderPage(AuthorPage);
    for (const kvalifikacija of PLANNED_AUTHOR.credentials) {
      expect(container.textContent).toContain(kvalifikacija);
    }
  });

  /*
   * ⛔ Brava. Ove formulacije pripisuju potpis koji nije dat. Ako se ijedna
   * pojavi, PR ne prolazi — bez obzira na to koliko bi „prirodnije“ zvučala.
   */
  it("nigde ne tvrdi da je autor napisao ili odobrio tekst", () => {
    const ZABRANJENO = [
      "Autor: dr Snežana",
      "Autorka: dr Snežana",
      "Tekst napisala",
      "Napisala dr Snežana",
      "Medicinski odobreno",
      "Stručno recenzirano",
      "Recenzirala",
      "Odobrila dr",
    ];

    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      const tekst = container.textContent ?? "";

      for (const fraza of ZABRANJENO) {
        expect(
          tekst.toLowerCase(),
          `${path}: pronađena zabranjena formulacija „${fraza}“`,
        ).not.toContain(fraza.toLowerCase());
      }

      unmount();
    }
  });

  it("stranica autora izričito kaže da pregled nije obavljen", () => {
    const { container } = renderPage(AuthorPage);
    expect(container.textContent).toContain(PLANNED_AUTHOR.statusNote);
  });

  it("nema fotografije ni bilo koje slike autora", () => {
    const { container } = renderPage(AuthorPage);
    expect(container.querySelectorAll("img")).toHaveLength(0);
    expect(container.querySelectorAll("picture")).toHaveLength(0);
  });
});

describe("Institucionalni recenzent se ne pominje", () => {
  it("nijedna stranica ne pominje ALMA-u", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      const tekst = container.textContent ?? "";

      // Granica reči: sprečava lažnu uzbunu na rečima koje sadrže „alma“.
      expect(tekst, path).not.toMatch(/\bALMA\b/i);
      expect(tekst, path).not.toMatch(/adria\s+lifemed/i);
      expect(tekst, path).not.toMatch(/naučni\s+odbor/i);

      unmount();
    }
  });

  it("stranica o recenziji ne imenuje nijednu organizaciju kao recenzenta", () => {
    const { container } = renderPage(MedicalReviewPage);
    expect(container.textContent).toContain(
      "Organizacija bez imenovanog potpisnika ne može biti recenzent",
    );
  });
});

describe("Nema medicinskog sadržaja", () => {
  /**
   * Jedinice mere su pouzdaniji trag od brojeva: broj sam po sebi može biti
   * cena ili broj poglavlja, ali „mmol/L“ može biti samo laboratorijski prag.
   */
  const MEDICINSKE_JEDINICE =
    /mmol\s*\/\s*(l|mol)|mg\s*\/\s*dl|mmhg|\d\s*%|\bkg\s*\/\s*m²/i;

  it("nijedna stranica ne sadrži laboratorijski prag ni referentnu vrednost", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      expect(container.textContent, path).not.toMatch(MEDICINSKE_JEDINICE);
      unmount();
    }
  });

  it("nijedna stranica ne daje dijagnozu, dozu ni preporuku terapije", () => {
    /*
     * Tražimo TVRDNJU, ne pominjanje pojma. Stranice legitimno pišu da
     * dijagnozu ne postavljaju — a naivna pretraga reči „dijagnoza“ bi upravo
     * tu rečenicu prijavila kao prekršaj.
     *
     * ⚠️ Granice reči (`\b`) nisu ukras. `textContent` spaja tekst preko
     * granica elemenata bez razmaka, pa „…u pripremi“ + „Materijal…“ postaje
     * „pripremiMaterijal“ — što bez granica sadrži „imate“ i obara test na
     * potpuno bezazlenoj rečenici. Ovo se stvarno dogodilo pri pisanju.
     */
    const TVRDNJE =
      /\b(imate|bolujete od|vaš nalaz (pokazuje|znači)|dijagnostikovan[ao]? vam je)\b/i;
    const DOZIRANJE = /\b\d+\s*(mg|g|ml|IU|mcg)\b/i;

    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      const tekst = container.textContent ?? "";
      expect(tekst, path).not.toMatch(TVRDNJE);
      expect(tekst, path).not.toMatch(DOZIRANJE);
      unmount();
    }
  });

  it("poglavlja vodiča su navedena samo naslovima", () => {
    const { container } = renderPage(GuidePage);
    const spisak = container.querySelector("#poglavlja");
    expect(spisak).not.toBeNull();

    const stavke = (spisak as HTMLElement).querySelectorAll("ol > li");
    expect(stavke).toHaveLength(16);
  });
});

describe("Nema naplate, formi ni praćenja", () => {
  it("nijedna stranica nema formu, polje za unos ni dugme", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      expect(container.querySelectorAll("form"), path).toHaveLength(0);
      expect(container.querySelectorAll("input"), path).toHaveLength(0);
      expect(container.querySelectorAll("textarea"), path).toHaveLength(0);
      expect(container.querySelectorAll("select"), path).toHaveLength(0);
      // Bez ijednog dugmeta — dakle ni aktivnog „Kupi“.
      expect(container.querySelectorAll("button"), path).toHaveLength(0);

      unmount();
    }
  });

  it("nijedna stranica ne vodi na spoljnu adresu, pa ni na naplatu", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      expect(externalHrefs(container), path).toHaveLength(0);
      unmount();
    }
  });

  it("nema poziva na kupovinu, checkout ni platni sistem", () => {
    const ZABRANJENO = [
      "checkout",
      "korpa",
      "plati",
      "plaćanje karticom",
      "raiffeisen",
      "newsletter",
      "prijavite se",
      "unesite",
    ];

    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);
      const tekst = (container.textContent ?? "").toLowerCase();

      for (const fraza of ZABRANJENO) {
        expect(tekst, `${path}: „${fraza}“`).not.toContain(fraza);
      }

      unmount();
    }
  });

  it("stranica vodiča kaže da kupovina još nije dostupna", () => {
    renderPage(GuidePage);
    expect(
      screen.getByText("Kupovina će biti dostupna nakon završetka pregleda."),
    ).toBeVisible();
  });

  it("nema skripti, iframe-ova ni piksela za praćenje", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      expect(container.querySelectorAll("script"), path).toHaveLength(0);
      expect(container.querySelectorAll("iframe"), path).toHaveLength(0);
      expect(container.querySelectorAll("noscript"), path).toHaveLength(0);
      // Prazna slika 1×1 je klasičan tracking piksel; slika uopšte nema.
      expect(container.querySelectorAll("img"), path).toHaveLength(0);

      unmount();
    }
  });
});

describe("Cena", () => {
  it("dolazi iz jednog serverskog izvora i svuda je ista", () => {
    const stranice = [GuidePage, PartnerPreviewPage];
    const pronadjene: string[] = [];

    for (const Page of stranice) {
      const { container, unmount } = renderPage(Page);
      const tekst = container.textContent ?? "";

      expect(tekst).toContain(GUIDE_PRICE_LABEL);
      pronadjene.push(...(tekst.match(/[\d.]+\s*RSD/g) ?? []));

      unmount();
    }

    // Nijedan drugi iznos se ne pojavljuje — ni stariji, ni ručno upisan.
    expect(pronadjene.length).toBeGreaterThan(0);
    for (const iznos of pronadjene) {
      expect(iznos).toBe(GUIDE_PRICE_LABEL);
    }
  });

  it("stoji uz status „u pripremi“, a ne uz radnju", () => {
    const { container } = renderPage(GuidePage);
    const sekcija = container.querySelector(
      "section[aria-labelledby='status-vodica']",
    );
    expect(sekcija).not.toBeNull();

    const blok = within(sekcija as HTMLElement);
    expect(blok.getByText(GUIDE_PRICE_LABEL)).toBeVisible();
    expect(blok.getByText(GUIDE_STATUS)).toBeVisible();
    expect((sekcija as HTMLElement).querySelectorAll("a")).toHaveLength(0);
  });
});

describe("Demo sadržaj", () => {
  it("svaka demo kartica nosi oznaku da nije objavljena", () => {
    const { container } = renderPage(PartnerPreviewPage);
    const mreza = container.querySelector("#model-sadrzaja");
    expect(mreza).not.toBeNull();

    const kartice = (mreza as HTMLElement).querySelectorAll("ul > li");
    expect(kartice).toHaveLength(DEMO_TOPIC_CARDS.length);

    for (const kartica of kartice) {
      expect(kartica.textContent).toContain(DEMO_BADGE);
    }
  });

  it("demo kartice nisu linkovi — nemaju gde da vode", () => {
    const { container } = renderPage(PartnerPreviewPage);
    const mreza = container.querySelector("#model-sadrzaja") as HTMLElement;
    expect(mreza.querySelectorAll("a")).toHaveLength(0);
  });

  it("demo opisi su pitanja, ne odgovori", () => {
    for (const kartica of DEMO_TOPIC_CARDS) {
      expect(kartica.question.trim().endsWith("?")).toBe(true);
    }
  });
});

describe("Navigacija", () => {
  it("svaka interna veza vodi na rutu koja postoji", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      const veze = internalHrefs(container);
      expect(veze.length, `${path}: nema nijednu internu vezu`).toBeGreaterThan(
        0,
      );

      for (const href of veze) {
        if (href.startsWith("#")) continue;
        expect(POSTOJECE_RUTE.has(href), `${path} → ${href}`).toBe(true);
      }

      unmount();
    }
  });

  it("zaglavlje vodi na vodič i o nama, ali NE na partnerski preview", () => {
    const { container } = render(<Header />);
    const veze = internalHrefs(container);

    expect(veze).toContain("/teme");
    expect(veze).toContain(GUIDE_PATH);
    expect(veze).toContain("/o-nama");
    expect(veze).not.toContain("/partner-preview");
  });

  it("podnožje vodi na sve javne preview stranice, ali NE na partnerski preview", () => {
    const { container } = render(<Footer />);
    const veze = internalHrefs(container);

    for (const ruta of [
      "/teme",
      GUIDE_PATH,
      "/o-nama",
      "/autor",
      "/medicinska-recenzija",
      "/uredjivacka-politika",
    ]) {
      expect(veze, `podnožje ne vodi na ${ruta}`).toContain(ruta);
    }

    expect(veze).not.toContain("/partner-preview");
  });

  it("podnožje navodi potvrđene poslovne podatke", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain(SELLER_TAX_ID);
    expect(container.textContent).toContain(SELLER_REGISTRATION_NUMBER);
  });

  it("podnožje ne obećava pravne stranice kojih nema", () => {
    const { container } = render(<Footer />);
    const veze = internalHrefs(container).join(" ");

    for (const nepostojeca of [
      "/kontakt",
      "/privatnost",
      "/uslovi",
      "/povracaj",
    ]) {
      expect(veze).not.toContain(nepostojeca);
    }
  });
});

describe("Zabrana indeksiranja ostaje", () => {
  it("globalni noindex je i dalje aktivan", () => {
    expect(rootMetadata.robots).toEqual({ index: false, follow: false });
  });

  it("robots.txt i dalje blokira sve", () => {
    const rule = robots().rules as { userAgent?: string; disallow?: unknown };
    expect(rule.userAgent).toBe("*");
    expect(rule.disallow).toBe("/");
  });

  it("nijedna preview stranica ne uključuje indeksiranje", () => {
    for (const { path, metadata } of PREVIEW_ROUTES) {
      const robotsMeta = metadata.robots;
      if (robotsMeta === undefined || robotsMeta === null) continue;

      expect(robotsMeta, path).toMatchObject({ index: false });
    }
  });

  it("partnerski preview ima sopstvenu zabranu i nema kanonsku adresu", () => {
    expect(partnerMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
    // Kanonska adresa je izjava da je stranica javna verzija sadržaja.
    expect(partnerMetadata.alternates?.canonical).toBeUndefined();
  });
});

describe("Prelom i pristupačnost", () => {
  /**
   * ⚠️ jsdom nema layout engine — širina se ne može izmeriti.
   *
   * Zato se ovde proverava STRUKTURNI uslov koji prelivanje sprečava: da
   * nijedan element nema fiksnu širinu u pikselima i da širok sadržaj ima svoj
   * kontejner sa horizontalnim skrolom. Stvarni prelom na 320px proveren je
   * ručno, u pregledaču, i to je zabeleženo u PR-u.
   */
  it("nijedan element nema fiksnu širinu u pikselima", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      for (const el of container.querySelectorAll<HTMLElement>("[class]")) {
        expect(el.className, `${path}: ${el.className}`).not.toMatch(
          /\bw-\[\d+px\]|\bmin-w-\[\d+px\]/,
        );
      }

      unmount();
    }
  });

  it("tabela u uređivačkoj politici ima sopstveni horizontalni skrol", () => {
    const { container } = renderPage(EditorialPolicyPage);
    const tabela = container.querySelector("table");
    expect(tabela).not.toBeNull();

    const omotac = (tabela as HTMLElement).closest(
      "[class*='overflow-x-auto']",
    );
    expect(omotac).not.toBeNull();
  });

  it("nijedan element ne uklanja vidljiv fokus", () => {
    for (const { path, Page } of PREVIEW_ROUTES) {
      const { container, unmount } = renderPage(Page);

      for (const el of container.querySelectorAll<HTMLElement>("[class]")) {
        expect(el.className, `${path}: ${el.className}`).not.toMatch(
          /outline-none|outline-hidden/,
        );
      }

      unmount();
    }
  });

  it("maketa korica je dekorativna i ne duplira naslov čitaču ekrana", () => {
    const { container } = renderPage(GuidePage);

    const maketa = container.querySelector("[aria-hidden='true']");
    expect(maketa).not.toBeNull();
    expect(maketa?.textContent).toContain(GUIDE_WORKING_TITLE);

    // Naslov postoji i kao pravi tekst, izvan dekoracije.
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toBe(GUIDE_WORKING_TITLE);
  });
});
