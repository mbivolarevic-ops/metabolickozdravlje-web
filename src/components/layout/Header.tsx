import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Zaglavlje sajta. Mobile-first, visina ~56px, lepljivo na vrhu.
 * Sadrži samo tekstualni brend „Metaboličko zdravlje" koji vodi na `/`.
 * Puna navigacija i mobilni meni dolaze kada postoje stvarne stranice
 * (docs/02 §2.2). Server komponenta — bez klijentskog JS-a.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-14 items-center">
        <Link
          href="/"
          className="font-sans text-lg font-semibold text-primary no-underline"
        >
          Metaboličko zdravlje
        </Link>
      </Container>
    </header>
  );
}
