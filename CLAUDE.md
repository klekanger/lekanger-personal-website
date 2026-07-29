# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for Kurt Lekanger. pnpm + Turborepo monorepo:

- `apps/frontend` — TanStack Start (SSR React 19 + Vite + Nitro) site that renders content from Sanity.
- `apps/studio` — Sanity Studio (v6) CMS, project `ajget05d`, dataset `production`. Schema field titles/descriptions are in Norwegian.
- `packages/shared` — `@repo/shared`, a build-less workspace package that exports TypeScript source directly (`.` → `src/index.ts`, `./types` → `src/types/index.ts`). It holds the generated Sanity types and is a dependency of both apps. Import as `import type { Blog } from "@repo/shared/types"`.

## Commands

Run from the repo root:

```bash
pnpm dev        # turbo run dev  — frontend on :3000, studio on :3333
pnpm build      # turbo run build
pnpm lint       # turbo run lint (only frontend defines a lint task)
pnpm check      # biome check (lint + format, whole repo)
pnpm format     # biome format --write, then prettier on **/*.md
```

Per app (`cd apps/frontend` or `apps/studio`, or use `pnpm --filter`):

```bash
# frontend
pnpm dev                 # vite dev --port 3000
pnpm test                # vitest run  (no test files exist yet)
pnpm vitest run path/to/file.test.ts   # single test file
pnpm generate-routes     # tsr generate — regenerate src/routeTree.gen.ts

# studio
pnpm dev                 # sanity dev
pnpm generate-types      # sanity schema extract && sanity typegen generate
pnpm deploy              # sanity deploy
```

Turbo filter gotcha: the root package and `apps/frontend` are **both** named `lekanger-personal-website`. Prefer `--filter=./apps/frontend` (path filter) over the name. Studio is `lekanger-tekst-og-kode`.

No `check-types` script is defined in either app, so root `pnpm check-types` is a no-op. For typechecking run `pnpm exec tsc --noEmit` inside the app.

## Architecture

### Content flow

Sanity Studio (schema) → `sanity typegen` → `packages/shared/src/types/sanity.types.ts` → frontend GROQ queries → TanStack Query → route loaders → page components.

Typegen is configured **only** in the `typegen` block of `apps/studio/sanity.cli.ts` (the separate `sanity-typegen.json` is deprecated; when both exist the CLI config silently wins). It reads GROQ queries from `../frontend/src/**/*.{ts,tsx}` and the schema from `apps/studio/schema.json`, and writes to `packages/shared/src/types/sanity.types.ts`. All paths there are relative to `apps/studio`.

Because `enabled: true`, types regenerate automatically during `sanity dev` (watching both the query glob and `schema.json`) and at the end of `sanity build`. Run `pnpm generate-types` in `apps/studio` for a one-off; it re-extracts `schema.json` first, so run it after editing `apps/studio/schemaTypes/`. Changing the `typegen` block requires restarting `sanity dev` — the running server keeps the config it booted with.

`schema.json` and `sanity.types.ts` are both generated — never hand-edit them, and note both are excluded from Biome in the root `biome.json` (typegen formats its output with Prettier, which conflicts with Biome's tabs). Both are committed, so a fresh clone has types without running typegen.

`overloadClientMethods: true` makes the generated file emit a `declare module "@sanity/client"` augmentation, so `client.fetch(SOME_QUERY)` is typed with no manual type import. That augmentation is why `@repo/shared` itself depends on `@sanity/client` — TypeScript resolves the module relative to the generated file, not to the app importing it.

### Frontend data layer (three files per resource)

Data fetching is split by convention; follow it when adding a new content type:

1. `src/sanity/queries/<name>Query.ts` — exports the raw GROQ string (`groq` tag) **and** a `queryOptions(...)` factory keyed by `[type, slug, perspective]`. Stega/`resultSourceMap` are enabled via `client.withConfig()` here for visual editing.
2. `src/loaders/<name>Loader.ts` — a route loader that calls `context.queryClient.ensureQueryData(...)` and returns `{ data, query, params }` (query + params are returned for live/visual-editing support).
3. `src/pages/<Name>/<Name>.tsx` — the component, which reads `Route.useLoaderData()` by importing `Route` from the route file.

Route files in `src/routes/` stay thin: `createFileRoute` wiring `component` + `loader` only.

`src/sanity/projectDetails.ts` resolves project/dataset/apiVersion for both environments — `process.env.*` on the server, `import.meta.env.VITE_*` in the browser, with hardcoded fallbacks. Import config from there, not from `import.meta.env` directly.

`SANITY_READ_TOKEN` / `SANITY_PREVIEW_SECRET` are server-only (draft/preview). Published content needs no token; never send a token from the client.

### Routing & SSR

- File-based routing via `@tanstack/router-plugin`. `src/routeTree.gen.ts` is generated — do not edit (VS Code marks it readonly, and Biome ignores it).
- `getRouter()` in `src/router.tsx` creates the router and calls `setupRouterSsrQueryIntegration`, so a single QueryClient is shared between SSR and hydration. Route loaders can rely on `context.queryClient`.
- `src/routes/__root.tsx` renders the full `<html>` document (Header/Footer, `HeadContent`, `Scripts`, devtools).
- Server-only logic uses `createServerFn()` from `@tanstack/react-start` (see `src/routes/project/$slug.tsx`).

### Conventions

- Import aliases in `apps/frontend`: both `#/*` and `@/*` map to `./src/*`. `#/*` is the real Node subpath import (declared in `package.json` `imports`); `@/*` is tsconfig-only. Existing code mixes them — prefer `#/` for new code, since shadcn's `components.json` aliases also use `#/`.
- Tooling is **Biome**, not ESLint/Prettier (except Prettier for Markdown, and the studio's `@sanity/eslint-config-studio`). Tabs, double quotes.
- Styling is Tailwind CSS v4 (config-less, via `@tailwindcss/vite`; theme lives in `src/styles.css`). shadcn/ui is set up with the `new-york` style and `zinc` base — add components with `pnpm dlx shadcn@latest add <component>`.
- The frontend `README.md` and root `README.md` are still the unmodified TanStack Start / Turborepo starter READMEs; don't trust them as documentation of this project.
- `src/routes/index.tsx` and `about.tsx` are still starter-template placeholder content.

## Skill loading (from apps/frontend/AGENTS.md)

Before editing files for a substantial task in `apps/frontend`:

- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files, and follow the loaded `SKILL.md`.
- Prefer the most specific local skill for the package being changed; load additional skills only when the task spans multiple packages.
