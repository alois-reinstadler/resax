# Phase 4–5 source-to-port parity audit

Audited 2026-08-24 against `scrape/vuesax/catalog.json`, `families.json`, and every matching artifact available in `wc/`, `shadow-css/`, `css/`, and `islands/`. Public API authority remains the Phase 4–5 specs. “Parity” means the Svelte port preserves the source family’s purpose, states, visual identity, input behavior, and motion intent; it does not require reproducing Vue/Web Component internals.

Legend: **Pass** = behavior and visual contract represented; **Adapted** = intentional Svelte/shadcn implementation with equivalent consumer behavior; **Gap** = concrete follow-up remains.

| Family | Scrape reference and source behavior | Svelte API/default/variant parity | Behavior, visual, motion, a11y | Fixture/test evidence | Verdict |
|---|---|---|---|---|---|
| Accordion | `VsAccordion*`; disclosure variants and elastic/glow treatments | Spec API, default single/collapsible, 3 skins × 4 effects | bits-ui disclosure semantics; snippets/runes; reduced motion | `accordion.svelte`; component tests | Adapted |
| Tabs | `VsTabs*`; moving selection surface, chrome/gooey/neon | All 6 variants, orientation, activation mode, bindable value | bits-ui keyboard/roles; measured indicator; reduced motion | `tabs.svelte`; tabs tests | Pass |
| Breadcrumb | `VsBreadcrumb*`; arrow/pill/slash/glow and compact overflow | All variants, custom separator, `maxItems`, navigation callback | Official dropdown owns collapsed-menu keyboard behavior | `breadcrumb.svelte`; Phase 4a tests | Adapted |
| Pagination | `VsPagination*`; compact/dots/gooey/ink/segments | All variants and paging controls; page clamps after count changes | Native buttons, labelled current page, deterministic reduced motion | `pagination.svelte`; range/component tests | Pass |
| Steps | `VsSteps*`; linear/clickable progress and six layouts | Spec API/defaults/variants represented | Ordered progress, disabled/linear enforcement, reduced motion | `steps.svelte`; Phase 4b tests | Pass |
| DotStepper | `VsDotStepper*`; bars/elastic/glow/ring/worm | Six variants, labelled dots, bindable current | Button keyboard path and reduced-motion static state | `dot-stepper.svelte`; Phase 4b tests | Pass |
| Timeline | `VsTimeline*`; vertical/horizontal, cards/alternating/glow/gradient | All six variants and both orientations | Ordered-list semantics; relative-color accents; reduced motion | `timeline.svelte`; Phase 4b tests | Pass |
| FileTree | `VsFileTree*`; guides/highlight/reveal and nested traversal | Spec nodes, selection and expansion APIs, all six variants | Tree roles, roving keyboard traversal, disabled skipping | `file-tree.svelte`; Phase 4b tests | Adapted |
| Sidebar | `VsSidebar*` wc/islands/shadow variants; nested nav, rail labels | Seven variants, two-level items, bindable active/open/collapsed | Official Sidebar owns mobile/shortcut/rail tooltip behavior | `sidebar.svelte`; Phase 4c coverage | Adapted |
| NavMenu | `VsNavMenu*` islands/css; mega and spotlight navigation | Six variants, orientation, data/snippet content | Official Navigation Menu owns roles, viewport and keyboard | `nav-menu.svelte`; Phase 4c coverage | Adapted |
| LinkBar | `VsLinkBar*` islands; moving underline/pill and magnet decoration | Six variants and bindable active state | ResizeObserver indicator; disabled anchors; coarse/reduced magnet bypass | `link-bar.svelte`; Phase 4c tests | Pass |
| Dock | `VsDock*` wc/islands/shadow; proximity scale and seven skins | All variants/placements and tunable magnification/distance | One pointer listener, labelled keyboard links, static coarse/reduced mode | `dock.svelte`; listener-cleanup tests | Pass |
| Scrollbar | `VsScrollbar*` wc/islands/shadow; custom visible thumb treatments | All variants/sizes/orientations and hide delay | Official ScrollArea preserves native wheel/touch/focus. Audit fixed duplicate scrollbar rendering by delegating orientation to the official root. | `scrollbar.svelte`; Phase 4c coverage | Pass after fix |
| Table | `VsTable*`; sorting/selection/expansion/paging and six skins | Generic columns/rows and spec callbacks represented | TanStack v9 state engine, semantic native table, cards responsive mode | `table.svelte`; table tests | Adapted |
| List | `VsList*`; cards/glow/hover/reveal/stripe | Six variants and none/single/multiple selection | Links/buttons preserve native activation and disabled behavior | `list.svelte`; list tests | Pass |
| Code | `VsCode*`; terminal/window/glow/gradient, copy and highlighting | Six variants, themes, line options and copy callback | Shiki rendering, accessible copy action, scroll/wrap behavior | `code.svelte`; code tests | Adapted |
| Cursor | `VsCursor*` wc/shadow; blend/blob/glow/label/magnet/reticle | Seven attachment variants and full options | One inert body overlay; exact cursor restoration; SSR safe; coarse/forced/reduced bypass; visibility and RAF cleanup | bounded `cursor.svelte`; 4 lifecycle/SSR tests | Pass |
| SlideConfirm | `vs-slide-confirm` wc/shadow; captured drag, spring settle, slider semantics | Spec labels/icons/threshold/loading/reset API | Logical RTL, pointer capture, cancel/resize teardown, exact-once callback, keyboard equivalent, reduced-motion settle | `slide-confirm.svelte`; 3 multi-path tests | Pass |
| InlineOverflow | `vs-inline-overflow` wc/shadow; stable priority overflow | Spec snippets/gap/priority/color API | SSR renders all; loop-safe RAF measurement; hidden clones are `aria-hidden`; focus transfers before hiding; official dropdown | bounded fixture; resize/focus-oriented test | Adapted |
| TickRail | `vs-tick-rail` wc/shadow; exact ticks and value navigation | Spec API/defaults and normalized reversed bounds | Native range chosen for exact keyboard semantics; audit added explicit `aria-orientation`; positive-step fallback; visual tick cap only | fixture; normalization/input test | Adapted |
| Transform | `VsTransform*` wc/islands/css/shadow; expand/fade/flip/scale/slide | All variants/directions, duration, keep-mounted and completion API | Svelte transition lifecycle, interruption sequence guard, inert+hidden retained content, deterministic reduced motion | fixture; retained-content test | Adapted |
| AskAiButton | `VsAskAiButton` islands/css; mesh/specular/sparkle/loading | Button props preserved except forced AI skin; label/loading/sparkle | Dedicated `--rx-ai-*` palette, pointer decoration cleanup, static reduced-motion mesh | fixture; loading/cleanup test | Pass |
| ButtonGroup | `vs-button-group` wc/shadow; attached radii and vertical grouping | Orientation/attached/snippet API | Official Button Group role and native tab order; local Button colors remain untouched | fixture; orientation/group test | Adapted |
| SplitButton | `vs-split-button` wc/shadow; distinct action/menu affordances | Full spec action state and menu snippet | Local Button main action; official Dropdown trigger/content keyboard behavior; coherent disable/loading | fixture; action/menu/disable test | Adapted |

## Concrete corrections made during this audit

1. `Scrollbar` previously asked the official ScrollArea root to create its default vertical bar and also rendered explicit bars, producing duplicate controls. The wrapper now passes its `orientation` to the official root and lets that root render exactly the required bars and corner.
2. `TickRail` exposed native slider behavior but omitted explicit orientation metadata. It now sets `aria-orientation` for horizontal and vertical rails.
3. Phase 5c was validated after the official Button Group and the dedicated AI theme tokens landed. InlineOverflow was adjusted to keep the full-item SSR fallback without capturing an initial prop value and its official-primitive styles were made explicitly global.
4. SlideConfirm’s wrapper no longer sets `dir="auto"`, which could override an inherited RTL direction based on its English label. Measurement and logical drag direction now follow the consumer’s direction.

## Intentional adaptations

- Official shadcn-svelte foundations own complex focus, popup, viewport, mobile, and scroll behavior wherever the work orders require them. Resax layers variants and tokens over those foundations.
- TickRail uses a native range rather than `local:slider`: the current local Slider has no vertical public API. This preserves exact value and keyboard behavior in both orientations.
- SplitButton’s menu trigger is a separately skinned native button passed through the official Dropdown Trigger. The official trigger prop type is broader than Resax Button’s callback type; forcing that spread into Button would make its public `onclick` unsound.
- Source-only demo controls, catalog framing, Web Component attributes, and Vue implementation helpers are not consumer API and were not ported.

## Remaining gaps

- Visual screenshot parity is still qualitative until the Phase 6 Playwright baselines are approved. This audit verifies variant presence, token paths, interaction ownership, and reduced-motion behavior, not pixel identity.
- Sidebar exposes both `open` and `collapsed` bindables over an official provider whose canonical state is `open`. Internal provider changes synchronize both; simultaneous external writes are intentionally not assigned a precedence rule. Consumers should control one of the two at a time.
- InlineOverflow’s visual measurement cap is exercised in jsdom with mocked geometry; browser resize/focus regression coverage belongs in the Phase 6 Playwright suite.
