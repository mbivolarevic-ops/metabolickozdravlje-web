import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { canonicalUrl } from "@/site/config";
import {
  SELLER_LEGAL_NAME,
  SELLER_REGISTRATION_NUMBER,
  SELLER_TAX_ID,
} from "@/site/preview";

/**
 * O nama (`/o-nama`).
 *
 * Sadrži isključivo podatke koje je vlasnik potvrdio: pravno ime, PIB i MB, i
 * načela koja su zapisana u ADR-0008.
 *
 * ⛔ NEMA izmišljene adrese, telefona, e-adrese, istorije firme, veličine tima
 * ni ijednog partnerstva. Izmišljen kontakt na stranici „o nama“ je najlakši
 * način da preview postane netačan dokument o stvarnoj firmi.
 *
 * Server komponenta, bez klijentskog JS-a.
 */

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Ko stoji iza platforme metabolickozdravlje.rs, po kojim načelima nastaje sadržaj i šta se na ovoj platformi nikada neće raditi.",
  alternates: { canonical: canonicalUrl("o-nama") },
  openGraph: { type: "website", title: "O nama", url: canonicalUrl("o-nama") },
};

/** Načela koja opisuju identitet platforme, ne njene ambicije. */
const COMMITMENTS = [
  {
    title: "Nezavisna edukativna platforma",
    description:
      "Sadržaj nastaje po sopstvenom uređivačkom postupku. Niko izvan uredništva ne određuje medicinski zaključak.",
  },
  {
    title: "Bez referral modela",
    description:
      "Nema partnerskih linkova ni naknade uslovljene preporukom određenog proizvoda. Ni uz odobrenje — to je granica identiteta, ne privremeno ograničenje.",
  },
  {
    title: "Bez prodaje leadova",
    description:
      "Kontakti korisnika se ne prodaju i ne ustupaju nikome, ni u kom obliku.",
  },
  {
    title: "Bez promocije suplemenata",
    description:
      "Nema oglasa za suplemente ni reklama trećih strana, uključujući i one koje bi se uklopile u temu.",
  },
  {
    title: "Zdravstveno važna informacija ostaje besplatna",
    description:
      "Ako bi izostanak plaćanja nekoga ostavio bez informacije koja mu treba da razume nalaz ili da zna kada da se javi lekaru, ta informacija ne ide iza plaćanja.",
  },
  {
    title: "Sponzor ne određuje medicinski zaključak",
    description:
      "Sponzor može finansirati nastanak materijala i biti vidljivo imenovan. Ne odobrava tekst pre objave i nema pravo veta.",
  },
] as const;

export default function AboutPage() {
  return (
    <PreviewPage
      title="O nama"
      lead="Edukativna platforma o metaboličkom zdravlju, napravljena da se sadržaju može verovati — i da se to poverenje može proveriti."
    >
      <PreviewSection
        id="ko-stoji-iza"
        title="Ko stoji iza platforme"
        intro="Podaci ispod su zvanični podaci pravnog lica."
      >
        <dl className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6">
          <div>
            <dt className="font-sans text-sm text-text-muted">Pravno lice</dt>
            <dd className="mt-1 font-sans font-semibold">
              {SELLER_LEGAL_NAME}
            </dd>
          </div>
          <div className="mt-4">
            <dt className="font-sans text-sm text-text-muted">PIB</dt>
            <dd className="mt-1 font-sans font-semibold">{SELLER_TAX_ID}</dd>
          </div>
          <div className="mt-4">
            <dt className="font-sans text-sm text-text-muted">Matični broj</dt>
            <dd className="mt-1 font-sans font-semibold">
              {SELLER_REGISTRATION_NUMBER}
            </dd>
          </div>
        </dl>

        {/*
         * Namerno bez adrese, telefona i e-adrese: ti podaci nisu dostavljeni,
         * a izmišljeni kontakt na stranici o firmi je gori od nikakvog.
         */}
        <p className="mt-6 max-w-[var(--container-prose)] text-text-muted">
          Ostali podaci za kontakt biće navedeni kada platforma bude javno
          dostupna.
        </p>
      </PreviewSection>

      <PreviewSection
        id="cemu-sluzi"
        title="Čemu platforma služi"
        intro="Jedna rečenica koja određuje svaku odluku o sadržaju."
      >
        <blockquote className="mt-8 max-w-[var(--container-prose)] border-l-4 border-primary pl-6 text-lg">
          Pomoći ljudima da razumeju sopstveno metaboličko zdravlje dovoljno
          dobro da mogu da vode bolji razgovor sa svojim lekarom.
        </blockquote>
        <p className="mt-6 max-w-[var(--container-prose)]">
          Iz te rečenice sledi i ono što platforma ne radi: ne postavlja
          dijagnozu, ne tumači pojedinačan nalaz i ne preporučuje terapiju. To
          su odluke koje pripadaju lekaru koji vas pregleda i poznaje vašu
          istoriju.
        </p>
      </PreviewSection>

      <PreviewSection
        id="nacela"
        title="Šta se ovde ne radi"
        intro="Ova lista je konkretnija od obećanja, i zato je korisnija."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          {COMMITMENTS.map((commitment) => (
            <li
              key={commitment.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold">{commitment.title}</h3>
              <p className="mt-2 text-text-muted">{commitment.description}</p>
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection
        id="dalje"
        title="Gde dalje"
        intro="Načela su proverljiva samo ako se vidi kako se sprovode."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-3">
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/uredjivacka-politika">Urednička politika</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Pravila po kojima sadržaj nastaje i po kojima se ispravlja.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/medicinska-recenzija">Medicinska recenzija</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Kroz koje korake tekst prolazi pre nego što bude objavljen.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/autor">Autor</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Ko piše sadržaj i u kojoj je fazi rad na njemu.
            </p>
          </li>
        </ul>
      </PreviewSection>
    </PreviewPage>
  );
}
