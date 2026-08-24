# Resax — Porting Vuesax Components to Svelte 5 + shadcn-svelte

A plan for recreating the component library shown at [vuesax.com/components](https://vuesax.com/components) as a Svelte 5 library following shadcn-svelte conventions.

---

## 1. Scope & inventory

The Vuesax site lists **328 entries**, but most are visual variants of a family (e.g. `VsButton` has 15 variants, `VsAlert` has Banner/Inline/Neon/Split/Toast). Collapsed into families, the real surface is **~60 components**:

| Category | Families |
|---|---|
| Disclosure | Accordion (bounce, filled, ghost, glow, slide variants) |
| Feedback | Alert, Badge, Notification, Popup, Progress, Skeleton, Spinner |
| Data display | Avatar, Code, Indicator, List, Table |
| Inputs | Button, Calendar, Checkbox, Chip, ColorPicker, Input, Number, Otp, Radio, RadioGroup, Rating, Select, Slider, Switch, Textarea, UploadFile |
| Navigation | Breadcrumb, ContextMenu, Cursor, Dock, DotStepper, Dropdown, FileTree, InlineOverflow, LinkBar, NavMenu, Pagination, Sidebar, Steps, Tabs |
| Layout | Card, Scrollbar, Separator, Spacer |
| Overlay | Drawer |
| Misc | SlideConfirm, TickRail, Transform |

**Key decision — variants are props, not components.** The site sells `VsButtonGradient`, `VsBadgePulse`, etc. as separate items; in shadcn-svelte convention these become `variant`/`effect` props on one component styled with `tailwind-variants`. So: ~60 component directories, each covering all of its family's variants. This is the single biggest simplification in the port.

**Constraint:** Vuesax docs pages are client-rendered and many variants are PRO (source not published). The port recreates behavior and look from the **rendered demos**, not their source — each component gets a "reference capture" step (screenshots/recordings of the live demo) rather than a code translation step.

---

## 2. Stack & conventions

- **SvelteKit** (library + docs/demo site in one repo), **Svelte 5** with runes.
- **Tailwind CSS v4** + **tailwind-variants (`tv()`)** for variant styling, `cn()` (clsx + tailwind-merge) util.
- **bits-ui** as the headless/a11y layer, per shadcn-svelte convention — never reimplement focus traps, typeahead, roving tabindex, or aria wiring by hand.
- **shadcn-svelte registry** distribution: users install per-component via `npx shadcn-svelte@latest add --registry <resax-url> button`, copying source into their project. Optionally also publish an npm package later; registry-first is the shadcn model.
- **Docs site**: the SvelteKit app doubles as the component gallery, mirroring vuesax.com's layout (one page per family, one demo section per variant). This is also the visual-regression test bed.

### Svelte 5 conventions (applies to every component)

- `let { ... } = $props()` with a typed `Props` interface; spread rest props onto the root element.
- **Snippets, not slots**: `children`, and named snippets like `icon`, `header`, `footer` — `{#snippet icon()}` at call sites.
- **`$bindable()`** for two-way state: `value`, `checked`, `open`, `selected`, `page`, `rating`.
- **Callback props** (`onclick`, `onValueChange`, `onOpenChange`) — no `createEventDispatcher`.
- `$derived` for computed style state, `$effect` only for real side effects (observers, timers, portal cleanup).
- `{@attach ...}` attachments for reusable DOM behaviors (ripple, click-outside, resize-observe).
- Context via typed `getContext`/`setContext` helpers for compound components (RadioGroup→Radio, Tabs→Tab, Steps→Step, Sidebar→SidebarItem).

### File layout (shadcn-svelte standard)

```
src/lib/components/ui/button/
  button.svelte
  index.ts          # exports component, variants, Props type
src/lib/utils.ts    # cn()
src/lib/attachments/ripple.ts
src/routes/(docs)/components/button/+page.svelte   # demo page
registry.json       # shadcn registry manifest
```

---

## 3. Theming: mapping the Vuesax color system

Vuesax's signature is its color API: semantic colors (`primary`, `success`, `danger`, `warn`, `dark`) **plus arbitrary colors** (`color="#7d33ff"` / `rgb(...)`), applied across flat/border/gradient/shadow/relief styles. Tailwind can't generate classes for arbitrary runtime colors, so:

1. Define tokens as **RGB-triplet CSS variables** (Vuesax's own trick, enables alpha compositing):
   `--rx-primary: 25 91 255; --rx-success: 70 201 58; --rx-danger: 255 71 87; --rx-warn: 255 186 0; --rx-dark: 30 30 31;` plus shadcn's `--background/--foreground/--muted/...` set for coexistence with stock shadcn-svelte components.
2. Components consume a single indirection variable: classes use `bg-[rgb(var(--rx-color))]`, `shadow-[0_10px_20px_-10px_rgb(var(--rx-color)/.6)]`, etc.
3. The `color` prop sets `--rx-color` via `style:` — semantic names resolve to the token vars, arbitrary hex/rgb values are converted to a triplet by a tiny `getColor()` util. This reproduces Vuesax's "any color, any style" behavior with static Tailwind classes.
4. Dark mode via `.dark` class overriding the token layer (Vuesax dark theme look).

Shared `tv()` **style dimensions** reused across the library (these correspond to Vuesax's core visual styles): `default | flat | border | gradient | shadow | relief | transparent`, sizes `xl | lg | default | sm | mini`, plus effect modifiers used by several families (`glow`, `pulse`, `shimmer`, `stripes`, `neon`).

---

## 4. Component mapping

| Resax component | Base | Notes |
|---|---|---|
| Button | native `<button>` | ripple attachment; loading, icon-only, floating, gradient/relief/glow variants; `href` renders `<a>` |
| Alert | custom | closable (`$bindable open`), title/icon snippets; banner/inline/neon/split/toast variants; toast variant reuses Notification engine |
| Badge, Chip, Indicator | custom | pure visual; chip closable + input-mode |
| Notification | custom + module API | imperative `notify({...})` creating outlets via `mount()`; positions, progress-auto-dismiss, snackbar/banner/card variants |
| Popup (dialog) | bits-ui Dialog | transition variants: zoom/flip/bounce/slide-up; confirm preset |
| Drawer | bits-ui Dialog (side panels) | four placements |
| Progress, Skeleton, Spinner | custom | CSS keyframe work; Spinner's 11 loader animations are the main effort |
| Avatar | bits-ui Avatar | groups, badges, history-ring (Vuesax's "story" ring) |
| Accordion | bits-ui Accordion | bounce/slide easing variants |
| Checkbox, Switch, Label | bits-ui | Vuesax's animated check draw (SVG stroke-dashoffset) |
| RadioGroup/Radio | bits-ui RadioGroup | |
| Slider | bits-ui Slider | range mode, square/circle knobs, tooltip value |
| Select | bits-ui Select/Combobox | multiple, filter, chips display, color states |
| Tabs | bits-ui Tabs | animated active-pill indicator (the Vuesax signature slide) |
| Tooltip, DropdownMenu, ContextMenu | bits-ui | Dropdown in Vuesax is closer to a popover-menu hybrid |
| Pagination | bits-ui Pagination | dotted/circle/square styles, goto input |
| Input, Textarea, Number, Otp | native + bits-ui PinInput (Otp) | floating labels, icon-after, shadow/border styles, validation states (success/danger + message slide-down) |
| Calendar / DatePicker | bits-ui Calendar/DatePicker | biggest input-family item; range selection |
| ColorPicker | custom (or port logic from a headless lib) | genuinely complex: HSV area, hue/alpha rails, swatches |
| Rating | custom (RadioGroup semantics) | half-star, custom icon snippet |
| UploadFile | custom | drag-drop, previews, progress per file |
| Card | custom | hover-reveal footer, image zoom variants |
| Table | custom + TanStack Table (optional dep) | sorting, selection, expand, pagination, sticky styles; largest single component |
| List, Code | custom / Shiki for Code | Code gets copy button + highlight via Shiki |
| Breadcrumb, LinkBar, NavMenu, Dock | custom | Dock = macOS-style magnify (proximity scaling, `$derived` from mousemove) |
| Sidebar | custom | groups, collapse, active indicator; follow shadcn-svelte's sidebar architecture (provider + context) |
| Steps, DotStepper | custom | linear progress semantics, `$bindable current` |
| FileTree | bits-ui Tree (or custom recursive snippet) | recursive self-rendering via snippets |
| Scrollbar | custom overlay scrollbar | wraps content, styled thumb |
| Cursor | custom (attachment on `<body>`) | custom-cursor effects; all free on the site — good fidelity reference |
| SlideConfirm | custom | slide-to-confirm with pointer capture |
| Separator, Spacer, InlineOverflow, TickRail, Transform | custom | small/visual |

---

## 5. Phases

Each phase ends with: demo pages live, visual check against vuesax.com, tests green, registry entries added.

**Phase 0 — Foundation (the critical phase)**
Scaffold SvelteKit + Tailwind v4 + shadcn-svelte init; token layer from §3; `cn()`, `getColor()`, ripple attachment, transition presets (Vuesax's easing curves); docs-site shell with component gallery routing; registry build script; CI (svelte-check, vitest, Playwright).

**Phase 1 — Core visuals** (prove the theming system across all style dimensions)
Button, Card, Alert, Badge, Chip, Avatar, Separator, Spacer, Skeleton, Spinner, Progress, Indicator.
*Button is the pilot: it exercises every color × style × effect combination. Get it pixel-faithful before mass-producing.*

**Phase 2 — Forms**
Input, Textarea, Checkbox, Switch, Radio/RadioGroup, Select, Slider, Number, Otp, Rating, UploadFile, Calendar, ColorPicker.

**Phase 3 — Overlays & feedback**
Popup (+confirm), Drawer, Notification (imperative API), Tooltip, Dropdown, ContextMenu.

**Phase 4 — Navigation**
Tabs, Steps, DotStepper, Breadcrumb, Pagination, Sidebar, NavMenu, LinkBar, Dock, FileTree, Scrollbar.

**Phase 5 — Data & specialty**
Table, List, Code, Cursor, SlideConfirm, InlineOverflow, TickRail, Transform.

**Phase 6 — Release**
Registry deployment (static JSON on the docs site), docs polish (props tables generated from Props types), a11y audit (axe across all demo pages), README + migration table (Vuesax prop → Resax prop), versioning.

---

## 6. Per-component recipe (repeatable)

1. **Capture reference**: open the live vuesax.com demo, record each variant's resting/hover/active/disabled states and animation timing.
2. **Define API**: Props interface (Svelte 5 style — bindables, snippets, callbacks), matching Vuesax prop names where sensible (`color`, `flat`, `border`, `gradient`, `loading`) but adopting shadcn idioms where Vuesax is dated (variant enums over boolean soup is acceptable — decide per component, document the mapping).
3. **Implement**: bits-ui primitive if listed in §4; `tv()` for variants; tokens from §3 only — no hardcoded colors.
4. **Port motion**: transitions/animations to Svelte `transition:`/CSS keyframes; match Vuesax's springy cubic-beziers.
5. **Demo page** with every variant from the site, side-by-side comparable.
6. **Test**: vitest + @testing-library/svelte for behavior (bindables, callbacks, keyboard); Playwright screenshot per variant for regression; axe on the demo page.
7. **Registry entry** in `registry.json` with dependency graph (e.g. `select` depends on `chip`).

---

## 7. Testing & quality gates

- `svelte-check --threshold error` in CI; components fully typed, no `any` in public APIs.
- Unit/behavior: Vitest (browser mode) + testing-library — every bindable prop and callback covered.
- Visual: Playwright screenshots of demo pages (light + dark) as the regression suite.
- A11y: axe-core sweep per demo page; keyboard nav verified for every interactive component (mostly inherited from bits-ui).

## 8. Risks & mitigations

- **PRO variants aren't inspectable in source** → recreate from rendered demos (recipe step 1); accept "faithful, not identical."
- **Animation fidelity** (Vuesax's feel is its selling point) → centralize easing/duration tokens in Phase 0 so tuning is global, not per-component.
- **Arbitrary color prop vs Tailwind** → solved by the `--rx-color` indirection (§3); validate it thoroughly during the Button pilot before building anything else on it.
- **Table/Calendar/ColorPicker scope blowups** → each is placed late in its phase; ship a v1 subset (Table without virtual scroll, ColorPicker without eyedropper) and iterate.
- **Naming collisions with stock shadcn-svelte** → resax components live under the same `ui/` convention; users choosing both can install to `ui/resax/` via registry alias config.

## 9. Suggested order of first commits

1. Phase 0 scaffold.
2. Token layer + `getColor()` + ripple attachment, with a test page rendering all tokens.
3. Button — full variant matrix, pixel-compared to vuesax.com.
4. Review checkpoint: does the theming architecture hold? Then parallelize Phase 1's remaining visual components.
