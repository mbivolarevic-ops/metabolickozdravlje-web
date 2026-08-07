import { ALLOWED_CONTENT_BLOCK_TYPES } from "../../sanity/schemas/blockTypes";
import { toVideoEmbedUrl } from "../../sanity/validation/videoEmbed";

/**
 * Fail-closed provera tela članka i medija u njemu.
 *
 * Pravilo: telo se prikazuje SAMO ako je svaki blok prepoznat i ispravan.
 * Nepoznat blok se ne preskače tiho — takav članak se uopšte ne prikazuje.
 * Tiho preskakanje bi značilo da medicinski tekst izgubi deo sadržaja a da
 * niko ne primeti, što je gore od izostanka teksta.
 *
 * Funkcije su čiste: bez mreže, bez bočnih efekata. Neispravan ulaz vraća
 * `false`, nikada ne baca.
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Referenca na Sanity asset — bez nje slika ne može da se prikaže. */
function hasImageAsset(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const asset = value.asset;
  if (!isRecord(asset)) return false;
  return hasText(asset._ref) || hasText(asset._id);
}

/**
 * Adresa iz linka u tekstu.
 *
 * Interne putanje počinju sa „/“ i ostaju interne. Spoljne moraju biti
 * http(s). Sve ostalo — `javascript:`, `data:`, malformirano — se odbija.
 */
export function isSafeBodyHref(value: unknown): value is string {
  if (!hasText(value)) return false;

  const trimmed = value.trim();

  // Interna putanja: jedna kosa crta, ne „//host“ koji je protokol-relativan.
  if (trimmed.startsWith("/")) return !trimmed.startsWith("//");

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false;
  }

  return parsed.protocol === "https:" || parsed.protocol === "http:";
}

/** Slika je ispravna ako ima asset i smislen `alt`. */
export function isValidBodyImage(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (!hasImageAsset(value)) return false;
  return hasText(value.alt);
}

/**
 * Naslovna slika je OPCIONA.
 *
 * Odsustvo je uredna, dozvoljena situacija — članak bez naslovne slike je
 * potpuno ispravan članak. Ali slika koja POSTOJI mora biti potpuno ispravna:
 * delimična ili nevalidna naslovna slika obara ceo članak, isto kao slika u
 * telu. Prikazati sliku bez opisa značilo bi objaviti nedostupan sadržaj, a
 * prikazati je bez asseta znači prazan okvir na vrhu medicinskog teksta.
 */
export function isAcceptableFeaturedImage(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  return isValidBodyImage(value);
}

/** Video je ispravan ako se iz njega može sastaviti bezbedna embed adresa. */
export function isValidBodyVideo(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (!hasText(value.title)) return false;
  if (!hasText(value.transcript)) return false;
  return toVideoEmbedUrl(value.provider, value.url) !== null;
}

/** Tekstualni blok: poznat stil i bezbedne adrese u anotacijama. */
function isValidTextBlock(block: Record<string, unknown>): boolean {
  // H1 se ne dozvoljava u telu — jedan `h1` po stranici nosi naslov članka.
  const style = block.style;
  if (style !== undefined && !hasText(style)) return false;
  if (style === "h1") return false;

  const markDefs = block.markDefs;
  if (markDefs !== undefined) {
    if (!Array.isArray(markDefs)) return false;

    for (const mark of markDefs) {
      if (!isRecord(mark)) return false;
      // Jedina anotacija koju model poznaje je `link`.
      if (mark._type !== "link") return false;
      if (!isSafeBodyHref(mark.href)) return false;
    }
  }

  const children = block.children;
  if (children !== undefined && !Array.isArray(children)) return false;

  return true;
}

/**
 * Da li se telo članka sme renderovati.
 *
 * Traži listu sa bar jednim blokom, isključivo poznate tipove i ispravne
 * medije. Prvi neispravan blok obara ceo članak.
 */
export function isRenderableBody(value: unknown): value is unknown[] {
  if (!Array.isArray(value) || value.length === 0) return false;

  return value.every((block) => {
    if (!isRecord(block)) return false;

    const type = block._type;
    if (!hasText(type)) return false;
    if (!ALLOWED_CONTENT_BLOCK_TYPES.includes(type)) return false;

    if (type === "block") return isValidTextBlock(block);
    if (type === "imageWithCaption") return isValidBodyImage(block);
    if (type === "videoEmbed") return isValidBodyVideo(block);

    return false;
  });
}
