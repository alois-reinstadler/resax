# Source-fidelity standard

Resax ports the observable Vuesax component language to Svelte 5. A matching family or variant name is not sufficient: the rendered geometry, visual layering, state choreography, and motion must remain recognizably the same.

## Porting rule

Translate framework mechanics, not design decisions.

- Vue reactivity, lifecycle hooks, slots, and events become Svelte 5 runes, snippets, callbacks, and attachments.
- Source color variables become the closest semantic `--rx-*` tokens or `--rx-color` derivations.
- Source DOM may change where required by official shadcn-svelte primitives or accessibility, but the visual layers and observable interaction must remain.
- All other source values should be preserved unless a documented browser, accessibility, or platform constraint requires a deviation.

## Required fidelity dimensions

Each component-family audit and implementation must account for:

1. **Geometry** — dimensions, padding, radii, borders, offsets, overflow, stacking, and responsive breakpoints.
2. **Visual layers** — pseudo-elements, masks, gradients and stops, shadow stacks, blur/spread radii, opacity falloff, filters, blend modes, and isolation.
3. **Typography and icons** — weight, size, line-height, spacing, alignment, icon scale, and icon transforms.
4. **State choreography** — hover, focus-visible, active/pressed, selected, checked, open, disabled, loading, error, success, dragging, and dismissed states.
5. **Motion** — keyframe stages, transform values and origins, duration, delay, easing, iteration, interruption, and enter/exit direction.
6. **Input mechanics** — pointer tracking, capture, resistance, thresholds, velocity/spring behavior, keyboard behavior, ResizeObserver behavior, and cleanup.
7. **Variants** — every catalog variant must be implemented or explicitly documented as a deliberate composition, alias, or exclusion. Unrelated variants must not be collapsed into one generic style.
8. **Theme behavior** — light/dark output and arbitrary runtime accent colors must preserve the source relationship while using Resax tokens.
9. **Accessibility** — source fidelity cannot remove semantic names, keyboard access, focus visibility, reduced-motion behavior, or forced-colors support.

## Evidence required per family

- Exact reference paths consulted under `references/<component>/`.
- A variant/state matrix mapping each source record to Svelte source, demo coverage, and tests.
- Before/after desktop and mobile screenshots in light and dark modes for materially visual variants.
- Interaction tests for source-defining behavior (pointer motion, hover layering, press/spring, open/close, drag, resize, or timed state).
- A deviations section naming every changed value or behavior and why.

## Failure conditions

A family is not source-faithful when any of the following remains unexplained:

- a named source variant is represented only by a generic color/shadow change;
- a glow omits its source ring, bloom, falloff, moving hot spot, or hover response;
- spring or elastic motion is replaced by a generic transition;
- pointer-tracked effects are replaced by centered gradients;
- multiple source layers are flattened into one box-shadow;
- hover, press, open, loading, or disabled choreography differs materially;
- source timing/easing is replaced by the project default without evidence;
- docs show only the API while omitting the defining interaction.

## Definition of done

A component is complete only when its audit has no unresolved P0/P1 fidelity gaps, its demos expose all source-defining variants and interactions, focused tests pass, visual evidence is reviewed, and the repository-wide registry/consumer/accessibility gates remain green.
