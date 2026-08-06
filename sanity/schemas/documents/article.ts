import { defineField, defineType } from "sanity";
import { toArticleInput } from "../../validation/adapters";
import { validateArticleForPublish } from "../../validation/publishGuards";
import {
  formatIssuesForSanity,
  formatWarningsForSanity,
} from "../../validation/sanityMessages";

/**
 * Članak — najvažniji tip (docs/01 §8.3).
 *
 * Blokirajuća pravila NISU napisana ovde. Ona žive kao čiste funkcije u
 * `sanity/validation/` i testiraju se bez Sanity projekta i bez mreže. Šema
 * ih samo poziva, pa se poslovna logika ne duplira i ne može se razići
 * između studija i testova.
 */
export const article = defineType({
  name: "article",
  title: "Članak",
  type: "document",
  groups: [
    { name: "content", title: "Sadržaj", default: true },
    { name: "medical", title: "Medicinska kontrola" },
    { name: "clarity", title: "Razumljivost" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ——— SADRŽAJ ———
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "slug",
      title: "Adresa (slug)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 72 },
      description: "Posle objave se ne menja bez 301 preusmerenja.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kratak odgovor",
      type: "text",
      rows: 3,
      group: "content",
      description: "Direktan odgovor na pitanje iz naslova, u 2–3 rečenice.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "cluster",
      title: "Tema",
      type: "reference",
      to: [{ type: "cluster" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentFormat",
      title: "Format sadržaja",
      type: "string",
      group: "content",
      initialValue: "article",
      options: {
        list: [
          { title: "Članak", value: "article" },
          { title: "Pillar stranica", value: "pillar" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    /*
     * Naslovna slika je OPCIONA i koristi ISTI `imageWithCaption` objekat kao
     * slike u tekstu. Nije uveden drugi image model — dva paralelna modela bi
     * značila dva mesta na kojima se pravilo o obaveznom opisu može razići.
     *
     * Stoji uz uvodne podatke i neposredno pre teksta, isto kao na stranici.
     */
    defineField({
      name: "featuredImage",
      title: "Naslovna slika",
      type: "imageWithCaption",
      group: "content",
      description:
        "Opciono. Ako je dodaš, važe ista pravila kao za slike u tekstu — opis (alt) je obavezan.",
    }),
    defineField({
      name: "body",
      title: "Tekst",
      type: "portableText",
      group: "content",
    }),

    // ——— MEDICINSKA KONTROLA ———
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      group: "medical",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewedBy",
      title: "Stručni recenzent",
      type: "reference",
      to: [{ type: "medicalReviewer" }],
      group: "medical",
      description:
        "Obavezan za svaki nivo, uključujući standardni (odluka vlasnika A).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewDate",
      title: "Datum poslednje stručne provere",
      type: "date",
      group: "medical",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nextReviewDate",
      title: "Datum sledeće provere",
      type: "date",
      group: "medical",
      description: "Podrazumevano 18 meseci od poslednje provere.",
    }),
    defineField({
      name: "editorialTier",
      title: "Nivo uređivačke kontrole",
      type: "string",
      group: "medical",
      initialValue: "standard",
      options: {
        list: [
          { title: "Standardno (opšta edukacija)", value: "standard" },
          { title: "Povišeno (dijagnostika, laboratorija)", value: "elevated" },
          {
            title: "Osetljivo (terapije, lekovi) — traži i pravni pregled",
            value: "sensitive",
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "references",
      title: "Izvori",
      type: "array",
      of: [{ type: "referenceItem" }],
      group: "medical",
      description:
        "Primarni izvori: SZO, EASD/ADA, NICE, recenzirani radovi. Najmanje jedan (odluka vlasnika B).",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "legalReviewed",
      title: "Pravni pregled obavljen",
      type: "boolean",
      group: "medical",
      initialValue: false,
      hidden: ({ document }) => document?.editorialTier !== "sensitive",
    }),

    // ——— RAZUMLJIVOST ———
    defineField({
      name: "clarityChecks",
      title: "Provere razumljivosti",
      type: "clarityChecks",
      group: "clarity",
    }),
    defineField({
      name: "clarityTestDone",
      title: "Test razumevanja sa ljudima sproveden",
      type: "boolean",
      group: "clarity",
      initialValue: false,
      description: "Obavezno za pillar stranice.",
    }),
    defineField({
      name: "clarityTestNotes",
      title: "Beleške sa testa",
      type: "text",
      rows: 3,
      group: "clarity",
      description: "Sažetak nalaza, bez ličnih podataka učesnika.",
    }),

    // ——— SEO ———
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  /**
   * Kapija pred objavu. Oba pravila pozivaju ISTU čistu funkciju koju
   * pokrivaju testovi — pravila se ne dupliraju.
   *
   * Prvo pravilo je greška i zaustavlja objavu. Drugo je `.warning()` i samo
   * obaveštava urednika (preporučene SEO dužine, neblokirajuće clarity
   * provere) — bez njega bi se ta upozorenja izgubila.
   */
  validation: (rule) => [
    rule.custom((document) =>
      formatIssuesForSanity(
        validateArticleForPublish(toArticleInput(document)),
      ),
    ),
    rule
      .custom((document) =>
        formatWarningsForSanity(
          validateArticleForPublish(toArticleInput(document)),
        ),
      )
      .warning(),
  ],

  preview: {
    select: { title: "title", subtitle: "editorialTier" },
  },
});
