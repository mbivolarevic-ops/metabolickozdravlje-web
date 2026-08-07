import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleThumbnail } from "@/components/content/ArticleThumbnail";
import { formatReviewDate } from "@/components/medical/formatReviewDate";
import type { ValidHomepageArticle } from "@/sanity/content";

/**
 * Nedavno stručno provereni tekstovi.
 *
 * Naslov namerno NE kaže „najnovije“: model nema datum objavljivanja, pa bi
 * takva reč bila tvrdnja koju sistem ne može da potkrepi. Ono što stvarno
 * postoji jeste datum poslednje stručne provere, i po njemu se ređa.
 *
 * Kartica prikazuje datum kao vidljiv podatak, ne kao sitan otisak — to je
 * jedan od razloga zbog kojih se ovom sadržaju veruje (docs/00 §5.2).
 *
 * Slika je opciona. Članak bez nje je potpuno ispravan članak i kartica
 * izgleda uredno i bez sličice.
 */
export function ReviewedArticles({
  articles,
}: {
  articles: readonly ValidHomepageArticle[];
}) {
  return (
    <section aria-labelledby="provereni-tekstovi">
      <Container className="border-t border-border py-12 sm:py-16">
        <SectionHeading
          id="provereni-tekstovi"
          title="Nedavno stručno provereni tekstovi"
        >
          Uz svaki tekst stoji datum poslednje stručne provere.
        </SectionHeading>

        {articles.length === 0 ? (
          <p className="mt-8 max-w-[var(--container-prose)]">
            Prvi stručno provereni tekstovi su u pripremi.
          </p>
        ) : (
          <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const reviewedOn = formatReviewDate(article.reviewDate);

              return (
                <li
                  key={article._id}
                  className="flex flex-col overflow-hidden rounded-md border border-border bg-surface"
                >
                  {/* Vraća `null` kada slike nema ili nije ispravna. */}
                  <ArticleThumbnail
                    value={article.featuredImage}
                    className="rounded-none"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-sans text-sm text-text-muted">
                      {article.cluster.title}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">
                      <Link href={`/tekstovi/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-text-muted">
                      {article.excerpt}
                    </p>
                    {reviewedOn !== null && (
                      <p className="mt-4 font-sans text-sm text-text-muted">
                        Poslednja provera:{" "}
                        <time dateTime={article.reviewDate}>{reviewedOn}</time>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </section>
  );
}
