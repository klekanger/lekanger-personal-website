import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // react-tweet ships CSS modules; Node's ESM loader can't import ".css", so it
  // must be bundled by Vite instead of externalized for SSR.
  ssr: { noExternal: ["react-tweet"] },
  server: {
    allowedHosts: [".ngrok-free.app"],
  },
  plugins: [
    devtools(),
    nitro({
      traceDeps: ["react"],
      rollupConfig: { external: [/^@sentry\//] },
      serverDir: "server",
      routeRules: {
        "/": { isr: { expiration: 3600 } },
        "/blog-page/**": {
          isr: { expiration: 3600, allowQuery: ["page"], passQuery: true },
        },
        "/showcase/**": {
          isr: { expiration: 3600, allowQuery: ["page"], passQuery: true },
        },
        "/project/**": {
          isr: { expiration: 3600, allowQuery: ["page"], passQuery: true },
        },
      },
      vercel: {
        config: { bypassToken: process.env.VERCEL_BYPASS_TOKEN, version: 3 },
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
