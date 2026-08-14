"use client";

import Link from "next/link";

/**
 * Sadržaj obe stranice za neočekivanu grešku.
 *
 * Postoji da se ista poruka ne bi pisala dvaput: `error.tsx` i
 * `global-error.tsx` razlikuju se samo po omotaču — jedan živi unutar
 * layout-a, drugi mora sam da napravi dokument.
 *
 * `"use client"` je ovde obavezan jer komponenta nosi dugme sa `onClick`, a
 * error boundary u Next-u ionako mora biti klijentska komponenta.
 *
 * ⛔ NIJEDAN tehnički podatak o grešci se ne prikazuje: ni poruka, ni stack, ni
 * `digest`, ni putanja, ni bilo šta o CMS-u. Korisniku ti podaci ne znače
 * ništa, a mogu odati detalje o sistemu. Greška se ne šalje nikuda — nema
 * logging servisa, telemetrije ni analitike.
 *
 * Povratak na početnu je običan link, ne drugo dugme — dugme pokreće radnju na
 * istoj stranici, link vodi na drugu adresu, i to razlikovanje mora ostati
 * vidljivo. Koristi se `next/link`, kao i na 404 stranici.
 *
 * Razmatrano je da to bude `<a>` radi punog učitavanja dokumenta, jer je ono
 * otpornije kada je greška u samom layout-u. Ovde ne donosi ništa: root layout
 * ne dohvata podatke, pa bi greška u njemu bila greška u kodu, koju ni ponovno
 * učitavanje ne popravlja. Glavni put oporavka je ionako „Pokušaj ponovo“.
 */
export function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="py-12">
      <h1>Stranica se trenutno ne može prikazati</h1>

      <p className="mt-4 max-w-[var(--container-prose)]">
        Došlo je do neočekivane greške. Sadržaj nije izgubljen — problem je u
        prikazu ove stranice.
      </p>

      <p className="mt-3 max-w-[var(--container-prose)]">
        Pokušajte ponovo. Ako se ponovi, vratite se na početnu stranu.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/*
         * Ovo je stvarno dugme, a ne link: ne vodi na drugu adresu nego pokreće
         * radnju na istoj stranici. Vidljiv fokus dolazi iz globalnog
         * `:focus-visible` pravila (globals.css), pa se ovde ne ponavlja.
         */}
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-sans font-semibold text-on-accent transition-colors duration-(--duration-color) ease-(--ease-standard) hover:bg-primary"
        >
          Pokušaj ponovo
        </button>

        <Link href="/">Nazad na početnu</Link>
      </div>
    </div>
  );
}
