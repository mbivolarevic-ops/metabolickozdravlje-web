import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { canonicalUrl } from "@/site/config";
import { GUIDE_PATH, REVIEW_STEPS } from "@/site/preview";

/**
 * Medicinska recenzija (`/medicinska-recenzija`).
 *
 * Opisuje postupak, u budućem vremenu. Nijedan korak se ne predstavlja kao
 * završen, jer za prikazani vodič nije.
 *
 * ⛔ Ne imenuje se nijedan recenzent i nijedna organizacija. Institucija bez
 * imenovanog potpisnika nije recenzent, a „planirano“ nije „potvrđeno“
 * (ADR-0008). Kada potpisnik bude poznat i saglasnost dokumentovana, ime ulazi
 * ovde — zasebnom, odobrenom izmenom.
 *
 * Server komponenta, bez klijentskog JS-a.
 */

export const metadata: Metadata = {
  title: "Medicinska recenzija",
  description:
    "Kroz koje korake tekst prolazi pre objave, ko šta potvrđuje i zašta se beleži datum provere.",
  alternates: { canonical: canonicalUrl("medicinska-recenzija") },
  openGraph: {
    type: "website",
    title: "Medicinska recenzija",
    url: canonicalUrl("medicinska-recenzija"),
  },
};

export default function MedicalReviewPage() {
  return (
    <PreviewPage
      title="Kako proveravamo medicinski sadržaj"
      lead="Postupak je isti za svaki tekst i ne skraćuje se zbog roka. Opisan je ovde da bi se moglo proveriti da li je sproveden."
      note="Za vodič prikazan na ovom preview-u postupak još nije završen."
    >
      <PreviewSection
        id="koraci"
        title="Šest koraka"
        intro="Redosled nije proizvoljan — svaki korak pretpostavlja da je prethodni gotov."
      >
        <ol className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          {REVIEW_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              {/*
               * Broj je vizuelni orijentir, a redosled već nosi `<ol>`, pa se
               * čitaču ekrana ne izgovara dvaput.
               */}
              <p
                aria-hidden="true"
                className="font-sans text-sm font-semibold text-text-muted"
              >
                {index + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </PreviewSection>

      <PreviewSection
        id="status"
        title="Gde smo sada"
        intro="Ovaj deo se menja kako rad napreduje i uvek govori stanje, ne nameru."
      >
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-callout-caution bg-surface p-6">
          <p className="font-sans font-semibold text-callout-caution">
            Postupak nije završen
          </p>
          <p className="mt-3">
            Za vodič prikazan na ovom preview-u urađeni su popis tvrdnji i
            povezivanje sa izvorima.{" "}
            <strong>
              Pregled autora i pregled medicinskog recenzenta nisu obavljeni.
            </strong>
          </p>
          <p className="mt-3 text-text-muted">
            Zbog toga nijedan prikazani materijal nije označen kao proveren, i
            neće biti dok oba pregleda ne budu završena i evidentirana.
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="ko-potpisuje"
        title="Ko šta potpisuje"
        intro="Razlika između dve uloge je suštinska i ne stapa se u „redakciju“."
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">Autor</h3>
            <p className="mt-2 text-text-muted">
              Piše tekst i odgovara za to da napisano odgovara onome što je hteo
              da kaže. Potpis autora je uslov, ali nije dovoljan.
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">Medicinski recenzent</h3>
            <p className="mt-2 text-text-muted">
              Proverava tvrdnje prema izvorima i da li je nivo sigurnosti u
              jeziku primeren nivou dokaza. Recenzent je uvek imenovana osoba.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-[var(--container-prose)] text-text-muted">
          Organizacija bez imenovanog potpisnika ne može biti recenzent. Zato se
          nijedno institucionalno ime ne navodi dok ne postoje i dokumentovana
          saglasnost i ime osobe koja recenziju potpisuje.
        </p>
      </PreviewSection>

      <PreviewSection
        id="sta-se-desava-sa-greskom"
        title="Šta se dešava kada se nađe greška"
        intro="Ispravka je deo postupka, ne izuzetak od njega."
      >
        <ul className="mt-8 max-w-[var(--container-prose)] list-none space-y-4">
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              Greška se ispravlja <strong>vidljivo</strong>. Tekst se ne menja
              tiho, jer čitalac koji je već pročitao staru verziju ne bi imao
              kako da sazna da se nešto promenilo.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              Materijalna izmena vraća tekst na <strong>ponovni pregled</strong>{" "}
              i pomera datum poslednje provere. Datum koji stoji uz stari
              pregled, a opisuje nov tekst, obmanjuje.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              Kada izvor ne postoji ili nije jednoznačan,{" "}
              <strong>to piše u tekstu</strong>. Priznata praznina je korisnija
              čitaocu od popunjene koju ne može da proveri.
            </p>
          </li>
        </ul>
      </PreviewSection>

      <PreviewSection
        id="dalje"
        title="Gde dalje"
        intro="Postupak se najbolje razume uz materijal na koji se primenjuje."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/uredjivacka-politika">Urednička politika</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Šira pravila: autorstvo, izvori, jezik, nezavisnost.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href={GUIDE_PATH}>Vodič u pripremi</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Materijal na koji se ovaj postupak upravo primenjuje.
            </p>
          </li>
        </ul>
      </PreviewSection>
    </PreviewPage>
  );
}
