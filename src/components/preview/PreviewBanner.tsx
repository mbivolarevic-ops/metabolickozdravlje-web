import { Container } from "@/components/ui/Container";
import { PREVIEW_BADGE } from "@/site/preview";

/**
 * Oznaka privatnog preview-a. Stoji na VRHU sadržaja svake nove preview
 * stranice, pre naslova.
 *
 * ⛔ Ne premešta se u podnožje, ne smanjuje se i ne sakriva iza interakcije.
 * Njena svrha je da osoba koja vidi ekran — na deljenju ekrana, na
 * screenshotu, slučajno — ne pomisli da gleda objavljen sajt. Oznaka koju
 * treba tražiti ne radi svoj posao.
 *
 * Boja je `callout-important` (#3D4A5C) sa belim tekstom: kontrast 9,00:1
 * (ADR-0002). Terakota se ovde NE koristi — ona je rezervisana isključivo za
 * CTA (docs/02 §6.2), a ovo nije poziv na akciju nego upozorenje.
 *
 * Server komponenta, bez klijentskog JS-a.
 */
export function PreviewBanner({ note }: { note?: string }) {
  return (
    /*
     * `role="note"` uz `aria-label`: sadržaj je napomena o stanju cele
     * stranice, a ne deo njenog toka. Bez toga bi čitač ekrana pročitao tekst
     * kao prvi pasus sadržaja, što je upravo nesporazum koji sprečavamo.
     */
    <div
      role="note"
      aria-label="Napomena o statusu stranice"
      className="border-b border-border bg-callout-important text-surface"
    >
      <Container className="py-3">
        <p className="font-sans text-sm font-semibold tracking-wide sm:text-base">
          {PREVIEW_BADGE}
        </p>
        {note ? <p className="mt-1 font-sans text-sm">{note}</p> : null}
      </Container>
    </div>
  );
}
