import type { Metadata } from "next";
import Link from "next/link";
import { PreviewPage } from "@/components/preview/PreviewPage";
import { PreviewSection } from "@/components/preview/PreviewSection";
import { GuideCoverMockup } from "@/components/preview/GuideCoverMockup";
import {
  AUDIENCE,
  BUSINESS_MODELS,
  GUIDE_PATH,
  GUIDE_PRICE_LABEL,
  GUIDE_STATUS,
  GUIDE_WORKING_SUBTITLE,
  GUIDE_WORKING_TITLE,
  ROADMAP_PHASES,
  TRUST_PRINCIPLES,
} from "@/site/preview";
import { DEMO_BADGE, DEMO_TOPIC_CARDS } from "@/site/previewDemo";

/**
 * Partnerski preview (`/partner-preview`).
 *
 * Prezentacioni hub za razgovor sa potencijalnim partnerima. Pristupa mu se
 * isključivo direktnim URL-om — ⛔ NE stoji u glavnoj navigaciji ni u
 * podnožju, i nije u sitemap-u.
 *
 * ⛔ Ne prikazuje: projekcije prihoda ni bilo koji broj predstavljen kao
 * očekivan rezultat, potvrđena partnerstva koja ne postoje, ime
 * institucionalnog recenzenta, testimonijale, broj korisnika ili kupaca,
 * medicinske rezultate, datum lansiranja, niti poverljive tehničke, bankarske
 * i interne governance podatke.
 *
 * Ono što prikazuje su činjenice o identitetu, obimu i postupku — i granica
 * između onoga što postoji i onoga što tek predstoji.
 *
 * Server komponenta, bez klijentskog JS-a.
 */

export const metadata: Metadata = {
  title: "Partnerski preview",
  description:
    "Privatni prikaz platforme metabolickozdravlje.rs: identitet, vodič u pripremi, uređivački proces i poslovni model.",
  /*
   * ⛔ Bez kanonske adrese, namerno. Kanonska adresa je izjava da je stranica
   * prava javna verzija nekog sadržaja — a ova stranica nije javna i nikada
   * neće biti. Ostale preview rute su budući javni sadržaj, pa je imaju.
   *
   * `robots` se ovde ponavlja iako ga globalni layout već postavlja. To nije
   * suvišno: ovo je jedina stranica koja bi, ako bi se globalna zabrana ikada
   * otvorila zasebnom odlukom, morala da ostane zatvorena.
   */
  robots: { index: false, follow: false, nocache: true },
};

export default function PartnerPreviewPage() {
  return (
    <PreviewPage
      title="metabolickozdravlje.rs"
      lead="Edukativna platforma o metaboličkom zdravlju na srpskom jeziku. Ovaj prikaz je namenjen razgovoru sa partnerima — nije objavljen sajt i ništa na njemu nije prošlo medicinsku proveru."
      aside={<GuideCoverMockup />}
    >
      <PreviewSection
        id="problem"
        title="Problem koji platforma rešava"
        intro="Nije nedostatak informacija. Informacija ima previše, a poverenja premalo."
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">Nalaz bez objašnjenja</h3>
            <p className="mt-2 text-text-muted">
              Čovek dobije papir sa brojevima i strelicama, i nijednu rečenicu
              koja mu kaže šta to znači za njega.
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">Sadržaj koji prodaje</h3>
            <p className="mt-2 text-text-muted">
              Ono što na internetu najlakše nađe često nije objašnjenje nego
              ponuda — test, program ili preparat.
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">Kratak pregled</h3>
            <p className="mt-2 text-text-muted">
              Vreme kod lekara je ograničeno, a pacijent koji ne zna šta da pita
              iz njega izvuče manje nego što bi mogao.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-[var(--container-prose)] text-lg">
          Cilj platforme je jedna stvar, izgovorena bez uvijanja:{" "}
          <strong>
            da čovek razume sopstveno metaboličko zdravlje dovoljno dobro da
            može da vodi bolji razgovor sa svojim lekarom.
          </strong>
        </p>
      </PreviewSection>

      <PreviewSection
        id="publika"
        title="Kome je namenjena"
        intro="Publika se definiše povodom, a ne pripisanim zdravstvenim stanjem."
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
        id="poverenje"
        title="Principi poverenja"
        intro="Ovo nisu obećanja nego pravila koja sistem sprovodi — i koja se mogu proveriti na svakom tekstu."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_PRINCIPLES.map((principle) => (
            <li
              key={principle.title}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold text-primary">
                {principle.title}
              </h3>
              <p className="mt-2 text-text-muted">{principle.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[var(--container-prose)] text-text-muted">
          Merilo uspeha nije poseta nego to da lekar može mirno da preporuči
          sadržaj svom pacijentu. Sve ostalo je posledica.
        </p>
      </PreviewSection>

      <PreviewSection
        id="vodic"
        title="Flagship vodič"
        intro="Jedan proizvod, ne katalog. Drugi bi tražio novu odluku vlasnika."
      >
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6 sm:p-8">
          <p className="font-sans text-lg font-semibold">
            {GUIDE_WORKING_TITLE}
          </p>
          <p className="mt-2 text-text-muted">{GUIDE_WORKING_SUBTITLE}</p>

          <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-6">
            <div>
              <dt className="font-sans text-sm text-text-muted">Obim</dt>
              <dd className="mt-1 font-sans font-semibold">16 poglavlja</dd>
            </div>
            <div>
              <dt className="font-sans text-sm text-text-muted">Status</dt>
              <dd className="mt-1 font-sans font-semibold">{GUIDE_STATUS}</dd>
            </div>
            <div>
              <dt className="font-sans text-sm text-text-muted">
                Planirana cena
              </dt>
              <dd className="mt-1 font-sans font-semibold">
                {GUIDE_PRICE_LABEL}
              </dd>
            </div>
          </dl>

          <p className="mt-6">
            <Link href={GUIDE_PATH}>Otvorite stranicu vodiča</Link>
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="model-sadrzaja"
        title="Model edukativnog sadržaja"
        intro="Jedan tekst odgovara na jedno pitanje. Teme se grade u klastere, a ne u hronološki blog."
      >
        {/*
         * ⛔ Kartice ispod su DEMO. Podaci dolaze iz `src/site/previewDemo.ts`,
         * nikada iz Sanity sloja, i nijedan zapis nije prošao uređivački
         * postupak. Oznaka stoji na svakoj kartici, ne samo iznad mreže.
         */}
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_TOPIC_CARDS.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-md border border-dashed border-border bg-surface p-5"
            >
              <p className="font-sans text-xs font-semibold tracking-wide text-callout-caution uppercase">
                {DEMO_BADGE}
              </p>
              <h3 className="mt-3 text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-text-muted">{card.question}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[var(--container-prose)] text-text-muted">
          Kartice pokazuju izgled i strukturu, ne sadržaj. Nijedan od ovih
          tekstova nije napisan, recenziran ni objavljen.
        </p>
      </PreviewSection>

      <PreviewSection
        id="poslovni-model"
        title="Poslovni model"
        intro="Tri toka, svaki pod svojim pravilima. Nijedan ne dodiruje podatke o zdravlju korisnika."
      >
        <ul className="mt-8 grid list-none gap-4 lg:grid-cols-3">
          {BUSINESS_MODELS.map((model) => (
            <li
              key={model.title}
              className="flex flex-col rounded-md border border-border bg-surface p-6"
            >
              <p className="font-sans text-xs font-semibold tracking-wide text-text-muted uppercase">
                {model.audience}
              </p>
              <h3 className="mt-2 text-base font-semibold">{model.title}</h3>
              <p className="mt-3 grow text-text-muted">{model.description}</p>
              <p className="mt-4 border-t border-border pt-4 font-sans text-sm text-text-muted">
                {model.status}
              </p>
            </li>
          ))}
        </ul>

        {/*
         * ⛔ Ovde se namerno ne navode ni ciljevi prihoda, ni broj prodaja, ni
         * projekcije. Projekcija na prezentacionoj stranici se čita kao
         * obećanje, a obećanje koje zavisi od tuđih odluka nije naše da damo.
         */}
        <div className="mt-8 max-w-[var(--container-prose)] rounded-md border border-border bg-surface p-6">
          <h3 className="text-base font-semibold">Šta se nikada neće raditi</h3>
          <ul className="mt-3 list-none space-y-2 text-text-muted">
            <li>prodaja kontakata i ustupanje korisničkih podataka</li>
            <li>referral model bilo kog oblika</li>
            <li>oglasi za suplemente i reklame trećih strana</li>
            <li>medicinska trijaža i individualne preporuke</li>
            <li>prikupljanje dijagnoza, nalaza i podataka o terapiji</li>
            <li>plaćeni sadržaj bez vidljive oznake</li>
          </ul>
        </div>
      </PreviewSection>

      <PreviewSection
        id="nezavisnost"
        title="Urednička nezavisnost"
        intro="Uslov pod kojim sponzorstvo uopšte dolazi u obzir."
      >
        <div className="mt-8 max-w-[var(--container-prose)] space-y-4">
          <p className="text-lg">
            <strong>Sponzor ne određuje medicinski zaključak.</strong>
          </p>
          <p>
            Sponzor može da finansira nastanak edukativnog materijala, da bude
            vidljivo imenovan i da predloži temu. Ne odobrava tekst pre objave,
            nema pravo veta i ne može tražiti da oznaka sponzorstva bude
            diskretna.
          </p>
          <p>
            Sponzorisani materijal prolazi isti postupak kao svaki drugi:
            imenovan autor, imenovan recenzent, izvori, datum provere. Oznaka
            stoji pre nego što čitalac počne da čita.
          </p>
          <p className="text-text-muted">
            Ako sponzor zatraži izmenu medicinskog zaključka, saradnja se
            prekida i to se ne prećutkuje.
          </p>
          <p>
            <Link href="/uredjivacka-politika">Puna urednička politika</Link>
          </p>
        </div>
      </PreviewSection>

      <PreviewSection
        id="roadmap"
        title="Šta postoji, a šta tek predstoji"
        intro="Faze su poređane po redosledu, bez datuma — datum lansiranja ne postoji i neće biti obećan."
      >
        <ol className="mt-8 list-none space-y-4">
          {ROADMAP_PHASES.map((phase, index) => (
            <li
              key={phase.phase}
              className="rounded-md border border-border bg-surface p-5 sm:flex sm:gap-6"
            >
              <div className="sm:w-56 sm:shrink-0">
                <p
                  aria-hidden="true"
                  className="font-sans text-sm font-semibold text-text-muted"
                >
                  {index + 1}
                </p>
                <p className="font-sans font-semibold text-primary">
                  {phase.phase}
                </p>
                <p className="font-sans text-sm text-text-muted">
                  {phase.state}
                </p>
              </div>
              <p className="mt-2 text-text-muted sm:mt-0">
                {phase.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[var(--container-prose)]">
          Redosled se ne preskače. Medicinsko odobrenje dolazi pre tehničke
          integracije, a tehnička integracija pre javnog lansiranja — i svaka od
          tih kapija je odluka čoveka, ne posledica gotovog koda.
        </p>
      </PreviewSection>

      <PreviewSection
        id="pregled-stranica"
        title="Stranice u ovom preview-u"
        intro="Sve što je do sada napravljeno, na jednom mestu."
      >
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href={GUIDE_PATH}>Vodič</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Obim, teme, status recenzije i planirana cena.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/autor">Autor</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Planirani autor i faza u kojoj je rad.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/medicinska-recenzija">Medicinska recenzija</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Šest koraka provere i trenutni status.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/uredjivacka-politika">Urednička politika</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Pravila o autorstvu, izvorima, jeziku i nezavisnosti.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/o-nama">O nama</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Poslovni identitet i granice koje se ne pomeraju.
            </p>
          </li>
          <li className="rounded-md border border-border bg-surface p-5">
            <h3 className="text-base font-semibold">
              <Link href="/teme">Teme</Link>
            </h3>
            <p className="mt-2 text-text-muted">
              Pregled tema onako kako ga vidi čitalac.
            </p>
          </li>
        </ul>
      </PreviewSection>
    </PreviewPage>
  );
}
