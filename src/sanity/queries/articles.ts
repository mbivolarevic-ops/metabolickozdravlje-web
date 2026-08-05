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

/** Projekcija koja se koristi svuda gde se članak prikazuje. */
const ARTICLE_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  contentFormat,
  editorialTier,
  body,
  reviewDate,
  nextReviewDate,
  "cluster": cluster->{ title, "slug": slug.current },
  "author": author->{ name, credentials, "slug": slug.current },
  "reviewer": reviewedBy->{ name, credentials, specialty, institutionNote },
  references[]{ label, url, publisher, year },
  seo
`;

/** Kratak prikaz članka za liste. Nosi isti uslov objavljivosti. */
export const articlesByClusterQuery = defineQuery(`
  *[${PUBLISHABLE} && cluster->slug.current == $cluster]
    | order(reviewDate desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      reviewDate,
      "cluster": cluster->{ title, "slug": slug.current }
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

/** Parovi (tema, članak) za buduće generisanje statičkih putanja. */
export const publishableArticleSlugsQuery = defineQuery(`
  *[${PUBLISHABLE}] {
    "slug": slug.current,
    "cluster": cluster->slug.current
  }
`);
