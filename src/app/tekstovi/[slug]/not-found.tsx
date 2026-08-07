import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * 404 za nepostojeći, neobjavljen ili neprikaziv tekst.
 *
 * Ne otkriva šta je traženo, ne razlikuje „ne postoji“ od „ne sme da se
 * prikaže“, i ne pominje CMS ni tehničke detalje. Jedini izlaz je nazad na
 * pregled tema.
 */
export default function ArticleNotFound() {
  return (
    <Container className="py-12">
      <h1>Tekst nije pronađen</h1>
      <p className="mt-4 max-w-[var(--container-prose)]">
        Ovaj tekst ne postoji ili više nije dostupan.
      </p>
      <p className="mt-6">
        <Link href="/teme">Nazad na sve teme</Link>
      </p>
    </Container>
  );
}
