import { defineField, defineType } from "sanity";
import { VIDEO_PROVIDERS, toVideoEmbedUrl } from "../../validation/videoEmbed";

/**
 * Ugrađen video (YouTube ili Vimeo).
 *
 * Prva verzija podržava isključivo ta dva provajdera. Ne postoji polje za
 * proizvoljan iframe ni za HTML — embed adresa se na frontendu SASTAVLJA iz
 * identifikatora, pa urednik ne može da ubaci proizvoljan sadržaj.
 *
 * Transkript je OBAVEZAN: video bez teksta je nedostupan osobi koja ne čuje,
 * ne može se pretražiti i ne može se proveriti. Na medicinsko-edukativnoj
 * platformi to nije opcija (docs/04 — razumljivost i pristupačnost).
 */
export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      title: "Provajder",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
        ],
        layout: "radio",
      },
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            value === undefined || VIDEO_PROVIDERS.some((p) => p === value)
              ? true
              : "Dozvoljeni su samo YouTube i Vimeo.",
          ),
    }),
    defineField({
      name: "url",
      title: "Adresa videa",
      type: "url",
      description:
        "Adresa sa stranice videa. Iz nje se uzima samo identifikator; embed adresa se sastavlja automatski.",
      validation: (rule) =>
        rule.required().custom((value, context) => {
          if (value === undefined) return true;

          const provider = (
            context.parent as { provider?: unknown } | undefined
          )?.provider;

          if (provider === undefined) {
            return "Prvo izaberite provajdera.";
          }

          return toVideoEmbedUrl(provider, value) !== null
            ? true
            : "Adresa ne pripada izabranom provajderu ili nije prepoznatljiva.";
        }),
    }),
    defineField({
      name: "title",
      title: "Naslov videa",
      type: "string",
      description:
        "Čita ga i čitač ekrana. Opisuje šta se u snimku vidi, ne samo naziv kanala.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "transcript",
      title: "Transkript ili sažetak transkripta",
      type: "text",
      rows: 6,
      description:
        "Obavezno. Sadržaj videa mora biti dostupan i u tekstu — zbog pristupačnosti i provere.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Potpis ispod videa",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "provider" },
  },
});
