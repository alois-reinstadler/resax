# Spec: Phase 0 — Foundation

Status: ready for implementation
Author: orchestrator ("brain")
Implements: PLAN.md §5 Phase 0, amended by the registry-first directive below.

## Directive (overrides anything conflicting in PLAN.md)

**Everything is distributed through the shadcn-svelte registry system.** There is no npm package. Every deliverable a consumer touches — components (later phases), the theme/token layer, `getColor()`, the ripple attachment, easing presets — must be a registry item in `registry.json`, built to static JSON that the docs site serves, installable via `npx shadcn-svelte@latest add`. The SvelteKit app in this repo is simultaneously: (a) the registry source + build, (b) the registry host (serves the built JSON from `static/`), (c) the docs/demo gallery.

## Before writing code

Consult the **live** shadcn-svelte docs — the registry format has evolved and training knowledge may be stale. Required reading (fetch these live before implementing):

- https://shadcn-svelte.com/docs/registry — registry overview & template
- https://shadcn-svelte.com/docs/registry/registry-json — `registry.json` schema
- https://shadcn-svelte.com/docs/registry/registry-item-json — item schema (types, `registryDependencies`, `cssVars`, `files`)
- https://shadcn-svelte.com/docs/installation/sveltekit — current init flow
- https://shadcn-svelte.com/docs/registry/examples — item examples (theme/style/css-vars items)

Follow whatever the current docs say for schema/CLI invocations, even where this spec's examples differ in detail. The spec defines *what* must exist; the docs define the *exact format*.

## Deliverables

### 1. Project scaffold

- SvelteKit + Svelte 5 + TypeScript, in the repo root (`/home/node/repos/resax`). Use `npx sv create` (non-interactive flags) or manual scaffold if the CLI fights you.
- Tailwind CSS **v4** (via `sv add tailwindcss` or manual — v4 is CSS-config, no `tailwind.config.js`).
- `npx shadcn-svelte@latest init` (use non-interactive flags; base color slate). This must produce `components.json`, `src/lib/utils.ts` (`cn()`), and the base shadcn CSS variables in `src/app.css`.
- Package manager: use `pnpm` if available on PATH, else `npm`.
- `git init` the repo. Do **not** commit — leave the working tree for review.
- Prettier + eslint via `sv add` if convenient; not a blocker.

### 2. Registry source layout

Registry-shipped code lives under `src/lib/registry/`, cleanly separated from docs-site-only code:

```
src/lib/registry/
  theme/theme.css              # resax token layer (see §3)
  lib/color.ts                 # getColor() (see §4)
  lib/easing.ts                # motion tokens (see §5)
  attachments/ripple.ts        # ripple attachment (see §6)
  ui/                          # components land here in Phase 1+
src/lib/docs/                  # docs-site components (sidebar, demo frame) — NOT in registry
```

`registry.json` at repo root, valid per the live schema, with items (names/types per current docs; adjust as the schema requires):

- `theme` — the token CSS (theme/style-type item, or a `cssVars`-based item — whichever the current docs recommend for shipping CSS variables + keyframes).
- `utils-color` — `lib/color.ts`.
- `utils-easing` — `lib/easing.ts`.
- `ripple` — `attachments/ripple.ts`, `registryDependencies` on `utils-color` if it imports it.

Add a build script (`package.json`: `"registry:build"`) invoking the shadcn-svelte CLI registry build, outputting to `static/r/`. If the current CLI lacks a registry build command for Svelte, write `scripts/build-registry.ts` (run with the project's TS runner) that emits schema-valid item JSON to `static/r/{name}.json` plus the index — validate output shape against the live schema docs.

`static/r/` is gitignored (build artifact); the build must run in `prepare`/`prebuild` or be documented in README.

### 3. Token layer (`theme.css`)

RGB-triplet custom properties (enables `rgb(var(--x) / alpha)` compositing), imported into `app.css` after Tailwind:

```css
:root {
  --rx-primary: 25 91 255;
  --rx-success: 70 201 58;
  --rx-danger: 255 71 87;
  --rx-warn: 255 186 0;
  --rx-dark: 30 30 31;
  --rx-light: 244 247 248;
  --rx-background: 255 255 255;
  --rx-text: 44 62 80;
  --rx-radius: 12px;          /* Vuesax's rounded signature */
  --rx-shadow-opacity: 0.35;
}
.dark {
  --rx-dark: 244 247 248;
  --rx-background: 22 22 24;
  --rx-text: 208 210 214;
}
```

Also register the `--rx-*` palette with Tailwind v4's `@theme` so utilities like `bg-rx-primary` exist, AND keep the raw vars for the runtime-color indirection (`--rx-color`, set per-component via `style:`). Include the shared keyframes used by later effect variants: `rx-pulse`, `rx-shimmer`, `rx-glow` (simple, tunable definitions are fine — they'll be refined in Phase 1).

Exact hex→triplet values above are starting points eyeballed from Vuesax; keep them centralized so tuning is one-file.

### 4. `getColor()` (`lib/color.ts`)

```ts
type RxColor = 'primary' | 'success' | 'danger' | 'warn' | 'dark' | (string & {});
getColor(color?: RxColor): string | undefined
```

- Semantic name → `var(--rx-<name>)`.
- `#rgb`, `#rrggbb`, `#rrggbbaa` → `"r g b"` triplet string.
- `rgb(...)`/`rgba(...)` → triplet string.
- Anything else (css color keywords etc.) → return as-is is NOT acceptable for the triplet slot; document and return `undefined` (component falls back to primary). Keep it strict and predictable.
- Pure function, no DOM. Unit-tested (see §8).

Also export a helper `styleColor(color?: RxColor): string | undefined` returning the `--rx-color: <value>` declaration for use with a `style` attribute spread, so components do it uniformly.

### 5. Easing presets (`lib/easing.ts`)

Exported constants for the Vuesax feel, used by every later component:

```ts
export const RX_EASE = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
export const RX_EASE_BOUNCE = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
export const RX_DURATION = { fast: 150, base: 250, slow: 400 } as const;
```

Plus Svelte `transition` presets built on these (e.g. `rxScale`, `rxSlideUp`) as thin wrappers over `svelte/transition` primitives.

### 6. Ripple attachment (`attachments/ripple.ts`)

Svelte 5 attachment (`{@attach ripple()}` style — a function returning an attachment per current Svelte 5 docs):

- On pointerdown, spawn an expanding, fading circle from the pointer position; auto-cleanup on animation end; respects `prefers-reduced-motion` (skip animation); works on any positioned element (sets `position: relative`/`overflow: hidden` if needed via a wrapper span, do not clobber existing inline styles).
- Ripple color: `currentColor` at low alpha by default, overridable via option `ripple({ color })`.
- No dependencies beyond DOM.

### 7. Docs site shell

- Route group `(docs)`: root layout with left sidebar listing the component families from PLAN.md §1 grouped by category (data-driven from a `src/lib/docs/nav.ts` array — placeholder entries, disabled/greyed links for not-yet-built components).
- `/` — minimal landing: project name "Resax", one-line pitch, install snippet showing registry usage (`npx shadcn-svelte@latest add ...` with this site's `/r/{name}.json` URL).
- `/components/[slug]` — generic shell page that renders "coming soon" for unbuilt components; the structure demo pages will plug into in Phase 1 (a `DemoSection` docs component: title + rendered demo + collapsible source placeholder).
- Dark-mode toggle wired to the `.dark` class (mode-watcher is the shadcn-svelte convention; fine to use).
- A hidden-from-nav route `/kitchen-sink/tokens` rendering the full token palette (all `--rx-*` colors as swatches in light/dark) and a button using the ripple attachment — this is the Phase 0 visual verification page.

### 8. Tests & checks

- Vitest configured (node env is fine for Phase 0). Tests: `getColor()` (semantic, 3/6/8-digit hex, rgb()/rgba(), garbage input) and easing exports exist.
- `svelte-check` passes with 0 errors.
- `pnpm build` (or npm) succeeds — the production build of the docs site including `static/r/*.json` present after registry build.
- Registry output sanity: a script or test asserting every `static/r/*.json` parses and has `name`, `type`, `files[].content` populated.
- GitHub Actions workflow `.github/workflows/ci.yml`: install → registry build → svelte-check → vitest → build. (Playwright deferred to Phase 1.)

## Acceptance criteria (verified before reporting done)

1. `svelte-check`: 0 errors.
2. `vitest run`: all pass.
3. Registry build emits schema-valid JSON to `static/r/` for all 4 items, each with inlined file content.
4. Production build succeeds.
5. Dev server: `/`, `/components/button` (coming-soon state), `/kitchen-sink/tokens` all render; dark toggle flips tokens; ripple visibly works on the kitchen-sink button.
6. No component/library code outside `src/lib/registry/` except docs-site chrome under `src/lib/docs/` and routes.
7. README.md: what Resax is, repo layout, how to run, how the registry works, how a consumer installs an item.

## Out of scope for Phase 0

Any `ui/` component (Button is Phase 1), Playwright, npm publishing, deployment config.
