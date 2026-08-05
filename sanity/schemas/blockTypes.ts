/**
 * Dozvoljeni blokovi u telu teksta.
 *
 * Namerno zatvorena lista (docs/01 §8.4): uredniku se NE daje slobodan HTML.
 * Ono što ne postoji u modelu ne može se objaviti pod pritiskom roka.
 *
 * U PR 1 model je sveden na minimum — napredni blokovi (keyFigure,
 * comparisonTable, stepList, faqEmbed, guideCta, doctorQuestions,
 * citationMark, callout) dolaze u kasnijim PR-ovima, zajedno sa svojim
 * renderima i testovima.
 *
 * Ova lista je čista podatkovna vrednost, bez zavisnosti od paketa `sanity`,
 * kako bi testovi mogli da je provere bez učitavanja studija.
 */
export const ALLOWED_CONTENT_BLOCK_TYPES: readonly string[] = [
  "block",
  "imageWithCaption",
] as const;

/**
 * Blokovi koji se NIKADA ne uvode u model.
 *
 * Nisu „još neimplementirani" — oni su zabranjeni sadržajni obrasci
 * (docs/01 §8.4, docs/00 §8.2, docs/02 §2.4). Lista postoji da bi test mogao
 * da dokaže njihovo odsustvo, umesto da se odsustvo pretpostavlja.
 */
export const FORBIDDEN_CONTENT_BLOCK_TYPES: readonly string[] = [
  "price",
  "pricing",
  "testimonial",
  "patientStory",
  "beforeAfter",
  "beforeAfterGallery",
  "countdown",
] as const;
