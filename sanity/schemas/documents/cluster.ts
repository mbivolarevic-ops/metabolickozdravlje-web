import { defineField, defineType } from "sanity";

/**
 * Klaster / pillar tema (docs/01 §8.2).
 *
 * Slug se posle objave ne menja bez 301 preusmerenja (docs/01 §4.1).
 * `order` prati prioritet klastera iz docs/01 §9.3.
 */
export const cluster = defineType({
  name: "cluster",
  title: "Tema (klaster)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naziv teme",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresa (slug)",
      type: "slug",
      options: { source: "title", maxLength: 72 },
      description:
        "Bez dijakritike. Posle objave se ne menja bez 301 preusmerenja.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Uvod",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Redosled prikaza",
      type: "number",
      description: "Prati prioritet klastera iz projektne dokumentacije.",
    }),
  ],
  orderings: [
    {
      title: "Prioritet",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
