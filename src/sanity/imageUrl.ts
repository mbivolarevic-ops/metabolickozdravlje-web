import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { readSanityConfig } from "./env";
import { isValidBodyImage } from "./bodyGuards";

/**
 * Adrese slika sa Sanity CDN-a — jedno mesto za ceo projekat.
 *
 * Postoji da se logika ne bi duplirala između prikaza (`next/image`) i
 * metapodataka (Open Graph). Dva mesta bi značila da jedno može da primi
 * `crop` i `hotspot`, a drugo ne.
 *
 * Builderu se prosleđuje CEO objekat slike, pa se poštuje isečak koji je
 * urednik izabrao. Slanje samog `asset._ref` bi taj izbor tiho poništilo.
 *
 * Fail-closed: neispravan objekat ne daje adresu, nego `null`.
 */

/** Okvir slike u tekstu i naslovne slike — odnos 16:9. */
export const ARTICLE_IMAGE_WIDTH = 1200;
export const ARTICLE_IMAGE_HEIGHT = 675;

/** Okvir za Open Graph — 1,91:1, kako preporučuju čitači linkova. */
export const OPEN_GRAPH_IMAGE_WIDTH = 1200;
export const OPEN_GRAPH_IMAGE_HEIGHT = 630;

/** Sličica u kartici na listi — isti odnos 16:9, manja datoteka. */
export const THUMBNAIL_IMAGE_WIDTH = 640;
export const THUMBNAIL_IMAGE_HEIGHT = 360;

function buildUrl(
  value: unknown,
  width: number,
  height: number,
  format: "auto" | "jpg",
): string | null {
  if (!isValidBodyImage(value)) return null;

  const config = readSanityConfig();
  const builder = createImageUrlBuilder({
    projectId: config.projectId,
    dataset: config.dataset,
  })
    .image(value as SanityImageSource)
    .width(width)
    .height(height)
    .fit("crop");

  // Prikaz ume da pregovara format; čitači linkova to ne rade pouzdano, pa
  // Open Graph dobija jedan predvidiv format.
  return format === "auto"
    ? builder.auto("format").url()
    : builder.format("jpg").url();
}

/** Adresa za prikaz u članku. `null` ako slika nije ispravna. */
export function toArticleImageUrl(value: unknown): string | null {
  return buildUrl(value, ARTICLE_IMAGE_WIDTH, ARTICLE_IMAGE_HEIGHT, "auto");
}

/** Adresa sličice za karticu. `null` ako slika nije ispravna. */
export function toThumbnailImageUrl(value: unknown): string | null {
  return buildUrl(value, THUMBNAIL_IMAGE_WIDTH, THUMBNAIL_IMAGE_HEIGHT, "auto");
}

/** Adresa za Open Graph. `null` ako slika nije ispravna — tada se OG ne postavlja. */
export function toOpenGraphImageUrl(value: unknown): string | null {
  return buildUrl(
    value,
    OPEN_GRAPH_IMAGE_WIDTH,
    OPEN_GRAPH_IMAGE_HEIGHT,
    "jpg",
  );
}
