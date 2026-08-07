import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import { ArticleImage, type ArticleImageValue } from "./ArticleImage";
import { VideoEmbed, type VideoEmbedValue } from "./VideoEmbed";
import { isSafeBodyHref } from "@/sanity/bodyGuards";

/**
 * Telo članka.
 *
 * Mapa komponenti je definisana IZVAN render funkcije, pa se ne pravi iznova
 * pri svakom renderu.
 *
 * Bez `dangerouslySetInnerHTML` i bez slobodnog HTML-a. Renderuju se samo
 * blokovi koje model poznaje; nepoznat blok ne stiže dovde jer ga
 * `isRenderableBody()` odbija još u sloju podataka.
 *
 * `h1` se ne renderuje iz tela — jedan `h1` po stranici nosi naslov članka
 * (docs/01 §6.6). Model ni ne nudi taj stil, a guard ga odbija.
 */

function ExternalOrInternalLink({
  value,
  children,
}: PortableTextMarkComponentProps<{ _type: "link"; href?: string }>) {
  const href = value?.href;

  // Nevalidan `href` se ne renderuje kao link — ostaje samo tekst.
  if (!isSafeBodyHref(href)) return <>{children}</>;

  // Interne putanje ostaju interne i idu kroz Next Link.
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} rel="noopener noreferrer external">
      {children}
    </a>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-l-border pl-4 text-text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ExternalOrInternalLink,
  },
  types: {
    imageWithCaption: ({ value }: { value: ArticleImageValue }) => (
      <ArticleImage value={value} />
    ),
    videoEmbed: ({ value }: { value: VideoEmbedValue }) => (
      <VideoEmbed value={value} />
    ),
  },
  unknownType: () => null,
  unknownMark: ({ children }) => <>{children}</>,
};

export function ArticleBody({ value }: { value: unknown }) {
  if (!Array.isArray(value)) return null;

  return (
    <div className="max-w-[var(--container-prose)]">
      <PortableText value={value} components={components} />
    </div>
  );
}
