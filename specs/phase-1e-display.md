# Spec: Phase 1e — Avatar, Card

Status: ready for implementation (parallel stream; own worktree/branch).
Same ground rules as phase-1d: Button is the convention exemplar; demo pages go in `src/lib/docs/pages/<slug>.svelte` only; never edit the `[slug]` route or `nav.ts`; AGENTS.md conventions (`local:` deps, token discipline, Svelte 5). Fetch live demos for fidelity where possible; report fallbacks.

## avatar — `src/lib/registry/ui/avatar/`

Vuesax lists 13 avatar variants (images, initials, icons, sizes, badges, groups, history/story ring). Deliver as `Avatar` + `AvatarGroup`.

```ts
interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string; alt?: string;
  fallback?: string;               // initials text when no/failed image
  icon?: Snippet;                  // icon fallback (used when no src and no fallback text)
  color?: RxColor;                 // fallback surface color
  size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
  shape?: 'circle' | 'square' | 'rounded';
  badge?: string | number | boolean;   // true = dot; string/number = count pill
  badgeColor?: RxColor;
  history?: boolean;               // story-style gradient ring
  loading?: boolean;               // skeleton-like shimmer state
  children?: Snippet;              // custom content override
}
interface AvatarGroupProps { max?: number; float?: boolean; children: Snippet; }
```

- Image error → fallback chain (image → initials → icon) via `$state` on `onerror`; no bits-ui needed.
- `AvatarGroup` overlaps children (negative margin ring border), shows `+N` overflow avatar when `max` exceeded — count via context registration (`setContext`/`getContext`), not DOM sniffing.
- `history` ring: conic-gradient ring from `rgb(var(--rx-color))` through a hue-rotated stop (same relative-color technique as button gradient).

## card — `src/lib/registry/ui/card/`

Vuesax lists 7 card variants. Core geometry + media handling in one component with snippets.

```ts
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shadow' | 'border' | 'flat' | 'reveal' | 'zoom';
  color?: RxColor;                 // accent for border/flat tints; default neutral surface
  href?: string;                   // whole-card link mode (renders <a>)
  media?: Snippet;                 // image/video area
  header?: Snippet;
  footer?: Snippet;
  children?: Snippet;
}
```

- `default` soft shadow lift on hover; `shadow` heavy colored shadow (`--rx-shadow-opacity`); `border` outlined; `flat` tinted surface; `reveal` footer hidden, slides up over media on hover (Vuesax signature) — must also be reachable via focus-within for keyboard users; `zoom` media scales on hover with overflow hidden.
- Rounded via `--rx-radius` (cards use ~1.5x base radius per Vuesax look — derive with calc, don't hardcode px).

## Demo pages

`src/lib/docs/pages/avatar.svelte` and `card.svelte`: sizes, shapes, fallback chain (broken src demo), badges, group with max/overflow, history ring; every card variant with placeholder media (inline SVG data URI — no binary assets, no external URLs).

## Registry

`avatar` (exports Avatar + AvatarGroup; multi-file item) and `card` as `registry:ui` items, `local:` deps per imports. Checker counts +2 (14 total).

## Tests

Render; fallback chain (bad src → initials); group overflow count with `max`; badge dot vs count; card variant class mapping; reveal variant exposes footer on focus-within (assert class/attr presence); href renders anchor.

## Acceptance criteria

Standard set: check 0 / tests pass / registry build+check (14 items) / build / dev-server curl markers for both routes / token-only colors / AGENTS.md-format report with fidelity notes.
