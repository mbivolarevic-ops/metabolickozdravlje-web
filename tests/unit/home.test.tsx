import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

/**
 * Zabranjene reči i konstrukcije koje se nikada ne prikazuju korisniku.
 * Izvor: docs/03 §5.4, docs/04 §6.3, §8.2 i §14.6 (unija — §14.6 ispušta
 * „cookie policy" koji §6.3 navodi).
 */
const ZABRANJENI_IZRAZI = [
  // docs/03 §5.4 — senzacija, naređivanje, obećanje rezultata
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
  // docs/04 §8.2 i §14.6 — moralizovanje, krivica, lažno ohrabrivanje
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
  // docs/04 §6.3 i §14.6 — digitalni žargon u vidljivom tekstu
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

function vidljivTekst(container: HTMLElement): string {
  return (container.textContent ?? "").toLowerCase();
}

describe("Početna stranica", () => {
  it("prikazuje naslov platforme kao jedini h1", () => {
    render(<HomePage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Metaboličko zdravlje");
  });

  it("prikazuje statusnu poruku bez medicinskih tvrdnji", () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        "Pripremamo edukativnu platformu o metaboličkom zdravlju.",
      ),
    ).toBeInTheDocument();
  });

  it("ne renderuje sopstveni <main> (glavni landmark dolazi iz layout-a)", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("main")).toHaveLength(0);
  });

  it("ne preskače nivoe naslova", () => {
    const { container } = render(<HomePage />);
    const nivoi = Array.from(
      container.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).map((el) => Number(el.tagName.slice(1)));

    expect(nivoi[0]).toBe(1);
    for (let i = 1; i < nivoi.length; i += 1) {
      expect(nivoi[i] - nivoi[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it("hero jasno označava da je sadržaj u pripremi", () => {
    const { container } = render(<HomePage />);
    const hero = container.querySelector<HTMLElement>(
      'section[aria-labelledby="naslov-platforme"]',
    );
    expect(hero).not.toBeNull();

    const uHerou = within(hero as HTMLElement);
    expect(uHerou.getByText("Sadržaj je u pripremi")).toBeInTheDocument();
    expect(
      uHerou.getByText(
        "Tekstovi još nisu objavljeni. Ova stranica prikazuje strukturu i način rada platforme.",
      ),
    ).toBeInTheDocument();
  });

  it("renderuje tri principa poverenja", () => {
    const { container } = render(<HomePage />);
    const sekcija = container.querySelector<HTMLElement>(
      'section[aria-labelledby="principi"]',
    );
    expect(sekcija).not.toBeNull();

    const principi = within(sekcija as HTMLElement);
    for (const princip of [
      "Stručna provera",
      "Navedeni izvori",
      "Bez senzacionalizma",
    ]) {
      expect(principi.getByText(princip)).toBeInTheDocument();
    }
    // tačno tri principa u traci
    expect((sekcija as HTMLElement).querySelectorAll("li")).toHaveLength(3);
  });

  it("renderuje ulazne tačke i teme koje se pripremaju", () => {
    render(<HomePage />);
    // ulazne tačke
    expect(screen.getByText("Imam nalaz koji ne razumem")).toBeInTheDocument();
    expect(
      screen.getByText("Teško regulišem telesnu masu"),
    ).toBeInTheDocument();
    expect(screen.getByText("U porodici ima dijabetesa")).toBeInTheDocument();
    // teme
    for (const tema of [
      "Laboratorijske analize",
      "Insulinska rezistencija",
      "Predijabetes",
      "Metabolički sindrom",
      "Masna jetra",
    ]) {
      expect(screen.getByText(tema)).toBeInTheDocument();
    }
  });

  it("nijedna kartica nije link ni dugme", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.querySelectorAll('[role="link"]')).toHaveLength(0);
    expect(container.querySelectorAll('[role="button"]')).toHaveLength(0);
  });

  it("kartice tema na početnoj nisu linkovi", () => {
    const { container } = render(<HomePage />);
    /*
     * Ruta `/teme` sada postoji i vodi se iz zaglavlja, ali kartice na
     * početnoj ostaju obične: to su PLANIRANE teme čiji CMS slug-ovi još
     * nisu potvrđeni, pa bi link vodio na nagađanu adresu.
     */
    expect(container.querySelectorAll("a[href]")).toHaveLength(0);
  });

  it("vidljivi tekst ne sadrži nijedan zabranjen izraz", () => {
    const { container } = render(<HomePage />);
    const tekst = vidljivTekst(container);
    const pronadjeni = ZABRANJENI_IZRAZI.filter((izraz) =>
      tekst.includes(izraz),
    );
    expect(pronadjeni).toEqual([]);
  });
});
