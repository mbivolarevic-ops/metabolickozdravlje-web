import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { GuideCoverMockup } from "@/components/preview/GuideCoverMockup";
import { CtaLink } from "@/components/ui/CtaLink";
import { canonicalUrl } from "@/site/config";
import {
  AUDIENCE,
  GUIDE_CHAPTERS,
  GUIDE_IS,
  GUIDE_IS_NOT,
  GUIDE_LEARNING_GOALS,
  GUIDE_PRICE_LABEL,
  GUIDE_REVIEW_NOTICE,
  GUIDE_STATUS,
  GUIDE_WORKING_SUBTITLE,
  GUIDE_WORKING_TITLE,
  PLANNED_AUTHOR,
} from "@/site/preview";

/**
 * Stranica flagship vodiča (`/vodic/metabolicko-zdravlje`).
 *
 * Vizuelno završena preview prodajna stranica — i ništa više od toga.
 *
 * ⛔ NEMA: dugmeta „Kupi“, checkout-a, adrese za plaćanje, korpe, polja za
 * unos, e-adrese, newslettera, liste čekanja, analitike i praćenja. Cena se
 * PRIKAZUJE, ali se ništa ne naplaćuje — kupovina se otvara tek posle
 * medicinske recenzije i zasebnog odobrenja (ADR-0008).
 *
 * ⛔ Nijedan sadržaj iz radnog nacrta vodiča nije prenet ovde: nema pragova,
 * referentnih vrednosti, preporuka ni zaključaka. Poglavlja su navedena samo
 * naslovima, jer naslov opisuje obim, a ne iznosi tvrdnju.
 *
 * ⛔ Dr Snežana je PLANIRANI autor. Nigde ne stoji da je tekst napisala,
 * pregledala ili odobrila.
 *
 * Server komponenta, bez klijentskog JS-a. FAQ koristi nativni
 * `<details>/<summary>`, pa sklapanje radi bez ijedne linije skripte.
 */

export const metadata: Metadata = {
  title: "Vodič o metaboličkom zdravlju",
  description:
    "Radni prikaz vodiča u pripremi: kome je namenjen, šta obuhvata i u kojoj je fazi medicinske provere.",
  alternates: { canonical: canonicalUrl("vodic", "metabolicko-zdravlje") },
  openGraph: {
    type: "website",
    title: "Vodič o metaboličkom zdravlju",
    url: canonicalUrl("vodic", "metabolicko-zdravlje"),
  },
};

/**
 * Česta pitanja.
 *
 * Svaki odgovor je uređivački ili poslovni, nijedan nije medicinski. Pitanje
 * na koje bi pošten odgovor bio medicinska tvrdnja ovde se ne postavlja.
 */
const FAQ = [
  {
    question: "Da li vodič postavlja dijagnozu ili tumači moj nalaz?",
    answer:
      "Ne. Objašnjava šta pojedini pokazatelj meri i šta iz njega ne može da se pročita, tako da razgovor sa lekarom bude sadržajniji. Vaš konkretan nalaz može da protumači samo neko ko vas je pregledao.",
  },
  {
    question: "Da li zamenjuje odlazak lekaru?",
    answer:
      "Ne, i nije napisan s tom namerom. Cilj je suprotan — da lakše prepoznate kada razgovor sa lekarom ima smisla i sa kojim pitanjima da odete.",
  },
  {
    question: "Da li se u vodiču nalaze saveti o ishrani ili terapiji?",
    answer:
      "Ne. Plan ishrane i odluke o terapiji su individualni i pripadaju lekaru. Vodič objašnjava pojmove i pokazatelje.",
  },
  {
    question: "Ko piše vodič?",
    answer:
      "Planirani autor je dr Snežana Bivolarević, specijalista opšte medicine i subspecijalista bolesti zavisnosti. Sadržaj je u radnoj fazi i još nije pregledan ni odobren od strane autora.",
  },
  {
    question: "Da li je sadržaj medicinski proveren?",
    answer:
      "Još nije. Popis tvrdnji i povezivanje sa izvorima su urađeni, ali pregled autora i pregled medicinskog recenzenta nisu. Dok se to ne završi, ništa se ne označava kao odobreno.",
  },
  {
    question: "Zašto se vodič naplaćuje ako je zdravlje važno?",
    answer:
      "Vodič je prošireni praktični materijal, ne otključavanje informacije. Sve što nekome treba da razume nalaz ili da zna kada da se javi lekaru ostaje besplatno i nezaključano.",
  },
  {
    question: "Kada će vodič biti dostupan?",
    answer:
      "Datum ne postoji i neće biti obećan. Vodič izlazi kada medicinska provera bude završena — rok se ne stavlja ispred te provere.",
  },
  {
    question: "Da li se prilikom kupovine prikupljaju podaci o mom zdravlju?",
    answer:
      "Ne. Dijagnoza, laboratorijski nalazi, terapija i slični podaci se ne prikupljaju ni u jednom koraku, uključujući polja označena kao neobavezna.",
  },
] as const;

export default function GuidePage() {
  return (
    <PreviewPage
      title={GUIDE_WORKING_TITLE}
      lead={GUIDE_WORKING_SUBTITLE}
      note={GUIDE_REVIEW_NOTICE}
      aside={<GuideCoverMockup />}
    >
      {/*
       * Status i cena. Cena dolazi iz jednog serverskog izvora
       * (`src/site/preview.ts`) — nijedna stranica je ne ispisuje ručno.
       */}
      <section
        aria-labelledby="status-vodica"
        className="mt-10 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6 sm:p-8"
      >
        <h2 id="status-vodica" className="text-h3">
          Status i cena
        </h2>

        <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-5">
          <div>
            <dt className="font-sans text-sm text-text-muted">Status</dt>
            <dd className="mt-1 font-sans text-lg font-semibold text-primary">
              {GUIDE_STATUS}
            </dd>
          </div>
          <div>
            <dt className="font-sans text-sm text-text-muted">
              Planirana cena
            </dt>
            <dd className="mt-1 font-sans text-lg font-semibold text-primary">
              {GUIDE_PRICE_LABEL}
            </dd>
          </div>
        </dl>

        {/*
         * ⛔ Ovo NIJE dugme. Rečenica namerno nema oblik kontrole, jer nema
         * šta da pokrene — kupovina ne postoji i neće postojati dok medicinska
         * provera ne bude završena.
         */}
        <p className="mt-6 border-t border-border pt-6 text-text-muted">
          Kupovina će biti dostupna nakon završetka pregleda.
        </p>
      </section>

      <PreviewSection
        id="kome-je-namenjen"
        title="Kome je namenjen"
        intro="Vodič je pisan za povod, ne za dijagnozu — za situaciju u kojoj se čitalac zatekao."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-3">
          {AUDIENCE.map((group) => (
            <li
              key={group.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold">{group.title}</h3>
              <p className="mt-2 text-text-muted">{group.description}</p>
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection
        id="sta-cete-razumeti"
        title="Šta ćete moći bolje da razumete"
        intro="Ciljevi su napisani kao pitanja na koja vodič odgovara."
      >
        <ul className="mt-8 max-w-[var(--container-prose)] list-none space-y-3">
          {GUIDE_LEARNING_GOALS.map((goal) => (
            <li
              key={goal}
              className="rounded-md border border-border bg-surface px-5 py-4"
            >
              {goal}
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection
        id="poglavlja"
        title="Šesnaest poglavlja"
        intro="Naslovi pokazuju obim. Sam sadržaj je u radnoj fazi i ovde se ne prikazuje."
      >
        <ol className="mt-8 grid list-none gap-x-8 gap-y-3 sm:grid-cols-2">
          {GUIDE_CHAPTERS.map((chapter, index) => (
            <li
              key={chapter}
              className="flex gap-4 border-b border-border py-3"
            >
              <span
                aria-hidden="true"
                className="w-6 shrink-0 font-sans text-sm font-semibold text-text-muted tabular-nums"
              >
                {index + 1}.
              </span>
              <span>{chapter}</span>
            </li>
          ))}
        </ol>
      </PreviewSection>

      <PreviewSection
        id="jeste-i-nije"
        title="Šta vodič jeste, a šta nije"
        intro="Druga kolona je važnija od prve i ne skraćuje se."
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-6">
            <h3 className="text-base font-semibold text-primary">Jeste</h3>
            <ul className="mt-3 list-none space-y-2 text-text-muted">
              {GUIDE_IS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-callout-caution bg-surface p-6">
            <h3 className="text-base font-semibold text-callout-caution">
              Nije
            </h3>
            <ul className="mt-3 list-none space-y-2 text-text-muted">
              {GUIDE_IS_NOT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        id="autor-vodica"
        title="Ko piše vodič"
        intro="Status stoji uz ime, jer menja kako se sve ostalo čita."
      >
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6">
          <p className="inline-block rounded-md border border-border px-3 py-1 font-sans text-sm text-text-muted">
            {PLANNED_AUTHOR.status}
          </p>
          <p className="mt-4 font-sans text-lg font-semibold text-primary">
            {PLANNED_AUTHOR.name}
          </p>
          <p className="mt-2 text-text-muted">
            {PLANNED_AUTHOR.credentials.join(" · ")}
          </p>
          <p className="mt-4">{PLANNED_AUTHOR.statusNote}</p>
          <p className="mt-4">
            <Link href="/autor">Više o autoru i fazi rada</Link>
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="proces"
        title="Kako vodič nastaje"
        intro="Isti postupak koji važi za svaki tekst na platformi."
      >
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-callout-caution bg-surface p-6">
          <p className="font-sans font-semibold text-callout-caution">
            Medicinska recenzija nije završena
          </p>
          <p className="mt-3">
            Urađeni su popis medicinskih tvrdnji i povezivanje sa izvorima.
            Pregled autora i pregled medicinskog recenzenta{" "}
            <strong>nisu obavljeni</strong>, pa nijedan deo materijala nije
            označen kao odobren.
          </p>
          <p className="mt-4">
            <Link href="/medicinska-recenzija">
              Kako proveravamo medicinski sadržaj
            </Link>
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="pitanja"
        title="Česta pitanja"
        intro="Odgovori su uređivački i poslovni. Pitanja na koja bi pošten odgovor bio medicinska tvrdnja ovde se ne postavljaju."
      >
        <div className="mt-8 max-w-[var(--container-prose)]">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="border-b border-border py-4"
            >
              <summary className="cursor-pointer font-sans font-semibold text-primary marker:text-text-muted">
                {item.question}
              </summary>
              <p className="mt-3 text-text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection
        id="dalje"
        title="Šta možete odmah"
        intro="Vodič još nije dostupan, ali platforma jeste."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CtaLink href="/teme">Pogledajte edukativne teme</CtaLink>
          <Link href="/medicinska-recenzija" className="font-sans">
            Kako proveravamo sadržaj
          </Link>
        </div>
      </PreviewSection>
    </PreviewPage>
  );
}
