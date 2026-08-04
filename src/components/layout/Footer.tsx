import { Container } from "@/components/ui/Container";

/**
 * Podnožje sajta. Sadrži puno ime platforme, vidljiv medicinski disclaimer
 * (docs/02 §2.2 ⑧ i §9.4) i godinu izvedenu na serveru. Bez linkova ka
 * stranicama koje još ne postoje. Server komponenta — bez klijentskog JS-a.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border">
      <Container className="py-8">
        <p className="font-sans text-base font-semibold text-text">
          Edukativni studio — Centar za metaboličko zdravlje (CMZ)
        </p>
        <p className="mt-3 max-w-[var(--container-prose)] text-text">
          Sadržaj je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju
          koju određuje vaš lekar.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          © {year} Centar za metaboličko zdravlje
        </p>
      </Container>
    </footer>
  );
}
