import { defineQuery } from "groq";

/**
 * Upiti za članke.
 *
 * ⛔ KLJUČNO PRAVILO (docs/01 §6.4, §8.1): članak se NIKADA ne dohvata bez
 * atribucije. Filter „objavljivosti“ je deo samog upita, pa šablon ne može
 * ni doći u priliku da prikaže tekst bez autora, recenzenta, datuma provere
 * i izvora — čak i kada bi neko takav dokument upisao preko API-ja,
 * zaobilazeći validaciju u studiju.
 *
 * Isti uslov se ponavlja u `isDisplayableArticle()` kao druga brana. Filter u
 * upitu i runtime provera su namerno dvostruki: upit neko može „pojednostaviti“
 * pri refaktorisanju, a tada zaštita mora ostati.
 */

/**
 * Uslov objavljivosti — jedan izvor istine za oba upita ispod.
 *
 * Napomena: `count(references) > 0` traži postojanje bar jednog izvora.
 * KOMPLETNOST izvora (naziv + veza) proverava `isDisplayableArticle()`, jer
 * je to provera oblika podatka, a ne filter nad skupom dokumenata.
 */
const PUBLISHABLE = `
  _type == "article"
  && !(_id in path("drafts.**"))
  && defined(author)
  && defined(reviewedBy)
  && defined(reviewDate)
  && count(references) > 0
`;

/**
 * Naslovna slika — namerno uska projekcija.
 *
 * Povlači se tačno ono što treba za prikaz: opis, potpis, izvor, izabrani
 * isečak i fokus, plus identifikator asseta i njegove dimenzije. Asset se
 * dereferencira zbog dimenzija; ostatak zapisa o fajlu (URL, paleta, naziv
 * originala, podaci o otpremanju) se NE povlači — to su podaci o CMS-u, ne o
 * sadržaju, i nemaju šta da traže u odgovoru.
 */
const FEATURED_IMAGE_PROJECTION = `
  "featuredImage": featuredImage{
    alt,
    caption,
    credit,
    crop,
    hotspot,
    asset->{
      _id,
      "dimensions": metadata.dimensions{ width, height }
    }
  }
`;

/**
 * Da li članak ima telo koje se stvarno može pročitati.
 *
 * Uslov objavljivosti iznad NE traži telo — traži atribuciju i izvore. Članak
 * bez teksta zato prolazi filter, ali ga `isDisplayableArticle()` odbija, pa
 * njegova stranica daje 404. Lista koja bi ga prikazala vodila bi čitaoca u
 * prazno.
 *
 * `coalesce(..., false)` je nužan: `count()` nad odsutnim poljem vraća `null`,
 * a `null > 0` je opet `null`, ne `false`.
 *
 * Ovo je približna provera, namerno ista po duhu kao `hasUsableBody()`: bar
 * jedan tekstualni blok sa bar jednim nepraznim spanom. Konačnu reč i dalje
 * ima runtime guard.
 */
const HAS_USABLE_BODY_PROJECTION = `
  "hasUsableBody": coalesce(
    count(body[_type == "block" && count(children[defined(text) && text != ""]) > 0]) > 0,
    false
  )
`;

/** Projekcija koja se koristi svuda gde se članak prikazuje. */
const ARTICLE_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  contentFormat,
  editorialTier,
  ${FEATURED_IMAGE_PROJECTION},
  body,
  reviewDate,
  nextReviewDate,
  "cluster": cluster->{ title, "slug": slug.current },
  "author": author->{ name, credentials, "slug": slug.current },
  "reviewer": reviewedBy->{ name, credentials, specialty, institutionNote },
  references[]{ label, url, publisher, year },
  seo
`;

/**
 * Kratak prikaz članka za liste. Nosi isti uslov objavljivosti.
 *
 * Lista nije ograničena po broju, pa filtriranje ne može da ostavi rupu —
 * vraća sve članke teme, a nevalidni jednostavno otpadaju.
 */
export const articlesByClusterQuery = defineQuery(`
  *[${PUBLISHABLE} && cluster->slug.current == $cluster]
    | order(reviewDate desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      reviewDate,
      "cluster": cluster->{ title, "slug": slug.current },
      ${HAS_USABLE_BODY_PROJECTION}
    }
`);

/**
 * Nedavno stručno provereni članci — za početnu stranicu.
 *
 * Sortira se po `reviewDate`, a ne po datumu objavljivanja: model taj datum
 * nema, i to nije propust. Ono što čitaocu nešto znači jeste kada je tekst
 * poslednji put stručno proveren, pa se po tome i ređa (docs/00 §5.2).
 * Zato sekcija na početnoj i ne kaže „najnovije“.
 *
 * Projekcija je sažetak iz liste plus naslovna slika za sličicu. Telo,
 * izvori, biografije i SEO se NE povlače — početnoj ne trebaju, a svaki
 * suvišan podatak je podatak koji negde može da procuri.
 */
export const recentlyReviewedArticlesQuery = defineQuery(`
  *[${PUBLISHABLE}] | order(reviewDate desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    reviewDate,
    "cluster": cluster->{ title, "slug": slug.current },
    ${FEATURED_IMAGE_PROJECTION},
    ${HAS_USABLE_BODY_PROJECTION}
  }
`);

/** Jedan članak, po slug-u teme i slug-u članka. */
export const articleBySlugQuery = defineQuery(`
  *[${PUBLISHABLE}
    && slug.current == $slug
    && cluster->slug.current == $cluster][0] {
      ${ARTICLE_PROJECTION}
    }
`);

/**
 * Jedan članak samo po sopstvenom slug-u.
 *
 * Ruta `/tekstovi/[slug]` namerno ne zavisi od teme: promena teme ne sme da
 * pokvari adresu objavljenog teksta. Tema i dalje dolazi u projekciji, jer je
 * potrebna za breadcrumb i vezu nazad.
 */
export const articleBySlugOnlyQuery = defineQuery(`
  *[${PUBLISHABLE} && slug.current == $slug][0] {
      ${ARTICLE_PROJECTION}
    }
`);

/**
 * Članci za sitemap.
 *
 * Ista projekcija kao za početnu — dakle isti podaci koje traže postojeći
 * guardovi — samo bez ograničenja broja i uz `_updatedAt`. Telo članka se NE
 * povlači: sitemap-u treba adresa, ne tekst.
 *
 * Zašto ne `publishableArticlePathsQuery`: on vraća samo slug i ne zna ništa o
 * telu, autoru ni slici, pa bi u sitemap ušle i adrese koje vraćaju 404.
 */
export const sitemapArticlesQuery = defineQuery(`
  *[${PUBLISHABLE}] | order(reviewDate desc) {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    excerpt,
    reviewDate,
    "cluster": cluster->{ title, "slug": slug.current },
    ${FEATURED_IMAGE_PROJECTION},
    ${HAS_USABLE_BODY_PROJECTION}
  }
`);

/*
 * `publishableArticlePathsQuery` je UKLONJEN.
 *
 * Vraćao je samo slug, bez ijednog podatka o telu, autoru ili slici, pa je
 * `generateStaticParams` generisao rutu i za članak koji stranica odbija —
 * statički 404. Slug vrednosti sada dolaze iz `sitemapArticlesQuery`, kroz
 * isti guard kao i sve ostale liste.
 *
 * Upit nije ostavljen „za svaki slučaj“ namerno: slabija provera koja stoji
 * pored jače pre ili kasnije bude upotrebljena.
 */

/** Parovi (tema, članak) za buduće generisanje statičkih putanja. */
export const publishableArticleSlugsQuery = defineQuery(`
  *[${PUBLISHABLE}] {
    "slug": slug.current,
    "cluster": cluster->slug.current
  }
`);
