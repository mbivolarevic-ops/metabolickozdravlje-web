import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MedicalDisclaimer,
  ReferenceList,
  ReviewerByline,
  type ReferenceListItem,
} from "@/components/medical";
import { toSafeExternalUrl } from "@/components/medical/safeUrl";
import { formatReviewDate } from "@/components/medical/formatReviewDate";

/**
 * Offline testovi medicinskih komponenti.
 *
 * Svi podaci su OČIGLEDNO SINTETIČKI: „Dr Test Recenzent“, „Primer medicinske
 * publikacije“, `https://example.org/...`. Nema stvarnih lekara, publikacija,
 * smernica ni medicinskih tvrdnji. Nema mrežnih poziva.
 */

const REVIEWER = {
  name: "Dr Test Recenzent",
  credentials: "TEST PODATAK — nije stvarna kvalifikacija",
  reviewDate: "2026-08-05",
};

describe("ReviewerByline", () => {
  it("1 — prikazuje oznaku stručnog pregleda", () => {
    render(<ReviewerByline {...REVIEWER} />);
    expect(screen.getByText(/Stručno proverio:/)).toBeInTheDocument();
  });

  it("2 — prikazuje ime i kvalifikacije", () => {
    render(<ReviewerByline {...REVIEWER} />);
    expect(screen.getByText("Dr Test Recenzent")).toBeInTheDocument();
    expect(
      screen.getByText("TEST PODATAK — nije stvarna kvalifikacija"),
    ).toBeInTheDocument();
  });

  it("3 — prikazuje pravilno formatiran datum na srpskoj latinici", () => {
    render(<ReviewerByline {...REVIEWER} />);
    expect(screen.getByText("5. avgust 2026.")).toBeInTheDocument();
    expect(screen.getByText(/Poslednja provera:/)).toBeInTheDocument();
  });

  it("3b — datum je i mašinski čitljiv", () => {
    const { container } = render(<ReviewerByline {...REVIEWER} />);
    const time = container.querySelector("time");
    expect(time).toHaveAttribute("datetime", "2026-08-05");
  });

  it("4 — datum je stabilan bez obzira na vremensku zonu", () => {
    // Datum se rastavlja ručno i nikada ne prolazi kroz lokalnu zonu, pa
    // ponoć po UTC-u ne može da „padne“ na prethodni dan.
    expect(formatReviewDate("2026-01-01")).toBe("1. januar 2026.");
    expect(formatReviewDate("2026-12-31")).toBe("31. decembar 2026.");
    expect(formatReviewDate("2026-08-05")).toBe("5. avgust 2026.");
  });

  it("4b — formatReviewDate odbija neispravne datume", () => {
    for (const value of ["2026-02-31", "05.08.2026.", "juče", ""]) {
      expect(formatReviewDate(value)).toBeNull();
    }
  });

  it("validni podaci prikazuju kompletan potpis", () => {
    const { container } = render(<ReviewerByline {...REVIEWER} />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.textContent).toContain("Stručno proverio:");
    expect(container.textContent).toContain("Dr Test Recenzent");
    expect(container.textContent).toContain("5. avgust 2026.");
  });
});

/**
 * „Fail closed“ — delimičan potpis stručnog pregleda gori je od izostanka
 * potpisa, jer bi poručio da je tekst pregledan a ne bi rekao ko i kada.
 */
describe("ReviewerByline — fail closed", () => {
  it.each([
    ["nevalidan datum", { reviewDate: "nepoznato" }],
    ["nemoguć datum 2026-02-31", { reviewDate: "2026-02-31" }],
    ["datum u pogrešnom obliku", { reviewDate: "05.08.2026." }],
    ["prazan datum", { reviewDate: "" }],
    ["prazno ime", { name: "" }],
    ["ime od samih razmaka", { name: "   " }],
    ["prazne kvalifikacije", { credentials: "" }],
    ["kvalifikacije od samih razmaka", { credentials: "  \t " }],
  ])("%s → prazan render", (_label, override) => {
    const { container } = render(
      <ReviewerByline {...REVIEWER} {...override} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("nevalidna sirova vrednost se nigde ne pojavljuje u DOM-u", () => {
    const { container } = render(
      <ReviewerByline {...REVIEWER} reviewDate="nepoznato" />,
    );
    expect(container.textContent).not.toContain("nepoznato");
    expect(container.querySelector("time")).toBeNull();
    expect(screen.queryByText(/Stručno proverio:/)).toBeNull();
    expect(screen.queryByText("Dr Test Recenzent")).toBeNull();
  });

  it("ne prikazuje delimičan potpis kada nedostaju kvalifikacije", () => {
    const { container } = render(
      <ReviewerByline {...REVIEWER} credentials="   " />,
    );
    expect(container.textContent).not.toContain("Dr Test Recenzent");
    expect(container.textContent).not.toContain("Poslednja provera");
  });

  it("ne tvrdi da je recenzent autor teksta", () => {
    const { container } = render(<ReviewerByline {...REVIEWER} />);
    expect(container.textContent).not.toMatch(/autor/i);
  });

  it("nema linka ka profilu dok ruta ne postoji", () => {
    const { container } = render(<ReviewerByline {...REVIEWER} />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});

describe("MedicalDisclaimer", () => {
  it("5 — prikazuje tačan odobren tekst", () => {
    // Tekst se proverava kroz renderovanu komponentu, a ne uvozom konstante:
    // formulacija nije deo javnog API-ja i rute je ne smeju koristiti.
    const { container } = render(<MedicalDisclaimer />);
    expect(
      screen.getByText(
        "Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.",
      ),
    ).toBeInTheDocument();
    expect(container.textContent?.trim()).toBe(
      "Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.",
    );
  });

  it("6 — koristi aside semantiku sa pristupačnim nazivom", () => {
    const { container } = render(<MedicalDisclaimer />);
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside).toHaveAttribute("aria-label", "Medicinska napomena");
    expect(
      screen.getByRole("complementary", { name: "Medicinska napomena" }),
    ).toBeInTheDocument();
  });

  it("7 — nema nepostojećih linkova", () => {
    const { container } = render(<MedicalDisclaimer />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});

const FULL_REFERENCE: ReferenceListItem = {
  label: "Primer medicinske publikacije",
  url: "https://example.org/test-source",
  publisher: "Primer izdavača",
  year: 2026,
};

describe("ReferenceList", () => {
  it("8 — koristi numerisanu listu", () => {
    const { container } = render(
      <ReferenceList references={[FULL_REFERENCE]} />,
    );
    expect(container.querySelector("ol")).not.toBeNull();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Izvori" })).toBeInTheDocument();
  });

  it("9 — prikazuje potpun izvor sa izdavačem i godinom", () => {
    render(<ReferenceList references={[FULL_REFERENCE]} />);
    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("Primer medicinske publikacije");
    expect(item).toHaveTextContent("Primer izdavača");
    expect(item).toHaveTextContent("2026");
  });

  it("10 — bezbedan HTTPS URL postaje link", () => {
    render(<ReferenceList references={[FULL_REFERENCE]} />);
    const link = screen.getByRole("link", {
      name: "Primer medicinske publikacije",
    });
    expect(link).toHaveAttribute("href", "https://example.org/test-source");
  });

  it("11 — bezbedan HTTP URL postaje link", () => {
    render(
      <ReferenceList
        references={[{ label: "Primer", url: "http://example.org/a" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Primer" })).toHaveAttribute(
      "href",
      "http://example.org/a",
    );
  });

  it.each([
    ["12 — javascript:", "javascript:alert(1)"],
    ["13 — data:", "data:text/html;base64,PHNjcmlwdD4="],
    ["13b — file:", "file:///etc/passwd"],
    ["14 — relativna putanja", "/interna/putanja"],
    ["14b — bez sheme", "//example.org/a"],
    ["14c — neispravan URL", "ovo nije url"],
    ["14d — prazan", "   "],
  ])("%s ne postaje link", (_label, url) => {
    const { container } = render(
      <ReferenceList references={[{ label: "Sporan izvor", url }]} />,
    );
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("15 — tekst izvora ostaje vidljiv i kada URL nije dozvoljen", () => {
    render(
      <ReferenceList
        references={[
          {
            label: "Primer medicinske publikacije",
            url: "javascript:alert(1)",
            publisher: "Primer izdavača",
            year: 2026,
          },
        ]}
      />,
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("Primer medicinske publikacije");
    expect(item).toHaveTextContent("Primer izdavača");
    expect(within(item).queryByRole("link")).toBeNull();
  });

  it("15b — izvor bez URL-a se i dalje prikazuje", () => {
    render(<ReferenceList references={[{ label: "Izvor bez veze" }]} />);
    expect(screen.getByText("Izvor bez veze")).toBeInTheDocument();
  });

  it("16 — spoljni link se otvara u istom tabu", () => {
    render(<ReferenceList references={[FULL_REFERENCE]} />);
    const link = screen.getByRole("link", {
      name: "Primer medicinske publikacije",
    });
    expect(link).not.toHaveAttribute("target");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });

  it("17 — prazna lista ne renderuje ništa", () => {
    // Objavljiv članak uvek ima bar jedan kompletan izvor (GROQ filter +
    // isDisplayableArticle). Prazna lista znači grešku uzvodno, a naslov
    // „Izvori“ bez ijedne stavke poručivao bi da izvora nema.
    const { container } = render(<ReferenceList references={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("toSafeExternalUrl", () => {
  it.each(["https://example.org/a", "http://example.org/b"])(
    "prihvata %s",
    (url) => {
      expect(toSafeExternalUrl(url)).not.toBeNull();
    },
  );

  it.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "data:text/plain,x",
    "file:///c:/tmp",
    "/relativna",
    "//example.org",
    "example.org",
    "",
    "   ",
  ])("odbija %p", (url) => {
    expect(toSafeExternalUrl(url)).toBeNull();
  });

  it.each([null, undefined, 42, {}, []])(
    "neispravan tip %p bezbedno vraća null",
    (value) => {
      expect(() => toSafeExternalUrl(value)).not.toThrow();
      expect(toSafeExternalUrl(value)).toBeNull();
    },
  );
});
