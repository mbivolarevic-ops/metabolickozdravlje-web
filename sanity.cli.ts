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
});
