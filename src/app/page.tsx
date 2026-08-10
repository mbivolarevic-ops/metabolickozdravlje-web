import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { AntiStigmaSection } from "@/components/home/AntiStigmaSection";
import { TopicGrid } from "@/components/home/TopicGrid";
import { ReviewedArticles } from "@/components/home/ReviewedArticles";
import { TreatmentOverview } from "@/components/home/TreatmentOverview";
import { EditorialMethod } from "@/components/home/EditorialMethod";
import { AssessmentTeaser } from "@/components/home/AssessmentTeaser";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { getHomepageArticles, getTopics } from "@/sanity/content";

/**
 * Početna stranica.
 *
 * Odgovara na pet pitanja, tim redom: gde sam došao, zašto ovome mogu da
 * verujem, koje teme mogu da razumem, kako sadržaj nastaje, i gde da nastavim.
 *
 * U ovoj fazi pokriva samo edukaciju i poverenje. Nema kviza, forme,
 * zakazivanja, analitike ni prikupljanja podataka — ni u pripremi, osim
 * najave koja ništa ne radi.
 *
 * Server komponenta, bez klijentskog JavaScripta. Sadržaj dolazi iz istog
 * read-only sloja koji koriste i ostale rute, sa istim kapijama: nevalidan
 * zapis se ne prikazuje, prava prazna lista daje pošteno prazno stanje, a
 * odgovor pogrešnog oblika obara build umesto da izgleda kao „nema sadržaja“.
 *
 * Stranica mora izgledati namerno i kada sadržaja nema — to je stanje u kojem
 * se danas i zatiče.
 */

export const metadata: Metadata = {
  title: "Metaboličko zdravlje, objašnjeno jasno i bez osude",
  description:
    "Pouzdane informacije o gojaznosti, šećeru u krvi, hormonima i drugim temama koje utiču na metaboličko zdravlje. Svaki tekst ima autora, stručnog recenzenta i datum provere.",
  /*
   * Bez `canonical`: projekat još nema `metadataBase` ni potvrđen produkcioni
   * domen, pa bi relativna kanonska adresa bila nagađanje. Dodaje se kada
   * domen bude potvrđen.
   *
   * Bez `openGraph`: nema slike koju bismo pošteno mogli da ponudimo, a
   * izmišljena je gora od nijedne. Globalni `noindex` iz layout-a ostaje.
   */
};

export default async function HomePage() {
  const [topics, articles] = await Promise.all([
    getTopics(),
    getHomepageArticles(),
  ]);

  return (
    <>
      <HomeHero />
      <TrustBar />
      <AntiStigmaSection />
      <TopicGrid topics={topics} />
      <ReviewedArticles articles={articles} />
      <TreatmentOverview />
      <EditorialMethod />
      <AssessmentTeaser />
      <HomeFinalCta />
    </>
  );
}
