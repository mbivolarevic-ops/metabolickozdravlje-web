"use client";

import { Container } from "@/components/ui/Container";
import { ErrorFallback } from "@/components/ui/ErrorFallback";

/**
 * Neočekivana greška unutar rute.
 *
 * Next zahteva da error boundary bude KLIJENTSKA komponenta — otuda
 * `"use client"`. To je jedini razlog; komponenta nema stanje, efekte ni
 * ijedan drugi razlog da bude na klijentu.
 *
 * Ova granica hvata greške u stranici i ugnježdenim layout-ima, ali NE i u root
 * layout-u. Za taj slučaj postoji `global-error.tsx`.
 *
 * `error` prop se namerno NE preuzima. Next ga prosleđuje, ali stranica nema
 * šta da uradi sa njim: poruka, stack i `digest` se korisniku ne prikazuju, a
 * ne šalju se ni bilo kom spoljnom servisu. Ono što se ne veže za promenljivu
 * ne može ni slučajno da se prikaže.
 *
 * Oporavak koristi `retry`, ne `reset`. Za Next 16.3.0 dokumentacija
 * (`node_modules/next/dist/docs/.../file-conventions/error.md`) navodi da je
 * `retry` stabilan od ove verzije i da ga treba koristiti „u većini slučajeva",
 * dok `reset` samo čisti stanje granice BEZ ponovnog dohvatanja. Kada je uzrok
 * neuspeo upit, `reset` bi prikazao istu grešku — dugme „Pokušaj ponovo“ koje
 * ne pokušava ponovo je gore od dugmeta kojeg nema.
 */
export default function RouteError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <Container>
      <ErrorFallback onRetry={retry} />
    </Container>
  );
}
