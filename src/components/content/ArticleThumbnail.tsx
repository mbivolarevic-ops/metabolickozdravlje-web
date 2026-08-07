import Image from "next/image";
import {
  THUMBNAIL_IMAGE_HEIGHT,
  THUMBNAIL_IMAGE_WIDTH,
  toThumbnailImageUrl,
} from "@/sanity/imageUrl";

/**
 * Sličica članka u kartici na listi.
 *
 * Odvojena od `ArticleImage` zato što se razlikuje po ULOZI, ne po pravilima:
 * `ArticleImage` je `<figure>` sa potpisom i izvorom unutar teksta, a ovo je
 * sličica bez potpisa. Bezbednosna logika se NE duplira — obe idu kroz isti
 * `buildUrl` u `src/sanity/imageUrl.ts`, koji odbija sliku bez asseta ili bez
 * `alt` opisa.
 *
 * Fail-closed: bez upotrebljive adrese ne renderuje se ništa. Kartica tada
 * ostaje kartica bez slike, što je uredno stanje — nikada prazan okvir.
 */

export interface ArticleThumbnailValue {
  asset?: { _ref?: string | null; _id?: string | null } | null;
  alt?: string | null;
  crop?: unknown;
  hotspot?: unknown;
}

export function ArticleThumbnail({
  value,
  className = "",
}: {
  value: ArticleThumbnailValue | null | undefined;
  className?: string;
}) {
  const src = toThumbnailImageUrl(value);
  if (src === null) return null;

  return (
    <Image
      src={src}
      alt={value?.alt ?? ""}
      width={THUMBNAIL_IMAGE_WIDTH}
      height={THUMBNAIL_IMAGE_HEIGHT}
      sizes="(max-width: 640px) 100vw, 360px"
      className={`h-auto w-full rounded-md ${className}`}
    />
  );
}
