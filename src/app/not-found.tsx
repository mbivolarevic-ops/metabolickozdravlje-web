import type { Metadata } from "next";
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
 *
 * Naslov dokumenta dolazi iz `metadata` izvoza. Bez njega tab nasleđuje naslov
 * početne strane, pa istorija brauzera tvrdi da je korisnik bio na početnoj — a
 * nije.
 *
 * Probano je i preko React elementa `<title>`: ne radi. Next iz globalnog
 * metadata već emituje `<title>` ranije u dokumentu, brauzer koristi PRVI, a
 * hidratacija doda još jedan — tri elementa, i pogrešan naslov u tabu.
 *
 * `noindex` i odsustvo kanonske adrese se ne diraju: `noindex` dolazi iz
 * globalnog metadata i iz Next-ovog automatskog ponašanja za 404, a kanonske
 * adrese ovde nema jer nijedna stranica ne može da je tvrdi (ADR-0006 §5).
 */
export const metadata: Metadata = {
  title: "Stranica nije pronađena",
};

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
