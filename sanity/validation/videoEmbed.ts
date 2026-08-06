/**
 * Bezbedno tumačenje video adresa.
 *
 * Jedan izvor istine za dve strane: Sanity validaciju (da urednik ne može da
 * sačuva nepodržan URL) i frontend (da se nikada ne ugradi proizvoljan iframe).
 *
 * Princip: korisnički URL se NIKADA ne prosleđuje iframe-u. Iz njega se
 * izvlači samo identifikator videa, pa se embed adresa SASTAVLJA iz fiksnog
 * šablona. Time proizvoljan iframe URL nije moguć ni ako neko unese nešto
 * neočekivano.
 *
 * Funkcije su čiste: bez mreže, bez bočnih efekata. Neispravan ulaz daje
 * `null`, nikada izuzetak.
 */

/** Jedini podržani provajderi u prvoj verziji. */
export const VIDEO_PROVIDERS = ["youtube", "vimeo"] as const;

export type VideoProvider = (typeof VIDEO_PROVIDERS)[number];

export function isVideoProvider(value: unknown): value is VideoProvider {
  return VIDEO_PROVIDERS.some((provider) => provider === value);
}

/** Dozvoljeni domeni po provajderu. Sve van liste se odbija. */
const ALLOWED_HOSTS: Record<VideoProvider, readonly string[]> = {
  youtube: [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtu.be",
    "www.youtube-nocookie.com",
    "youtube-nocookie.com",
  ],
  vimeo: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
};

/** YouTube identifikator je 11 znakova iz ograničenog skupa. */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
/** Vimeo identifikator je niz cifara. */
const VIMEO_ID = /^\d+$/;

function parseUrl(value: unknown): URL | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  // Samo http(s). Odbija `javascript:`, `data:`, `file:` i slično.
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

  return parsed;
}

function extractYouTubeId(url: URL): string | null {
  if (url.hostname === "youtu.be") {
    return url.pathname.slice(1).split("/")[0] ?? null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const embedMatch = /^\/embed\/([^/]+)/.exec(url.pathname);
  if (embedMatch !== null) return embedMatch[1] ?? null;

  return null;
}

function extractVimeoId(url: URL): string | null {
  const playerMatch = /^\/video\/(\d+)/.exec(url.pathname);
  if (playerMatch !== null) return playerMatch[1] ?? null;

  const directMatch = /^\/(\d+)/.exec(url.pathname);
  if (directMatch !== null) return directMatch[1] ?? null;

  return null;
}

/**
 * Pretvara korisnički URL u strogo kontrolisanu embed adresu.
 *
 * YouTube ide preko `youtube-nocookie.com`, Vimeo uz `dnt=1` — oba smanjuju
 * praćenje koje provajder postavlja. To NIJE potpuna saglasnost za kolačiće,
 * samo uži otisak.
 */
export function toVideoEmbedUrl(
  provider: unknown,
  url: unknown,
): string | null {
  if (!isVideoProvider(provider)) return null;

  const parsed = parseUrl(url);
  if (parsed === null) return null;

  if (!ALLOWED_HOSTS[provider].includes(parsed.hostname)) return null;

  if (provider === "youtube") {
    const id = extractYouTubeId(parsed);
    if (id === null || !YOUTUBE_ID.test(id)) return null;
    return `https://www.youtube-nocookie.com/embed/${id}`;
  }

  const id = extractVimeoId(parsed);
  if (id === null || !VIMEO_ID.test(id)) return null;
  return `https://player.vimeo.com/video/${id}?dnt=1`;
}
