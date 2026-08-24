# Spec: Phase 1b — Spinner, Skeleton, Separator, Spacer

Status: ready for implementation (parallel stream to phase-1a-button)
Depends on: Phase 0 only. Deliberately does NOT depend on the Button pilot — these components use tokens simply (single-color / structural), so they can proceed while Button proves the full variant system. If the pilot forces theming changes, a follow-up polish spec will reconcile.

**Worktree note:** you are launched inside a dedicated git worktree on its own branch. Run `pnpm install` first. Work only in this directory; never switch branches. Expect that `src/lib/docs/nav.ts` and `registry.json` will conflict with the parallel stream — that's fine, the planner merges.

## Components (each: `src/lib/registry/ui/<name>/` with `<name>.svelte` + `index.ts`, a `registry:ui` item with `registryDependencies: ["theme"]` plus whatever it actually imports, a demo page enabled in nav, tests)

### spinner

Vuesax lists 11 loader variants. Try to fetch the live demo page (vuesax.com/c/vs-spinner or linked from /components) to get the canonical variant names; it's client-rendered, so if the names aren't retrievable use this classic Vuesax loading set and note it as a deviation: `default | waves | corners | border | points | square | gradient | rectangle | circles | scale`.

```ts
interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  type?: SpinnerType;        // default 'default'
  color?: RxColor;           // via styleColor(); default primary
  size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
  text?: Snippet;            // optional label under the loader
}
```

Pure CSS keyframe implementations (define per-type keyframes in the component's `<style>`, not in theme.css); `role="status"` + visually-hidden "Loading" text when no `text` snippet; respects `prefers-reduced-motion` (static or slowed indicator). Colors only via `rgb(var(--rx-color) / …)`.

### skeleton

```ts
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'wave' | 'shine' | 'gradient' | 'blink';  // default 'pulse'
  shape?: 'rect' | 'text' | 'title' | 'circle' | 'avatar';      // presets sizes/radius; default 'rect'
  loading?: boolean;   // default true; when false renders children instead
  children?: Snippet;
}
```

Consumer sizing via `class` passthrough (merged with `cn()`); `rect` uses `--rx-radius`. Animation variants map to keyframes (`rx-pulse`/`rx-shimmer` from theme where they fit; add component-local keyframes otherwise). `aria-busy` on the wrapper while loading; animations off under reduced motion.

### separator

```ts
interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  color?: RxColor;            // default: neutral border color, NOT primary
  children?: Snippet;         // optional centered label (text/icon) — horizontal only
}
```

`role="separator"` + `aria-orientation` (decorative `role="none"` when it has children label semantics — follow bits-ui/shadcn separator's a11y conventions). Gradient variant fades edges via `rgb(var(--rx-color) / 0)` end stops.

### spacer

`{ width?: string; height?: string; grow?: boolean }` — renders an empty `div` (flex-grow when `grow`), `aria-hidden`. Trivial; still a registry item for catalog completeness.

## Demo pages

Real pages (via `DemoSection`) at `/components/spinner`, `/components/skeleton`, `/components/separator`, `/components/spacer`: all variants, all sizes where applicable, semantic + one arbitrary color, skeleton `loading` toggle demo, separator with label. Enable the four entries in `nav.ts`.

## Tests

Per component: renders; variant/shape/size class mapping (snapshot of the `tv()` outputs acceptable); skeleton renders children when `loading={false}`; separator sets `aria-orientation`; spinner has `role="status"`. Registry: build emits all four items with inlined content; sanity checker passes.

## Acceptance criteria

1. `pnpm check` 0 errors; `pnpm vitest run` all pass.
2. `pnpm registry:build` emits `spinner`, `skeleton`, `separator`, `spacer` items; checker passes.
3. `pnpm build` succeeds.
4. Dev-server smoke test of the four demo routes (curl markers).
5. No hardcoded colors in components — only `--rx-` references (grep proof), except neutral grays for separator/skeleton base, which must come from theme tokens (add `--rx-gray: 235 238 242` light / dark override to theme.css + theme registry item if needed).
6. Report includes the spinner variant-name source (live site or fallback) and per-variant fidelity notes.

## Out of scope

Progress (own spec later), overlay/fullscreen spinner mode, Button-family styling patterns.
