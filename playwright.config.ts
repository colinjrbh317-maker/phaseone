import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3001",
    headless: true,
  },
  // Dev server managed externally — run `pnpm dev --port 3001` before tests
});
