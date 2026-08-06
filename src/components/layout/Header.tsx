import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Zaglavlje sajta. Mobile-first, visina ~56px, lepljivo na vrhu.
 *
 * Sadrži tekstualni brend koji vodi na `/` i glavnu navigaciju. U navigaciji
 * stoje ISKLJUČIVO rute koje stvarno postoje — trenutno je to samo „Teme“.
 * Ostale stavke iz docs/02 §2.2 (Pitanja, Rečnik, Vodiči, O nama) dodaju se
 * kada te stranice budu napravljene.
 *
 * Server komponenta: bez `"use client"`, bez mobilnog menija i bez ijedne
 * linije klijentskog JS-a. Dva linka staju na 320px, pa toggle nije potreban.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-sans text-base font-semibold text-primary no-underline sm:text-lg"
        >
          metabolickozdravlje.rs
        </Link>

        <nav aria-label="Glavna navigacija">
          <ul className="flex list-none items-center gap-4">
            <li>
              <Link href="/teme" className="font-sans">
                Teme
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
