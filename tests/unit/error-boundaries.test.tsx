import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RouteError from "@/app/error";
import GlobalError from "@/app/global-error";
import { HTML_LANG } from "@/site/config";

/**
 * Stranice za neočekivanu grešku.
 *
 * Dve stvari se ovde brane: da dugme „Pokušaj ponovo“ zaista pokuša ponovo, i
 * da nijedan tehnički podatak o grešci ne procuri korisniku.
 */

/** Greška sa svim poljima koja NE smeju da se pojave na ekranu. */
function technicalError(): Error & { digest?: string } {
  const error = new Error("Neuspeo upit ka bazi: tabela clanci ne postoji");
  error.stack =
    "Error: Neuspeo upit\n    at /srv/app/.next/server/chunks/4711.js:12:9";
  return Object.assign(error, { digest: "3141592653589793" });
}

/** Tekstovi koji ni u jednom obliku ne smeju da se nađu u ispisu. */
const LEAKS = [
  "Neuspeo upit",
  "tabela clanci",
  "3141592653589793",
  ".next/server",
  "/srv/app",
  "Error:",
];

describe("error.tsx — greška unutar rute", () => {
  it("ima tačno jedan h1, na srpskom", () => {
    render(<RouteError error={technicalError()} retry={vi.fn()} />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toBe(
      "Stranica se trenutno ne može prikazati",
    );
  });

  it("objašnjava šta se desilo, običnim jezikom", () => {
    render(<RouteError error={technicalError()} retry={vi.fn()} />);

    expect(
      screen.getByText(/Došlo je do neočekivane greške/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pokušajte ponovo/)).toBeInTheDocument();
  });

  it("nudi običan link ka početnoj", () => {
    render(<RouteError error={technicalError()} retry={vi.fn()} />);

    const link = screen.getByRole("link", { name: "Nazad na početnu" });
    expect(link.getAttribute("href")).toBe("/");
  });

  it("klik na „Pokušaj ponovo“ poziva oporavak tačno jednom", () => {
    const retry = vi.fn();
    render(<RouteError error={technicalError()} retry={retry} />);

    fireEvent.click(screen.getByRole("button", { name: "Pokušaj ponovo" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  /* ⛔ Najvažniji test: tehnički detalji su za log, ne za čitaoca. */
  it("ne prikazuje poruku, stack ni digest greške", () => {
    const { container } = render(
      <RouteError error={technicalError()} retry={vi.fn()} />,
    );

    for (const leak of LEAKS) {
      expect(container.textContent).not.toContain(leak);
    }
  });

  it("dugme je stvarno dugme, ne link", () => {
    render(<RouteError error={technicalError()} retry={vi.fn()} />);

    const button = screen.getByRole("button", { name: "Pokušaj ponovo" });
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
  });
});

describe("global-error.tsx — greška u root layout-u", () => {
  /*
   * `<html>` i `<body>` se ne mogu proveriti renderom: React ih ne ugrađuje u
   * `<div>` kontejner koji Testing Library pravi, pa u jsdom-u ne postoje.
   * Zato se zahtev — sopstveni dokument sa ispravnim jezikom — proverava nad
   * izvorom i nad vrednošću koju izvor koristi.
   */
  it("nosi sopstveni dokument sa jezikom sr-Latn-RS", async () => {
    const { readFile } = await import("node:fs/promises");
    const source = await readFile("src/app/global-error.tsx", "utf8");

    expect(source).toContain("<html lang={HTML_LANG}>");
    expect(source).toContain("<body>");
    expect(HTML_LANG).toBe("sr-Latn-RS");
  });

  it("ima tačno jedan h1", () => {
    const { container } = render(
      <GlobalError error={technicalError()} retry={vi.fn()} />,
    );

    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("nudi isti oporavak: dugme i link ka početnoj", () => {
    const retry = vi.fn();
    const { container } = render(
      <GlobalError error={technicalError()} retry={retry} />,
    );

    const button = within(container).getByRole("button", {
      name: "Pokušaj ponovo",
    });
    fireEvent.click(button);
    expect(retry).toHaveBeenCalledTimes(1);

    expect(
      within(container)
        .getByRole("link", { name: "Nazad na početnu" })
        .getAttribute("href"),
    ).toBe("/");
  });

  it("ne prikazuje poruku, stack ni digest greške", () => {
    const { container } = render(
      <GlobalError error={technicalError()} retry={vi.fn()} />,
    );

    for (const leak of LEAKS) {
      expect(container.textContent).not.toContain(leak);
    }
  });
});

describe("Granice ne šalju grešku nikuda", () => {
  it("nijedan boundary fajl ne poziva mrežu ni logging servis", async () => {
    const { readFile } = await import("node:fs/promises");

    for (const path of [
      "src/app/error.tsx",
      "src/app/global-error.tsx",
      "src/components/ui/ErrorFallback.tsx",
    ]) {
      const source = await readFile(path, "utf8");

      expect(source).not.toContain("fetch(");
      expect(source).not.toContain("navigator.sendBeacon");
      expect(source).not.toContain("console.error");
      expect(source).not.toContain("error.digest");
      expect(source).not.toContain("error.message");
    }
  });
});
