import Link from "next/link";
import { formatReviewDate } from "@/components/medical/formatReviewDate";
import type { ValidArticleSummary } from "@/sanity/contentGuards";

/**
 * Povezani tekstovi iz iste teme (docs/02 §3.1, element ⑮).
 *
 * Serverska komponenta — bez `"use client"` i bez ijednog bajta klijentskog
 * JavaScripta. Prikazuje isključivo podatke koji su već prošli kapiju; ništa se
 * ne računa, ne rangira i ne personalizuje.
 *
 * Prazna lista NE renderuje ništa. Naslov „Povezani tekstovi“ iznad prazne
 * mreže bio bi obećanje koje stranica ne ispunjava, a čitaocu bi rekao da nešto
 * nedostaje. Jedan ili dva teksta prikazuju se normalno — nema rezervisanih
 * praznih mesta.
 *
 * Link nosi naslov, ne cela kartica: jedno jasno odredište po stavci umesto
 * velike klikabilne površine bez imena. Isti izbor kao na stranici teme.
 */
export function RelatedArticles({
  articles,
}: {
  articles: readonly ValidArticleSummary[];
}) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="povezani-tekstovi"
      className="mt-12 max-w-[var(--container-prose)]"
    >
      <h2 id="povezani-tekstovi" className="text-xl">
        Povezani tekstovi
      </h2>

      <p className="mt-2 text-text-muted">
        Iz iste teme: {articles[0]?.cluster.title}.
      </p>

      <ul className="mt-4 grid list-none gap-4">
        {articles.map((article) => {
          const reviewedOn = formatReviewDate(article.reviewDate);

          return (
            <li
              key={article._id}
              className="rounded-md border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold">
                <Link href={`/tekstovi/${article.slug}`}>{article.title}</Link>
              </h3>
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
    </section>
  );
}
