import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GUIDE_PATH } from "@/site/preview";

/**
 * Zaglavlje sajta. Mobile-first, lepljivo na vrhu.
 *
 * U navigaciji stoje ISKLJUČIVO rute koje stvarno postoje.
 *
 * ⛔ `/partner-preview` namerno NIJE ovde. To je privatna prezentaciona
 * stranica kojoj se pristupa direktnim URL-om; u javnoj navigaciji bi je svaki
 * posetilac zatekao kao ravnopravnu stranicu sajta.
 *
 * ### Zašto nema mobilnog menija
 *
 * Na uskim ekranima brend i navigacija idu u DVA REDA (`flex-col`), a od 640px
 * u jedan (`sm:flex-row`). Prelom u dva reda rešava 320px bez ijedne linije
 * klijentskog JavaScripta — dok bi dugme za otvaranje menija tražilo stanje,
 * upravljanje fokusom i zatvaranje na Escape. Za tri stavke to je više
 * pokretnih delova nego koristi.
 *
 * Server komponenta: bez `"use client"`.
 */

/** Stavke glavne navigacije. Svaka vodi na postojeću rutu. */
const NAV_ITEMS = [
  { href: "/teme", label: "Teme" },
  { href: GUIDE_PATH, label: "Vodič" },
  { href: "/o-nama", label: "O nama" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex flex-col gap-1 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
        <Link
          href="/"
          className="font-sans text-base font-semibold text-primary no-underline sm:text-lg"
        >
          metabolickozdravlje.rs
        </Link>

        <nav aria-label="Glavna navigacija">
          {/*
           * `flex-wrap` je zaštita, ne osnovni plan: tri kratke stavke staju u
           * red i na 320px. Ako se pri uvećanom sistemskom fontu ne uklope,
           * prelome se umesto da izađu iz ekrana.
           */}
          <ul className="flex list-none flex-wrap items-center gap-x-5 gap-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-sans">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
