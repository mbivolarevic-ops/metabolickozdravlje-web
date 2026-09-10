import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  GUIDE_PATH,
  GUIDE_STATUS,
  GUIDE_WORKING_SUBTITLE,
  GUIDE_WORKING_TITLE,
} from "@/site/preview";

/**
 * Najava vodiča u pripremi.
 *
 * ⛔ Namerno bez terakota CTA dugmeta: proizvod se ne može kupiti, pa poziv na
 * akciju koji izgleda kao kupovina obećava korak koji ne postoji. Ostaje običan
 * tekstualni link ka stranici sa detaljima.
 *
 * ⛔ Bez polja za e-adresu, liste čekanja i obaveštenja o izlasku — to bi bilo
 * prikupljanje podataka, koje traži zasebno odobrenje (ADR-0008).
 *
 * ⛔ Bez datuma izlaska. Datum ne postoji i ne obećava se.
 *
 * Sekcija je namerno tiha: na početnoj stranici edukacija ostaje glavna stvar,
 * a proizvod je sporedna napomena.
 */
export function GuidePreviewTeaser() {
  return (
    <section aria-labelledby="vodic-u-pripremi">
      <Container className="border-t border-border py-12 sm:py-16">
        <div className="max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6 sm:p-8">
          <p className="inline-block rounded-md border border-border px-3 py-1 font-sans text-sm text-text-muted">
            {GUIDE_STATUS}
          </p>

          <h2 id="vodic-u-pripremi" className="mt-4 text-h3">
            {GUIDE_WORKING_TITLE}
          </h2>

          <p className="mt-4">{GUIDE_WORKING_SUBTITLE}</p>

          <p className="mt-4 text-text-muted">
            Materijal je u radnoj fazi i čeka pregled autora i medicinsku
            recenziju. Dok se to ne završi, ništa se ne objavljuje i ne prodaje.
          </p>

          <p className="mt-6">
            <Link href={GUIDE_PATH}>Šta vodič obuhvata</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
