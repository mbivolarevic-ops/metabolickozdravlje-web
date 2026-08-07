import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Offline testovi početne stranice.
 *
 * Content sloj je mockovan — bez mreže i bez Sanity zavisnosti. Podaci su
 * sintetički: „Test tema“, „test-tema“, „Test članak“, „test-clanak“.
 *
 * Prethodna verzija ovog fajla pokrivala je privremenu početnu stranicu koja
 * nije imala nijedan link ni sadržaj iz CMS-a. Ta stranica više ne postoji;
 * provere koje i dalje imaju smisla (jedan H1, hijerarhija naslova, zabranjeni
 * izrazi, bez sopstvenog `main`) prenete su i proširene.
 */

const getTopics = vi.fn();
const getHomepageArticles = vi.fn();

vi.mock("@/sanity/content", () => ({
  getTopics: () => getTopics(),
  getHomepageArticles: () => getHomepageArticles(),
}));

vi.mock("@/sanity/env", () => ({
  readSanityConfig: () => ({
    projectId: "testprojekat1",
    dataset: "staging",
    apiVersion: "2026-08-05",
  }),
}));

// `next/font` je build-time transform; u testu ga zamenjujemo laganim mockom,
// jer se layout uvozi samo zbog provere globalnog `noindex`.
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter-mock", className: "" }),
  Source_Serif_4: () => ({ variable: "font-serif-mock", className: "" }),
}));

import HomePage, { metadata } from "@/app/page";
import { metadata as rootMetadata } from "@/app/layout";

/**
 * Izrazi koji se nikada ne prikazuju korisniku.
 * Izvor: docs/03 §5.4, docs/04 §6.3, §8.2 i §14.6.
 */
const ZABRANJENI_IZRAZI = [
  "šokantno",
  "neverovatno",
  "tajna",
  "ubica",
  "morate",
  "vi treba da",
  "čudotvorno",
  "revolucionarno",
  "proboj",
  "dokazano je",
  "loša hrana",
  "greh",
  "varanje",
  "lekari ne govore o ovome",
  "za 30 dana",
  "nedostatak volje",
  "disciplina",
  "izgovori",
  "čista ishrana",
  "naravno, svi znaju",
  "vi to možete",
  "hajde da naučimo",
  "garantovano",
  "izlečenje",
  "najbolje",
  "submit",
  "validation error",
  "authentication",
  "verify account",
  "consent management",
  "cta",
  "download asset",
  "loading",
  "error 404",
  "session expired",
  "opt-in",
  "subscribe",
  "dashboard",
  "toggle",
  "accordion",
  "modal",
  "banner",
  "cookie policy",
  "required field",
  "invalid input",
];

const TOPIC = {
  _id: "topic-1",
  title: "Test tema",
  slug: "test-tema",
  intro: "Ovo je sintetički opis za test.",
  order: 1,
};

const FEATURED_IMAGE = {
  alt: "Sintetički opis naslovne slike",
  caption: "Potpis.",
  credit: "Sintetički izvor",
  crop: { top: 0.1, bottom: 0.1, left: 0.2, right: 0.2 },
  hotspot: { x: 0.5, y: 0.4, width: 0.5, height: 0.5 },
  asset: {
    _id: "image-abc1234567890abcdef1234567890abcdef1234-1600x900-jpg",
    dimensions: { width: 1600, height: 900 },
  },
};

const ARTICLE = {
  _id: "article-1",
  title: "Test članak",
  slug: "test-clanak",
  excerpt: "Ovo je sintetički opis za test.",
  reviewDate: "2026-08-05",
  cluster: { title: "Test tema", slug: "test-tema" },
  featuredImage: null,
};

function topics(count: number) {
  return Array.from({ length: count }, (_unused, index) => ({
    ...TOPIC,
    _id: `topic-${index + 1}`,
    title: `Test tema ${index + 1}`,
    slug: `test-tema-${index + 1}`,
  }));
}

function articles(count: number) {
  return Array.from({ length: count }, (_unused, index) => ({
    ...ARTICLE,
    _id: `article-${index + 1}`,
    title: `Test članak ${index + 1}`,
    slug: `test-clanak-${index + 1}`,
  }));
}

/** Prazna početna je podrazumevano stanje projekta danas. */
function prazno() {
  getTopics.mockResolvedValue([]);
  getHomepageArticles.mockResolvedValue([]);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("Statička struktura", () => {
  it("prikazuje tačno jedan H1, sa odobrenom porukom", async () => {
    prazno();
    const { container } = render(await HomePage());

    const h1 = container.querySelectorAll("h1");
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(
      "Metaboličko zdravlje, objašnjeno jasno i bez osude.",
    );
  });

  it("prikazuje eyebrow i uvodni tekst heroja", async () => {
    prazno();
    render(await HomePage());

    expect(screen.getByText("Nezavisna edukativna platforma")).toBeVisible();
    expect(
      screen.getByText(/Pouzdane informacije o gojaznosti, šećeru u krvi/),
    ).toBeVisible();
  });

  it("hero nudi oba izlaza, i oba postoje", async () => {
    prazno();
    render(await HomePage());

    expect(
      screen.getByRole("link", { name: "Istražite teme" }),
    ).toHaveAttribute("href", "/teme");
    expect(
      screen.getByRole("link", { name: "Kako proveravamo sadržaj" }),
    ).toHaveAttribute("href", "#kako-proveravamo");
  });

  it("prikazuje sve četiri stavke trake poverenja", async () => {
    prazno();
    render(await HomePage());

    /*
     * Upit je vezan za sekciju: „Stručna provera“ se namerno pojavljuje i u
     * metodologiji, kao korak postupka. Isti pojam na dva mesta nije greška —
     * traka kaže ŠTA važi, metodologija KAKO se sprovodi.
     */
    const traka = screen.getByRole("region", {
      name: "Po čemu se ovaj sadržaj razlikuje",
    });

    for (const stavka of [
      "Stručna provera",
      "Jasno navedeni izvori",
      "Datum poslednje provere",
      "Bez stigme i osuđivanja",
    ]) {
      expect(within(traka).getByText(stavka)).toBeVisible();
    }
  });

  it("prikazuje anti-stigma sekciju u odobrenoj formulaciji", async () => {
    prazno();
    const { container } = render(await HomePage());

    expect(
      screen.getByRole("heading", {
        name: "Metaboličko zdravlje nije pitanje karaktera.",
      }),
    ).toBeVisible();
    expect(container).toHaveTextContent(
      "Na telesnu masu i metaboličko zdravlje utiču biologija, genetika, okruženje, san, mentalno zdravlje, životne okolnosti i ponašanje.",
    );
    expect(container).toHaveTextContent(
      "Cilj platforme nije da osuđuje, već da pomogne ljudima da razumeju svoje zdravlje i mogućnosti podrške.",
    );
  });

  it("prikazuje pregled pristupa, bez favorizovanja i bez mrtvih linkova", async () => {
    prazno();
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Ne postoji samo jedan put.",
    });

    for (const oblast of [
      "Ishrana i svakodnevne navike",
      "Fizička aktivnost",
      "San i mentalno zdravlje",
      "Lekovi",
      "Barijatrijska i metabolička hirurgija",
      "Dugoročno praćenje",
    ]) {
      expect(within(sekcija).getByText(oblast)).toBeVisible();
    }

    // Oblasti su informativne stavke; odredišta još ne postoje.
    expect(within(sekcija).queryAllByRole("link")).toHaveLength(0);
  });

  it("prikazuje metodologiju sa sidrom iz heroja", async () => {
    prazno();
    const { container } = render(await HomePage());

    const sekcija = container.querySelector("#kako-proveravamo");
    expect(sekcija).not.toBeNull();

    for (const korak of [
      "Jasno autorstvo",
      "Stručna provera",
      "Izvori i ažuriranje",
    ]) {
      expect(within(sekcija as HTMLElement).getByText(korak)).toBeVisible();
    }
    expect(
      within(sekcija as HTMLElement).getByRole("link", {
        name: "Pogledajte teme",
      }),
    ).toHaveAttribute("href", "/teme");
  });

  it("najava procene ne nudi nijednu radnju", async () => {
    prazno();
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Procena metaboličkog zdravlja",
    });

    expect(within(sekcija).getByText("U pripremi")).toBeVisible();
    expect(
      within(sekcija).getByText(/Procena neće postavljati dijagnozu/),
    ).toBeVisible();

    expect(within(sekcija).queryAllByRole("link")).toHaveLength(0);
    expect(within(sekcija).queryAllByRole("button")).toHaveLength(0);
    expect(within(sekcija).queryAllByRole("textbox")).toHaveLength(0);
  });

  it("prikazuje završni CTA", async () => {
    prazno();
    render(await HomePage());

    expect(
      screen.getByRole("heading", {
        name: "Počnite od teme koja vam je važna.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Pogledajte sve teme" }),
    ).toHaveAttribute("href", "/teme");
  });

  it("nema forme, polja za unos ni prikupljanja podataka", async () => {
    prazno();
    const { container } = render(await HomePage());

    expect(container.querySelectorAll("form")).toHaveLength(0);
    expect(container.querySelectorAll("input")).toHaveLength(0);
    expect(container.querySelectorAll("textarea")).toHaveLength(0);
    expect(container.querySelectorAll("select")).toHaveLength(0);
    expect(container.querySelectorAll('[type="email"]')).toHaveLength(0);
    expect(container.querySelectorAll('[type="tel"]')).toHaveLength(0);
  });

  it("ne vodi ni na jednu rutu koja ne postoji", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    const { container } = render(await HomePage());

    const dozvoljene = [
      "/teme",
      "/teme/test-tema",
      "/tekstovi/test-clanak",
      "#kako-proveravamo",
    ];

    for (const link of container.querySelectorAll("a[href]")) {
      expect(dozvoljene).toContain(link.getAttribute("href"));
    }
  });

  it("nigde ne pominje kviz ni procenu kao dostupnu radnju", async () => {
    prazno();
    const { container } = render(await HomePage());

    const hrefs = Array.from(container.querySelectorAll("a[href]")).map((a) =>
      a.getAttribute("href"),
    );
    for (const href of hrefs) {
      expect(href).not.toMatch(/kviz|procena|upitnik|test-metabolizma/i);
    }
  });

  it("ne renderuje sopstveni <main> — landmark dolazi iz layout-a", async () => {
    prazno();
    const { container } = render(await HomePage());
    expect(container.querySelector("main")).toBeNull();
  });

  it("vidljivi tekst ne sadrži nijedan zabranjen izraz", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    const { container } = render(await HomePage());

    const tekst = (container.textContent ?? "").toLowerCase();
    expect(ZABRANJENI_IZRAZI.filter((izraz) => tekst.includes(izraz))).toEqual(
      [],
    );
  });

  it("globalni noindex je i dalje aktivan", () => {
    expect(rootMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("metadata početne ne izmišlja OG sliku ni kanonsku adresu", () => {
    expect(metadata.title).toBe(
      "Metaboličko zdravlje, objašnjeno jasno i bez osude",
    );
    expect(metadata.description).toContain("Pouzdane informacije");
    expect(metadata.openGraph).toBeUndefined();
    expect(metadata.alternates).toBeUndefined();
  });
});

describe("Teme", () => {
  it("prikazuje validne teme sa tačnim linkovima", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", { name: "Istražite teme" });
    expect(
      within(sekcija).getByRole("link", { name: "Test tema" }),
    ).toHaveAttribute("href", "/teme/test-tema");
    expect(
      within(sekcija).getByText("Ovo je sintetički opis za test."),
    ).toBeVisible();
  });

  it("prikazuje najviše šest tema", async () => {
    getTopics.mockResolvedValue(topics(9));
    getHomepageArticles.mockResolvedValue([]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", { name: "Istražite teme" });
    expect(within(sekcija).getAllByRole("listitem")).toHaveLength(6);
  });

  it("zadržava urednički redosled iz loadera", async () => {
    getTopics.mockResolvedValue(topics(3));
    getHomepageArticles.mockResolvedValue([]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", { name: "Istražite teme" });
    const naslovi = within(sekcija)
      .getAllByRole("listitem")
      .map((item) => item.querySelector("h3")?.textContent);

    expect(naslovi).toEqual(["Test tema 1", "Test tema 2", "Test tema 3"]);
  });

  it("prazna lista daje namerno prazno stanje, ne praznu mrežu", async () => {
    prazno();
    render(await HomePage());

    const sekcija = screen.getByRole("region", { name: "Istražite teme" });
    expect(within(sekcija).getByText(/Prve teme se pripremaju/)).toBeVisible();
    expect(within(sekcija).queryByRole("list")).toBeNull();

    // Veza ka pregledu tema ostaje i u praznom stanju.
    expect(
      within(sekcija).getByRole("link", { name: "Pregled svih tema" }),
    ).toHaveAttribute("href", "/teme");
  });

  it("greška iz loadera se propagira, ne postaje prazno stanje", async () => {
    getTopics.mockRejectedValue(new Error("upit pogrešnog oblika"));
    getHomepageArticles.mockResolvedValue([]);

    await expect(HomePage()).rejects.toThrow("upit pogrešnog oblika");
  });
});

describe("Nedavno provereni tekstovi", () => {
  it("prikazuje temu, naslov, sažetak i datum provere", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    const kartica = within(sekcija).getByRole("listitem");

    expect(within(kartica).getByText("Test tema")).toBeVisible();
    expect(
      within(kartica).getByRole("link", { name: "Test članak" }),
    ).toHaveAttribute("href", "/tekstovi/test-clanak");
    expect(kartica).toHaveTextContent("Ovo je sintetički opis za test.");
    expect(kartica).toHaveTextContent("5. avgust 2026.");
    expect(kartica.querySelector("time")).toHaveAttribute(
      "datetime",
      "2026-08-05",
    );
  });

  it("prikazuje najviše tri teksta", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue(articles(3));
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    expect(within(sekcija).getAllByRole("listitem")).toHaveLength(3);
  });

  it("zadržava redosled po datumu provere koji dolazi iz loadera", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([
      {
        ...ARTICLE,
        _id: "a1",
        title: "Najskoriji",
        slug: "a1",
        reviewDate: "2026-08-05",
      },
      {
        ...ARTICLE,
        _id: "a2",
        title: "Srednji",
        slug: "a2",
        reviewDate: "2026-07-01",
      },
      {
        ...ARTICLE,
        _id: "a3",
        title: "Najstariji",
        slug: "a3",
        reviewDate: "2026-01-15",
      },
    ]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    const naslovi = within(sekcija)
      .getAllByRole("listitem")
      .map((item) => item.querySelector("h3")?.textContent);

    expect(naslovi).toEqual(["Najskoriji", "Srednji", "Najstariji"]);
  });

  it("prikazuje validnu naslovnu sliku sa Sanity CDN-a i alt tekstom", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([
      { ...ARTICLE, featuredImage: FEATURED_IMAGE },
    ]);
    render(await HomePage());

    const slika = screen.getByRole("img", {
      name: "Sintetički opis naslovne slike",
    });
    const src = decodeURIComponent(slika.getAttribute("src") ?? "");
    expect(src).toContain("cdn.sanity.io/images/testprojekat1/staging/");
    expect(src).toContain("rect=");
  });

  it("članak bez slike se prikazuje uredno, bez praznog okvira", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    expect(within(sekcija).queryAllByRole("img")).toHaveLength(0);
    expect(
      within(sekcija).getByRole("link", { name: "Test članak" }),
    ).toBeVisible();
  });

  it("malformirana slika ne pravi pokvarenu karticu", async () => {
    // Loader ovakav članak i ne propušta; ovo je odbrana same komponente.
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([
      { ...ARTICLE, featuredImage: { alt: "Opis bez asseta" } },
    ]);
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    expect(within(sekcija).queryAllByRole("img")).toHaveLength(0);
    expect(
      within(sekcija).getByRole("link", { name: "Test članak" }),
    ).toBeVisible();
  });

  it("prazna lista daje namerno prazno stanje", async () => {
    prazno();
    render(await HomePage());

    const sekcija = screen.getByRole("region", {
      name: "Nedavno stručno provereni tekstovi",
    });
    expect(
      within(sekcija).getByText(
        "Prvi stručno provereni tekstovi su u pripremi.",
      ),
    ).toBeVisible();
    expect(within(sekcija).queryByRole("list")).toBeNull();
  });

  it("greška iz loadera članaka se propagira", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockRejectedValue(
      new Error("Sanity upit „nedavno provereni članci“ nije vratio listu."),
    );

    await expect(HomePage()).rejects.toThrow(/nije vratio listu/);
  });
});

describe("Pristupačnost", () => {
  it("posle H1 idu samo H2 sekcije, bez preskoka", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    const { container } = render(await HomePage());

    const nivoi = Array.from(
      container.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).map((el) => Number(el.tagName.slice(1)));

    expect(nivoi[0]).toBe(1);
    for (let i = 1; i < nivoi.length; i += 1) {
      expect(nivoi[i] - nivoi[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it("svaka sekcija ima pristupačan naziv", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    const { container } = render(await HomePage());

    const sekcije = Array.from(container.querySelectorAll("section"));
    expect(sekcije.length).toBeGreaterThanOrEqual(8);

    for (const sekcija of sekcije) {
      const id = sekcija.getAttribute("aria-labelledby");
      expect(id).not.toBeNull();
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("nema dva susedna linka istog imena i odredišta", async () => {
    getTopics.mockResolvedValue([TOPIC]);
    getHomepageArticles.mockResolvedValue([ARTICLE]);
    render(await HomePage());

    const linkovi = screen
      .getAllByRole("link")
      .map((a) => `${a.textContent?.trim()}→${a.getAttribute("href")}`);

    for (let i = 1; i < linkovi.length; i += 1) {
      expect(linkovi[i]).not.toBe(linkovi[i - 1]);
    }
  });

  it("svaka slika ima alt atribut", async () => {
    getTopics.mockResolvedValue([]);
    getHomepageArticles.mockResolvedValue([
      { ...ARTICLE, featuredImage: FEATURED_IMAGE },
    ]);
    const { container } = render(await HomePage());

    const slike = Array.from(container.querySelectorAll("img"));
    expect(slike.length).toBeGreaterThan(0);
    for (const slika of slike) {
      expect(slika).toHaveAttribute("alt");
      expect(slika.getAttribute("alt")).not.toBe("");
    }
  });

  it("dekorativni elementi su skriveni od čitača ekrana", async () => {
    prazno();
    const { container } = render(await HomePage());

    const dekoracija = container.querySelectorAll('[aria-hidden="true"]');
    expect(dekoracija.length).toBeGreaterThan(0);
    for (const el of dekoracija) {
      expect(el.querySelector("a, button, input")).toBeNull();
    }
  });

  it("imena CTA linkova razumljiva su i van konteksta", async () => {
    prazno();
    render(await HomePage());

    for (const ime of [
      "Istražite teme",
      "Kako proveravamo sadržaj",
      "Pregled svih tema",
      "Pogledajte teme",
      "Pogledajte sve teme",
    ]) {
      expect(screen.getByRole("link", { name: ime })).toBeVisible();
    }

    // Nijedno ime linka se ne ponavlja na stranici.
    const imena = screen.getAllByRole("link").map((a) => a.textContent?.trim());
    expect(new Set(imena).size).toBe(imena.length);

    // Nijedan link se ne zove „ovde“, „klikni“ i slično.
    for (const link of screen.getAllByRole("link")) {
      expect(link.textContent?.trim()).not.toMatch(
        /^(ovde|klikni|klik|više|detaljnije|pročitaj)$/i,
      );
    }
  });
});
