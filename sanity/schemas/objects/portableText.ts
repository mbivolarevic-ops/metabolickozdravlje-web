import { defineArrayMember, defineType } from "sanity";

/**
 * Telo teksta — minimalna verzija za PR 1.
 *
 * Uredniku se NE daje slobodan HTML (docs/01 §8.4). Dozvoljeni su samo
 * pasusi, podnaslovi H2/H3, liste i slika sa obaveznim opisom.
 *
 * Namerno NEMA blokova za cene, svedočenja pacijenata, before/after galerije
 * ni odbrojavanje — v. `FORBIDDEN_CONTENT_BLOCK_TYPES` u `../blockTypes.ts`.
 * Napredni blokovi (callout, keyFigure, comparisonTable, stepList, faqEmbed,
 * doctorQuestions, citationMark) dolaze u kasnijim PR-ovima, zajedno sa
 * svojim renderima i testovima.
 *
 * Nivo H1 nije ponuđen: jedan `h1` po stranici nosi naslov članka
 * (docs/01 §6.6).
 */
export const portableText = defineType({
  name: "portableText",
  title: "Tekst",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Pasus", value: "normal" },
        { title: "Podnaslov (H2)", value: "h2" },
        { title: "Podnaslov (H3)", value: "h3" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Numerisana lista", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Podebljano", value: "strong" },
          { title: "Kurziv", value: "em" },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithCaption" }),
  ],
});
