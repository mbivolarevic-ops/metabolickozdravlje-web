import { defineCliConfig } from "sanity/cli";

/**
 * Konfiguracija Sanity CLI-ja.
 *
 * Podrazumevani dataset je `staging` — namerno bezbedan izbor: CLI komanda
 * pokrenuta bez eksplicitnog dataseta ne sme da dohvati produkcioni sadržaj.
 *
 * Ovde NEMA hostname-a za deployment, app ID-a ni auth tokena. Studio se u
 * ovom PR-u ne objavljuje; kada za to dođe vreme, hostovanje ide zasebno
 * preko Sanity-ja (v. ADR-0003), uz izričito odobrenje vlasnika.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: "staging",
  },

  /**
   * Ekstrakcija šeme (`sanity schemas extract`).
   *
   * `workspace` je zadat EKSPLICITNO. Projekat ima dva workspace-a
   * (`staging` i `production`) nad istom šemom, a tipovi CLI-ja kažu da je
   * workspace obavezan kada ih ima više. Implicitan izbor kod dva workspace-a
   * nije prihvatljiv — ne sme zavisiti od redosleda u konfiguraciji.
   *
   * `enforceRequiredFields` se NE uključuje: naš model ima sopstvene
   * blokirajuće validacije (`sanity/validation/`), pa bi pretvaranje polja u
   * ne-opciona dalo lažno poverenje. Tipovi opisuju šemu, ne garantuju stanje
   * pojedinačnog dokumenta — runtime provera ostaje neophodna.
   */
  schemaExtraction: {
    workspace: "staging",
    path: "schema.json",
  },

  /**
   * Generisanje tipova (`sanity typegen generate`).
   *
   * `overloadClientMethods` tipizira `client.fetch` na osnovu upita, pa
   * rezultat upita dolazi tipiziran bez ručnog pisanja interfejsa.
   *
   * `enabled` se namerno ne uključuje ni ovde ni u `schemaExtraction`:
   * generisanje se pokreće izričito (`npm run typegen`) i proverava u CI-ju,
   * umesto da se tiho dešava tokom `sanity dev`/`build`.
   */
  typegen: {
    schema: "schema.json",
    generates: "./sanity.types.ts",
    path: "./src/**/*.{ts,tsx}",
    overloadClientMethods: true,
    formatGeneratedCode: true,
  },
});
