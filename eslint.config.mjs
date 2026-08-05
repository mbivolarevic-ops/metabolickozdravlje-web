import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    // Generisani izlazi Sanity Studija — build rezultat i lokalni runtime.
    // Tuđi, minifikovani kod se ne lintuje.
    "dist/**",
    ".sanity/**",
  ]),
]);

export default eslintConfig;
