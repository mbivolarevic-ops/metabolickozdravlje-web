import { render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// next/font je build-time transform; u testu ga zamenjujemo laganim mockom.
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter-mock", className: "" }),
  Source_Serif_4: () => ({ variable: "font-serif-mock", className: "" }),
}));

import RootLayout from "@/app/layout";

function renderLayout() {
  return render(
    <RootLayout>
      <p>Testni sadržaj strane</p>
    </RootLayout>,
  );
}

describe("Okvir sajta (layout chrome)", () => {
  it("skip-link je prvi link u dokumentu i vodi na #glavni-sadrzaj", () => {
    const { container } = renderLayout();
    const firstLink = container.querySelector("a");
    expect(firstLink).not.toBeNull();
    expect(firstLink).toHaveTextContent("Pređi na glavni sadržaj");
    expect(firstLink).toHaveAttribute("href", "#glavni-sadrzaj");
  });

  it("postoji tačno jedan <main> sa id 'glavni-sadrzaj'", () => {
    const { container } = renderLayout();
    const mains = container.querySelectorAll("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]).toHaveAttribute("id", "glavni-sadrzaj");
  });

  it("zaglavlje sadrži funkcionalni početni link sa brendom", () => {
    const { container } = renderLayout();
    const header = container.querySelector("header");
    expect(header).not.toBeNull();
    const homeLink = within(header as HTMLElement).getByRole("link", {
      name: "Metaboličko zdravlje",
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("podnožje sadrži puno ime platforme i vidljiv medicinski disclaimer", () => {
    const { container } = renderLayout();
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(footer).toHaveTextContent(
      "Edukativni studio — Centar za metaboličko zdravlje (CMZ)",
    );
    expect(footer).toHaveTextContent(
      "Sadržaj je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.",
    );
  });

  it("nema linkova ka nepostojećim rutama (dozvoljeno samo '/' i '#glavni-sadrzaj')", () => {
    const { container } = renderLayout();
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href"),
    );
    const allowed = new Set(["/", "#glavni-sadrzaj"]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(allowed.has(href ?? "")).toBe(true);
    }
  });
});
