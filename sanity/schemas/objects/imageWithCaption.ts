import { defineField, defineType } from "sanity";

/**
 * Slika sa obaveznim `alt` opisom.
 *
 * docs/01 §8.4: „Obavezan `alt` tekst, validacija blokira snimanje bez njega."
 * docs/04 §14.7, stavka 6: slika bez `alt` opisa blokira objavu.
 * `alt` mora prenositi informaciju, ne ključnu reč (docs/03 §4).
 */
export const imageWithCaption = defineType({
  name: "imageWithCaption",
  title: "Slika",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Opis slike (alt)",
      type: "string",
      description:
        "Opisuje šta slika prikazuje, tako da informacija ostane dostupna i bez slike.",
      validation: (rule) =>
        rule
          .required()
          .error(
            "Slika se ne može sačuvati bez opisa koji prenosi informaciju.",
          ),
    }),
    defineField({
      name: "caption",
      title: "Potpis ispod slike",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Izvor ili autor slike",
      type: "string",
      description:
        "Ko je autor ili odakle slika dolazi. Prikazuje se uz potpis.",
    }),
  ],
});
