import { ImageResponse } from "next/og";
import { SITE_DOMAIN } from "./config";

/**
 * Zajednički render social slike za Open Graph i Twitter.
 *
 * Postoji da se logika ne bi pisala dvaput: `opengraph-image.tsx` i
 * `twitter-image.tsx` moraju biti zasebne rute po Next konvenciji, ali obe
 * pozivaju ovo.
 *
 * ⛔ Bez ijednog mrežnog zahteva i bez spoljnog fonta — slika se generiše u
 * build koraku i mora da radi i kada Sanity nije podešen. Koristi se
 * podrazumevani font iz `next/og`.
 *
 * Poruka je doslovno naslov sa početne stranice. Bez tvrdnji o lečenju,
 * rezultatima i bez ijedne fotografije.
 */

/** 1200×630 je odnos koji čitači linkova očekuju. */
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

export const SOCIAL_IMAGE_ALT =
  "metabolickozdravlje.rs — Metaboličko zdravlje, objašnjeno jasno i bez osude";

/** Tokeni iz dizajn-sistema (docs/02 §6.2), upisani doslovno. */
const PETROL = "#0f4c4a";
const CREAM = "#faf8f5";
const TERRACOTTA = "#b85a37";
const CREAM_MUTED = "#d6dedc";

export function renderSocialImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: PETROL,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 30,
            color: CREAM_MUTED,
            letterSpacing: 1,
          }}
        >
          {SITE_DOMAIN}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 68,
            lineHeight: 1.2,
            color: CREAM,
            maxWidth: 900,
          }}
        >
          Metaboličko zdravlje, objašnjeno jasno i bez osude.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 160,
            height: 6,
            background: TERRACOTTA,
          }}
        />
        <div style={{ marginTop: 28, fontSize: 28, color: CREAM_MUTED }}>
          Nezavisna edukativna platforma
        </div>
      </div>
    </div>,
    { ...SOCIAL_IMAGE_SIZE },
  );
}
