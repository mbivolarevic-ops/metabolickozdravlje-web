import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

/**
 * Podrazumevani skup testova. NIKADA ne dodiruje mrežu.
 *
 * `tests/integration/**` je izuzet: tamo žive provere koje stvarno pozivaju
 * Sanity. One se pokreću zasebnom komandom (`npm run test:sanity`) i svojom
 * konfiguracijom (`vitest.integration.config.mts`), da CI ne bi zavisio od
 * mreže, naloga ni dostupnosti spoljnog servisa.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "tests/integration/**"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
