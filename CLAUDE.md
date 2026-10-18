# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How to help in this repo (read first)

This is a **hand-coded** project. The owner writes the code himself to learn and stay in control of it.

- **Never change code unless explicitly asked to.** That means no edits, new files, refactors, formatting runs, dependency installs or generated output, even if a fix looks obvious or small. A question is not a request to change code.
- **Default to teaching, not doing.** Most requests are about documentation, syntax, APIs or how to approach a problem. Explain the basics and point the owner in the right direction so he can write the solution himself:
  - Explain the relevant concept and why it applies here.
  - Point to the files, functions or docs involved (`file_path:line_number`, links to official docs).
  - Keep code to short, generic snippets that show syntax or a pattern. Don't write a complete, paste-ready solution for his specific problem.
  - Outline the steps when a task spans several files, and leave the implementation to him.
- **Reading is fine.** Reading files, searching the codebase, running read-only commands (e.g. `git log`, `tsc --noEmit`, `pnpm check` without `--write`) and looking up docs are all fine for answering questions.
- **If you're unsure whether a change is wanted, ask** instead of making it.

The architecture notes below are there to help you give accurate explanations, not to invite you to implement things.

## Overview

Personal website for Kurt Lekanger. pnpm + Turborepo monorepo:

- `apps/frontend` — TanStack Start (SSR React 19 + Vite + Nitro) site that renders content from Sanity.
- `apps/studio` — Sanity Studio (v6) CMS, project `ajget05d`, dataset `production`. Schema field titles/descriptions are in Norwegian.
- `packages/shared` — `@repo/shared`, a build-less workspace package that exports TypeScript source directly. It holds the generated Sanity types and is a dependency of both apps. Its `exports` map is `"."` → `src/index.ts` and `"./types/*"` → `src/types/*.ts` — there is **no** bare `./types` subpath (and no `src/types/index.ts`), so `@repo/shared/types` does not resolve. Import as `import type { Blog } from "@repo/shared"` (the root re-exports `./types/sanity.types`), or `@repo/shared/types/sanity.types` for the explicit path.

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
pnpm deploy              # sanity deploy
```

Package names for `--filter`: `frontend` (`apps/frontend`), `studio` (`apps/studio`), `@repo/shared` (`packages/shared`). The root package is `lekanger-personal-website`; it is deliberately **not** named after any app, because `pnpm --filter <name>` matches the root too when the names collide — which would silently run the root's `turbo run build` (a full-workspace build) alongside the app's own build. Turbo is unaffected either way: the root is not part of its package graph.

No `check-types` script is defined in either app, so root `pnpm check-types` is a no-op. For typechecking run `pnpm exec tsc --noEmit` inside the app.

## Architecture

### Content flow

Sanity Studio (schema) → `sanity typegen` → `packages/shared/src/types/sanity.types.ts` → frontend GROQ queries → TanStack Query → route loaders → page components.

Typegen is configured **only** in the `typegen` block of `apps/studio/sanity.cli.ts` (the separate `sanity-typegen.json` is deprecated; when both exist the CLI config silently wins). It reads GROQ queries from `../frontend/src/**/*.{ts,tsx}` and the schema from `apps/studio/schema.json`, and writes to `packages/shared/src/types/sanity.types.ts`. All paths there are relative to `apps/studio`.

Because `enabled: true`, types regenerate automatically during `sanity dev` (watching both the query glob and `schema.json`) and at the end of `sanity build`. Run `pnpm generate-types` in `apps/studio` for a one-off; it re-extracts `schema.json` first, so run it after editing `apps/studio/schemaTypes/`. Changing the `typegen` block requires restarting `sanity dev` — the running server keeps the config it booted with.

`schema.json` and `sanity.types.ts` are both generated — never hand-edit them, and note both are excluded from Biome in the root `biome.json` (typegen formats its output with Prettier, which conflicts with Biome's tabs). Both are committed, so a fresh clone has types without running typegen.

`overloadClientMethods: true` makes the generated file emit a `declare module "@sanity/client"` augmentation, so `client.fetch(SOME_QUERY)` is typed with no manual type import. That augmentation is why `@repo/shared` itself depends on `@sanity/client` — TypeScript resolves the module relative to the generated file, not to the app importing it.

### Frontend data layer

Sanity fetching goes through two shared generic helpers in `src/lib/sanity/` — there is no per-resource loader or `queryOptions` factory:

- `queryOptions.ts` — `sanityQueryOptions({ query, params, perspective })` builds the TanStack Query options: key `["sanity", query, params, perspective]`, `queryFn` calling `client.withConfig({ perspective }).fetch(query, params)`.
- `loader.ts` — `loadSanityQuery(context, query, params)` calls `context.queryClient.ensureQueryData(...)` and returns `{ data, query, params }` (query + params are returned for live/visual-editing support).

Both are generic over `const TQuery extends keyof SanityQueries`, **not** `string`. This is load-bearing: TypeGen types results by matching the literal query string against the `SanityQueries` module augmentation, so widening the parameter to `string` makes `ClientReturn` fall back to `Any` and every route silently loses its types. The `keyof SanityQueries` constraint also turns a not-yet-generated query into a compile error instead of silent `any`.

Adding a content type is therefore two files:

1. `src/lib/sanity/queries/<name>Query.ts` — exports only the GROQ string via `defineQuery`. Nothing else.
2. `src/pages/<Name>/<Name>.tsx` — the component, which reads `Route.useLoaderData()` by importing `Route` from the route file.

Route files in `src/routes/` stay thin — `component` plus a one-line loader that maps route params to GROQ params:

```ts
loader: ({ context, params }) =>
    loadSanityQuery(context, BLOGS_BY_SLUG_QUERY, { slug: params.slug }),
```

Use a concise arrow body (or an explicit `return`). A block body without `return` makes the loader resolve to `undefined`, and `Route.useLoaderData()` then throws in the component, not in the loader.

Shared query defaults (`staleTime` 5 min, `gcTime` 10 min) live in the `QueryClient` in `src/integrations/tanstack-query/root-provider.tsx`, not per query.

Stega / `resultSourceMap` are currently **off**: draft mode is not wired up, and enabling stega unconditionally injects invisible characters into every production string (breaking `===`, object keys, and anything rendered into `<head>`). When adding preview, gate them on the draft path inside `sanityQueryOptions` — that helper is also where a server-only token fetch belongs.

`src/lib/sanity/projectDetails.ts` resolves project/dataset/apiVersion for both environments — `process.env.*` on the server, `import.meta.env.VITE_*` in the browser, with hardcoded fallbacks (`ajget05d` / `production`). Import config from there, not from `import.meta.env` directly. Note that `apps/frontend/.env.local` sets `VITE_SANITY_DATASET="development"`, so local dev reads the **development** dataset — its content differs from `production`, which looks like missing data if you test with a `production` slug.

`SANITY_READ_TOKEN` / `SANITY_PREVIEW_SECRET` are server-only (draft/preview). Published content needs no token; never send a token from the client.

### Routing & SSR

- File-based routing via `@tanstack/router-plugin`. `src/routeTree.gen.ts` is generated — do not edit (VS Code marks it readonly, and Biome ignores it).
- `getRouter()` in `src/router.tsx` creates the router and calls `setupRouterSsrQueryIntegration`, so a single QueryClient is shared between SSR and hydration. Route loaders can rely on `context.queryClient`.
- `src/routes/__root.tsx` renders the full `<html>` document (Header/Footer, `HeadContent`, `Scripts`, devtools).
- Server-only logic uses `createServerFn()` from `@tanstack/react-start` (see `src/routes/project/$slug.tsx`).

### Conventions

- Import aliases in `apps/frontend`: both `#/*` and `@/*` map to `./src/*`. `#/*` is the real Node subpath import (declared in `package.json` `imports`); `@/*` is tsconfig-only. Existing code mixes them — prefer `@/` for new code.
- Tooling is **Biome**, not ESLint/Prettier (except Prettier for Markdown, and the studio's `@sanity/eslint-config-studio`). Indentation is **2 spaces** (set explicitly in the root `biome.json` `formatter` block — Biome's own default is tabs), double quotes.
- Styling is Tailwind CSS v4 (config-less, via `@tailwindcss/vite`; theme lives in `src/styles.css`). shadcn/ui is set up with the `new-york` style and `zinc` base — add components with `pnpm dlx shadcn@latest add <component>`.
- `src/routes/index.tsx` and `about.tsx` are still starter-template placeholder content.

## Skill loading (from apps/frontend/AGENTS.md)

These skills are also useful for answering questions accurately. When explicitly asked to edit files for a substantial task in `apps/frontend`:

- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files, and follow the loaded `SKILL.md`.
- Prefer the most specific local skill for the package being changed; load additional skills only when the task spans multiple packages.
