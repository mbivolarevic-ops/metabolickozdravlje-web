import { defineField, defineType } from "sanity";

/**
 * Autor teksta (docs/01 §8.2).
 * Autorstvo se navodi imenom i kvalifikacijom — nikada „redakcija",
 * nikada anonimno (docs/00 §5.2, docs/03 §3.7).
 */
export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ime i prezime",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresa (slug)",
      type: "slug",
      options: { source: "name", maxLength: 72 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Kvalifikacije",
      type: "string",
      description: "Kako se navode uz potpis, npr. „spec. opšte medicine“.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Kratka biografija",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "credentials" },
  },
});
