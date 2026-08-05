import { defineField, defineType } from "sanity";

/**
 * Stručni recenzent (docs/01 §8.2).
 *
 * Recenzent je dokument u modelu sadržaja, a ne Sanity korisnička uloga
 * (odluka vlasnika H). Njegovo ime i kvalifikacija prikazuju se uz svaki
 * pregledan tekst — odgovornost za medicinsku tvrdnju nosi imenovana osoba
 * sa licencom (docs/00 §5.2, CLAUDE.md §5).
 *
 * `institutionNote` postoji da bi se izbegao utisak da CMZ pruža zdravstvenu
 * zaštitu: CMZ je edukativni studio, ne zdravstvena ustanova (docs/02 §9.4).
 */
export const medicalReviewer = defineType({
  name: "medicalReviewer",
  title: "Stručni recenzent",
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
      description:
        "Navodi se uz svaki pregledan tekst, npr. „spec. opšte medicine“.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specialty",
      title: "Uža oblast",
      type: "string",
    }),
    defineField({
      name: "institutionNote",
      title: "Napomena o ustanovi",
      type: "string",
      description:
        "Formulacija ne sme sugerisati da platforma pruža zdravstvenu zaštitu.",
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
