import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  GUIDE_PATH,
  SELLER_LEGAL_NAME,
  SELLER_REGISTRATION_NUMBER,
  SELLER_TAX_ID,
} from "@/site/preview";

/**
 * Podnožje sajta.
 *
 * Sadrži puno ime platforme, veze ka stranicama koje STVARNO postoje, potvrđene
 * poslovne podatke i vidljiv medicinski disclaimer (docs/02 §2.2 ⑧ i §9.4).
 *
 * ⛔ Bez linkova ka kontaktu, politici privatnosti, uslovima prodaje i politici
 * povraćaja. Te stranice ne postoje, a pravni tekstovi su zaseban posao i
 * zaseban pregled (ADR-0008). Link ka stranici koje nema je gori od izostalog
 * linka jer obećava dokument koji niko nije napisao.
 *
 * ⛔ `/partner-preview` nije ovde — privatnoj prezentaciji se pristupa
 * direktnim URL-om.
 *
 * Server komponenta — bez klijentskog JS-a.
 */

/** Veze podnožja — isključivo rute koje postoje. */
const FOOTER_LINKS = [
  { href: "/teme", label: "Teme" },
  { href: GUIDE_PATH, label: "Vodič" },
  { href: "/o-nama", label: "O nama" },
  { href: "/autor", label: "Autor" },
  { href: "/medicinska-recenzija", label: "Medicinska recenzija" },
  { href: "/uredjivacka-politika", label: "Urednička politika" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border">
      <Container className="py-8">
        <p className="font-sans text-base font-semibold text-text">
          Edukativni studio — Centar za metaboličko zdravlje (CMZ)
        </p>

        <nav aria-label="Podnožje" className="mt-5">
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-sans text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 max-w-[var(--container-prose)] text-text">
          Sadržaj je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju
          koju određuje vaš lekar.
        </p>

        {/*
         * Poslovni podaci su potvrđeni (ADR-0008). Adresa, telefon i e-adresa
         * nisu dostavljeni i ne izmišljaju se.
         */}
        <p className="mt-6 text-sm text-text-muted">
          {SELLER_LEGAL_NAME} · PIB {SELLER_TAX_ID} · MB{" "}
          {SELLER_REGISTRATION_NUMBER}
        </p>

        <p className="mt-2 text-sm text-text-muted">
          © {year} Centar za metaboličko zdravlje
        </p>
      </Container>
    </footer>
  );
}
