import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "ajget05d",
    dataset: "production",
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    // Runs typegen automatically on `sanity dev` (watch) and `sanity build`.
    enabled: true,

    // Paths below are resolved relative to this file (apps/studio).
    schema: "./schema.json",

    // GROQ queries live in the frontend app, not in the studio.
    path: "../frontend/src/**/*.{ts,tsx,js,jsx}",

    // Single home for the generated types: the `@repo/shared` workspace
    // package, which both apps depend on.
    generates: "../../packages/shared/src/types/sanity.types.ts",
    formatGeneratedCode: true,
    overloadClientMethods: true,
  },
});
