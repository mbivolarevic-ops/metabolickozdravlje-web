import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import { ArticleImage, type ArticleImageValue } from "./ArticleImage";
import { VideoEmbed, type VideoEmbedValue } from "./VideoEmbed";
import { isSafeBodyHref } from "@/sanity/bodyGuards";
import {
  collectBodyHeadings,
  headingIdByBlockIndex,
  type BodyHeading,
} from "@/sanity/headingId";

/**
 * Telo članka.
 *
 * Sve što ne zavisi od konkretnog članka stoji u `baseComponents`, IZVAN render
 * funkcije. Samo `block` grupa se sastavlja po članku, jer podnaslovi nose
 * `id`-jeve koji su za svaki tekst drugačiji. Cena je jedan objekat po članku,
 * a i on nastaje u build koraku — sve rute su prerenderovane.
 *
 * Bez `dangerouslySetInnerHTML` i bez slobodnog HTML-a. Renderuju se samo
 * blokovi koje model poznaje; nepoznat blok ne stiže dovde jer ga
 * `isRenderableBody()` odbija još u sloju podataka.
 *
 * `h1` se ne renderuje iz tela — jedan `h1` po stranici nosi naslov članka
 * (docs/01 §6.6). Model ni ne nudi taj stil, a guard ga odbija.
 *
 * `scroll-mt-20` (80px) na podnaslovima: zaglavlje je lepljivo i visoko 56px,
 * pa bi bez odmaka skok na sidro doveo naslov tačno ISPOD njega — čitalac bi
 * stigao na svoj odeljak i video sve osim njegovog naslova.
 */
const HEADING_SCROLL_MARGIN = "scroll-mt-20";

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

const baseComponents: PortableTextComponents = {
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

/**
 * `index` koji Portable Text prosleđuje bloku je pozicija u nizu tela — ista
 * ona po kojoj `collectBodyHeadings()` dodeljuje `id`. Zato sadržaj članka i
 * naslov u tekstu ne mogu da se raziđu: oba čitaju istu mapu.
 *
 * Podnaslov koji nije dobio `id` (prazan tekst) renderuje se bez njega, umesto
 * da dobije izmišljeno sidro na koje ništa ne upućuje.
 */
function createComponents(
  headingIds: ReadonlyMap<number, string>,
): PortableTextComponents {
  return {
    ...baseComponents,
    block: {
      normal: ({ children }) => <p className="mt-4">{children}</p>,
      h2: ({ children, index }) => (
        <h2
          id={headingIds.get(index)}
          className={`mt-10 text-2xl ${HEADING_SCROLL_MARGIN}`}
        >
          {children}
        </h2>
      ),
      h3: ({ children, index }) => (
        <h3
          id={headingIds.get(index)}
          className={`mt-8 text-xl ${HEADING_SCROLL_MARGIN}`}
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-4 border-l-border pl-4 text-text-muted">
          {children}
        </blockquote>
      ),
    },
  };
}

export function ArticleBody({
  value,
  headings,
}: {
  value: unknown;
  /**
   * Podnaslovi izračunati na stranici, da se isti posao ne radi dvaput. Kada
   * nisu prosleđeni, telo ih izvodi samo — komponenta ostaje upotrebljiva i
   * bez sadržaja članka.
   */
  headings?: readonly BodyHeading[];
}) {
  if (!Array.isArray(value)) return null;

  const resolved = headings ?? collectBodyHeadings(value);

  return (
    <div className="max-w-[var(--container-prose)]">
      <PortableText
        value={value}
        components={createComponents(headingIdByBlockIndex(resolved))}
      />
    </div>
  );
}
