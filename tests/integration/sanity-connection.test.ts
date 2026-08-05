import { describe, expect, it } from "vitest";
import { fetchDocumentCount } from "@/sanity/queries/connection";
import { readSanityConfig } from "@/sanity/env";

/**
 * JEDINA provera koja stvarno dodiruje mrežu.
 *
 * Ne ulazi u `npm test` — pokreće se sa `npm run test:sanity`, sa zasebnom
 * konfiguracijom (`vitest.integration.config.mts`).
 *
 * ⛔ SIGURNOSNA KAPIJA: dozvoljen je isključivo dataset `staging`. Ako je
 * podešena produkcija, test staje PRE ijednog mrežnog zahteva. Razlog nije
 * tehnički nego uređivački — produkcioni dataset nosi javni sadržaj i nema
 * razloga da ga dodiruje automatska provera.
 *
 * Provera je čisto čitanje: `count(*)` ništa ne kreira, ne menja i ne briše.
 */

const config = readSanityConfig();

describe("Veza sa Sanity Content Lake-om", () => {
  it("odbija da se pokrene nad bilo čim osim staging dataseta", () => {
    if (config.dataset !== "staging") {
      throw new Error(
        `Provera veze sme da radi isključivo nad datasetom „staging“, a podešen je „${config.dataset}“. ` +
          "Provera je zaustavljena pre mrežnog zahteva.",
      );
    }

    expect(config.dataset).toBe("staging");
  });

  it("vraća broj dokumenata; na praznom staging datasetu je to 0", async () => {
    // Kapija se ponavlja i ovde: redosled testova ne sme biti jedino što
    // sprečava mrežni poziv nad produkcijom.
    if (config.dataset !== "staging") {
      throw new Error(
        "Zaustavljeno pre mrežnog zahteva: dozvoljen je samo dataset „staging“.",
      );
    }

    const count = await fetchDocumentCount();

    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
    expect(count).toBe(0);
  }, 30_000);
});
