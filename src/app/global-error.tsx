"use client";

import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { HTML_LANG } from "@/site/config";
import "@/styles/globals.css";

/**
 * Greška u root layout-u.
 *
 * Ova granica zamenjuje root layout, pa mora sama da napravi dokument: Next za
 * `global-error` izričito traži sopstvene `<html>` i `<body>` elemente. Iz istog
 * razloga ovde nema ni zaglavlja, ni podnožja, ni fontova — layout koji ih nosi
 * je upravo ono što nije uspelo da se prikaže.
 *
 * Globalni stilovi se uvoze ručno. Dokumentacija za ovu verziju kaže da
 * `global-error` renderuje svoj dokument i NE povlači stilove aplikacije, pa bi
 * bez ovog uvoza stranica bila neoblikovana. I tada bi ostala čitljiva —
 * struktura je obična semantika — ali ne bi poštovala dizajn-sistem.
 *
 * `metadata` izvoz ovde nije podržan (granica je klijentska komponenta), pa
 * naslov dokumenta postavlja React elementom `<title>`. Bez njega bi kartica
 * brauzera ostala bez imena.
 *
 * `"use client"` je obavezan iz istog razloga kao u `error.tsx` — Next traži da
 * error boundary bude klijentska komponenta.
 */
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang={HTML_LANG}>
      <body>
        <title>Stranica se trenutno ne može prikazati</title>
        <main className="mx-auto w-full max-w-[var(--container-page)] px-4 sm:px-6">
          <ErrorFallback onRetry={retry} />
        </main>
      </body>
    </html>
  );
}
