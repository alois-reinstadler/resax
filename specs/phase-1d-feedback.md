# Spec: Phase 1d — Alert, Badge, Chip

Status: ready for implementation (parallel stream; own worktree/branch).
Prerequisites landed on your branch base: Button pilot (use `src/lib/registry/ui/button/button.svelte` as the style/convention exemplar) and the docs-page dispatch (add demo pages as `src/lib/docs/pages/<slug>.svelte` — do NOT edit the `[slug]` route or `nav.ts`).

Follow AGENTS.md conventions throughout (notably: `local:` registryDependencies, `--rx-` token discipline, Svelte 5 only). Try fetching each component's live demo (vuesax.com/components → linked pages) for variant fidelity; when unfetchable, note the fallback interpretation per variant in your report.

## alert — `src/lib/registry/ui/alert/`

Vuesax family: VsAlert, VsAlertBanner, VsAlertInline, VsAlertNeon, VsAlertSplit, VsAlertToast → one component.

```ts
interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'banner' | 'inline' | 'neon' | 'split' | 'toast';
  color?: RxColor;                 // default primary
  title?: string | Snippet;
  icon?: Snippet;                  // sensible built-in default per color omitted; no icon dep
  closable?: boolean;
  open?: boolean;                  // $bindable, default true
  onClose?: () => void;
  children?: Snippet;
}
```

- `role="alert"`; close button `aria-label="Close"`; exit via Svelte transition using easing presets (slide+fade).
- Variant intents: `default` soft flat panel (15% alpha bg, solid text); `banner` full-width squared edges; `inline` compact single-line; `neon` dark panel with colored glow border/shadow; `split` icon column with solid color + content column soft; `toast` elevated white/dark card with colored accent edge. This is a *visual* toast only — the imperative notification engine is a later spec.

## badge — `src/lib/registry/ui/badge/`

VsBadge + Glow/Gradient/Pulse/Shimmer/Stripes → variants. Two render modes: standalone pill, or overlay wrapper when `children` present (positions the pill over the wrapped content corner).

```ts
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'glow' | 'gradient' | 'pulse' | 'shimmer' | 'stripes';
  color?: RxColor;
  content?: string | number;       // pill text; omit + dot=true → status dot
  dot?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';  // overlay mode
  children?: Snippet;              // wrapped element (overlay mode)
}
```

Reuse theme keyframes (`rx-pulse`, `rx-shimmer`, `rx-glow`) where they fit; stripes = animated 45° repeating-linear-gradient of `rgb(var(--rx-color))` tints.

## chip — `src/lib/registry/ui/chip/`

```ts
interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'flat' | 'border' | 'gradient';
  color?: RxColor;
  size?: 'lg' | 'default' | 'sm';
  closable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
  icon?: Snippet;                  // leading icon/avatar
  children: Snippet;
}
```

Close button is a real `<button>` (keyboard reachable) that stops propagation; chip itself is a `<span>` unless consumer adds interactivity via rest props.

## Demo pages

`src/lib/docs/pages/alert.svelte`, `badge.svelte`, `chip.svelte` via `DemoSection`, mirroring the existing pages' structure: every variant × a few semantic colors, one arbitrary color, closable/dot/overlay/size demos, alert open-toggle demo.

## Registry

Three `registry:ui` items; `registryDependencies` per actual imports (`local:theme`, `local:utils-color`, `local:utils-easing` as used). Update `scripts/check-registry.ts` expected counts (+3).

## Tests

Per established pattern (see `core-visuals.spec.ts` and button tests): render, variant/size class mapping, alert `open` bindable + `onClose` + `role="alert"`, badge overlay vs standalone DOM shape, chip close button fires `onClose` and not when `disabled`.

## Acceptance criteria

1. check 0 errors; vitest all pass; registry build+check pass (12 items); build succeeds.
2. Dev-server curl markers for the three routes.
3. Token-only colors (grep proof).
4. Report: per-variant fidelity notes + live-vs-fallback source, AGENTS.md format.
