# Spec: Phase 2c — Slider, Rating, InputOtp

Status: blocked until Phase 1 fully merges. Standard ground rules (AGENTS.md, own worktree, `pages/` demos, fidelity notes, live-doc fetches for bits-ui APIs).

## slider — `src/lib/registry/ui/slider/`

bits-ui Slider (npm dep). Vuesax feel: chunky rounded track, square or circle knob, floating value tooltip.

```ts
interface SliderProps {
  value?: number[];                // $bindable; length 1 = single, 2 = range
  min?: number; max?: number; step?: number;
  color?: RxColor; size?: 'lg' | 'default' | 'sm';
  knob?: 'circle' | 'square';
  tooltip?: 'hover' | 'always' | 'none';   // value bubble above active thumb
  ticks?: boolean;                 // step tick marks on track
  disabled?: boolean;
  onValueChange?: (value: number[]) => void;
}
```

Tooltip animates with easing tokens; range mode colors the between-thumbs segment; keyboard behavior entirely from bits-ui.

## rating — `src/lib/registry/ui/rating/`

Custom (radiogroup semantics — one focusable control, arrows adjust; follow WAI-ARIA rating/radio pattern). No bits-ui primitive fits; keep a11y simple and correct.

```ts
interface RatingProps {
  value?: number;                  // $bindable; supports halves when `halves`
  max?: number;                    // default 5
  halves?: boolean;
  color?: RxColor;                 // default warn
  size?: 'lg' | 'default' | 'sm';
  readonly?: boolean; disabled?: boolean;
  icon?: Snippet<[{ filled: boolean; half: boolean }]>;  // default inline star SVG
  onValueChange?: (value: number) => void;
}
```

Hover preview fills up to hovered star (pointer only); half fills via clipped overlay; scale-pop animation on select (bounce easing, reduced-motion aware).

## input-otp — `src/lib/registry/ui/input-otp/`

bits-ui PinInput (npm dep) — fetch its current docs; it handles paste distribution, focus movement, hidden input.

```ts
interface InputOtpProps {
  value?: string;                  // $bindable
  length?: number;                 // default 6
  type?: 'numeric' | 'text';
  color?: RxColor; size?: 'lg' | 'default' | 'sm';
  masked?: boolean;                // password-style dots
  state?: 'default' | 'success' | 'danger';
  disabled?: boolean;
  onComplete?: (value: string) => void;
}
```

Vuesax look: separated square cells, active-cell accent ring, filled-cell tint; shake animation on `state="danger"` (reduced-motion: no shake, color only).

## Demos, registry, tests

- Pages: `slider.svelte`, `rating.svelte`, `otp.svelte` (nav slug for VsOtp is `otp`).
- Registry: 3 items; bits-ui in `dependencies` where used; `local:` registry deps; checker += 3.
- Tests: slider value bindable + range segment renders two thumbs; rating keyboard arrows change value, halves round correctly, readonly blocks; otp value round-trip, `onComplete` fires at full length, masked hides digits.

## Acceptance criteria

Standard set + bits-ui version note.
