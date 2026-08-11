import { describe, expect, it } from "vitest";
import {
  HTML_LANG,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  canonicalUrl,
  siteUrl,
} from "@/site/config";

/**
 * Konfiguracija javnog identiteta i pravljenje apsolutnih adresa.
 *
 * Kanonska adresa je obećanje pretraživaču koja je adresa prava. Ako je
 * pogrešna ili se razlikuje po okruženju, šteti više nego da je nema.
 */

describe("Identitet sajta", () => {
  it("nosi odobrene vrednosti", () => {
    expect(SITE_URL).toBe("https://metabolickozdravlje.rs");
    expect(SITE_DOMAIN).toBe("metabolickozdravlje.rs");
    expect(SITE_NAME).toBe("metabolickozdravlje.rs");
    expect(SITE_LANGUAGE).toBe("sr-Latn");
    expect(SITE_LOCALE).toBe("sr_RS");
    expect(HTML_LANG).toBe("sr-Latn-RS");
  });

  it("javni URL nema završnu kosu crtu i koristi https", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
    expect(siteUrl.protocol).toBe("https:");
    expect(siteUrl.host).toBe(SITE_DOMAIN);
  });

  it("opis i naslov prate odobrenu poruku sa početne", () => {
    expect(SITE_TITLE).toBe(
      "Metaboličko zdravlje, objašnjeno jasno i bez osude",
    );
    expect(SITE_DESCRIPTION).toContain("Pouzdane informacije o gojaznosti");
    expect(SITE_DESCRIPTION).toContain("stručnog recenzenta");
  });

  /*
   * Javni URL NIJE promenljiva okruženja — kanonska adresa ne sme da se
   * razlikuje po sredini. Ovaj test brani tu odluku od tihe promene.
   */
  it("javni URL ne dolazi iz okruženja", () => {
    for (const key of Object.keys(process.env)) {
      expect(process.env[key]).not.toBe(SITE_URL);
    }
  });
});

describe("canonicalUrl", () => {
  it("bez segmenata daje adresu početne", () => {
    expect(canonicalUrl()).toBe("https://metabolickozdravlje.rs/");
  });

  it("sastavlja putanju od segmenata", () => {
    expect(canonicalUrl("teme")).toBe("https://metabolickozdravlje.rs/teme");
    expect(canonicalUrl("teme", "insulinska-rezistencija")).toBe(
      "https://metabolickozdravlje.rs/teme/insulinska-rezistencija",
    );
    expect(canonicalUrl("tekstovi", "sta-je-hba1c")).toBe(
      "https://metabolickozdravlje.rs/tekstovi/sta-je-hba1c",
    );
  });

  /*
   * Slug dolazi iz CMS-a. Prostim spajanjem stringova, slug sa `?` napravio bi
   * upit, sa `#` fragment, a sa `/` sasvim drugu putanju — i kanonska adresa
   * bi pokazivala na nešto što nije ta stranica.
   */
  it.each([
    ["upitnik", "zlo?a=1", "zlo%3Fa%3D1"],
    ["taraba", "zlo#deo", "zlo%23deo"],
    ["kosa crta", "zlo/druga", "zlo%2Fdruga"],
    ["razmak", "dve reci", "dve%20reci"],
    ["dijakritika", "šećer", "%C5%A1e%C4%87er"],
  ])("enkodira segment sa %s", (_label, slug, expected) => {
    expect(canonicalUrl("teme", slug)).toBe(
      `https://metabolickozdravlje.rs/teme/${expected}`,
    );
  });

  it("nijedan segment ne može da izađe iz domena", () => {
    const url = new URL(canonicalUrl("teme", "//zlonamerno.example.com"));
    expect(url.host).toBe(SITE_DOMAIN);
  });

  it("prazne segmente preskače", () => {
    expect(canonicalUrl("teme", "")).toBe(
      "https://metabolickozdravlje.rs/teme",
    );
  });
});

describe("absoluteUrl", () => {
  it("pretvara putanju u apsolutnu adresu", () => {
    expect(absoluteUrl("/teme")).toBe("https://metabolickozdravlje.rs/teme");
    expect(absoluteUrl("/")).toBe("https://metabolickozdravlje.rs/");
  });

  it("ostaje na kanonskom domenu", () => {
    expect(new URL(absoluteUrl("/sitemap.xml")).host).toBe(SITE_DOMAIN);
  });
});
