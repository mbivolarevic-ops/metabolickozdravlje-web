import { defineField, defineType } from "sanity";

/**
 * Jedan izvor (docs/01 §8.3): primarni izvori — SZO, EASD/ADA, NICE,
 * recenzirani radovi. Izvor koji nije otvoren i pročitan ne unosi se
 * (docs/03 §7.3, stavka 3) — to ostaje ljudska odgovornost, model samo
 * traži da izvor bude naveden i dostupan na proveru.
 */
export const referenceItem = defineType({
  name: "referenceItem",
  title: "Izvor",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Naziv izvora",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Veza ka izvoru",
      type: "url",
      description: "Veza mora voditi na izvor koji je otvoren i pročitan.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "Izdavač",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Godina",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "publisher" },
  },
});
