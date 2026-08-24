# Spec: Phase 5b — Cursor, SlideConfirm

Status: ready after Phase 3 merges; independent of Phase 5a. Standard ground rules. These components manipulate global/pointer state, so cleanup and input-modality fallbacks are acceptance requirements. Docs-shell redesign is out of scope.

## Required references

- Inspect `VsCursor` and `VsSlideConfirm` records and all matching `wc/`, `shadow-css/`, and `islands/` files under `scrape/vuesax/`.
- Current Svelte attachment docs: https://svelte.dev/docs/svelte/%40attach
- Pointer Events behavior: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

## cursor — `src/lib/registry/ui/cursor/`

This registry item exports an attachment, not a component wrapper.

```ts
type CursorVariant = 'default' | 'blend' | 'blob' | 'glow' | 'label' | 'magnet' | 'reticle';
interface CursorOptions {
  variant?: CursorVariant; color?: RxColor; size?: number;
  label?: string; selector?: string; disabled?: boolean;
}
declare function cursor(options?: CursorOptions): Attachment;
```

The attachment owns one overlay rooted in `document.body`, is SSR-safe, and removes its nodes/listeners/animation frame on teardown or option replacement. It must not block hit testing (`pointer-events:none`). Disable the custom cursor for coarse pointers, forced-colors, reduced motion when motion is essential to the selected variant, and when the document loses visibility. Never permanently mutate `body` styles; restore the exact previous cursor value.

Label/magnet target metadata may be read from `data-rx-cursor-label` and `data-rx-cursor-magnet`. Magnet only alters the decorative cursor, never the target. Respect nested targets and Shadow DOM composed paths where practical.

## slide-confirm — `src/lib/registry/ui/slide-confirm/`

```ts
interface SlideConfirmProps {
  confirmed?: boolean;                             // $bindable
  color?: RxColor; label?: string; confirmedLabel?: string;
  threshold?: number;                              // 0..1, default 0.85
  disabled?: boolean; loading?: boolean; resettable?: boolean;
  icon?: Snippet; confirmedIcon?: Snippet;
  onConfirm?: () => void; onConfirmedChange?: (confirmed: boolean) => void;
}
```

Use Pointer Events with capture, resize-aware track measurement, and logical coordinates so RTL works. Clamp movement and settle to start/end. Fire confirmation exactly once per transition. Provide an equivalent keyboard path: focusable thumb, End/right (left in RTL) confirms, Home resets when resettable, Space/Enter performs a documented confirm action. Expose slider-like value text without implying an adjustable persisted numeric value. Cancel active drag on disable, resize, pointercancel, or unmount. Reduced motion makes settling immediate.

## Fixtures, registry, tests

- Fixture pages: `cursor.svelte` and `slide-confirm.svelte`; cursor fixture provides an explicit bounded preview/disable toggle and must not hijack the whole docs site by default.
- Add 2 registry items and checker count.
- Tests: cursor SSR import, single overlay/listener lifecycle, option updates, teardown restoration, coarse-pointer bypass; SlideConfirm pointer threshold, below-threshold reset, pointercancel, RTL, keyboard equivalence, disabled/loading, callback deduplication, resize during drag.

## Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, and `pnpm build` pass with actual output reported.
- Inspect both built registry JSON files.
- Report scrape files consulted, global DOM mutations/restoration, modality/reduced-motion behavior, file tree, and deviations.
