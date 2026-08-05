import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

/**
 * Sanity Studio — dva workspace-a nad jednim projektom.
 *
 * Odluke: docs/adr/ADR-0003-sanity-studio-workspaces.md
 *
 * Zašto su datasetovi upisani doslovno, a ne kroz promenljivu okruženja:
 * pogrešno podešena promenljiva mogla bi tiho da prebaci Studio na
 * `production` i da urednik objavi na javni dataset misleći da je u testu.
 * Naziv dataseta je zato deo konfiguracije workspace-a i vidi se u kodu.
 *
 * `staging` je namerno prvi u nizu — Studio ga otvara podrazumevano, pa je
 * podrazumevana radnja bezbedna.
 */

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "Nedostaje SANITY_STUDIO_PROJECT_ID. Upiši ga u .env.local (v. .env.example). " +
      "Project ID nije tajna, ali se ne commituje u repozitorijum.",
  );
}

const shared = {
  projectId,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
};

export default defineConfig([
  {
    ...shared,
    name: "staging",
    basePath: "/staging",
    title: "Metaboličko zdravlje — STAGING",
    subtitle: "Testno okruženje — sadržaj odavde se ne objavljuje javno",
    dataset: "staging",
  },
  {
    ...shared,
    name: "production",
    basePath: "/production",
    title: "Metaboličko zdravlje — PRODUCTION",
    subtitle: "Pažnja: javni sadržaj — sve objavljeno ovde vide korisnici",
    dataset: "production",
  },
]);
