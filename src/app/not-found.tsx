import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Globalna 404 stranica.
 *
 * Nudi tačno dva izlaza, oba postoje: početnu i pregled tema. Bez pretrage
 * (ne postoji) i bez linka ka ruti koja ne postoji.
 *
 * Ne otkriva šta je traženo i ne pominje CMS ni tehničke detalje. Nema
 * nijedne medicinske tvrdnje — 404 nije mesto za sadržaj.
 *
 * Specifične 404 stranice za temu i članak ostaju kakve jesu: one govore
 * konkretnije („Tema nije pronađena“, „Tekst nije pronađen“), što je čitaocu
 * korisnije od opšte poruke.
 */
export default function NotFound() {
  return (
    <Container className="py-12">
      <h1>Stranica nije pronađena</h1>
      <p className="mt-4 max-w-[var(--container-prose)]">
        Adresa koju ste otvorili ne postoji ili više nije dostupna.
      </p>
      <ul className="mt-6 grid list-none gap-2">
        <li>
          <Link href="/">Nazad na početnu</Link>
        </li>
        <li>
          <Link href="/teme">Pogledajte sve teme</Link>
        </li>
      </ul>
    </Container>
  );
}
