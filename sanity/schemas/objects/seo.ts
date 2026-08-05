import { defineField, defineType } from "sanity";

/**
 * SEO polja. Granice dužine su iz docs/03 §4 i liste provere §8:
 * title 50–60 znakova, meta opis 140–155 znakova, kao rečenica.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO naslov",
      type: "string",
      description:
        "50–60 znakova. Ključni pojam na početku. Može se razlikovati od naslova članka.",
      validation: (rule) => rule.required().min(50).max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO opis",
      type: "text",
      rows: 3,
      description:
        "140–155 znakova. Obećanje odgovora, ne nabrajanje ključnih reči. Piše se kao rečenica.",
      validation: (rule) => rule.required().min(140).max(155),
    }),
  ],
});
