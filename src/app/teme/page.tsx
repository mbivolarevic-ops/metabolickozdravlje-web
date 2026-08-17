import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { getTopics } from "@/sanity/content";
import { canonicalUrl } from "@/site/config";

/**
 * Pregled svih tema (`/teme`).
 *
 * Server komponenta, statički generisana. Bez klijentskog JS-a i bez
 * indikatora učitavanja — sadržaj je statičan i postoji u trenutku build-a.
 *
 * Ruta je `/teme`, a ne `/blog`, jer je sadržaj referentan, ne hronološki
 * (docs/01 §4.3).
 */

export const metadata: Metadata = {
  title: "Teme",
  description:
    "Pregled tema o metaboličkom zdravlju za koje se priprema edukativni sadržaj. Svaka tema okuplja tekstove koji odgovaraju na jedno pitanje.",
  alternates: { canonical: canonicalUrl("teme") },
  openGraph: {
    type: "website",
    title: "Teme",
    url: canonicalUrl("teme"),
  },
};

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <Container className="py-12">
      <h1>Teme</h1>
      <p className="mt-4 max-w-[var(--container-prose)] text-text-muted">
        Sadržaj se organizuje po temama, tako da svaka odgovara na jedno
        pitanje.
      </p>

      {topics.length === 0 ? (
        /*
         * Pošteno prazno stanje. Prikazuje se kada Sanity nije podešen ili
         * kada ispravno podešen dataset nema nijednu temu.
         *
         * NIKADA se ne prikazuje kada upit padne — takva greška se propagira
         * i obara build, umesto da se objavi prazan sajt kao ispravan.
         */
        <>
          <p className="mt-8 max-w-[var(--container-prose)]">
            Teme se pripremaju. Sadržaj još nije objavljen — vratite se kasnije.
          </p>

          {/*
           * Izlaz iz praznog stanja. Bez njega je ovo slepa ulica: u glavnom
           * sadržaju nema nijednog linka, pa jedini put dalje vodi kroz
           * zaglavlje ili dugme „nazad“.
           *
           * Prikazuje se ISKLJUČIVO kada tema nema. Kada teme postoje, svaka je
           * već svoj sledeći korak i povratni link bi bio šum.
           */}
          <p className="mt-8">
            <CtaLink href="/" variant="secondary">
              Nazad na početnu
            </CtaLink>
          </p>
        </>
      ) : (
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h2 className="text-base font-semibold">
                <Link href={`/teme/${topic.slug}`}>{topic.title}</Link>
              </h2>
              <p className="mt-2 text-text-muted">{topic.intro}</p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
