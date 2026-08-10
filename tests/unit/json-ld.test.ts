import { describe, expect, it } from "vitest";
import {
  breadcrumbJsonLd,
  medicalWebPageJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/site/jsonLd";

/**
 * Strukturirani podaci.
 *
 * Dve stvari se ovde brane: da se ne izmišlja nijedan podatak, i da sadržaj iz
 * CMS-a ne može da pobegne iz `<script>` elementa.
 */

describe("serializeJsonLd", () => {
  it("neutralizuje znak „manje od“", () => {
    const out = serializeJsonLd({ name: "a < b" });
    expect(out).not.toContain("<");
    expect(out).toContain("\\u003c");
  });

  /*
   * Napad koji ova zaštita sprečava: naslov članka iz CMS-a koji sadrži
   * `</script><script>…`. Bez escape-a bi zatvorio element i sve posle njega
   * brauzer bi izvršio kao kod.
   */
  it("naslov sa `</script>` ne može da zatvori element", () => {
    const out = serializeJsonLd({
      name: "</script><script>alert(1)</script>",
    });

    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
  });

  it("neutralizuje i `>` i `&`", () => {
    const out = serializeJsonLd({ name: "a > b & c" });
    expect(out).toContain("\\u003e");
    expect(out).toContain("\\u0026");
  });

  it("izlaz ostaje validan JSON sa istim vrednostima", () => {
    const original = {
      name: "Naslov <sa> & znakovima",
      nested: { url: "https://primer.rs/a?b=1&c=2" },
    };

    const parsed: unknown = JSON.parse(serializeJsonLd(original));
    expect(parsed).toEqual(original);
  });

  it("čuva dijakritiku bez izobličenja", () => {
    const parsed = JSON.parse(serializeJsonLd({ name: "šećer i žuč" })) as {
      name: string;
    };
    expect(parsed.name).toBe("šećer i žuč");
  });
});

describe("websiteJsonLd", () => {
  const node = websiteJsonLd();

  it("ima tip WebSite i osnovne podatke", () => {
    expect(node["@context"]).toBe("https://schema.org");
    expect(node["@type"]).toBe("WebSite");
    expect(node.name).toBe("metabolickozdravlje.rs");
    expect(node.url).toBe("https://metabolickozdravlje.rs/");
    expect(node.inLanguage).toBe("sr-Latn");
    expect(node.description).toContain("Pouzdane informacije");
  });

  /*
   * `Organization` bi tvrdila pravni subjekt sa nazivom, adresom i nalozima —
   * ništa od toga nije potvrđeno.
   */
  it("ne tvrdi organizaciju, izdavača ni naloge", () => {
    expect(node.publisher).toBeUndefined();
    expect(node.sameAs).toBeUndefined();
    expect(node.author).toBeUndefined();
    expect(JSON.stringify(node)).not.toContain("Organization");
  });

  it("ne tvrdi pretragu koja ne postoji", () => {
    expect(node.potentialAction).toBeUndefined();
  });
});

describe("breadcrumbJsonLd", () => {
  const node = breadcrumbJsonLd([
    { name: "Početna", url: "https://metabolickozdravlje.rs/" },
    { name: "Teme", url: "https://metabolickozdravlje.rs/teme" },
    { name: "Test tema", url: "https://metabolickozdravlje.rs/teme/test-tema" },
  ]);

  it("ima tip BreadcrumbList", () => {
    expect(node["@type"]).toBe("BreadcrumbList");
  });

  it("pozicije se broje od jedan i prate redosled", () => {
    const items = node.itemListElement as Array<Record<string, unknown>>;
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items.map((i) => i.name)).toEqual(["Početna", "Teme", "Test tema"]);
    expect(items[2]?.item).toBe(
      "https://metabolickozdravlje.rs/teme/test-tema",
    );
  });

  it("prazna putanja daje praznu listu, ne izmišljene korake", () => {
    const empty = breadcrumbJsonLd([]);
    expect(empty.itemListElement).toEqual([]);
  });
});

describe("medicalWebPageJsonLd", () => {
  const INPUT = {
    title: "Test članak",
    description: "Sintetički opis.",
    url: "https://metabolickozdravlje.rs/tekstovi/test-clanak",
    authorName: "Test Autor",
    reviewerName: "Test Recenzent",
    reviewDate: "2026-08-05",
  };

  it("ima tip MedicalWebPage i potvrđene podatke", () => {
    const node = medicalWebPageJsonLd(INPUT);

    expect(node["@type"]).toBe("MedicalWebPage");
    expect(node.name).toBe("Test članak");
    expect(node.url).toBe(INPUT.url);
    expect(node.description).toBe("Sintetički opis.");
    expect(node.inLanguage).toBe("sr-Latn");
  });

  it("autor i recenzent su imenovane osobe", () => {
    const node = medicalWebPageJsonLd(INPUT);

    expect(node.author).toEqual({ "@type": "Person", name: "Test Autor" });
    expect(node.reviewedBy).toEqual({
      "@type": "Person",
      name: "Test Recenzent",
    });
  });

  it("datum provere ide u lastReviewed", () => {
    expect(medicalWebPageJsonLd(INPUT).lastReviewed).toBe("2026-08-05");
  });

  /*
   * ⛔ Model nema datum objavljivanja. Predstaviti datum provere kao datum
   * objave bila bi neistina, i to ona koju pretraživač prikazuje korisniku.
   */
  it("NIKADA ne izmišlja datePublished ni dateModified", () => {
    const node = medicalWebPageJsonLd(INPUT);

    expect(node.datePublished).toBeUndefined();
    expect(node.dateModified).toBeUndefined();
    expect(node.dateCreated).toBeUndefined();

    const serialized = serializeJsonLd(node);
    expect(serialized).not.toContain("datePublished");
    expect(serialized).not.toContain("dateModified");
  });

  it("ne izmišlja specijalnost, licencu ni ustanovu", () => {
    const serialized = serializeJsonLd(medicalWebPageJsonLd(INPUT));

    for (const field of [
      "medicalSpecialty",
      "hasCredential",
      "affiliation",
      "publisher",
      "MedicalOrganization",
    ]) {
      expect(serialized).not.toContain(field);
    }
  });

  it("sliku dodaje samo kada je adresa prosleđena", () => {
    expect(medicalWebPageJsonLd(INPUT).image).toBeUndefined();
    expect(
      medicalWebPageJsonLd({ ...INPUT, imageUrl: null }).image,
    ).toBeUndefined();
    expect(
      medicalWebPageJsonLd({
        ...INPUT,
        imageUrl: "https://cdn.sanity.io/images/x/staging/a.jpg",
      }).image,
    ).toBe("https://cdn.sanity.io/images/x/staging/a.jpg");
  });

  it("prazna polja se izostavljaju umesto da se šalju prazna", () => {
    const node = medicalWebPageJsonLd({ ...INPUT, description: "" });
    expect("description" in node).toBe(false);
  });
});
