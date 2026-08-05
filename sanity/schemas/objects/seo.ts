import { defineField, defineType } from "sanity";

/**
 * SEO polja (docs/03 §4 i lista provere §8).
 *
 * Po odluci vlasnika: PRISUSTVO oba polja je greška koja blokira objavu, a
 * preporučene dužine (50–60 i 140–155) su UPOZORENJA — vide se u studiju, ali
 * ne zaustavljaju objavu proverenog teksta.
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
        "Preporučeno 50–60 znakova. Ključni pojam na početku. Može se razlikovati od naslova članka.",
      validation: (rule) => [
        rule.required(),
        rule
          .min(50)
          .max(60)
          .warning("Preporučena dužina SEO naslova je 50–60 znakova."),
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "SEO opis",
      type: "text",
      rows: 3,
      description:
        "Preporučeno 140–155 znakova. Obećanje odgovora, ne nabrajanje ključnih reči. Piše se kao rečenica.",
      validation: (rule) => [
        rule.required(),
        rule
          .min(140)
          .max(155)
          .warning("Preporučena dužina SEO opisa je 140–155 znakova."),
      ],
    }),
  ],
});
