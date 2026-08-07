import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleImage } from "@/components/content/ArticleImage";
import {
  MedicalDisclaimer,
  ReferenceList,
  ReviewerByline,
  type ReferenceListItem,
} from "@/components/medical";
import { getArticle, loadArticleSlugs } from "@/sanity/content";
import {
  OPEN_GRAPH_IMAGE_HEIGHT,
  OPEN_GRAPH_IMAGE_WIDTH,
  toOpenGraphImageUrl,
} from "@/sanity/imageUrl";

/**
 * Stranica pojedinačnog članka (`/tekstovi/[slug]`).
 *
 * Adresa NE sadrži slug teme: premeštanje članka u drugu temu ne sme da
 * pokvari objavljenu adresu (docs/01 §4.1 — slug se posle objave ne menja).
 * Tema se i dalje prikazuje i vodi na `/teme/[cluster]`.
 *
 * Potpuno statička: `generateStaticParams` iz objavljivih članaka i
 * `dynamicParams = false`, pa nepoznat slug odmah daje 404. Bez ISR-a,
 * webhook-ova, preview-a i draft moda.
 *
 * Medicinska kapija: članak prolazi samo ako zadovolji `isDisplayableArticle()`
 * i proveru tela. Nedostajuća atribucija, neispravno telo ili neispravan medij
 * znače 404 — nikada delimičan prikaz.
 *
 * Naslovna slika je opciona. Kada je nema, stranica je potpuna i bez nje; kada
 * postoji ali nije ispravna, članak uopšte ne prolazi kapiju.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await loadArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

const META_DESCRIPTION_MAX = 160;

function toMetaDescription(excerpt: string): string {
  const trimmed = excerpt.trim();
  if (trimmed.length <= META_DESCRIPTION_MAX) return trimmed;
  return `${trimmed.slice(0, META_DESCRIPTION_MAX - 1).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  // Neprikaziv članak ne ulazi u metadata.
  if (article === null) return {};

  const metadata: Metadata = {
    title: article.title,
    description: toMetaDescription(article.excerpt),
  };

  /*
   * Open Graph slika se postavlja SAMO kada postoji potpuno validna naslovna
   * slika iz koje se može sastaviti adresa na Sanity CDN-u. Bez toga se ne
   * izmišlja ništa — pogrešna ili prazna OG slika je gora od izostanka, jer
   * je čitač linkova prikazuje kao da je deo teksta.
   *
   * Globalni `noindex` ostaje na snazi; ovo utiče samo na prikaz podeljenog
   * linka, ne na indeksiranje.
   */
  const ogImage = toOpenGraphImageUrl(article.featuredImage);
  if (ogImage !== null) {
    metadata.openGraph = {
      images: [
        {
          url: ogImage,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: article.featuredImage?.alt ?? undefined,
        },
      ],
    };
  }

  return metadata;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (article === null) notFound();

  // Odsutna i `null` naslovna slika su isto stanje: nema slike.
  const featuredImage = article.featuredImage ?? null;

  const references: ReferenceListItem[] = article.references.map((item) => ({
    label: item.label,
    url: item.url,
    publisher: item.publisher,
    year: item.year,
  }));

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Teme", href: "/teme" },
          {
            label: article.cluster.title,
            href: `/teme/${article.cluster.slug}`,
          },
        ]}
      />

      {/*
       * Tema se NE ponavlja kao zaseban red iznad naslova. Putanja je već
       * nosi kao poslednju stavku, pa bi drugi link istog teksta i istog
       * odredišta bio čitaocu suvišan, a čitaču ekrana bi se pročitao dvaput
       * zaredom. Vezu nazad nosi imenovani link na dnu teksta.
       */}
      <h1 className="mt-6 max-w-[var(--container-prose)]">{article.title}</h1>

      <p className="mt-4 max-w-[var(--container-prose)] text-lg">
        {article.excerpt}
      </p>

      {/* `isDisplayableArticle()` garantuje da su i ime i kvalifikacije neprazni. */}
      <p className="mt-6 font-sans text-sm text-text-muted">
        Autor: {article.author.name} · {article.author.credentials}
      </p>

      <div className="mt-4 max-w-[var(--container-prose)]">
        <ReviewerByline
          name={article.reviewer.name}
          credentials={article.reviewer.credentials}
          reviewDate={article.reviewDate}
        />
      </div>

      {/*
       * Naslovna slika stoji posle atribucije i pre teksta. Ako je nema,
       * `ArticleImage` ne renderuje ništa i stranica ostaje potpuna.
       */}
      {featuredImage !== null && (
        <div className="max-w-[var(--container-prose)]">
          <ArticleImage value={featuredImage} />
        </div>
      )}

      <article className="mt-8">
        <ArticleBody value={article.body} />
      </article>

      <div className="mt-10 max-w-[var(--container-prose)]">
        <MedicalDisclaimer />
      </div>

      <div className="mt-10 max-w-[var(--container-prose)]">
        <ReferenceList references={references} />
      </div>

      <p className="mt-10 text-sm">
        <Link href={`/teme/${article.cluster.slug}`}>
          Nazad na temu: {article.cluster.title}
        </Link>
      </p>
    </Container>
  );
}
