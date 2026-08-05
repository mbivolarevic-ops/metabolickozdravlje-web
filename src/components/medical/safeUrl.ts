/**
 * Bezbedna provera spoljnih adresa.
 *
 * Izvori dolaze iz CMS-a, dakle spolja. Bez provere sheme, uređivačka greška
 * ili zlonameran upis mogli bi da proizvedu `javascript:` link u medicinskom
 * tekstu. Zato se dozvoljava isključivo `http:` i `https:`.
 *
 * Funkcija je ČISTA: bez mreže, bez bočnih efekata, bez logovanja.
 */

/** Jedine dozvoljene sheme. Sve ostalo se odbija. */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Vraća bezbednu apsolutnu adresu ili `null`.
 *
 * Odbija: `javascript:`, `data:`, `file:`, relativne adrese („/putanja“,
 * „//host“, „primer.org“), prazne vrednosti i sve što nije niz znakova.
 * Relativne adrese padaju same od sebe — `new URL` bez osnove baca grešku.
 */
export function toSafeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) return null;

  return parsed.href;
}
