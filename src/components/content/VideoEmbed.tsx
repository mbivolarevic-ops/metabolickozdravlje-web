"use client";

import { useState } from "react";
import { toVideoEmbedUrl } from "../../../sanity/validation/videoEmbed";

/**
 * Ugrađen video, uz „klik za učitavanje“.
 *
 * Iframe se NE učitava dok korisnik to ne zatraži. Do tada se ka YouTube-u
 * odnosno Vimeo-u ne šalje nijedan zahtev. To smanjuje praćenje treće strane,
 * ali NIJE potpuna saglasnost za kolačiće — to je zaseban, kasniji posao.
 *
 * Ovo je jedina klijentska komponenta na stranici članka, i to samo zbog
 * jednog prekidača stanja.
 *
 * Bezbednost: adresa iframe-a se SASTAVLJA iz identifikatora videa
 * (`toVideoEmbedUrl`), nikada se ne uzima iz CMS-a takva kakva je. Nema
 * `dangerouslySetInnerHTML`, nema autoplay-a, nema proizvoljnog iframe URL-a.
 */

export interface VideoEmbedValue {
  provider?: string;
  url?: string;
  title?: string;
  transcript?: string;
  caption?: string;
}

export function VideoEmbed({ value }: { value: VideoEmbedValue }) {
  const [loaded, setLoaded] = useState(false);

  const embedUrl = toVideoEmbedUrl(value.provider, value.url);
  const title = value.title;
  const transcript = value.transcript;

  // Fail-closed: bez bezbedne adrese, naslova ili transkripta nema prikaza.
  if (embedUrl === null) return null;
  if (title === undefined || title.trim().length === 0) return null;
  if (transcript === undefined || transcript.trim().length === 0) return null;

  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-md border border-border bg-surface">
        {/* Odnos 16:9 drži visinu bez skoka rasporeda. */}
        <div className="aspect-video w-full">
          {loaded ? (
            <iframe
              src={embedUrl}
              title={title}
              loading="lazy"
              allow="fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center"
            >
              <span className="font-sans font-semibold text-primary">
                Prikaži video
              </span>
              <span className="text-sm text-text-muted">{title}</span>
              <span className="text-sm text-text-muted">
                Video se učitava sa spoljnog servisa tek kada ga otvorite.
              </span>
            </button>
          )}
        </div>
      </div>

      {value.caption !== undefined && value.caption.length > 0 && (
        <figcaption className="mt-2 text-sm text-text-muted">
          {value.caption}
        </figcaption>
      )}

      <details className="mt-3">
        <summary className="cursor-pointer font-sans text-sm">
          Transkript videa
        </summary>
        <p className="mt-2 whitespace-pre-line text-text">{transcript}</p>
      </details>
    </figure>
  );
}
