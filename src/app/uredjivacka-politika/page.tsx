import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { canonicalUrl } from "@/site/config";
import { EDITORIAL_PRINCIPLES } from "@/site/preview";

/**
 * Urednička politika (`/uredjivacka-politika`).
 *
 * Opisuje pravila koja projekat već sprovodi ili ih ima zapisana u svojim
 * dokumentima. Ništa iznad toga se ne tvrdi — politika koja obećava više nego
 * što sistem radi je marketinški tekst, ne politika.
 *
 * ⛔ Nije pravni dokument. Uslovi korišćenja, politika privatnosti i politika
 * refundacije su zaseban posao i zaseban pregled (ADR-0008), i ovde se ne
 * pišu, ne najavljuju kao gotovi i ne linkuju kao da postoje.
 *
 * Server komponenta, bez klijentskog JS-a.
 */

export const metadata: Metadata = {
  title: "Urednička politika",
  description:
    "Pravila po kojima sadržaj na platformi nastaje, proverava se i ispravlja — uključujući granicu između edukacije i individualnog saveta.",
  alternates: { canonical: canonicalUrl("uredjivacka-politika") },
  openGraph: {
    type: "website",
    title: "Urednička politika",
    url: canonicalUrl("uredjivacka-politika"),
  },
};

export default function EditorialPolicyPage() {
  return (
    <PreviewPage
      title="Urednička politika"
      lead="Pravila su napisana pre nego što je bilo šta objavljeno. To je jedini trenutak u kojem se pišu bez pritiska roka."
    >
      <PreviewSection
        id="nacela"
        title="Devet pravila"
        intro="Svako od njih se može proveriti na konkretnom tekstu — zato su ovako formulisana."
      >
        <ol className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          {EDITORIAL_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <p
                aria-hidden="true"
                className="font-sans text-sm font-semibold text-text-muted"
              >
                {index + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold">
                {principle.title}
              </h3>
              <p className="mt-2 text-text-muted">{principle.description}</p>
            </li>
          ))}
        </ol>
      </PreviewSection>

      <PreviewSection
        id="granica"
        title="Gde prestaje edukacija"
        intro="Ovo je granica koju tekstovi ne prelaze, bez obzira na to koliko bi bilo korisno da je pređu."
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-6">
            <h3 className="text-base font-semibold text-primary">
              Sadržaj radi
            </h3>
            <ul className="mt-3 list-none space-y-2 text-text-muted">
              <li>objašnjava šta pojam znači</li>
              <li>navodi šta pokazatelj ne može da kaže</li>
              <li>priprema pitanja za lekara</li>
              <li>imenuje nesigurnost kada postoji</li>
            </ul>
          </div>
          <div className="rounded-md border border-callout-caution bg-surface p-6">
            <h3 className="text-base font-semibold text-callout-caution">
              Sadržaj ne radi
            </h3>
            <ul className="mt-3 list-none space-y-2 text-text-muted">
              <li>ne postavlja dijagnozu</li>
              <li>ne tumači vaš konkretan nalaz</li>
              <li>ne preporučuje lek, dozu ni promenu terapije</li>
              <li>ne obećava zdravstveni ishod</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-[var(--container-prose)]">
          Razlog nije opreznost radi opreznosti. Individualna procena traži
          nekoga ko vas je pregledao i ko poznaje vašu istoriju — tekst to nema
          i ne može da ima, ma koliko dobro bio napisan.
        </p>
      </PreviewSection>

      <PreviewSection
        id="jezik"
        title="Jezik"
        intro="Način na koji je nešto rečeno menja to da li će čitalac otići kod lekara."
      >
        <ul className="mt-8 max-w-[var(--container-prose)] list-none space-y-4">
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              <strong>Bez stigme.</strong> Jezik koji krivi čitaoca za sopstveno
              stanje ne prolazi uredničku proveru. To nije stvar stila nego
              pravilo, jer stid pouzdano odlaže odlazak lekaru.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              <strong>Bez zastrašivanja.</strong> Nema odbrojavanja, dramatičnih
              poređenja ni slika bolesti. Strah nije informacija.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              <strong>Ograda se prevodi, ne briše.</strong> Kada je nešto tačno
              samo pod uslovom, uslov ostaje — napisan običnim jezikom, a ne
              izbačen radi jednostavnosti.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <p>
              <strong>Prvo funkcija, pa termin.</strong> Skraćenica se prvi put
              piše u punom obliku, a nijedan broj ne stoji bez jedinice i bez
              konteksta.
            </p>
          </li>
        </ul>
      </PreviewSection>

      <PreviewSection
        id="nezavisnost"
        title="Urednička nezavisnost i sponzorstvo"
        intro="Granica se piše dok nijedna ponuda nije na stolu — kasnije je kasno."
      >
        <div className="mt-8 max-w-[var(--container-prose)] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Šta sponzor sme, a šta ne sme</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-sans">
                  Sponzor sme
                </th>
                <th scope="col" className="py-3 font-sans">
                  Sponzor ne sme
                </th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border">
                <td className="py-3 pr-4">
                  finansirati nastanak edukativnog materijala
                </td>
                <td className="py-3">određivati zaključak ili preporuku</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 pr-4">
                  biti imenovan kao sponzor, vidljivo
                </td>
                <td className="py-3">tražiti da oznaka bude diskretna</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 pr-4">predložiti temu</td>
                <td className="py-3">odobravati tekst pre objave</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">dobiti materijal kad i javnost</td>
                <td className="py-3">tražiti pravo veta</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-[var(--container-prose)]">
          Sponzorisani sadržaj prolazi <strong>isti</strong> postupak kao svaki
          drugi: imenovan autor, imenovan recenzent, izvori, datum provere.
          Oznaka sponzorstva stoji pre nego što čitalac počne da čita.
        </p>
        <p className="mt-4 max-w-[var(--container-prose)] text-text-muted">
          Ako sponzor zatraži izmenu medicinskog zaključka, saradnja se prekida
          i to se ne prećutkuje.
        </p>
      </PreviewSection>

      <PreviewSection
        id="dalje"
        title="Gde dalje"
        intro="Politika se najlakše proverava na postupku koji je opisuje."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/medicinska-recenzija">Medicinska recenzija</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Šest koraka provere i ono što se dešava kada se nađe greška.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/o-nama">O nama</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Ko stoji iza platforme i šta se ovde nikada neće raditi.
            </p>
          </li>
        </ul>
      </PreviewSection>
    </PreviewPage>
  );
}
