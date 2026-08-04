import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("Početna stranica (smoke test)", () => {
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
        "Edukativna platforma o metaboličkom zdravlju je u pripremi.",
      ),
    ).toBeInTheDocument();
  });

  it("ne renderuje sopstveni <main> (glavni landmark dolazi iz layout-a)", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("main")).toHaveLength(0);
  });
});
