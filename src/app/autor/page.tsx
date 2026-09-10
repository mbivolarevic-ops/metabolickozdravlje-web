import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { canonicalUrl } from "@/site/config";
import { GUIDE_PATH, PLANNED_AUTHOR } from "@/site/preview";

/**
 * Autor (`/autor`).
 *
 * ⛔ NAJOSETLJIVIJA STRANICA U OVOM PREVIEW-U.
 *
 * Dr Snežana je ovde **planirani** autor. Dok ne pregleda i pisano ne prihvati
 * sadržaj, na ovoj stranici — i nigde drugde — ne sme stajati „Autor:“,
 * „Tekst napisala“, „medicinski odobreno“ ni „stručno recenzirano“.
 *
 * Razlog nije formalnost. Potpis znači da imenovana osoba sa licencom nosi
 * odgovornost za ono što piše. Pripisati taj potpis pre nego što je dat znači
 * pripisati nekome odgovornost koju nije preuzeo.
 *
 * ⛔ Navedena su isključivo tri podatka koja je vlasnik dostavio: ime i dve
 * kvalifikacije. Radno mesto, godine iskustva, članstva, nagrade, fotografija
 * i biografija se NE dodaju, ni „privremeno“, ni kao placeholder.
 *
 * Server komponenta, bez klijentskog JS-a.
 */

export const metadata: Metadata = {
  title: "Autor",
  description:
    "Ko piše sadržaj platforme metabolickozdravlje.rs i u kojoj je fazi rad na njemu.",
  alternates: { canonical: canonicalUrl("autor") },
  openGraph: { type: "website", title: "Autor", url: canonicalUrl("autor") },
};

export default function AuthorPage() {
  return (
    <PreviewPage
      title="Autor"
      lead="Svaki tekst na ovoj platformi ima imenovanog autora. Ovde stoji ko je to i dokle se stiglo."
      note={PLANNED_AUTHOR.statusNote}
    >
      <PreviewSection
        id="planirani-autor"
        title="Planirani autor"
        intro="Status je naveden uz ime, a ne u fusnoti — jer menja kako se sve ostalo čita."
      >
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6 sm:p-8">
          {/*
           * Oznaka statusa stoji IZNAD imena, ne ispod. Redosled je namerni:
           * čitalac prvo sazna da potpis još ne postoji, pa tek onda čije bi
           * ime trebalo da bude.
           */}
          <p className="inline-block rounded-md border border-border px-3 py-1 font-sans text-sm text-text-muted">
            {PLANNED_AUTHOR.status}
          </p>

          <p className="mt-4 font-sans text-xl font-semibold text-primary">
            {PLANNED_AUTHOR.name}
          </p>

          <ul className="mt-3 list-none text-text-muted">
            {PLANNED_AUTHOR.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>

          {/*
           * Bez fotografije. ADR-0002, odluka vlasnika #5: portret se ne
           * prikazuje dok ne stigne odobreni asset, i nema placeholdera.
           */}
        </div>
      </PreviewSection>

      <PreviewSection
        id="status-sadrzaja"
        title="U kojoj je fazi rad"
        intro="Ovo je jedina tvrdnja koju ova stranica danas može da iznese."
      >
        <div className="mt-8 max-w-[var(--container-prose)] space-y-4">
          <p>
            Sadržaj vodiča i edukativnih tekstova je u{" "}
            <strong>radnoj fazi</strong>. Napisan je kao nacrt, sa označenim
            izvorima i označenim mestima na kojima izvor nedostaje ili nije
            jednoznačan.
          </p>
          <p>
            <strong>
              Taj nacrt još nije pregledan ni odobren od strane autora.
            </strong>{" "}
            Dok se to ne dogodi, nijedan tekst se ne predstavlja kao njen, i
            nigde ne stoji da je bilo šta prošlo medicinsku proveru ili stručnu
            recenziju.
          </p>
          <p className="text-text-muted">
            Kada pregled bude završen, uz tekst će stajati ime autora, ime
            medicinskog recenzenta i datum poslednje provere — sve troje, ili
            ništa od toga.
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="sta-sledi"
        title="Šta sledi"
        intro="Postupak je opisan zasebno, jer je važniji od bilo koje pojedinačne biografije."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/medicinska-recenzija">
                Kako izgleda medicinska provera
              </Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Šest koraka kroz koje tekst prolazi pre objave.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href={GUIDE_PATH}>Vodič u pripremi</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Obim, teme i status materijala na kojem se radi.
            </p>
          </li>
        </ul>
      </PreviewSection>
    </PreviewPage>
  );
}
