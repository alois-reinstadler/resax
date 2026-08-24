# Spec: Phase 1f — Progress, Indicator

Status: ready for implementation (parallel stream; own worktree/branch).
Same ground rules as phase-1d/1e: Button as exemplar; demo pages only in `src/lib/docs/pages/`; AGENTS.md conventions; fetch live demos where possible, report fallbacks.

## progress — `src/lib/registry/ui/progress/`

Vuesax family: VsProgress + Circular/Glow/Gradient/Segments/Striped.

```ts
interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;                  // 0–100; undefined → indeterminate sweep
  max?: number;                    // default 100
  variant?: 'default' | 'glow' | 'gradient' | 'striped' | 'segments';
  shape?: 'line' | 'circle';       // circle = SVG ring (stroke-dasharray)
  segments?: number;               // used by variant 'segments'; default 5
  color?: RxColor;
  size?: 'lg' | 'default' | 'sm'; // track thickness / ring diameter
  label?: Snippet | boolean;       // true = render percentage text; snippet = custom
}
```

- `role="progressbar"` + `aria-valuenow/min/max` (omit valuenow when indeterminate).
- Width/stroke animate via CSS transition on the fill using easing tokens; indeterminate = looping sweep keyframe; striped = animated 45° stripes; glow = `rx-glow`-style colored shadow on the fill; gradient = fill gradient with relative-color endpoint (button technique); segments = evenly gapped blocks, filled count derived from value.
- Circle shape: SVG with round linecap; label centered inside.
- Reduced motion: disable indeterminate sweep animation (render steady partial fill) and stripe motion.

## indicator — `src/lib/registry/ui/indicator/`

VsIndicator (6 variants): small status marker overlaid on wrapped content or standalone — distinct from badge by being minimal (no pill content beyond tiny count) and status-oriented.

```ts
interface IndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'dot' | 'ring' | 'pulse' | 'count' | 'icon' | 'border';
  color?: RxColor;                 // default success
  content?: string | number;       // for 'count'
  icon?: Snippet;                  // for 'icon'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: boolean;                // pull marker onto the content edge (for circular children)
  children?: Snippet;              // wrapped element; absent → standalone marker
}
```

`pulse` = expanding fading ring (`rx-pulse`-family keyframe, reduced-motion aware); `ring` = hollow outline dot; `border` = colored outline around the wrapped content itself. Marker gets a contrasting 2px surface-colored ring so it reads over media.

## Demo pages

`src/lib/docs/pages/progress.svelte` and `indicator.svelte`: line + circle at several values, indeterminate, every variant, sizes, labels; indicator over avatars/buttons (import existing registry components for realism), all positions, standalone.

## Registry

Two `registry:ui` items, `local:` deps per imports. Checker counts +2 (16 total if run after 1d+1e merge — set the number to YOUR branch's actual item count and note it; the planner reconciles at merge).

## Tests

Progress: aria attributes incl. indeterminate omission, segments fill count, circle renders SVG, value clamping (value>max, <0). Indicator: variant class mapping, overlay vs standalone DOM, count content rendering.

## Acceptance criteria

Standard set: check 0 / tests pass / registry build+check / build / dev-server curl markers for both routes / token-only colors / AGENTS.md-format report with fidelity notes.
