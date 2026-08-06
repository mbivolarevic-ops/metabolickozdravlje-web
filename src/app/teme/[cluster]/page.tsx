import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import {
  getTopic,
  getTopicArticleSummaries,
  loadTopicSlugs,
} from "@/sanity/content";
import { formatReviewDate } from "@/components/medical/formatReviewDate";

/**
 * Stranica jedne teme (`/teme/[cluster]`).
 *
 * U ovoj fazi je INDEKS članaka teme, ne medicinski pillar tekst: `cluster`
 * model nosi samo `title`, `slug`, `intro` i `order` — nema recenzenta,
 * datuma provere ni izvora, pa se medicinski sadržaj ovde ne tvrdi.
 *
 * Potpuno statička: `generateStaticParams` daje sve validne teme, a
 * `dynamicParams = false` znači da nepoznata tema odmah daje 404, bez
 * dinamičkog fallback prikaza. Bez ISR-a i bez webhook-ova.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await loadTopicSlugs();
  return slugs.map((cluster) => ({ cluster }));
}

/** Meta opis se skraćuje na razumnu dužinu za rezultat pretrage. */
const META_DESCRIPTION_MAX = 160;

function toMetaDescription(intro: string): string {
  const trimmed = intro.trim();
  if (trimmed.length <= META_DESCRIPTION_MAX) return trimmed;
  return `${trimmed.slice(0, META_DESCRIPTION_MAX - 1).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const topic = await getTopic(cluster);

  // Nevalidan CMS zapis ne ulazi u metadata.
  if (topic === null) return {};

  return {
    title: topic.title,
    description: toMetaDescription(topic.intro),
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const topic = await getTopic(cluster);

  if (topic === null) notFound();

  const articles = await getTopicArticleSummaries(topic.slug);

  return (
    <Container className="py-12">
      <p className="text-sm text-text-muted">
        <Link href="/teme">Teme</Link>
      </p>
      <h1 className="mt-2">{topic.title}</h1>
      <p className="mt-4 max-w-[var(--container-prose)]">{topic.intro}</p>

      <h2 className="mt-10 text-xl">Tekstovi u ovoj temi</h2>

      {articles.length === 0 ? (
        <p className="mt-4 max-w-[var(--container-prose)]">
          Tekstovi za ovu temu se pripremaju i još nisu objavljeni.
        </p>
      ) : (
        <ul className="mt-4 grid list-none gap-4">
          {articles.map((article) => {
            const reviewedOn = formatReviewDate(article.reviewDate);

            return (
              /*
               * Sažeci NISU linkovi: ruta `/teme/[cluster]/[slug]` još ne
               * postoji, a projekat ne pravi mrtve linkove. Kartica zato
               * nema ni hover ni pokazivač koji bi tvrdio da je klikabilna.
               */
              <li
                key={article._id}
                className="rounded-md border border-border bg-surface p-5"
              >
                <h3 className="text-base font-semibold">{article.title}</h3>
                <p className="mt-2 text-text-muted">{article.excerpt}</p>
                {reviewedOn !== null && (
                  <p className="mt-2 text-sm text-text-muted">
                    Poslednja provera:{" "}
                    <time dateTime={article.reviewDate}>{reviewedOn}</time>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
