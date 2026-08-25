# System fidelity audit: source mechanics versus the Svelte port

Date: 2026-08-25
Scope: shared theme, color and motion utilities, DOM attachments, cursor/ripple behavior, and the conventions used to translate source variants into Resax APIs. Raw-reference use is authorized by [`references/AUTHORIZATION.md`](../references/AUTHORIZATION.md).

## Closure addendum — 2026-08-25

The architectural gaps below are retained as the initial source-audit record. The shared interactions and all 328 source rows are now covered by the machine-readable ledger and reviewed implementation/test/visual evidence.

The final Button color policy preserves source foregrounds per variant and tone wherever contrast permits. Three deliberate repairs remain: semantic success/danger/warn solid surfaces use invariant `--rx-fixed-dark` ink after first-paint Axe proved the source-light pairs below 4.5:1; base hover changes the color fill without applying the source's whole-element `.85` opacity; and transparent light-mode surfaces use contrast-safe accent/text ink (including border-draw, whose dark-mode hover remains source white). These are accessibility deviations, not substitute effect implementations: pointer fields, masked layers, ripple geometry, and variant choreography remain source-derived. Focused evidence is in `src/lib/registry/ui/button/button.svelte.test.ts`; row-level references and rationale are in `docs/FIDELITY-LEDGER.json`.

## Verdict

The current gap is architectural, not a matter of tuning one shadow. The source treats glow, hover, press, and motion as behaviors with their own layers, pointer state, timing curves, and variant-specific DOM. The port usually reduces those behaviors to a static `box-shadow`, a centered gradient, or one global duration/easing pair. That changes both the resting style and the interaction signature.

The repair order should be:

1. establish a complete theme and motion contract;
2. port the shared pointer/color/ripple mechanics as Svelte 5 attachments and CSS effect primitives;
3. give every source variant an explicit mechanism mapping;
4. repair components against that mapping and verify reference and port side by side.

## Evidence base

- The organized archive contains 328 source variants in 57 families; component ownership and hashes are recorded in each `references/<component>/metadata/manifest.json`.
- The shared source theme defines 123 distinct custom-property names. The current Resax theme defines 27 `--rx-*` names, including Tailwind aliases.
- Seven core variables used by current component CSS have no definition anywhere in `src/lib/registry`: `--rx-bg`, `--rx-surface`, `--rx-surface-2`, `--rx-border`, `--rx-muted`, `--rx-text-muted`, and `--rx-shadow`. At least one is referenced in 20 component files. A declaration such as `background: rgb(var(--rx-surface))` becomes invalid in a registry consumer unless the consumer happens to define that private contract.

The counts above are repository observations, not a claim that every source token should retain its old name. The defect is that no complete mapped contract exists.

## P0 — blocks source-faithful component work

### P0.1 The theme contract is incomplete and has different defaults

The source theme has a coherent surface, border, text, input, control-size, and motion scale in [`tokens.css`](../references/_shared/theme/tokens.css). Important dark defaults are:

| Role | Source value |
| --- | --- |
| page / card / elevated / input | `#000000` / `#0a0a0a` / `#111111` / `#0d0d0d` |
| border / hover / strong | `#1f1f1f` / `#333333` / `#2a2a2a` |
| text / secondary / muted | `#ededed` / `#a1a1a1` / `#666666` |
| input border / hover | `#2a2a2a` / `#3d3d3d` |
| control heights | `32px` / `40px` / `48px` |
| control radii | `10px` / `12px` / `14px` |

The light theme changes those roles independently: page/card/elevated/input become `#ffffff` / `#fafafa` / `#f0f0f0` / `#f5f5f5`; borders become `#e4e4e4` / `#cccccc` / `#d4d4d4`; input borders become `#d4d4d4` / `#a3a3a3`. It also changes effect response with `--glow-boost: 1.6` and `--fx-rip-a: .55`.

Resax currently provides one background, one text, one gray, one radius, and one shadow opacity in [`theme.css`](../src/lib/registry/theme/theme.css#L1). It does not define the surface/border/text hierarchy that its components consume. This is why surfaces flatten together, borders disappear or fall back unpredictably, and light/dark glow intensity does not match.

Required fix: make `theme` the only authoritative, registry-installed contract and define every shared `--rx-*` variable used by registry code. Map source roles deliberately; do not rely on docs-site CSS or shadcn variables being present by accident.

### P0.2 Global timing replacement removed the source's feel

The source shared defaults are:

```css
--ease-out: cubic-bezier(.22, 1, .36, 1);
--ease-spring: cubic-bezier(.34, 1.56, .64, 1);
--dur-fast: .2s;
--dur-mid: .26s;
--dur-slow: .32s;
```

Resax instead exports `cubic-bezier(0.25, 0.8, 0.25, 1)`, `cubic-bezier(0.68, -0.55, 0.265, 1.55)`, and `150/250/400ms` in [`easing.ts`](../src/lib/registry/lib/easing.ts#L3). Most components inject the same `250ms` value for every property. These curves are not close substitutes: the Resax “bounce” adds an initial negative undershoot that the source spring does not have, and the source ease-out has a much faster arrival.

Variant timings are also intentional and must not all become a token:

- Base Button transforms in `240ms cubic-bezier(.34,1.56,.64,1)`, while background/border/opacity take `200ms`; see [`vs-button.css`](../references/button/css/shadow/vs-button.css#L4).
- Magnetic Button follows and returns in `300ms cubic-bezier(.34,1.56,.64,1)`, with a `90ms ease` active response; see [`vs-button-magnetic.css`](../references/button/css/shadow/vs-button-magnetic.css#L3).
- Card Glow lifts in `320ms cubic-bezier(.34,1.4,.64,1)` and changes its border in `220ms cubic-bezier(.22,1,.36,1)`; see [`vs-card-glow.css`](../references/card/css/shadow/vs-card-glow.css#L20).
- Input Spotlight moves its label in `240ms cubic-bezier(.34,1.4,.5,1)`, its legend in `220ms` with that spring, and fades its light in `220ms ease`; see [`vs-input-spotlight.css`](../references/input/css/shadow/vs-input-spotlight.css#L32).
- Accordion Glow uses a `480ms` spring chevron, `560ms` spring panel, and `520ms` body transform with a `60ms` reveal delay; see [`vs-accordion-glow.css`](../references/accordion/css/shadow/vs-accordion-glow.css#L100).

Required fix: restore exact shared curves and durations, then permit named per-mechanic constants. “Centralized” must mean canonical values, not one value imposed on unrelated movements.

### P0.3 Glow is a pointer field and layered compositor, not a shadow preset

The base source Button registers one global pointer listener, batches writes in `requestAnimationFrame`, caches rectangles, invalidates them on scroll/resize, skips offscreen elements with `IntersectionObserver`, and writes `--gx`, `--gy`, and `--glow` from distance to a 200px radius. The shipped implementation is in [`vs-button.js`](../references/button/web-component/vs-button.js#L1).

Its visible ring is two radial gradients:

- 60px core: alpha `.6`, `.42` at 30%, `.16` at 58%, `0` at 82%;
- 200px soft layer: alpha `.6`, `.27` at 42%, `.08` at 66%, `0` at 85%.

The gradients are cut to the border using a content-box/full-box pair plus `mask-composite: exclude`, with opacity `calc(var(--glow,0) * .9 * .7)` and a 140ms fade. The host uses `isolation:isolate`; see [`vs-button.css`](../references/button/css/shadow/vs-button.css#L42).

The shared source `.fx-glow` in [`tokens.css`](../references/_shared/theme/tokens.css) generalizes the same system with `--glow-r-core`, `--glow-r-soft`, `--glow-soft-a`, `--glow-strength`, `--glow-boost`, and `--glow-soften`.

Resax's shared `rx-glow` keyframe animates a single 22px box-shadow, and component “glow” variants commonly use one static box-shadow. That cannot reproduce cursor locality, a feathered border, neighbor illumination, or the light-theme boost.

Required fix: implement the pointer field once and share it. Components should own markup and variant semantics, but must consume the same coordinates/intensity and layered CSS formulas.

### P0.4 Source variant names were treated as skins instead of mechanics

The source catalog names a distinct interaction contract. A single broad enum or an orthogonal `effect` prop is acceptable only when it preserves that contract and the mapping is explicit.

Current examples:

- The 13 Button source variants include border-draw, chrome, glitch, gooey, invert, liquid, magnetic, plasma, push, and shine. The current Button API offers seven generic surface variants plus `glow | pulse`; see [`button.svelte`](../src/lib/registry/ui/button/button.svelte#L1). Most source mechanics have no representation.
- Card Spotlight should track `--mx/--my` and render a 240px radial light using `mix-blend-mode: screen`; see [`vs-card-spotlight.css`](../references/card/css/shadow/vs-card-spotlight.css#L44). The port displays a centered gradient on hover; see [`card.svelte`](../src/lib/registry/ui/card/card.svelte#L48).
- Card Tilt3D should update `--rx/--ry` continuously to ±9 degrees, use a 900px perspective, switch to a 90ms active follow, and return over 400ms; see [`vs-card-tilt-3d.js`](../references/card/web-component/vs-card-tilt-3d.js#L1). The port uses a fixed `rotateX(3deg) rotateY(-4deg)` hover transform.
- Input Spotlight should follow the pointer and stay lit on focus. The port turns it into two static focus shadows; compare [`vs-input-spotlight.css`](../references/input/css/shadow/vs-input-spotlight.css#L32) and [`input.svelte`](../src/lib/registry/ui/input/input.svelte#L78).
- Accordion Glow is a masked conic ring whose `--spin` rotates over 3.2 seconds. The port uses two box shadows; compare [`vs-accordion-glow.css`](../references/accordion/css/shadow/vs-accordion-glow.css#L39) and `src/lib/registry/ui/accordion/accordion-item.svelte`.

Required fix: create a machine-readable variant ledger before more component repair. Every one of the 328 source slugs must map to `literal`, `composed`, or `intentionally unsupported`, with mechanism IDs and evidence paths. “Composed” is not a waiver: its combined props must recreate the same rest/hover/active/focus/disabled behavior.

## P1 — shared systems that materially change fidelity

### P1.1 Arbitrary color needs a derived effect palette

The source color resolver does more than parse a color. It calculates luminance, chooses a contrasting foreground at a `.45` threshold, produces a hover-adjusted color, and fans the result out to component roles including `--ui-accent`, `--inp-accent`, `--btn-primary-bg`, `--card-ink`, `--ui-ring`, `--inp-ring`, `--fx-tint`, `--ring`, `--rip`, foreground variables, and ripple/glow contrast variables. The implementation is embedded in the component sources, for example [`vs-button.js`](../references/button/web-component/vs-button.js#L74).

Resax `styleColor()` writes only `--rx-color`; see [`color.ts`](../src/lib/registry/lib/color.ts#L22). Components then guess foregrounds, ring values, and shadow alpha independently. A yellow, white, or very dark arbitrary color therefore cannot match the source across solid text, glow, ripple, and hover at the same time.

Required fix: add a typed `colorStyle()`/`colorVars()` result that derives at least RGB, foreground, hover RGB, ring RGB, effect tint RGB, and ripple RGB. Preserve `styleColor()` as a compatibility wrapper if necessary.

### P1.2 Ripple geometry, paint, timing, and press response differ

Source Button ripple:

- diameter reaches the farthest corner from the pointer;
- five-stop radial paint at alpha `.38`, `.20`, `.09`, `.03`, then transparent at 76%;
- scale and fade run for 780ms with `.22,1,.36,1` and `.25,.1,.25,1` respectively;
- the container caps live ripple nodes at six;
- pointer-down also applies a position-dependent 3D press transform using `perspective(450px)`, up to 15° X and 10° Y, and `scale(.96)`.

See [`vs-button.css`](../references/button/css/shadow/vs-button.css#L63) and [`vs-button.js`](../references/button/web-component/vs-button.js#L74).

The Resax attachment paints a flat `currentColor` disk at `.18`, uses one 600ms animation with the wrong easing, and has no press tilt or live-node cap; see [`ripple.ts`](../src/lib/registry/attachments/ripple.ts#L17).

Required fix: make source ripple paint/timing the default and keep press tilt as a separately selectable behavior so controls that should not tilt can still reuse ripple.

### P1.3 Layering primitives were dropped

The source routinely uses `isolation:isolate`, negative-z aura layers, clipped inner surfaces, masked border-only gradients, `mix-blend-mode`, `filter: blur()`, and opacity crossfades. These are functional parts of the effect:

- Card Glow: isolated, blurred negative-z aura, `4.5s` breathe, hover flare to `.7`; [`vs-card-glow.css`](../references/card/css/shadow/vs-card-glow.css#L43).
- Card Spotlight: isolated screen-blended cursor light; [`vs-card-spotlight.css`](../references/card/css/shadow/vs-card-spotlight.css#L44).
- Badge Glow: steady 8px halo plus an opacity-animated pseudo-element with a 16px/2px halo over `2.6s`; [`vs-badge-glow.css`](../references/badge/css/shadow/vs-badge-glow.css#L21).
- Accordion Glow: masked conic border rather than outer bloom; [`vs-accordion-glow.css`](../references/accordion/css/shadow/vs-accordion-glow.css#L39).

A single animated `box-shadow` changes paint cost and appearance and cannot stand in for all four.

Required fix: provide small CSS effect primitives by mechanism (`ring`, `aura`, `spotlight`, `halo`), not one universal `.glow` class.

### P1.4 Reduced motion currently removes functionality in places

Source behavior is selective:

- Button disables press transform and ripple but keeps its spinner at 1.2 seconds.
- Card Glow removes breathing and lift while retaining a 200ms border-color response.
- Accordion Glow stops the ring spin but retains a 200ms chevron and opacity transition.
- Cursor Glow uses one immediate sample with no trail under reduced motion; it does not remove the cursor feature.

Resax Cursor returns before installing anything whenever reduced motion is active; see [`cursor.ts`](../src/lib/registry/ui/cursor/cursor.ts#L10). Several components collapse spinners to a single 1ms iteration, which communicates loading poorly.

Required fix: reduce displacement, spring, looping decoration, and trails while preserving state changes and essential progress indicators. Forced-colors and coarse-pointer opt-outs remain appropriate.

### P1.5 Cursor Glow is a different component

Source Cursor Glow renders an additive canvas trail with 40 samples, `globalCompositeOperation = "lighter"`, a radial sprite with alpha `.82/.5/.18/.04/0`, velocity stretch up to 1.5×, configurable default `size=220`, `ease=.14`, `intensity=.28`, and `trail=.6`; see [`vs-cursor-glow.js`](../references/cursor/web-component/vs-cursor-glow.js#L78). The canvas uses `mix-blend-mode: screen` and a 260ms visibility fade.

Resax Cursor Glow is a 28px bordered `div` with a 22px box-shadow; see [`cursor.ts`](../src/lib/registry/ui/cursor/cursor.ts#L16). Its rAF smoothing is useful infrastructure, but it does not implement the source glow mechanic.

Required fix: keep the common cursor boundary/lifecycle attachment, but give `glow` a canvas renderer and keep DOM renderers for label, reticle, magnet, blob, and blend.

## P2 — consistency and maintainability

### P2.1 Size and radius semantics need source aliases

The source control ladder is 32/40/48px with 10/12/14px radii; cards use padding 14/18/24px and max widths 320/380/440px. The port commonly derives dimensions from one 12px radius or uses legacy Vuesax size names. Preserve current public aliases where needed, but resolve them to source-scale variables so related components align.

### P2.2 Interaction state must be explicit, not inferred from `:hover` alone

Source classes such as `is-lit`, `is-active`, `is-hovering`, `is-focused`, and `is-open` gate different layers and timing modes. Svelte should derive those states with `$state`/`$derived` or let the attachment write only ephemeral CSS variables. Keyboard focus must activate the meaningful visual effect even when no pointer coordinate exists.

### P2.3 Performance behavior belongs in the fidelity contract

The source deliberately animates opacity instead of expensive shadows in Card Tilt, batches pointer work in rAF, caches rectangles, uses observers, and removes listeners/frames on disconnect. A visually similar first frame that causes per-element global listeners or layout reads on every pointer event is not a faithful port.

## Reusable Svelte 5 architecture

### 1. Theme and motion registry items

Extend the existing `theme` item instead of introducing docs-only variables:

```css
:root {
  --rx-bg: 0 0 0;
  --rx-surface: 10 10 10;
  --rx-surface-2: 17 17 17;
  --rx-border: 31 31 31;
  --rx-border-hover: 51 51 51;
  --rx-text: 237 237 237;
  --rx-text-secondary: 161 161 161;
  --rx-text-muted: 102 102 102;

  --rx-ease-out: cubic-bezier(.22, 1, .36, 1);
  --rx-ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  --rx-duration-fast: 200ms;
  --rx-duration-mid: 260ms;
  --rx-duration-slow: 320ms;
}
```

Use RGB triplets where alpha composition is required and full CSS colors for roles that need `color-mix()`. The implementation should expose both deliberately rather than accidentally mixing formats.

`easing.ts` should export exact CSS strings plus Svelte easing functions derived from the same cubic-bezier definitions. Keep source-specific named constants such as `CARD_LIFT_DURATION = 320` and `ACCORDION_PANEL_DURATION = 560` close to the mechanism or variant.

### 2. Typed color fan-out

Use one typed utility to build the complete inline variable contract:

```ts
interface RxEffectPalette {
  rgb: string;
  foreground: string;
  hoverRgb: string;
  ringRgb: string;
  effectRgb: string;
  rippleRgb: string;
}

function colorVars(color?: RxColor): Record<`--rx-${string}`, string>;
```

Components should not each invent foreground and glow contrast. Registry output must include this utility wherever a `color` prop is exposed.

### 3. Attachments for ephemeral DOM behavior

Implement these under `src/lib/registry/attachments/` and register them as local dependencies:

- `proximityGlow(options)`: shared document-level pointer hub; writes `--rx-gx`, `--rx-gy`, `--rx-glow`; rAF batching, cached rects, scroll/resize invalidation, `IntersectionObserver`, cleanup when the last consumer detaches.
- `pointerPosition(options)`: bounded pointerenter/move/leave; writes percentage `--rx-mx`/`--rx-my`, exposes a lit state, invalidates cached bounds, and supplies a center coordinate for focus-visible.
- `magnetic(options)`: source-default strength `.4`, label parallax `.4`, mouse-only transform, spring return, cleanup.
- `tilt3d(options)`: source-default ±9°, active 90ms follow, 400ms return, pointer/focus/coarse/reduced-motion behavior.
- `ripple(options)`: farthest-corner geometry, source radial stops, dual 780ms animation, six-node cap, cancellation cleanup.

Attachments should own listeners, observers, frames, and transient CSS variables. Components should own semantic state, DOM layers, snippets, and callback props. This keeps Svelte 5 lifecycle behavior testable without recreating one giant source class.

### 4. CSS effect primitives by rendering mechanism

Put reusable formulas in the registry-installed theme/effects stylesheet:

- `proximity-ring`: two radial gradients, border mask, pointer coordinates;
- `ambient-aura`: negative-z blurred radial layer with opacity breathe/hover flare;
- `pointer-spotlight`: bounded radial layer at `--rx-mx/--rx-my`, optional screen blend;
- `conic-ring`: registered angle property, masked border, controlled spin;
- `halo`: steady shadow plus composited opacity-animated maximum halo;
- `neighbor-light`: separate fill/ring variables and intensity, not overloaded pointer glow.

The component supplies the necessary element/pseudo-element and selects exact values. Do not make a class named merely `glow` that silently chooses one mechanism.

### 5. Variant fidelity ledger

Add a checked data file with one row per catalog slug:

```json
{
  "vs-card-spotlight": {
    "registryItem": "card",
    "api": { "variant": "spotlight" },
    "status": "literal",
    "mechanisms": ["pointer-position", "pointer-spotlight", "screen-blend", "lift"],
    "reference": "references/card/metadata/manifest.json"
  }
}
```

Allowed statuses should be narrowly defined. `literal` requires all listed mechanics; `composed` requires a demonstrated prop combination; `unsupported` requires a reason in the docs. This prevents a source slug from being counted as complete merely because its family has one component.

## Automated acceptance checks

### Static contract checks

Add `pnpm fidelity:check` with these failures:

1. every `var(--rx-*)` used in registry CSS has a definition in the installed dependency closure, a fallback, or an explicit transient-variable allowlist;
2. all 328 catalog slugs occur exactly once in the fidelity ledger;
3. every `literal`/`composed` ledger row maps to an exported prop combination and declares required mechanism IDs;
4. pointer mechanisms require reduced-motion, coarse-pointer, listener cleanup, and SSR tests;
5. masked-ring mechanisms require both standard `mask-composite: exclude` and the WebKit XOR form;
6. registry items using shared attachments/effects declare the appropriate `local:` dependency.

### Unit and attachment checks

- Dispatch pointer events at known coordinates and assert `--rx-gx/--rx-gy/--rx-glow` or `--rx-mx/--rx-my` values after one rAF.
- Assert scroll/resize invalidates cached bounds and that unmount removes listeners, observers, frames, and transient variables.
- Test the color fan-out for black, white, primary, `#ffcc00`, three-digit hex, and RGB syntax, including foreground choice and effect/ripple contrast.
- Test ripple farthest-corner diameter, radial paint, duration/easing, six-node cap, and reduced-motion suppression.
- Test reduced motion per mechanism: no decorative looping/displacement, but visible open/focus/loading state remains.

### Browser fidelity checks

Create a local reference harness that loads the archived web component beside the Svelte port. For every P0/P1 variant, capture:

1. rest;
2. pointer at center and near each edge;
3. hover after the source fade duration;
4. active/pressed;
5. focus-visible;
6. disabled;
7. dark and light themes;
8. reduced motion.

Use fixed viewport, font, color, and animation clock. Assertions should include screenshots plus computed contract values: transforms, opacity, filter, box-shadow, background-image, mask, blend mode, and pointer CSS variables. Pixel thresholds alone can hide the wrong mechanic at one sampled frame.

Initial mandatory reference cases:

- Button base glow/ripple/press, Magnetic, Shine, Push;
- Card Glow, Spotlight, Tilt3D;
- Input Spotlight;
- Accordion Glow and Bounce;
- Badge Glow;
- Cursor Glow and Magnet.

### Performance checks

- A page with 100 proximity-glow consumers should install one document pointer listener, not 100.
- Pointer movement should perform at most one render batch per animation frame.
- Hidden/offscreen consumers should receive no style writes.
- No animation should transition a complex box-shadow on every pointer frame when an opacity crossfade can reproduce the source.

## Recommended execution sequence

1. P0 foundation: theme completeness check, exact easing exports, typed color fan-out, proximity/pointer attachments, source ripple.
2. Pilot: Button, including reference harness and all 13 source-variant ledger entries. Do not fan work out until this proves the shared architecture.
3. Layer pilots: Card Spotlight/Glow/Tilt3D, Accordion Glow, Input Spotlight, Badge Glow.
4. Cursor renderer split and reduced-motion correction.
5. Component-family agents work only from their component reference directory and ledger rows, reusing the proven helpers.
6. Run the complete source-to-port comparison and keep unsupported/deviated rows visible in generated docs.

This architecture stays within Svelte 5 and registry-first constraints: runes hold semantic component state, snippets remain the content API, callback props remain events, and `{@attach}` owns DOM behavior. The important change is that the port now preserves what each source effect actually does.
