# Spec: Phase 1a — Button (the theming pilot)

Status: ready for implementation
Depends on: Phase 0 (landed). Implements PLAN.md §5 Phase 1, first component.

Button is the pilot that must prove the entire color × style × effect system before any other component is built. Fidelity target: the VsButton family at vuesax.com (15 listed variants collapse into the props below).

## Deliverables

### 1. Component — `src/lib/registry/ui/button/`

`button.svelte` + `index.ts` (exports `Button`, `buttonVariants`, `type ButtonProps`). Registry item `button` (`registry:ui`) with `registryDependencies`: `theme`, `utils-color`, `utils-easing`, `ripple`. Uses `tailwind-variants` (add as dependency in the item per current schema).

### 2. Props API (Svelte 5)

```ts
interface ButtonProps extends HTMLButtonAttributes {
  variant?: 'default' | 'flat' | 'border' | 'gradient' | 'shadow' | 'relief' | 'transparent'; // default 'default'
  color?: RxColor;              // semantic or arbitrary; via styleColor() → --rx-color; default primary
  size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
  shape?: 'default' | 'circle' | 'square';   // circle/square = icon-button geometry
  effect?: 'none' | 'glow' | 'pulse';        // uses Phase 0 keyframes
  block?: boolean;              // full width
  floating?: boolean;           // FAB: fixed shadow elevation + hover lift
  loading?: boolean;            // spinner overlay, disables interaction, preserves width
  disabled?: boolean;
  href?: string;                // renders <a> with identical styling
  ripple?: boolean;             // default true; uses the ripple attachment
  children: Snippet;
  icon?: Snippet;               // leading icon slot-equivalent
}
```

- Rest props spread to the root element; `onclick` etc. arrive as native attributes.
- All colors via `--rx-color` indirection — the `tv()` classes reference `rgb(var(--rx-color) / …)` only; `style` gets `styleColor(color)` (fallback `--rx-color: var(--rx-primary)` when unset). Zero per-color class branches.
- Variant styling notes (match Vuesax feel): `default` solid fill white text; `flat` = 15% alpha fill, solid text color, fills solid on hover; `border` = 1px solid border, transparent fill, fills on hover; `gradient` = linear-gradient from `--rx-color` toward a hue-rotated end stop; `shadow` = solid-on-white with large colored drop shadow that lifts on hover (`--rx-shadow-opacity`); `relief` = solid with darker bottom edge (3D press: edge collapses on :active); `transparent` = text-only, alpha fill on hover. Transitions use `RX_EASE`/`RX_DURATION.base`.
- `loading`: overlay spinner (inline SVG or CSS border spinner, `currentColor`), content set to `visibility: hidden` to preserve dimensions, `aria-busy`, pointer-events off.
- Accessibility: `disabled` on button; for `href` + disabled use `aria-disabled` + tabindex -1 and suppress navigation.

### 3. Demo page

`/components/button` becomes a real page (first consumer of `DemoSection`): sections for every variant × the 5 semantic colors, one arbitrary-color demo (`color="#7d33ff"` and an rgb() value), sizes, shapes with icon snippet, effect glow/pulse, loading, block, floating, href-as-anchor, ripple off. Enable Button in `nav.ts`.

### 4. Tests

- Vitest (browser or jsdom per existing config) + @testing-library/svelte: renders children; `href` renders anchor; loading blocks clicks and sets `aria-busy`; disabled blocks clicks; `styleColor` output lands in `style`; `variant`/`size` map to expected classes (snapshot of `buttonVariants()` acceptable).
- Registry: `pnpm registry:build` includes `button` with content + correct `registryDependencies`; sanity checker passes.

### 5. Ripple polish (small fix folded in)

Tag ripple spans with `data-rx-ripple` and scope the attachment's cleanup selector to it (current `:scope > span[aria-hidden]` could remove unrelated spans). Adjust the ripple registry item content accordingly.

## Acceptance criteria

1. `pnpm check` 0 errors; `pnpm vitest run` all pass (including new button tests).
2. `pnpm registry:build` emits `static/r/button.json` with inlined content and the 4 registry dependencies; checker passes.
3. `pnpm build` succeeds.
4. Dev-server smoke test: `/components/button` renders all demo sections (assert on section markers via curl).
5. Visual self-check: describe (in the report) how each variant compares to vuesax.com's button demos; list any knowingly-imperfect matches for the planner's pixel-review.
6. No hardcoded color values inside `button.svelte` — grep proves only `--rx-` references.

## Out of scope

Other Phase 1 components; Playwright (arrives at the end of Phase 1); `upload` button mode; `animate-*` text animations from Vuesax PRO.
