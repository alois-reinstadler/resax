# Spec: Phase 5c — InlineOverflow, TickRail, Transform, AskAiButton, ButtonGroup, SplitButton

Status: ready after Phase 3 merges; independent of Phase 5a/5b. Standard ground rules. `AskAiButton`, `ButtonGroup`, and `SplitButton` exist in the scrape but were absent from the old phase table; this spec assigns them. Docs-shell redesign is out of scope.

## Required references

- Inspect all matching records/assets under `scrape/vuesax/` for `VsInlineOverflow`, `VsTickRail`, `VsTransform`, `VsAskAiButton`, `VsButtonGroup`, and `VsSplitButton`.
- Fetch current official docs before implementation:
  - https://www.shadcn-svelte.com/docs/components/button-group
  - https://www.shadcn-svelte.com/docs/components/dropdown-menu

Use official Button Group and Dropdown Menu bases if available/current. Reuse `local:button`, `local:dropdown` only when their public composition is sufficient; do not create conflicting copies of official primitives.

## inline-overflow — `src/lib/registry/ui/inline-overflow/`

```ts
interface InlineOverflowProps {
  items: Snippet[]; gap?: string; moreLabel?: string;
  color?: RxColor; priority?: 'start' | 'end';
}
```

Render as many items as fit, with remaining items accessible from a “more” official dropdown. Use ResizeObserver with loop-safe scheduling and stable hidden-item ordering. Measure without flashing hidden clones to assistive technology. On SSR render all items in a wrapping fallback; enhance after mount. Keyboard focus must not be stranded when resize hides the focused item.

## tick-rail — `src/lib/registry/ui/tick-rail/`

```ts
interface TickRailProps {
  value?: number;                                  // $bindable
  min?: number; max?: number; step?: number;
  color?: RxColor; orientation?: 'horizontal' | 'vertical';
  formatValue?: (value: number) => string;
  onValueChange?: (value: number) => void;
}
```

Use slider semantics and keyboard behavior. Prefer composing `local:slider` if it supports the required public behavior. Ticks may virtualize visually for very large ranges, but the value remains exact and labelled. Validate positive step and normalize min/max consistently.

## transform — `src/lib/registry/ui/transform/`

```ts
interface TransformProps {
  show?: boolean;                                  // $bindable
  variant?: 'expand' | 'fade' | 'flip' | 'scale' | 'slide';
  direction?: 'up' | 'right' | 'down' | 'left'; duration?: number;
  keepMounted?: boolean; onComplete?: (show: boolean) => void;
  children: Snippet;
}
```

Use Svelte transitions and CSS easing tokens. `keepMounted` hides inert content without leaving it focusable/announced. Completion callbacks fire once even when interrupted. Reduced motion keeps lifecycle/callback timing deterministic with zero visual movement.

## ask-ai-button — `src/lib/registry/ui/ask-ai-button/`

```ts
interface AskAiButtonProps extends Omit<ButtonProps, 'variant'> {
  label?: string; loading?: boolean; sparkle?: Snippet;
}
```

Compose `local:button`. Recreate the scrape's animated mesh, halo, specular pointer highlight, sparkle spring, and loading state using token-aware CSS; the branded multi-hue mesh is the only intentional non-`--rx-color` palette and must be expressed as dedicated `--rx-ai-*` theme tokens added to the registry `theme` item, not hardcoded component colors. Pointer highlight is decorative. Reduced motion shows a static mesh/halo.

## button-group — `src/lib/registry/ui/button-group/`

```ts
interface ButtonGroupProps { orientation?: 'horizontal' | 'vertical'; attached?: boolean; children: Snippet; }
```

Compose the official base and `local:button`; normalize adjoining borders/radii without overriding each Button's color/variant. Preserve native tab order; this is not a toolbar unless consumers explicitly build one.

## split-button — `src/lib/registry/ui/split-button/`

```ts
interface SplitButtonProps {
  label: string; color?: RxColor; variant?: ButtonProps['variant']; disabled?: boolean; loading?: boolean;
  onclick?: (event: MouseEvent) => void; menu: Snippet; icon?: Snippet;
}
```

Compose `local:button`, ButtonGroup, and official dropdown-menu (or `local:dropdown` if it exposes the needed menu semantics). Main action and menu trigger are separate labelled buttons; disabled/loading state is coherent, and keyboard opening/focus comes from the menu base.

## Fixtures, registry, tests

- Fixture pages: `inline-overflow.svelte`, `tick-rail.svelte`, `transform.svelte`, `ask-ai-button.svelte`, `button-group.svelte`, `split-button.svelte`; no docs-shell changes.
- Add 6 component registry items; update `theme` only for documented `--rx-ai-*` tokens and rebuild its output. Update checker count.
- Tests cover overflow resize/focus/SSR; tick normalization/keyboard; Transform mount/inert/interruption; AskAi loading/disabled and pointer cleanup; group orientation; split action/menu/disabled keyboard paths.

## Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, and `pnpm build` pass with actual output.
- Inspect all six new JSON items plus rebuilt `theme.json`.
- Report official-base decisions/versions, scrape files consulted, new theme tokens, SSR/resize/reduced-motion behavior, file tree, and deviations.
