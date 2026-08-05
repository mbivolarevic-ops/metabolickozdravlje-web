import { defineQuery } from "groq";

/**
 * Upiti za teme (klastere).
 *
 * Svi GROQ upiti žive u ovom direktorijumu (docs/01 §6.4) — nikada inline u
 * komponenti. `defineQuery` omogućava da TypeGen izvede i tipove REZULTATA,
 * pa se ne pišu ručni interfejsi koji bi mogli da se raziđu sa upitom.
 *
 * Draftovi se svuda isključuju: klijent već koristi `perspective: "published"`,
 * a filter `!(_id in path("drafts.**"))` je druga brana — da upis preko API-ja
 * ili buduća promena perspektive ne bi propustili nedovršen tekst.
 */

/** Sve teme, redosledom prioriteta iz projektne dokumentacije. */
export const allClustersQuery = defineQuery(`
  *[_type == "cluster" && !(_id in path("drafts.**"))] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    intro,
    order
  }
`);

/** Jedna tema po slug-u. */
export const clusterBySlugQuery = defineQuery(`
  *[_type == "cluster"
    && slug.current == $cluster
    && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    intro,
    order
  }
`);
