import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Testovi konfiguracije Sanity klijenta — BEZ MREŽE.
 *
 * `@sanity/client` je zamenjen mockom, pa se proverava tačno ono što nas
 * zanima: sa kojim parametrima se klijent pravi i da li token izostaje.
 */

const createClientMock = vi.fn((config: Record<string, unknown>) => ({
  fetch: vi.fn(),
  config,
}));

vi.mock("@sanity/client", () => ({
  createClient: (config: Record<string, unknown>) => createClientMock(config),
}));

/**
 * Izmišljen project ID. Testovi namerno ne zavise od stvarnog projekta —
 * provera je o obliku i pravilima, ne o konkretnoj sredini.
 */
const VALID_PROJECT_ID = "testprojekat1";

/** Postavlja promenljive eksplicitno, bez diranja ostatka okruženja. */
function setEnv(projectId?: string, dataset?: string): void {
  if (projectId === undefined) {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  } else {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = projectId;
  }

  if (dataset === undefined) {
    delete process.env.NEXT_PUBLIC_SANITY_DATASET;
  } else {
    process.env.NEXT_PUBLIC_SANITY_DATASET = dataset;
  }
}

const originalProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const originalDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

beforeEach(() => {
  vi.resetModules();
  createClientMock.mockClear();
});

afterEach(() => {
  setEnv(originalProjectId, originalDataset);
});

describe("Čitanje konfiguracije", () => {
  it("odbija konfiguraciju bez project ID-a i imenuje promenljivu", async () => {
    setEnv(undefined, "staging");
    const { readSanityConfig } = await import("@/sanity/env");

    expect(() => readSanityConfig()).toThrowError(
      /NEXT_PUBLIC_SANITY_PROJECT_ID/,
    );
  });

  it("odbija project ID neispravnog oblika", async () => {
    setEnv("nije ispravan id", "staging");
    const { readSanityConfig } = await import("@/sanity/env");

    expect(() => readSanityConfig()).toThrowError(/nije ispravnog oblika/);
  });

  it("odbija konfiguraciju bez dataseta i imenuje promenljivu", async () => {
    setEnv(VALID_PROJECT_ID, undefined);
    const { readSanityConfig } = await import("@/sanity/env");

    expect(() => readSanityConfig()).toThrowError(/NEXT_PUBLIC_SANITY_DATASET/);
  });

  it.each(["prod", "Production", "STAGING", "master", " staging"])(
    "odbija nedozvoljen dataset „%s“ bez ispravljanja",
    async (dataset) => {
      setEnv(VALID_PROJECT_ID, dataset);
      const { readSanityConfig } = await import("@/sanity/env");

      expect(() => readSanityConfig()).toThrowError(/nedozvoljenu vrednost/);
    },
  );

  it.each(["staging", "production"])(
    "prihvata dozvoljen dataset „%s“",
    async (dataset) => {
      setEnv(VALID_PROJECT_ID, dataset);
      const { readSanityConfig, SANITY_API_VERSION } =
        await import("@/sanity/env");

      const config = readSanityConfig();
      expect(config.projectId).toBe(VALID_PROJECT_ID);
      expect(config.dataset).toBe(dataset);
      expect(config.apiVersion).toBe(SANITY_API_VERSION);
    },
  );

  it("API verzija je zaključana konstanta, ne promenljiva okruženja", async () => {
    const { SANITY_API_VERSION } = await import("@/sanity/env");
    expect(SANITY_API_VERSION).toBe("2026-08-05");
  });

  it("poruke greške ne otkrivaju vrednosti iz okruženja", async () => {
    setEnv("tajna-vrednost-koja-ne-sme-iscuriti", "staging");
    const { readSanityConfig } = await import("@/sanity/env");

    try {
      readSanityConfig();
      expect.unreachable("očekivana je greška");
    } catch (error) {
      expect(String(error)).not.toContain(
        "tajna-vrednost-koja-ne-sme-iscuriti",
      );
    }
  });
});

describe("Sanity klijent", () => {
  it("pravi se read-only, bez tokena, sa isključenim CDN-om", async () => {
    setEnv(VALID_PROJECT_ID, "staging");
    const { getSanityClient } = await import("@/sanity/client");

    getSanityClient();

    expect(createClientMock).toHaveBeenCalledTimes(1);
    const call = createClientMock.mock.calls[0];
    if (call === undefined) {
      throw new Error("createClient nije pozvan");
    }
    const config = call[0];

    expect(config.projectId).toBe(VALID_PROJECT_ID);
    expect(config.dataset).toBe("staging");
    expect(config.apiVersion).toBe("2026-08-05");
    expect(config.useCdn).toBe(false);
    expect(config.perspective).toBe("published");
    // Ključno: nikakav token se ne prosleđuje.
    expect(config.token).toBeUndefined();
    expect(Object.keys(config)).not.toContain("token");
  });

  it("inicijalizuje se lenjo i samo jednom po procesu", async () => {
    setEnv(VALID_PROJECT_ID, "staging");
    const { getSanityClient } = await import("@/sanity/client");

    // Sam uvoz modula ne sme napraviti klijenta.
    expect(createClientMock).not.toHaveBeenCalled();

    getSanityClient();
    getSanityClient();

    expect(createClientMock).toHaveBeenCalledTimes(1);
  });

  it("ne pravi klijenta kada je konfiguracija neispravna", async () => {
    setEnv(VALID_PROJECT_ID, "nepostojeci-dataset");
    const { getSanityClient } = await import("@/sanity/client");

    expect(() => getSanityClient()).toThrowError(/nedozvoljenu vrednost/);
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("konfiguraciju ispisuje najviše jednom po procesu", async () => {
    setEnv(VALID_PROJECT_ID, "staging");
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const { getSanityClient, resetSanityClientForTests } =
      await import("@/sanity/client");

    getSanityClient();
    resetSanityClientForTests();
    getSanityClient();

    expect(info).toHaveBeenCalledTimes(1);
    expect(info.mock.calls[0]?.[0]).toContain("read-only, bez tokena");
    info.mockRestore();
  });
});

describe("Upit za proveru veze", () => {
  it("koristi count(*) i ne menja sadržaj", async () => {
    const { connectionCheckQuery } =
      await import("@/sanity/queries/connection");

    expect(connectionCheckQuery).toBe("count(*)");
    expect(connectionCheckQuery).not.toMatch(
      /create|patch|delete|mutate|drop/i,
    );
  });
});
