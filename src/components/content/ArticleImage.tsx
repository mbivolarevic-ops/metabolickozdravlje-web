import Image from "next/image";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { readSanityConfig } from "@/sanity/env";
import { isValidBodyImage } from "@/sanity/bodyGuards";

/**
 * Slika u telu članka.
 *
 * Ceo Sanity image objekat se prosleđuje builderu, pa se `crop` i `hotspot`
 * poštuju — isečak koji je urednik izabrao ostaje isečak koji čitalac vidi.
 *
 * Fail-closed: slika bez asseta ili bez `alt` opisa se NE renderuje. Slika
 * bez opisa je nedostupna, a prazan `alt` na medicinskom tekstu znači gubitak
 * informacije (docs/04 §14.7).
 */

export interface ArticleImageValue {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  caption?: string;
  credit?: string;
  crop?: unknown;
  hotspot?: unknown;
}

/** Fiksne dimenzije okvira — drže odnos stranica i sprečavaju skok rasporeda. */
const RENDER_WIDTH = 1200;
const RENDER_HEIGHT = 675;

export function ArticleImage({ value }: { value: ArticleImageValue }) {
  if (!isValidBodyImage(value)) return null;

  const config = readSanityConfig();
  const builder = createImageUrlBuilder({
    projectId: config.projectId,
    dataset: config.dataset,
  });

  const src = builder
    .image(value as SanityImageSource)
    .width(RENDER_WIDTH)
    .height(RENDER_HEIGHT)
    .fit("crop")
    .auto("format")
    .url();

  const alt = value.alt ?? "";
  const hasFooter =
    (value.caption !== undefined && value.caption.length > 0) ||
    (value.credit !== undefined && value.credit.length > 0);

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={RENDER_WIDTH}
        height={RENDER_HEIGHT}
        sizes="(max-width: 680px) 100vw, 680px"
        className="h-auto w-full rounded-md"
      />
      {hasFooter && (
        <figcaption className="mt-2 text-sm text-text-muted">
          {value.caption}
          {value.caption !== undefined && value.credit !== undefined && " · "}
          {value.credit !== undefined && <span>Izvor: {value.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
