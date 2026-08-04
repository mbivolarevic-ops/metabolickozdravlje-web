import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TrustBar } from "@/components/home/TrustBar";

/*
 * Struktura početne stranice u fazi pripreme.
 *
 * Sve kartice su informativne i NEINTERAKTIVNE: trenutno postoji samo ruta
 * `/`, pa se ne dodaju linkovi, dugmad, pretraga ni CTA bez funkcije.
 * Tekst prati odobreni glas iz docs/02 §1.5 i docs/03 §5 i nigde ne
 * predstavlja nepostojeći sadržaj kao objavljen.
 */

/**
 * Ulazne tačke po situaciji (docs/02 §2.2 ③) — nazivi su doslovno iz
 * dokumentacije, jer je poenta da se čitalac prepozna u situaciji, ne u
 * medicinskom terminu.
 */
const ENTRY_POINTS = [
  {
    title: "Dobio/la sam nalaz koji ne razumem",
    description:
      "Objašnjenja pojmova koji se pojavljuju u laboratorijskim nalazima, običnim jezikom.",
  },
  {
    title: "Teško regulišem telesnu masu",
    description:
      "Tekstovi o telesnoj masi i metabolizmu, bez pripisivanja krivice.",
  },
  {
    title: "U porodici ima dijabetesa",
    description:
      "Šta se priprema o prevenciji i koja pitanja se mogu poneti lekaru.",
  },
] as const;

/**
 * Teme se prikazuju redosledom prioriteta iz docs/01 §9.3. Navedene su samo
 * teme čiji su nazivi doslovno potvrđeni u dokumentaciji; ostale čekaju
 * potvrdu vlasnika (v. opis PR-a).
 */
const TOPICS = [
  {
    title: "Laboratorijske analize",
    description: "Objašnjenja parametara koji se pojavljuju u nalazima.",
  },
  {
    title: "Insulinska rezistencija",
    description: "Šta pojam znači i kako se o njemu razgovara sa lekarom.",
  },
  {
    title: "Predijabetes",
    description: "Šta nalaz znači i koja pitanja se mogu postaviti lekaru.",
  },
  {
    title: "Metabolički sindrom",
    description: "Krovni pojam koji povezuje ostale teme.",
  },
  {
    title: "Masna jetra",
    description: "Tema u pripremi, uz isti postupak provere kao ostale.",
  },
] as const;

/** Način rada (docs/02 §2.2 ⑦ i §9.5, docs/03 §7). */
const METHOD = [
  {
    title: "Razumljiv jezik",
    description:
      "Prvo objašnjenje funkcije, pa stručni termin. Skraćenica se prvi put piše u punom obliku.",
  },
  {
    title: "Stručna provera",
    description:
      "Medicinsku tačnost proverava i potpisuje stručni urednik. Bez potpisa nema objave.",
  },
  {
    title: "Transparentni izvori",
    description:
      "Koriste se smernice i recenzirani izvori, i navode se uz tekst.",
  },
  {
    title: "Edukacija, ne individualni savet",
    description:
      "Sadržaj objašnjava pojmove i pomaže u pripremi pitanja za lekara. Ne daje dijagnozu ni terapiju.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="naslov-platforme">
        <Container className="py-12 sm:py-16">
          <p className="inline-block rounded-md border border-border bg-surface px-3 py-1 font-sans text-sm text-text-muted">
            Sadržaj je u pripremi
          </p>
          <h1 id="naslov-platforme" className="mt-4">
            Metaboličko zdravlje
          </h1>
          <div className="mt-4 max-w-[var(--container-prose)]">
            <p className="text-lg">
              Edukativna platforma o metaboličkom zdravlju je u pripremi.
            </p>
            <p className="mt-3">
              Cilj platforme je da pomogne čitaocu da razume sopstveno
              metaboličko zdravlje dovoljno dobro da može da vodi bolji razgovor
              sa svojim lekarom.
            </p>
            <p className="mt-3 text-text-muted">
              Tekstovi se pripremaju i još nisu objavljeni. Ova stranica
              prikazuje strukturu i način rada, ne gotov sadržaj.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principi">
        <Container className="border-t border-border py-12">
          <SectionHeading id="principi" title="Principi po kojima radimo">
            Pravila važe za svaki tekst koji će biti objavljen.
          </SectionHeading>
          <div className="mt-8">
            <TrustBar />
          </div>
        </Container>
      </section>

      <section aria-labelledby="ulazne-tacke">
        <Container className="border-t border-border py-12">
          <SectionHeading id="ulazne-tacke" title="Odakle će se moći početi">
            Sadržaj se priprema tako da se do njega dolazi kroz situaciju u
            kojoj se čitalac prepoznaje, a ne kroz medicinski termin. Ovo su
            opisi, još ne i odredišta.
          </SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {ENTRY_POINTS.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="teme">
        <Container className="border-t border-border py-12">
          <SectionHeading id="teme" title="Teme koje se pripremaju">
            Redosled prati prioritete iz projektne dokumentacije. Nijedan tekst
            iz ovih tema još nije objavljen.
          </SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="nacin-rada">
        <Container className="border-t border-border py-12">
          <SectionHeading id="nacin-rada" title="Kako će nastajati sadržaj">
            Postupak je isti za svaki tekst i opisan je u uređivačkim
            dokumentima platforme.
          </SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {METHOD.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
