# Source-literal fidelity pass

## Objective

Repair the current Resax port wherever it preserves only a Vuesax concept or variant name rather than the source component's observable styling, animation, hover/press behavior, and interaction choreography.

The maintainer authorized raw-reference use for this port on 2026-08-25 after the archived provenance restriction was explicitly raised. Preserve `references/AUTHORIZATION.md` and all original provenance files.

## Inputs

- `docs/FIDELITY-STANDARD.md`
- `docs/FIDELITY-AUDIT-SYSTEM.md`
- `docs/FIDELITY-AUDIT-INPUTS-DISPLAY.md`
- `docs/FIDELITY-AUDIT-NAVIGATION-OVERLAYS.md`
- `references/<component>/metadata/manifest.json`
- raw artifacts named by each component manifest
- current `src/lib/registry/ui/<item>/` implementation and corresponding docs fixture

## Implementation order

1. Land shared token, easing, pointer-tracking, ripple, glow-layer, and motion utilities that are evidenced across multiple source families.
2. Fix all P0 gaps: defining interaction or variant is absent or materially wrong.
3. Fix all P1 gaps: geometry, visual layers, timing, easing, or state choreography is materially different.
4. Fix P2 polish where it can be translated without destabilizing semantics or public APIs.
5. Update demos so every defining variant and interaction is visible and discoverable.
6. Add focused behavior and visual-state tests before marking a family complete.

## Porting constraints

- Translate Vue mechanics to Svelte 5 runes, snippets, callback props, and attachments; do not translate away the design.
- Preserve exact source gradients/stops, shadow stacks, blur/spread values, masks, filters, blend modes, pseudo-layers, transforms, transform origins, keyframe stages, durations, delays, and easing curves unless a deviation is documented.
- Preserve pointer-relative and resize-relative effects as live behavior; a centered static approximation is not acceptable.
- Preserve source hover, focus-visible, active, checked, selected, open, loading, disabled, drag, success, and error choreography.
- Keep public APIs backward compatible where practical. New source-specific variants/effects may be additive aliases or props; do not silently remap an existing public value to unrelated behavior.
- Continue to build on official shadcn-svelte primitives where required, but skin their documented parts/states to reproduce the source output.
- Runtime colors must use the Resax token layer. Token substitution may preserve numeric alpha/lightness relationships from the source.
- Every animation needs source-faithful normal behavior plus a deliberate `prefers-reduced-motion` result.
- Accessibility fixes remain mandatory: semantic names, keyboard behavior, visible focus, forced colors, and cleanup cannot regress for visual fidelity.

## Per-family acceptance criteria

- Every catalog variant in the family manifest maps to an implemented variant, an explicit orthogonal composition, or a documented justified exclusion.
- All P0 and P1 audit findings are resolved.
- The docs fixture exposes all source-defining variants, states, and interactive effects.
- Focused unit/component tests cover the defining interaction and teardown.
- Desktop and mobile, light and dark screenshots are generated and reviewed for representative base and effect-heavy variants.
- `pnpm check` reports 0 errors and 0 warnings.
- Relevant focused Vitest suites pass.
- `pnpm registry:build && pnpm registry:check` passes and emitted JSON contains the changed source/utilities.
- `pnpm references:check` passes.
- `git diff --check` passes.

## Repository acceptance criteria

- `pnpm test` passes.
- `pnpm docs:check` and `pnpm api:check` pass.
- `pnpm test:a11y` passes desktop/mobile in light/dark.
- `pnpm test:visual` passes with reviewed baselines.
- `pnpm consumer:smoke` passes default, all-item, and custom-alias installs.
- `BASE_PATH=/resax pnpm build` emits every component route, registry JSON, and `404.html` with no strict-prerender errors.
- No unresolved P0/P1 entry remains in any fidelity audit ledger.

## Deviations

Every changed source behavior or numeric value must be listed with the reference path, the source behavior/value, the Resax behavior/value, and the accessibility/platform reason. “Framework difference” by itself is not a sufficient reason.
