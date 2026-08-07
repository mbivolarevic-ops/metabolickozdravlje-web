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
        { title: "Citat", value: "blockquote" },
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
        annotations: [
          {
            name: "link",
            title: "Veza",
            type: "object",
            fields: [
              {
                name: "href",
                title: "Adresa",
                type: "string",
                description:
                  "Puna adresa (https://…) ili interna putanja koja počinje sa „/“.",
                validation: (rule) =>
                  rule
                    .required()
                    .custom((value) =>
                      typeof value === "string" &&
                      (value.startsWith("/") ||
                        value.startsWith("https://") ||
                        value.startsWith("http://"))
                        ? true
                        : "Dozvoljene su samo https/http adrese i interne putanje koje počinju sa „/“.",
                    ),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithCaption" }),
    defineArrayMember({ type: "videoEmbed" }),
  ],
});
