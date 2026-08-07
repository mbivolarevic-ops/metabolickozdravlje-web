import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ValidTopic } from "@/sanity/content";

/**
 * Teme iz content sistema.
 *
 * Redosled dolazi iz uredničkog polja `order` u upitu i ovde se ne dira.
 * „Popularnost“ se ne izmišlja — platforma je ne meri, pa ne sme ni da je
 * sugeriše.
 *
 * Prazno stanje je namerno dizajnirano, a ne prazna mreža: kada tema nema,
 * čitalac dobija rečenicu koja objašnjava zašto, i vezu koja i dalje vodi
 * negde gde ga čeka isto pošteno prazno stanje.
 */

/** Početna prikazuje najviše šest tema; pun spisak je na `/teme`. */
export const HOMEPAGE_TOPIC_LIMIT = 6;

export function TopicGrid({ topics }: { topics: readonly ValidTopic[] }) {
  const shown = topics.slice(0, HOMEPAGE_TOPIC_LIMIT);

  return (
    <section aria-labelledby="teme">
      <Container className="border-t border-border py-12 sm:py-16">
        <SectionHeading id="teme" title="Istražite teme">
          Sadržaj je organizovan po temama, tako da svaki tekst odgovara na
          jedno pitanje.
        </SectionHeading>

        {shown.length === 0 ? (
          <p className="mt-8 max-w-[var(--container-prose)]">
            Prve teme se pripremaju. Uskoro ćete ovde pronaći jasno organizovane
            vodiče kroz metaboličko zdravlje.
          </p>
        ) : (
          <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((topic) => (
              <li
                key={topic._id}
                className="rounded-md border border-border bg-surface p-5"
              >
                {/*
                 * Link nosi naslov, ne cela kartica: jedno jasno odredište sa
                 * imenom koje se razume i van konteksta.
                 */}
                <h3 className="text-base font-semibold">
                  <Link href={`/teme/${topic.slug}`}>{topic.title}</Link>
                </h3>
                <p className="mt-2 text-text-muted">{topic.intro}</p>
              </li>
            ))}
          </ul>
        )}

        {/*
         * Namerno drugačiji tekst od dugmeta u završnom CTA-u, iako vode na
         * isto mesto. Dva linka istog imena na jednoj stranici čitaču ekrana
         * zvuče kao dva puta ista ponuda.
         */}
        <p className="mt-8">
          <Link href="/teme">Pregled svih tema</Link>
        </p>
      </Container>
    </section>
  );
}
