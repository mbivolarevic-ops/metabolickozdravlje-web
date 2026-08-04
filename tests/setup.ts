import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// React Testing Library auto-cleanup radi samo uz Vitest `globals: true`;
// globals namerno ne uključujemo, pa se DOM čisti eksplicitno posle svakog testa.
afterEach(() => {
  cleanup();
});
