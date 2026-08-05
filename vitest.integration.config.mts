import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

/**
 * Integracione provere — jedine koje smeju da dodirnu mrežu.
 *
 * Namerno su u ZASEBNOJ konfiguraciji, a ne samo u zasebnom folderu:
 * `exclude` iz podrazumevane konfiguracije važi i kada se datoteka navede
 * eksplicitno na komandnoj liniji, pa razdvajanje putanjom ne bi bilo
 * dovoljno. Ovako je nemoguće da mrežna provera slučajno uđe u `npm test`.
 *
 * Okruženje je `node` — ovde nema DOM-a ni React komponenti.
 */
export default defineConfig(({ mode }) => {
  /*
   * Vite ne prosleđuje promenljive bez `VITE_` prefiksa u `process.env`, pa
   * se `.env.local` učitava ovde. Prenose se ISKLJUČIVO dve potrebne
   * promenljive, imenovane eksplicitno — ne ceo `.env` fajl.
   *
   * `??=` znači da stvarno okruženje ima prednost nad fajlom, pa se sredina
   * može promeniti privremenim override-om, bez diranja `.env.local`.
   */
  const env = loadEnv(mode, process.cwd(), "NEXT_PUBLIC_SANITY");
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??=
    env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  process.env.NEXT_PUBLIC_SANITY_DATASET ??= env.NEXT_PUBLIC_SANITY_DATASET;

  return {
    test: {
      environment: "node",
      include: ["tests/integration/**/*.test.ts"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
