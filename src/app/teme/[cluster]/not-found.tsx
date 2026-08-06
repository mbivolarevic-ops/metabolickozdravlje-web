import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * 404 za nepostojeću ili nevalidnu temu.
 *
 * Ne otkriva šta je traženo, ne pominje CMS ni tehničke detalje, i ne nudi
 * linkove ka rutama koje ne postoje. Jedini izlaz je nazad na `/teme`.
 */
export default function TopicNotFound() {
  return (
    <Container className="py-12">
      <h1>Tema nije pronađena</h1>
      <p className="mt-4 max-w-[var(--container-prose)]">
        Ova tema ne postoji ili više nije dostupna.
      </p>
      <p className="mt-6">
        <Link href="/teme">Nazad na sve teme</Link>
      </p>
    </Container>
  );
}
