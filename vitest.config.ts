import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * The suite reaches into src/ now that the composition lives there, so it needs
 * the same `@/` alias the app uses. Without it the tests can only see files that
 * import nothing, which is how a composition ships untested.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
