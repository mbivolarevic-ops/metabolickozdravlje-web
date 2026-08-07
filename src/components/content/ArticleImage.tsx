import Image from "next/image";
import {
  ARTICLE_IMAGE_HEIGHT,
  ARTICLE_IMAGE_WIDTH,
  toArticleImageUrl,
} from "@/sanity/imageUrl";

/**
 * Slika u članku — u telu teksta i kao naslovna slika.
 *
 * Jedna komponenta za oba mesta: naslovna slika koristi ISTI model
 * (`imageWithCaption`) i ista pravila. Druga komponenta bi značila drugo
 * mesto na kojem se pravilo o obaveznom opisu može razići.
 *
 * Isečak i fokus (`crop`, `hotspot`) se poštuju — isečak koji je urednik
 * izabrao ostaje isečak koji čitalac vidi.
 *
 * Fail-closed: slika bez asseta ili bez `alt` opisa se NE renderuje. Slika
 * bez opisa je nedostupna, a prazan `alt` na medicinskom tekstu znači gubitak
 * informacije (docs/04 §14.7).
 */

export interface ArticleImageValue {
  asset?: { _ref?: string | null; _id?: string | null } | null;
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
  crop?: unknown;
  hotspot?: unknown;
}

/** Vrednost postoji i nije prazna ni posle uklanjanja razmaka. */
function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function ArticleImage({ value }: { value: ArticleImageValue }) {
  const src = toArticleImageUrl(value);

  // `null` znači da slika nije prošla proveru — ne prikazuje se ništa.
  if (src === null) return null;

  const alt = value.alt ?? "";
  const caption = hasText(value.caption) ? value.caption : null;
  const credit = hasText(value.credit) ? value.credit : null;

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={ARTICLE_IMAGE_WIDTH}
        height={ARTICLE_IMAGE_HEIGHT}
        sizes="(max-width: 680px) 100vw, 680px"
        className="h-auto w-full rounded-md"
      />
      {(caption !== null || credit !== null) && (
        <figcaption className="mt-2 text-sm text-text-muted">
          {caption}
          {caption !== null && credit !== null && " · "}
          {credit !== null && <span>Izvor: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
